import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
    const { data: hotels, isLoading, isError } = useQuery({
        queryKey: ["fetchMyBookings"],
        queryFn: apiClient.fetchMyBookings,
    });

    if (isLoading) {
        return <span className="text-xl font-bold text-center block">Loading...</span>;
    }

    if (isError || !hotels || hotels.length === 0) {
        return <span className="text-xl font-bold text-red-500">No Bookings Found</span>;
    }

    return (
        <div className="space-y-6 w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-center sm:text-left">My Bookings</h1>

            {hotels.map((hotel) => (
                <div key={hotel._id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-4 sm:p-6 lg:p-8 gap-5">
                    
                    {/* Hotel Image */}
                    <div className="w-full h-48 sm:h-56 lg:h-[250px]">
                        <img
                            src={hotel.imageUrls?.[0] || "https://via.placeholder.com/300"}
                            alt={hotel.name}
                            className="w-full h-full object-cover object-center rounded-md"
                        />
                    </div>

                    {/* Booking Details */}
                    <div className="flex flex-col gap-4">
                        <div className="text-xl sm:text-2xl font-bold">
                            {hotel.name}
                            <div className="text-sm font-normal text-gray-600">
                                {hotel.city}, {hotel.country}
                            </div>
                        </div>

                        {/* Booking List */}
                        <div className="space-y-4 max-h-[300px] overflow-y-auto">
                            {hotel.bookings.map((booking) => (
                                <div key={booking._id} className="border border-gray-300 rounded-md p-3 bg-gray-50">
                                    <div>
                                        <span className="font-bold mr-2">Dates:</span>
                                        <span>
                                            {new Date(booking.checkIn).toDateString()} -{" "}
                                            {new Date(booking.checkOut).toDateString()}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-bold mr-2">Guests:</span>
                                        <span>
                                            {booking.adultCount} adults, {booking.childCount} children
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyBookings;
