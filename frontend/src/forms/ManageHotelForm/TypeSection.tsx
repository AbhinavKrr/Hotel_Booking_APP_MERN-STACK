import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotels-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
    const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
    const typeWatch = watch("type");

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Type</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {hotelTypes.map((type) => (
                    <label 
                        key={type} 
                        className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition 
                            ${typeWatch === type ? "bg-blue-500 text-white shadow-md" : "bg-gray-300 hover:bg-gray-400"}`}
                    >
                        <input 
                            type="radio" 
                            value={type} 
                            {...register("type", { required: "This field is required" })} 
                            className="hidden"
                        />
                        <span>{type}</span>
                    </label>
                ))}
            </div>

            {errors.type && (
                <span className="text-red-500 text-sm font-bold mt-2 block">
                    {errors.type.message}
                </span>
            )}
        </div>
    );
};

export default TypeSection;
