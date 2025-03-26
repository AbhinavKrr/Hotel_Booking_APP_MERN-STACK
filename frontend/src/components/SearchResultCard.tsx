import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
    hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-[2fr_3fr] xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-6 gap-6 shadow-md">
            {/* Hotel Image */}
            <div className="w-full h-[250px] md:h-[300px] rounded-lg overflow-hidden">
                <img 
                    src={hotel.imageUrls[0]} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Hotel Details */}
            <div className="grid grid-rows-[auto_1fr_auto] gap-4">
                {/* Name & Rating */}
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map((_, index) => (
                                <AiFillStar key={index} className="fill-yellow-400" />
                            ))}
                        </span>
                        <span className="ml-2 text-sm text-gray-600">{hotel.type}</span>
                    </div>
                    <Link 
                        className="text-2xl font-bold text-blue-700 hover:underline" 
                        to={`/detail/${hotel._id}`}
                    >
                        {hotel.name}
                    </Link>
                </div>

                {/* Hotel Description */}
                <div className="text-gray-700 line-clamp-4">{hotel.description}</div>

                {/* Facilities & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 items-end gap-2">
                    {/* Facilities */}
                    <div className="flex flex-wrap gap-2">
                        {hotel.facilities.slice(0, 3).map((facility, index) => (
                            <span 
                                key={index} 
                                className="bg-slate-300 px-3 py-1 rounded-md text-xs font-bold text-gray-800"
                            >
                                {facility}
                            </span>
                        ))}
                        {hotel.facilities.length > 3 && (
                            <span className="text-sm text-gray-600">
                                +{hotel.facilities.length - 3} more
                            </span>
                        )}
                    </div>

                    {/* Price & Button */}
                    <div className="flex flex-col items-end gap-2">
                        <span className="font-bold text-lg">${hotel.pricePerNight} per night</span>
                        <Link 
                            to={`/detail/${hotel._id}`} 
                            className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold text-lg hover:bg-blue-500"
                        >
                            View More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsCard;
