import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
    const navigate = useNavigate();
    const search = useSearchContext();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchvalues(destination, checkIn, checkOut, adultCount, childCount);
        navigate('/search');
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <form 
            onSubmit={handleSubmit} 
            className="mt-3 p-4 bg-orange-400 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 items-center"
        >
            {/* Destination Input */}
            <div className="flex items-center bg-white p-2 rounded-md border border-gray-300 w-full">
                <MdTravelExplore size={22} className="text-gray-500 mr-2"/>
                <input 
                    placeholder="Next Destination?" 
                    className="text-md w-full focus:outline-none" 
                    value={destination} 
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>

            {/* Adults & Children Input */}
            <div className="flex flex-wrap bg-white p-2 gap-2 rounded-md border border-gray-300 w-full">
                <label className="flex-1 flex items-center text-gray-700 text-sm">
                    Adults: 
                    <input 
                        className="w-full ml-2 p-1 border border-gray-300 rounded-md focus:outline-none text-center font-bold" 
                        type="number" 
                        min={1} 
                        max={20} 
                        value={adultCount} 
                        onChange={(event) => setAdultCount(Number(event.target.value))}
                    />
                </label>
                <label className="flex-1 flex items-center text-gray-700 text-sm">
                    Children: 
                    <input 
                        className="w-full ml-2 p-1 border border-gray-300 rounded-md focus:outline-none text-center font-bold" 
                        type="number" 
                        min={0} 
                        max={20} 
                        value={childCount} 
                        onChange={(event) => setChildCount(Number(event.target.value))}
                    />
                </label>
            </div>

            {/* Check-In Date Picker */}
            <div className="w-full">
                <DatePicker 
                    selected={checkIn} 
                    onChange={(date) => setCheckIn(date as Date)} 
                    selectsStart 
                    startDate={checkIn} 
                    endDate={checkOut} 
                    minDate={minDate} 
                    maxDate={maxDate} 
                    placeholderText="Check-In Date" 
                    className="w-full bg-white p-2 rounded-md border border-gray-300 focus:outline-none" 
                />
            </div>

            {/* Check-Out Date Picker */}
            <div className="w-full">
                <DatePicker 
                    selected={checkOut} 
                    onChange={(date) => setCheckOut(date as Date)} 
                    selectsEnd 
                    startDate={checkIn} 
                    endDate={checkOut} 
                    minDate={checkIn} 
                    maxDate={maxDate} 
                    placeholderText="Check-Out Date" 
                    className="w-full bg-white p-2 rounded-md border border-gray-300 focus:outline-none" 
                />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 w-full">
                <button type="submit" className="w-2/3 bg-blue-600 text-white h-full p-2 rounded-md font-bold text-lg hover:bg-blue-500">
                    Search
                </button>
                <button 
                    type="button" 
                    className="w-1/3 bg-red-600 text-white h-full p-2 rounded-md font-bold text-lg hover:bg-red-500"
                    onClick={() => {
                        setDestination("");
                        setCheckIn(new Date());
                        setCheckOut(new Date());
                        setAdultCount(1);
                        setChildCount(0);
                    }}
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default Searchbar;
