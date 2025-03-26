import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const navigate = useNavigate();
    const { showToast, refetch } = useAppContext();
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    const mutation = useMutation({
        mutationFn: apiClient.register,
        onSuccess: () => {
            showToast({ message: "Registration Success!", type: "SUCCESS" });
            refetch();
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form className="flex flex-col gap-4 sm:gap-6 w-full max-w-md mx-auto p-4 sm:p-6" onSubmit={onSubmit}>
            <h2 className="text-2xl sm:text-3xl font-bold text-center">Create an Account</h2>

            {/* Name Fields */}
            <div className="flex flex-wrap gap-3 sm:gap-5">
                <label className="text-gray-700 text-base sm:text-lg font-bold flex-1">
                    First Name
                    <input 
                        className="border rounded w-full p-2 sm:py-3 sm:px-4 font-normal"
                        {...register("firstName", { required: "This field is required" })} 
                    />
                    {errors.firstName && (<span className="text-red-500">{errors.firstName.message}</span>)}
                </label>
                <label className="text-gray-700 text-base sm:text-lg font-bold flex-1">
                    Last Name
                    <input 
                        className="border rounded w-full p-2 sm:py-3 sm:px-4 font-normal" 
                        {...register("lastName", { required: "This field is required" })} 
                    />
                    {errors.lastName && (<span className="text-red-500">{errors.lastName.message}</span>)}
                </label>
            </div>

            {/* Email Field */}
            <label className="text-gray-700 text-base sm:text-lg font-bold">
                Email
                <input 
                    type="email" 
                    className="border rounded w-full p-2 sm:py-3 sm:px-4 font-normal" 
                    {...register("email", { required: "This field is required" })} 
                />
                {errors.email && (<span className="text-red-500">{errors.email.message}</span>)}
            </label>

            {/* Password Fields */}
            <label className="text-gray-700 text-base sm:text-lg font-bold">
                Password
                <input 
                    type="password" 
                    className="border rounded w-full p-2 sm:py-3 sm:px-4 font-normal"
                    {...register("password", { required: "This field is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} 
                />
                {errors.password && (<span className="text-red-500">{errors.password.message}</span>)}
            </label>
            <label className="text-gray-700 text-base sm:text-lg font-bold">
                Confirm Password
                <input 
                    type="password" 
                    className="border rounded w-full p-2 sm:py-3 sm:px-4 font-normal" 
                    {...register("confirmPassword", { validate: (val) => {
                        if (!val) {
                            return "This field is required";
                        } else if (watch("password") !== val) {
                            return "Your passwords do not match";
                        }
                    } })} 
                />
                {errors.confirmPassword && (<span className="text-red-500">{errors.confirmPassword.message}</span>)}
            </label>

            {/* Submit Button */}
            <span>
                <button type="submit" className="bg-blue-600 text-white p-3 sm:p-4 font-bold hover:bg-blue-500 text-lg sm:text-xl w-full sm:w-auto">
                    Create Account
                </button>
            </span>
        </form>
    );
};

export default Register;
