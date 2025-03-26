import { HotelType } from "../../../backend/src/shared/types";

type Props = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
    hotel: HotelType;
};

const BookingDetailsSummary = ({ checkIn, checkOut, adultCount, childCount, numberOfNights, hotel }: Props) => {
    return (
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 bg-white shadow-md">
            <h2 className="text-xl font-bold text-gray-800">Your Booking Details</h2>

            <div className="border-b pb-2">
                <span className="text-gray-700">Location:</span>
                <div className="font-bold text-gray-900">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="text-gray-700">Check-In</span>
                    <div className="font-bold text-gray-900">{checkIn.toDateString()}</div>
                </div>
                <div>
                    <span className="text-gray-700">Check-Out</span>
                    <div className="font-bold text-gray-900">{checkOut.toDateString()}</div>
                </div>
            </div>

            <div className="border-t border-b py-2">
                <span className="text-gray-700">Total length of stay:</span>
                <div className="font-bold text-gray-900">{`${numberOfNights} night(s)`}</div>
            </div>

            <div>
                <span className="text-gray-700">Guests:</span>
                <div className="font-bold text-gray-900">
                    {adultCount} {adultCount > 1 ? "adults" : "adult"} & {childCount} {childCount > 1 ? "children" : "child"}
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsSummary;
