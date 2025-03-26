import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
    const { data: hotelData, isError, isLoading } = useQuery({ queryKey: ["fetchMyHotels"], queryFn: apiClient.fetchMyHotels, retry: false });

    if (isLoading) {
        return <span className="text-2xl font-bold text-center block">Loading...</span>;
    }

    if (isError) {
        return <span className="text-xl font-bold text-red-500">Failed to load hotels. Please try again.</span>;
    }

    if (!hotelData || hotelData.length === 0) {
        return <span className="text-2xl font-bold">No Hotels Found</span>;
    }

    return (
        <div className="space-y-6 w-full max-w-5xl mx-auto p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-center sm:text-left">My Hotels</h1>
                <Link to='/add-hotel' className="w-full sm:w-auto flex justify-center bg-blue-600 text-white text-lg sm:text-xl font-bold p-3 hover:bg-blue-500 rounded-md">
                    Add Hotel
                </Link>
            </div>

            {/* Hotel Grid */}
            <div className="grid grid-cols-1 gap-6">
                {hotelData.map((hotel) => (
                    <div key={hotel._id} className="flex flex-col justify-between border border-slate-300 rounded-lg p-4 sm:p-6 gap-5">
                        <h2 className="text-2xl font-bold">{hotel.name}</h2>
                        <p className="whitespace-pre-line">{hotel.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                <BsMap className="mr-2" />
                                {hotel.city}, {hotel.country}
                            </div>

                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                <BsBuilding className="mr-2" />
                                {hotel.type}
                            </div>

                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                <BiMoney className="mr-2" />
                                ${hotel.pricePerNight} per Night
                            </div>

                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                <BiHotel className="mr-2" />
                                {hotel.adultCount} adults, {hotel.childCount} children
                            </div>

                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                <BiStar className="mr-2" />
                                {hotel.starRating} Star Ratings
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link to={`/edit-hotel/${hotel._id}`} className="w-full sm:w-auto flex justify-center bg-blue-600 text-white text-lg sm:text-xl font-bold p-3 hover:bg-blue-500 rounded-md">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHotels;
