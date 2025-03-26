import { useQuery } from '@tanstack/react-query';
import * as apiClient from '../api-client';
import BookingForm from '../forms/BookingForm/BookingForm';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookingDeatilsSummary from '../components/BookingDeatilsSummary';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';

const Booking = () => {
    const { stripePromise } = useAppContext();
    const search = useSearchContext();
    const { hotelId } = useParams();
    const [numberOfNights, setNumberOfNights] = useState<number>(0);

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
            setNumberOfNights(Math.ceil(nights));
        }
    }, [search.checkIn, search.checkOut]);

    const { data: paymentIntentData, isLoading: isPaymentLoading } = useQuery({
        queryKey: ["createPaymentIntent", hotelId, numberOfNights],
        queryFn: () => apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()),
        enabled: !!hotelId && numberOfNights > 0,
    });

    const { data: hotel, isLoading: isHotelLoading } = useQuery({
        queryKey: ["fetchHotelById", hotelId],
        queryFn: () => apiClient.fetchHotelById(hotelId as string),
        enabled: !!hotelId,
    });

    const { data: currentUser, isLoading: isUserLoading } = useQuery({
        queryKey: ["fetchCurrentUser"],
        queryFn: apiClient.fetchCurrentUser,
    });

    if (isHotelLoading || isUserLoading) {
        return <span className="text-xl font-bold text-center block">Loading...</span>;
    }

    if (!hotel) {
        return <span className="text-xl font-bold text-red-500">Hotel not found.</span>;
    }

    return (
        <div className="space-y-6 p-4 max-w-4xl mx-auto">
            {/* Booking Details Summary */}
            <BookingDeatilsSummary
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNights={numberOfNights}
                hotel={hotel}
            />

            {/* Payment Form - Shown only when data is available */}
            {currentUser && paymentIntentData && !isPaymentLoading && (
                <Elements stripe={stripePromise} options={{ clientSecret: paymentIntentData.clientSecret }}>
                    <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
                </Elements>
            )}
        </div>
    );
};

export default Booking;
