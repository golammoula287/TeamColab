// import React from "react"
// import { useForm } from "react-hook-form"
// import ModalWrapper from "./ModalWrapper"
// import { Dialog } from "@headlessui/react"
// import Textbox from "./Textbox"
// import Loading from "./Loader"
// import Button from "./Button"
// import { toast } from "sonner"
// import {
//     useCreateProspectMutation,
//     useUpdateProspectMutation,
// } from "../redux/slices/api/prospectApiSlice"

// const AddProspect = ({ open, setOpen, prospectData }) => {
//     const defaultValues = prospectData ?? {}

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm({ defaultValues })

//     const [createProspect, { isLoading: isCreating }] = useCreateProspectMutation()
//     const [updateProspect, { isLoading: isUpdating }] = useUpdateProspectMutation()

//     const handleOnSubmit = async (data) => {
//         try {
//             if (prospectData) {
//                 const { _id, ...updateData } = data
//                 await updateProspect({ id: _id, ...updateData }).unwrap()
//                 toast.success("Prospect updated successfully.")
//             } else {
//                 await createProspect(data).unwrap()
//                 toast.success("New prospect added successfully.")
//             }

//             setTimeout(() => {
//                 setOpen(false)
//             }, 1500)
//         } catch (error) {
//             toast.error(error?.data?.message || "Something went wrong.")
//         }
//     }

//     return (
//         <ModalWrapper open={open} setOpen={setOpen}>
//             <form onSubmit={handleSubmit(handleOnSubmit)}>
//                 <Dialog.Title className="text-base font-bold leading-6 text-gray-900 mb-4">
//                     {prospectData ? "UPDATE PROSPECT" : "ADD NEW PROSPECT"}
//                 </Dialog.Title>

//                 <div className="mt-2 flex flex-col gap-6">
//                     <Textbox
//                         placeholder="Full name"
//                         type="text"
//                         name="name"
//                         label="Full Name"
//                         className="w-full rounded"
//                         register={register("name", {
//                             required: "Full name is required!",
//                         })}
//                         error={errors.name?.message}
//                     />
//                     <Textbox
//                         placeholder="Company"
//                         type="text"
//                         name="company"
//                         label="Company"
//                         className="w-full rounded"
//                         register={register("company", {
//                             required: "Company name is required!",
//                         })}
//                         error={errors.company?.message}
//                     />
//                     <Textbox
//                         placeholder="Email Address"
//                         type="email"
//                         name="email"
//                         label="Email Address"
//                         className="w-full rounded"
//                         register={register("email", {
//                             required: "Email is required!",
//                         })}
//                         error={errors.email?.message}
//                     />
//                     <Textbox
//                         placeholder="Phone"
//                         type="text"
//                         name="phone"
//                         label="Phone Number"
//                         className="w-full rounded"
//                         register={register("phone", {
//                             required: "Phone number is required!",
//                         })}
//                         error={errors.phone?.message}
//                     />
//                     <Textbox
//                         placeholder="Status"
//                         type="text"
//                         name="status"
//                         label="Status"
//                         className="w-full rounded"
//                         register={register("status", {
//                             required: "Status is required!",
//                         })}
//                         error={errors.status?.message}
//                     />
//                 </div>

//                 {(isCreating || isUpdating) ? (
//                     <div className="py-5">
//                         <Loading />
//                     </div>
//                 ) : (
//                     <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
//                         <Button
//                             type="submit"
//                             className="bg-green-600 px-8 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto"
//                             label="Submit"
//                         />
//                         <Button
//                             type="button"
//                             className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
//                             onClick={() => setOpen(false)}
//                             label="Cancel"
//                         />
//                     </div>
//                 )}
//             </form>
//         </ModalWrapper>
//     )
// }

// export default AddProspect



import React from "react"
import { useForm } from "react-hook-form"
import ModalWrapper from "./ModalWrapper"
import { Dialog } from "@headlessui/react"
import Textbox from "./Textbox"
import Loading from "./Loader"
import Button from "./Button"
import { toast } from "sonner"
import {
    useCreateProspectMutation,
    useUpdateProspectMutation,
} from "../redux/slices/api/prospectApiSlice"

const AddProspect = ({ open, setOpen, prospectData }) => {
    const defaultValues = prospectData ?? {}

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues })

    const [createProspect, { isLoading: isCreating }] = useCreateProspectMutation()
    const [updateProspect, { isLoading: isUpdating }] = useUpdateProspectMutation()

    const handleOnSubmit = async (data) => {
        try {
            if (prospectData) {
                const { _id, ...updateData } = data
                await updateProspect({ id: _id, ...updateData }).unwrap()
                toast.success("Prospect updated successfully.")
            } else {
                await createProspect(data).unwrap()
                toast.success("New prospect added successfully.")
            }

            setTimeout(() => {
                setOpen(false)
            }, 1500)
        } catch (error) {
            toast.error(error?.data?.message || "Something went wrong.")
        }
    }

    return (
        <ModalWrapper open={open} setOpen={setOpen}>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <Dialog.Title className="text-base font-bold leading-6 text-gray-900 mb-4">
                    {prospectData ? "UPDATE PROSPECT" : "ADD NEW PROSPECT"}
                </Dialog.Title>

                <div className="mt-2 flex flex-col gap-6">
                    <Textbox
                        placeholder="Full name"
                        type="text"
                        name="name"
                        label="Full Name"
                        className="w-full rounded"
                        register={register("name", {
                            required: "Full name is required!",
                        })}
                        error={errors.name?.message}
                    />
                    <Textbox
                        placeholder="Company Name"
                        type="text"
                        name="companyName"
                        label="Company Name"
                        className="w-full rounded"
                        register={register("companyName", {
                            required: "Company name is required!",
                        })}
                        error={errors.companyName?.message}
                    />
                    <Textbox
                        placeholder="Email Address"
                        type="email"
                        name="email"
                        label="Email Address"
                        className="w-full rounded"
                        register={register("email", {
                            required: "Email is required!",
                        })}
                        error={errors.email?.message}
                    />
                    <Textbox
                        placeholder="Phone Number"
                        type="text"
                        name="number"
                        label="Phone Number"
                        className="w-full rounded"
                        register={register("number", {
                            required: "Phone number is required!",
                        })}
                        error={errors.number?.message}
                    />
                    <Textbox
                        placeholder="Brief description (optional)"
                        type="text"
                        name="description"
                        label="Description"
                        className="w-full rounded"
                        register={register("description")}
                        error={errors.description?.message}
                    />
                </div>

                {(isCreating || isUpdating) ? (
                    <div className="py-5">
                        <Loading />
                    </div>
                ) : (
                    <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
                        <Button
                            type="submit"
                            className="bg-green-600 px-8 text-sm font-semibold text-white hover:bg-green-700 sm:w-auto"
                            label="Submit"
                        />
                        <Button
                            type="button"
                            className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                            onClick={() => setOpen(false)}
                            label="Cancel"
                        />
                    </div>
                )}
            </form>
        </ModalWrapper>
    )
}

export default AddProspect

