import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>

            <div className="grid grid-cols-2 gap-5 bg-gray-200 p-4 rounded-lg shadow-sm">
                {/* Adults Input */}
                <label className="text-gray-700 text-sm font-semibold flex flex-col">
                    Adults
                    <input 
                        type="number" 
                        className="border rounded-lg w-full py-2 px-3 font-normal bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                        min={1} 
                        {...register("adultCount", { required: "This field is required" })} 
                    />
                    {errors.adultCount && (
                        <span className="text-red-500 text-xs font-bold mt-1">
                            {errors.adultCount.message}
                        </span>
                    )}
                </label>

                {/* Children Input */}
                <label className="text-gray-700 text-sm font-semibold flex flex-col">
                    Children
                    <input 
                        type="number" 
                        className="border rounded-lg w-full py-2 px-3 font-normal bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                        min={0} 
                        {...register("childCount", { required: "This field is required" })} 
                    />
                    {errors.childCount && (
                        <span className="text-red-500 text-xs font-bold mt-1">
                            {errors.childCount.message}
                        </span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default GuestsSection;
