import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () =>{

    const { showToast, refetch } = useAppContext();

    const navigate = useNavigate();

    const location = useLocation();

    const { register, formState: {errors}, handleSubmit } = useForm<SignInFormData>();

    const mutation = useMutation({
         mutationFn: apiClient.login,
         onSuccess: async () => {
            showToast({message: "Sign in Successful!", type: "SUCCESS"});
            refetch();
            navigate(location.state?.from?.pathname || "/");
         },
         onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"});
         },
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

    return (
        <form className="flex flex-col gap-5 w-full max-w-xs sm:max-w-sm mx-auto p-4" onSubmit={onSubmit}>
            <h2 className="text-2xl sm:text-3xl font-bold text-center">Sign In</h2>

            <label className="text-gray-700 text-sm sm:text-base font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-2 px-3 text-sm sm:text-base font-normal" {...register("email", { required: "This field is required" })}></input>
                {errors.email && (<span className="text-red-500 text-xs">{errors.email.message}</span>)}
            </label>
            <label className="text-gray-700 text-sm sm:text-base font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full py-2 px-3 text-sm sm:text-base font-normal" {...register("password", { required: "This field is required", minLength: {value: 6, message: "Password must be at least 6 characters"} })}></input>
                {errors.password && (<span className="text-red-500 text-xs">{errors.password.message}</span>)}
            </label>
            <span className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-sm">
                    Not Registered? <Link className="underline text-blue-600" to="/register">Create an account here</Link>
                </span>
                <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-lg w-full sm:w-auto">
                    Login
                </button>
            </span>
        </form>
    )
}

export default SignIn;
