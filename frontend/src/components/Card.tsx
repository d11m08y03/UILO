interface CardProps {
  image: any;
}

export function CompanyCard({ image }: CardProps) {
  return (
    <div className="h-40 w-40 bg-white shadow-sm shadow-gray-400 rounded-xl">
      <div className="flex items-center justify-center h-full w-full align-middle object-contain px-4">
        {image}
      </div>
    </div>
  );
}
