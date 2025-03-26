import { hotelTypes } from "../config/hotels-options-config";

type Props = {
    selectedHotelTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-3">Hotel Type</h4>
            <div className="flex flex-col gap-3">
                {hotelTypes.map((hotelType) => (
                    <label key={hotelType} className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="rounded accent-blue-600 h-4 w-4" 
                            value={hotelType} 
                            checked={selectedHotelTypes.includes(hotelType)}
                            onChange={onChange} 
                        />
                        <span className="text-sm text-gray-800 leading-tight">{hotelType}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default HotelTypesFilter;
