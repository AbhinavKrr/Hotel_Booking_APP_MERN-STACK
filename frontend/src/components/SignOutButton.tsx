import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useState } from "react";

const SignOutButton = () => {
    const { showToast, refetch } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    const mutation = useMutation({
        mutationFn: apiClient.signOut,
        onSuccess: () => {
            showToast({ message: "Signed Out!", type: "SUCCESS" });
            refetch();
            setIsLoading(false);
        },
        onError: (error: Error) => {
            showToast({ message: error.message || "An error occurred", type: "ERROR" });
            setIsLoading(false);
        }
    });

    const handleClick = () => {
        setIsLoading(true);
        mutation.mutate();
    };

    return (
        <button 
            onClick={handleClick} 
            disabled={isLoading}
            className={`px-3 py-2 font-bold rounded-md transition ${
                isLoading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-blue-600 hover:bg-gray-100"
            }`}
        >
            {isLoading ? "Signing Out..." : "Sign Out"}
        </button>
    );
};

export default SignOutButton;
