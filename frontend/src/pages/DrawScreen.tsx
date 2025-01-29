import CustomButton from "@/components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Company {
  id: number;
  name: string;
  category: string;
  timestamp: string;
  stand: string;
}

function DrawScreen() {
  const [tierStyles, _] = useState({
    Bronze: {
      otherStyles:
        "bg-gradient-to-br from-[#DAA520] to-[#831704] bg-clip-text text-transparent",
      radius: 600,
      bubbleStyle: "bg-gradient-to-br from-[#DAA520] to-[#831704]",
      doubleBubble: true,
    },
    Silver: {
      otherStyles:
        "bg-gradient-to-br from-[#C7C9CB] to-[#848B98] bg-clip-text text-transparent",
      radius: 500,
      bubbleStyle: "bg-gradient-to-br from-[#C7C9CB] to-[#848B98]",
      doubleBubble: false,
    },
    Gold: {
      otherStyles:
        "bg-gradient-to-br from-[#a28834] to-[#D4AF37] bg-clip-text text-transparent",
      radius: 540,
      bubbleStyle: "bg-gradient-to-br from-[#f9f295] to-[#B88A44]",
      doubleBubble: false,
    },
  });

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/companies");
        if (Array.isArray(response.data.companies)) {
          setCompanies(response.data.companies);
        } else {
          setError("Unexpected data format");
        }
      } catch (err) {
        setError("Failed to fetch companies data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // const sortedCompanies = [...companies].sort((a, b) => {
  //   return dayjs(a.timestamp).isAfter(dayjs(b.timestamp)) ? 1 : -1;
  // });

  const handleTierClick = (tier: keyof typeof tierStyles) => {
    const filteredCompanies = companies
      .filter(
        (company) => company.category.toLowerCase() === tier.toLowerCase(),
      )
      .map(({ name, stand}) => ({
        name,
        stand,
      }));

    navigate("/company-draw", {
      state: {
        tier,
        companies: filteredCompanies,
        otherStyles: tierStyles[tier].otherStyles,
        radiusSize: tierStyles[tier].radius,
        bubbleStyle: tierStyles[tier].bubbleStyle,
        doubleBubble: tierStyles[tier].doubleBubble,
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative h-[100vh] w-full">
      <div className="absolute h-full w-full bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0" />
      <div className="h-full w-full flex items-center justify-center relative z-10">
        <div className="flex flex-col items-center gap-4">
          <CustomButton
            otherStyles={`w-[10vw] h-[7vh] text-xl bg-black/80 rounded-full border border-gray-600`}
            onClick={() => handleTierClick("Bronze")}
          >
            <span
              className={`font-semibold text-3xl ${tierStyles["Bronze"].otherStyles}`}
            >
              Bronze
            </span>
          </CustomButton>
          <CustomButton
            otherStyles={`w-[10vw] h-[7vh] text-xl bg-black/80 rounded-full border border-gray-600`}
            onClick={() => handleTierClick("Silver")}
          >
            <span
              className={`font-semibold text-3xl ${tierStyles["Silver"].otherStyles}`}
            >
              Silver
            </span>
          </CustomButton>
          <CustomButton
            otherStyles={`w-[10vw] h-[7vh] text-xl bg-black/80 rounded-full border border-gray-600`}
            onClick={() => handleTierClick("Gold")}
          >
            <span
              className={`font-semibold text-3xl ${tierStyles["Gold"].otherStyles}`}
            >
              Gold
            </span>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default DrawScreen;
