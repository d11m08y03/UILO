# Step 1: Build the Go binary (Updated to 1.24-alpine)
FROM golang:1.24-alpine AS builder

# Install build tools for SQLite (CGO)
RUN apk add --no-cache gcc musl-dev

WORKDIR /app

# Copy dependencies first for better caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build the app (CGO_ENABLED=1 is required for SQLite)
RUN CGO_ENABLED=1 GOOS=linux go build -o main main.go

# Step 2: Final lightweight image
FROM alpine:latest
# Added sqlite here so you can run the insert script manually
RUN apk add --no-cache ca-certificates sqlite

WORKDIR /app

# Copy the binary from the builder
COPY --from=builder /app/main .

# Copy your database and sql file
# Note: If you have a volume mounted to /app/uilo.db, 
# the copy below will be "overwritten" by the volume content.
COPY --from=builder /app/uilo.db .
COPY --from=builder /app/insert.sql .

EXPOSE 8080

CMD ["./main"]
