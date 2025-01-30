type Company = {
	name: string;
	tier: "Gold" | "Silver" | "Bronze"; // Strictly type the tier
  };
  
  // Define companies with the correct tier types
  const companies: Company[] = [
	{ name: "Mauritius Union Assurance (MUA)", tier: "Gold" },
	{ name: "SICOM", tier: "Gold" },
	{ name: "VISTRA (Mauritius)", tier: "Gold" },
	{ name: "Aspen Global Incorporated", tier: "Gold" },
	{ name: "RAPP INDIAN OCEAN", tier: "Gold" },
	{ name: "Aberdeen Operations Ltd", tier: "Gold" },
	{ name: "IQ EQ", tier: "Gold" },
	{ name: "Bolt Talent Solutions Ltd", tier: "Gold" },
	{ name: "Axis Fiduciary Ltd", tier: "Gold" },
	{ name: "BDO Solutions Ltd", tier: "Gold" },
	
	// Silver 
	{ name: "Business as Work (BAW)", tier: "Silver" },
	{ name: "Spoon Consulting Ltd", tier: "Silver" },
	{ name: "Accenture (Services) Mauritius Ltd", tier: "Silver" },
	{ name: "2Cana Solutions", tier: "Silver" },
	
	// Bronze 
	{ name: "BOURBON OFFSHORE GREENMAR", tier: "Bronze" },
	{ name: "IPCS", tier: "Bronze" },
	{ name: "KPMG", tier: "Bronze" },
	{ name: "Deloitte", tier: "Bronze" },
	{ name: "TRIDENT TRUST COMPANY LIMITED", tier: "Bronze" },
	{ name: "Rogers Capital", tier: "Bronze" },
	{ name: "Currimjee Jeewanjee Ltd", tier: "Bronze" },
	{ name: "CIEL TEXTILE", tier: "Bronze" },
	{ name: "Comfort EasyFront", tier: "Bronze" },
	{ name: "FRCI Ltd", tier: "Bronze" },
	{ name: "AVIPRO Co Ltd", tier: "Bronze" },
	{ name: "DTOS Ltd", tier: "Bronze" },
	{ name: "Checkout Support Services Ltd", tier: "Bronze" },
	{ name: "Information Technology ELCA Ltd", tier: "Bronze" },
	{ name: "HR CAPITALS LIMITED", tier: "Bronze" },
	{ name: "DayForce (Mauritius) Ltd", tier: "Bronze" },
	{ name: "HF Markets", tier: "Bronze" },
	{ name: "INFOSYSTEMS AA LTD", tier: "Bronze" },
	{ name: "Infosys Ltd", tier: "Bronze" },
	{ name: "State Informatics Limited (SIL)", tier: "Bronze" },
  ];
  
  export default companies;
  