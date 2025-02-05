package models

import "time"

type Category string

const (
	Gold   Category = "Gold"
	Silver Category = "Silver"
	Bronze Category = "Bronze"
)

type Company struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Category  string    `json:"category"`
	Timestamp time.Time `json:"timestamp"`
	Stand     string    `json:"stand"`
}
