import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
            
            <label className="text-gray-700 text-sm font-bold">
                Name
                <input 
                    type="text" 
                    className="border rounded w-full py-2 px-3 font-normal focus:ring-2 focus:ring-blue-500" 
                    {...register("name", { required: "This field is required" })}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-gray-700 text-sm font-bold">
                    City
                    <input 
                        type="text" 
                        className="border rounded w-full py-2 px-3 font-normal focus:ring-2 focus:ring-blue-500" 
                        {...register("city", { required: "This field is required" })}
                    />
                    {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                </label>

                <label className="text-gray-700 text-sm font-bold">
                    Country
                    <input 
                        type="text" 
                        className="border rounded w-full py-2 px-3 font-normal focus:ring-2 focus:ring-blue-500" 
                        {...register("country", { required: "This field is required" })}
                    />
                    {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bold">
                Description
                <textarea 
                    rows={6} 
                    className="border rounded w-full py-2 px-3 font-normal focus:ring-2 focus:ring-blue-500 resize-none" 
                    {...register("description", { required: "This field is required" })}
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-gray-700 text-sm font-bold">
                    Price Per Night
                    <input 
                        type="number" 
                        min={1} 
                        className="border rounded w-full py-2 px-3 font-normal focus:ring-2 focus:ring-blue-500" 
                        {...register("pricePerNight", { required: "This field is required" })}
                    />
                    {errors.pricePerNight && <span className="text-red-500 text-sm">{errors.pricePerNight.message}</span>}
                </label>

                <label className="text-gray-700 text-sm font-bold">
                    Star Rating
                    <select 
                        {...register("starRating", { required: "This field is required" })} 
                        className="border rounded w-full p-2 text-gray-700 font-normal focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" className="text-sm font-bold">
                            Select a Rating
                        </option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    {errors.starRating && <span className="text-red-500 text-sm">{errors.starRating.message}</span>}
                </label>
            </div>
        </div>
    );
};

export default DetailsSection;
