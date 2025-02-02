package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
		return
	}

	dbPath := os.Getenv("BLUEPRINT_DB_URL")
	migrationsPath := "./cmd/database/migrations"

	if _, err := os.Stat(dbPath); os.IsNotExist(err) {
		fmt.Println("Database does not exist. Creating...")
		file, err := os.Create(dbPath)
		if err != nil {
			log.Fatalf("Failed to create database file: %v", err)
		}
		file.Close()
		fmt.Println("Database created successfully.")
	} else {
		fmt.Println("Database already exists.")
	}

	db, err := sql.Open("sqlite3", dbPath)
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}
	defer db.Close()

	// Run all migration files
	files, err := os.ReadDir(migrationsPath)
	if err != nil {
		log.Fatalf("Failed to read migrations directory: %v", err)
	}

	for _, file := range files {
		if filepath.Ext(file.Name()) == ".sql" {
			filePath := filepath.Join(migrationsPath, file.Name())
			fmt.Printf("Running migration: %s\n", file.Name())

			content, err := os.ReadFile(filePath)
			if err != nil {
				log.Fatalf("Failed to read migration file '%s': %v", file.Name(), err)
			}

			_, err = db.Exec(string(content))
			if err != nil {
				log.Fatalf("Failed to execute migration '%s': %v", file.Name(), err)
			}
		}
	}

	fmt.Println("All migrations applied successfully.")
}
