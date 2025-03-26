import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
    const { data: hotels, isLoading, isError } = useQuery({
        queryKey: ["fetchHotels"],
        queryFn: apiClient.fetchHotels
    });

    if (isLoading) {
        return <span className="text-xl font-bold text-center block">Loading...</span>;
    }

    if (isError || !hotels || hotels.length === 0) {
        return <span className="text-xl font-bold text-red-500">No destinations found.</span>;
    }

    const topRowHotels = hotels.slice(0, 2);
    const bottomRowHotels = hotels.slice(2);

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-3xl font-bold text-center sm:text-left">Latest Destinations</h2>
            <p className="text-gray-600 text-center sm:text-left">Most recent destinations added by our hosts</p>

            {/* Destinations Grid */}
            <div className="grid gap-3 sm:gap-4">
                
                {/* Top Row (1 or 2 Hotels) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {topRowHotels.map((hotel) => (
                        <LatestDestinationCard key={hotel._id} hotel={hotel} />
                    ))}
                </div>

                {/* Bottom Row (Remaining Hotels) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {bottomRowHotels.map((hotel) => (
                        <LatestDestinationCard key={hotel._id} hotel={hotel} />
                    ))}
                </div>   

            </div>
        </div>
    );
};

export default Home;
