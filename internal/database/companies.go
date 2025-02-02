package database

import (
	"database/sql"
	"fmt"
	"log"
	"sort"
	"uilo/internal/models"
)

func (s *service) getCompaniesBeforeShuffle() ([]models.Company, error) {
	query := `
		SELECT c.ID, c.Name, c.Category, c.Timestamp
		FROM TblCompanies c;
	`

	rows, err := s.db.Query(query)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	defer rows.Close()

	var companies []models.Company

	for rows.Next() {
		var company models.Company

		// Scan values directly from TblCompanies
		err := rows.Scan(&company.ID, &company.Name, &company.Category, &company.Timestamp)
		if err != nil {
			log.Println(err.Error())
			return nil, err
		}

		companies = append(companies, company)
	}

	if err = rows.Err(); err != nil {
		log.Println(err.Error())
		return nil, err
	}

	return companies, nil
}

func (s *service) GetCompanies() ([]models.Company, error) {
	query := `
		SELECT c.ID, c.Name, c.Category, c.Timestamp, COALESCE(s.Name, '') AS StandName
		FROM TblCompanies c
		LEFT JOIN TblStands s ON c.ID = s.CompanyID;
	`

	rows, err := s.db.Query(query)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	defer rows.Close()

	var companies []models.Company

	for rows.Next() {
		var company models.Company

		err := rows.Scan(&company.ID, &company.Name, &company.Category, &company.Timestamp, &company.Stand)
		if err != nil {
			log.Println(err.Error())
			return nil, err
		}

		companies = append(companies, company)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return companies, nil
}

func (s *service) assignStand(companyID int, category string) error {
	query := fmt.Sprintf(
		"UPDATE TblStands SET CompanyID = '%d' "+
			"WHERE ID = (SELECT ID FROM TblStands "+
			"WHERE Category = '%s' AND CompanyID IS NULL "+
			"ORDER BY RANDOM() LIMIT 1)",
		companyID, category,
	)

	_, err := s.db.Exec(query)
	if err != nil {
		log.Println(err.Error())
		return err
	}

	return nil
}

func (s *service) bitesTheDust() error {
	query := "UPDATE TblStands SET CompanyID = NULL;"

	_, err := s.db.Exec(query)
	if err != nil {
		return err
	}

	return nil
}

func (s *service) ShuffleCompanies() error {
	err := s.bitesTheDust()
	if err != nil {
		return err
	}

	companies, err := s.getCompaniesBeforeShuffle()
	if err != nil {
		return err
	}

	// Sort companies according to timestamp
	sort.Slice(companies, func(i, j int) bool {
		return companies[i].Timestamp.Before(companies[j].Timestamp)
	})

	for _, company := range companies {
		err := s.assignStand(company.ID, company.Category)
		if err != nil {
			return err
		}
	}

	companies, err = s.GetCompanies()
	if err != nil {
		return err
	}

	return nil
}

func (s *service) ToggleCompanyBoolean(key string, id string) error {
	allowedKeys := []string{"Present", "Water", "Food"}

	notInList := func(s string) bool {
		for _, item := range allowedKeys {
			if s == item {
				return false
			}
		}
		return true
	}

	if notInList(key) {
		return fmt.Errorf("Invalid key")
	}

	present, err := s.verifyBool(key, id)
	if err != nil {
		return fmt.Errorf("failed to mark company field %s: %w", key, err)
	}

	if present {
		return fmt.Errorf("field already marked as true")
	}

	query := fmt.Sprintf(
		"UPDATE TblCompanies SET %s = 1 WHERE ID = %s;", key, id,
	)

	_, err = s.db.Exec(query)
	if err != nil {
		return fmt.Errorf("failed to mark company field %s: %w", key, err)
	}

	return nil
}

func (s *service) verifyBool(key string, id string) (bool, error) {
	query := fmt.Sprintf("SELECT %s FROM TblCompanies WHERE ID = %s", key, id)

	var val bool
	err := s.db.QueryRow(query).Scan(&val)

	if err != nil {
		if err == sql.ErrNoRows {
			return false, fmt.Errorf("No rows found")
		} else {
			return false, fmt.Errorf("Failed to execute query: %v", err)
		}
	}

	return val, nil
}
