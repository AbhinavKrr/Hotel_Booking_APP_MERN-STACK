import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotels-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 bg-gray-100 p-4 rounded-lg shadow-sm">
                {hotelFacilities.map((facility) => (
                    <label key={facility} className="text-sm flex items-center gap-2 text-gray-700">
                        <input 
                            type="checkbox" 
                            value={facility} 
                            className="w-4 h-4 accent-blue-600"
                            {...register("facilities", {
                                validate: (facilities) =>
                                    facilities?.length > 0 || "At least one facility is required",
                            })} 
                        />
                        {facility}
                    </label>
                ))}
            </div>

            {errors.facilities && (
                <span className="text-red-500 text-xs font-bold mt-2 block">
                    {errors.facilities.message}
                </span>
            )}
        </div>
    );
};

export default FacilitiesSection;
