CREATE TABLE TblStands (
	ID INTEGER PRIMARY KEY AUTOINCREMENT,
	CompanyID INTEGER NULL,
	Name VARCHAR(255) NOT NULL,
	Category VARCHAR(255) NOT NULL,
	FOREIGN KEY (CompanyID) REFERENCES TblCompanies(CompanyID)
)
