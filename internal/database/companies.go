package database

import (
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
		return nil, fmt.Errorf("failed to query companies: %w", err)
	}
	defer rows.Close()

	var companies []models.Company

	for rows.Next() {
		var company models.Company

		// Scan values directly from TblCompanies
		err := rows.Scan(&company.ID, &company.Name, &company.Category, &company.Timestamp)
		if err != nil {
			log.Println(err.Error())
			return nil, fmt.Errorf("failed to query company: %w", err)
		}

		companies = append(companies, company)
	}

	if err = rows.Err(); err != nil {
		log.Println(err.Error())
		return nil, fmt.Errorf("error after iterating rows: %w", err)
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
		return nil, fmt.Errorf("failed to query companies: %w", err)
	}
	defer rows.Close()

	var companies []models.Company

	for rows.Next() {
		var company models.Company

		err := rows.Scan(&company.ID, &company.Name, &company.Category, &company.Timestamp, &company.Stand)
		if err != nil {
			log.Println(err.Error())
			return nil, fmt.Errorf("failed to query company: %w", err)
		}

		companies = append(companies, company)
	}

	if err = rows.Err(); err != nil {
		log.Println(err.Error())
		return nil, fmt.Errorf("error after iterating rows: %w", err)
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
		return fmt.Errorf("failed to execute update: %w", err)
	}

	return nil
}

func (s *service) bitesTheDust() error {
	query := "UPDATE TblStands SET CompanyID = NULL;"

	_, err := s.db.Exec(query)
	if err != nil {
		log.Println(err.Error())
		return fmt.Errorf("failed to update TblStands: %w", err)
	}

	return nil
}

func (s *service) ShuffleCompanies() (error) {
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
			return fmt.Errorf("error shuffling rows: %w", err)
		}
	}

	companies, err = s.GetCompanies()
	if err != nil {
		return err
	}

	return nil
}
