import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
    const { hotelId } = useParams();

    const { data: hotel, isLoading, isError } = useQuery({
        queryKey: ["fetchHotelById"],
        queryFn: () => apiClient.fetchHotelById(hotelId || ""),
        enabled: !!hotelId,
    });

    if (isLoading) {
        return <span className="text-xl font-bold text-center block">Loading...</span>;
    }

    if (isError || !hotel) {
        return <span className="text-xl font-bold text-red-500">Hotel not found.</span>;
    }

    return (
        <div className="space-y-6 p-4 max-w-4xl mx-auto">
            <div>
                <span className="flex">
                    {Array.from({ length: hotel.starRating }).map((_, index) => (
                        <AiFillStar key={index} className="fill-yellow-400" />
                    ))}
                </span>
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotel.imageUrls.map((url, index) => (
                    <div key={index} className="h-[250px] md:h-[300px]">
                        <img src={url} alt={hotel.name} className="rounded-md w-full h-full object-cover object-center" />
                    </div>
                ))}
            </div>

            {/* Facilities */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {hotel.facilities.map((facility, index) => (
                    <div key={index} className="border border-slate-300 rounded-md p-3 text-center">
                        {facility}
                    </div>
                ))}
            </div>

            {/* Description & Booking Form */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="h-fit">
                    <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotel._id} />
                </div>
            </div>
        </div>
    );
};

export default Detail;
