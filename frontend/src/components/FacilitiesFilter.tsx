import { hotelFacilities } from "../config/hotels-options-config";

type Props = {
    selectedFacilitiesTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilitiesTypes, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold text-gray-800 mb-3">Facilities</h4>
            <div className="flex flex-col gap-2">
                {hotelFacilities.map((facility) => (
                    <label key={facility} className="flex items-center space-x-2 text-gray-700">
                        <input 
                            type="checkbox" 
                            className="rounded accent-blue-600" 
                            value={facility} 
                            checked={selectedFacilitiesTypes.includes(facility)}
                            onChange={onChange} 
                        />
                        <span>{facility}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default FacilitiesFilter;
