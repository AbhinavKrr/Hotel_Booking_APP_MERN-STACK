import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const { register, formState: { errors }, watch, setValue } = useFormContext<HotelFormData>();
    const existingImageUrls = watch("imageUrls");

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, imageUrl: string) => {
        event.preventDefault();
        setValue("imageUrls", existingImageUrls.filter((url) => url !== imageUrl));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>

            <div className="border rounded-lg p-4 flex flex-col gap-4">
                {/* Display Existing Images */}
                {existingImageUrls && existingImageUrls.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {existingImageUrls.map((url) => (
                            <div key={url} className="relative group">
                                <img 
                                    src={url} 
                                    className="w-full aspect-square object-cover rounded-lg shadow-md"
                                    alt="Hotel"
                                />
                                <button 
                                    onClick={(event) => handleDelete(event, url)}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full opacity-90 hover:opacity-100 transition"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* File Input for New Images */}
                <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="w-full text-gray-700 font-normal border p-2 rounded-md"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length + (existingImageUrls?.length || 0);
                            if (totalLength === 0) {
                                return "At least one image must be added";
                            }
                            if (totalLength > 6) {
                                return "Total number of images cannot be more than 6";
                            }
                            return true;
                        }
                    })}
                />
            </div>

            {/* Display Error Messages */}
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold mt-2 block">
                    {errors.imageFiles.message}
                </span>
            )}
        </div>
    );
};

export default ImagesSection;
