package main

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

// Company struct to match the database and Flutter expectations
type Company struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Present bool   `json:"present"`
	Water   bool   `json:"water"`
	Food    bool   `json:"food"`
}

func init() {
	var err error
	db, err = sql.Open("sqlite3", "./uilo.db")
	if err != nil {
		log.Fatal(err)
	}

	// Create Table
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

	// Hardcoded Initial Data
	insertDataSQL := `INSERT OR IGNORE INTO company (id, name, present, has_water, has_food) VALUES
		('BS9', 'Mauritius Finance', 0, 0, 0),
		('BS11', 'DTOS Ltd', 0, 0, 0),
		('BS8', 'Trident Trust Company (Mauritius) Limited', 0, 0, 0),
		('BS7', '2CANA SOLUTIONS', 0, 0, 0),
		('BS13', 'Yunit- Magellan Partners', 0, 0, 0),
		('BS10', 'Ernst & Young Ltd', 0, 0, 0),
		('BS6', 'IQ-EQ MAURITIUS', 0, 0, 0),
		('BS4', 'Accenture', 0, 0, 0),
		('BS3', 'TeakWorld', 0, 0, 0),
		('BS2', 'Checkout', 0, 0, 0),
		('BS5', 'BDO & Co', 0, 0, 0),
		('BS12', 'SIL', 0, 0, 0),
		('BS1', 'IBL LTD – Healthactiv & Medical Trading Company (MedActiv)', 0, 0, 0),
		('BS14', 'WellDev', 0, 0, 0),
		('SS1', 'KPMG', 0, 0, 0),
		('SS2', 'Aberdeen Operations Ltd', 0, 0, 0),
		('SS3', 'Currimjee Jeewanjee and Company Limited', 0, 0, 0),
		('SS4', 'Business At Work (Mtius) Ltd', 0, 0, 0),
		('GS7', 'Deloitte', 0, 0, 0),
		('GS6', 'Rogers Capital', 0, 0, 0),
		('GS9', 'Safyr Utilis Fund Services Ltd', 0, 0, 0),
		('GS3', 'BDO Solutions Ltd', 0, 0, 0),
		('GS1', 'Aptis Services Company Limited', 0, 0, 0),
		('GS10', 'HF Markets Limited', 0, 0, 0),
		('GS5', 'Arup (Mauritius) Ltd', 0, 0, 0),
		('GS4', 'Rank Interactive Services (Mauritius) Limited', 0, 0, 0),
		('GS8', 'SD WORX MAURITIUS', 0, 0, 0),
		('GS2', 'ClarityLabs Mauritius', 0, 0, 0);`

	_, err = db.Exec(insertDataSQL)
	if err != nil {
		log.Fatal(err)
	}
}

// GetCompanyByID fetches a single company. Necessary for Flutter scanning.
func GetCompanyByID(id string) (Company, error) {
	var c Company
	row := db.QueryRow("SELECT id, name, present, has_water, has_food FROM company WHERE id = ?", id)

	// Scan the database values into the Company struct
	err := row.Scan(&c.ID, &c.Name, &c.Present, &c.Water, &c.Food)
	if err != nil {
		return c, err
	}
	return c, nil
}

// SetPresent sets the present field to true for a given company string ID
func SetPresent(id string) error {
	_, err := db.Exec("UPDATE company SET present = TRUE WHERE id = ?", id)
	return err
}

// SetWater sets the has_water field to true for a given company string ID
func SetWater(id string) error {
	_, err := db.Exec("UPDATE company SET has_water = TRUE WHERE id = ?", id)
	return err
}

// SetFood sets the has_food field to true for a given company string ID
func SetFood(id string) error {
	_, err := db.Exec("UPDATE company SET has_food = TRUE WHERE id = ?", id)
	return err
}

func ResetAllStats() error {
	_, err := db.Exec("UPDATE company SET present = FALSE, has_water = FALSE, has_food = FALSE")
	return err
}
