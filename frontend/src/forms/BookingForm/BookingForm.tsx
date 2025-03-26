import { useForm } from "react-hook-form";
import { UserType, PaymentIntentResponse } from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
    currentUser: UserType;
    paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
    checkIn: string;
    checkOut: string;
    childCount: number;
    adultCount: number;
    hotelId: string;
    totalCost: number;
    paymentIntentId: string;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const search = useSearchContext();
    const { hotelId } = useParams();
    const { showToast } = useAppContext();

    const { mutate: bookRoom, isPending } = useMutation({
        mutationFn: apiClient.createRoomBooking,
        onSuccess: () => {
            showToast({ message: "Booking Saved!", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error Saving Booking!", type: "ERROR" });
        }
    });

    const { handleSubmit, register } = useForm<BookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            adultCount: search.adultCount,
            childCount: search.childCount,
            hotelId: hotelId,
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId
        }
    });

    const onSubmit = async (formData: BookingFormData) => {
        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement,
            }
        });

        if (result.paymentIntent?.status === "succeeded") {
            // Book the Room
            bookRoom({
                ...formData,
                paymentIntentId: result.paymentIntent.id
            });
        }
    };

    return (
        <form className="flex flex-col gap-6 rounded-lg border border-slate-300 p-5 shadow-md max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold text-gray-800 text-center">Confirm Your Details</h2>

            <div className="flex flex-col gap-4">
                {/* First Name */}
                <label className="text-gray-700 text-sm font-bold">
                    First Name
                    <input className="mt-1 w-full p-2 rounded-md bg-gray-100 text-gray-700 border focus:ring-2 focus:ring-blue-500" type="text" readOnly disabled {...register("firstName")} />
                </label>

                {/* Last Name */}
                <label className="text-gray-700 text-sm font-bold">
                    Last Name
                    <input className="mt-1 w-full p-2 rounded-md bg-gray-100 text-gray-700 border focus:ring-2 focus:ring-blue-500" type="text" readOnly disabled {...register("lastName")} />
                </label>

                {/* Email */}
                <label className="text-gray-700 text-sm font-bold">
                    Email
                    <input className="mt-1 w-full p-2 rounded-md bg-gray-100 text-gray-700 border focus:ring-2 focus:ring-blue-500" type="text" readOnly disabled {...register("email")} />
                </label>
            </div>

            {/* Price Summary */}
            <div className="bg-blue-100 p-4 rounded-md">
                <h3 className="text-xl font-semibold text-gray-800">Your Price Summary</h3>
                <div className="font-semibold text-lg text-blue-900">
                    Total Cost: ${paymentIntent.totalCost.toFixed(2)}
                </div>
                <span className="text-xs text-gray-600">Includes taxes and charges</span>
            </div>

            {/* Payment Details */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">Payment Details</h3>
                <CardElement id="payment-element" className="border rounded-md p-2 text-sm bg-white shadow-sm" />
            </div>

            {/* Submit Button */}
            <button 
                disabled={isPending}
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 font-bold rounded-md hover:bg-blue-500 text-lg disabled:bg-gray-500"
            >
                {isPending ? "Saving..." : "Confirm Booking"}
            </button>
        </form>
    );
};

export default BookingForm;
