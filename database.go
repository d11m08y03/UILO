package main

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func init() {
	var err error
	db, err = sql.Open("sqlite3", "./uilo.db")
	if err != nil {
		log.Fatal(err)
	}

	createTableSQL := `CREATE TABLE IF NOT EXISTS company (
		"id" TEXT NOT NULL PRIMARY KEY,
		"name" TEXT,
		"present" BOOLEAN NOT NULL DEFAULT 0,
		"has_water" BOOLEAN NOT NULL DEFAULT 0,
		"has_food" BOOLEAN NOT NULL DEFAULT 0
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		log.Fatal(err)
	}
}

// CreateCompany creates a new company with the given name
func CreateCompany(name string) (int64, error) {
	res, err := db.Exec("INSERT INTO company (name, present, has_water, has_food) VALUES (?, ?, ?, ?)", name, false, false, false)
	if err != nil {
		return 0, err
	}
	return res.LastInsertId()
}

// SetPresent sets the present field to true for a given company id
func SetPresent(id int) error {
	_, err := db.Exec("UPDATE company SET present = TRUE WHERE id = ?", id)
	return err
}

// SetWater sets the has_water field to true for a given company id
func SetWater(id int) error {
	_, err := db.Exec("UPDATE company SET has_water = TRUE WHERE id = ?", id)
	return err
}

// SetFood sets the has_food field to true for a given company id
func SetFood(id int) error {
	_, err := db.Exec("UPDATE company SET has_food = TRUE WHERE id = ?", id)
	return err
}
