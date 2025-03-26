import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
    const { hotelId } = useParams();
    const { showToast } = useAppContext();

    const { data: hotel, isLoading, isError } = useQuery({
        queryKey: ["fetchMyHotelById"],
        queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
        retry: false,
        enabled: !!hotelId
    });

    const { mutate, isPending } = useMutation({
        mutationFn: apiClient.updateMyHotelById,
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error Saving Hotel", type: "ERROR" });
        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };

    if (isLoading) {
        return <span className="text-xl font-bold text-center block">Loading Hotel Details...</span>;
    }

    if (isError || !hotel) {
        return <span className="text-xl font-bold text-red-500">Failed to load hotel.</span>;
    }

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isPending} />
        </div>
    );
};

export default EditHotel;
