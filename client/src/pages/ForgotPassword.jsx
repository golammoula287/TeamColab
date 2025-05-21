import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useForgotPasswordMutation } from "../redux/slices/api/authApiSlice"
import Textbox from "../components/Textbox"
import Button from "../components/Button"
import Loading from "../components/Loader"

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

    const submitHandler = async (data) => {
        try {
            const res = await forgotPassword(data).unwrap()
            toast.success(res.message)
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="bg-white p-10 rounded-lg shadow-lg w-[350px] flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold text-center text-blue-700">
                    Forgot Password
                </h2>

                <Textbox
                    type="email"
                    name="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    register={register("email", {
                        required: "Email is required",
                    })}
                    error={errors.email?.message}
                />

                {isLoading ? (
                    <Loading />
                ) : (
                    <Button
                        type="submit"
                        label="Send Reset Link"
                        className="w-full h-10 bg-blue-700 text-white rounded-full"
                    />
                )}
            </form>
        </div>

       

    )
}

export default ForgotPassword
