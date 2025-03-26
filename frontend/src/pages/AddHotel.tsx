import { useMutation } from '@tanstack/react-query';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useAppContext } from '../contexts/AppContext';
import * as apiClient from '../api-client';

const AddHotel = () => {
    const { showToast } = useAppContext();

    const { mutate, isPending } = useMutation({
        mutationFn: apiClient.addMyHotel,
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error Saving Hotel!", type: "ERROR" });
        }
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };

    return (
        <div className="p-4 max-w-lg mx-auto space-y-4">
            <h1 className="text-2xl font-bold text-center">Add a New Hotel</h1>
            {isPending && <p className="text-center text-blue-500">Saving...</p>}
            <ManageHotelForm onSave={handleSave} isLoading={isPending} />
        </div>
    );
};

export default AddHotel;
