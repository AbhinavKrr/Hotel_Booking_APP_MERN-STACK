import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
    hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
    return (
        <Link to={`/detail/${hotel._id}`} className="relative cursor-pointer overflow-hidden rounded-lg block shadow-md hover:shadow-lg transition-shadow">
            <div className="h-[250px] sm:h-[300px]">
                <img 
                    src={hotel.imageUrls[0]} 
                    alt={hotel.name}
                    className="w-full h-full object-cover object-center"
                />
            </div>
            {/* Dark gradient overlay for better text visibility */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                <span className="text-white font-bold tracking-tight text-2xl sm:text-3xl">
                    {hotel.name}
                </span>
            </div>
        </Link>
    );
};

export default LatestDestinationCard;
