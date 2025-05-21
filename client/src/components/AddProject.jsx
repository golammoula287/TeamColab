


import React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import ModalWrapper from "./ModalWrapper"
import { Dialog } from "@headlessui/react"
import Textbox from "./Textbox"
import Loading from "./Loader"
import Button from "./Button"
import { toast } from "sonner"
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../redux/slices/api/projectApiSlice"
import { useGetClientsQuery } from "../redux/slices/api/clientApiSlice"

const AddProject = ({ open, setOpen, projectData }) => {
  const defaultValues = projectData ?? { costs: [] }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "costs",
  })

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation()
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation()

  const {
    data: clientResponse,
    isLoading: isClientLoading,
    error: clientError,
  } = useGetClientsQuery()

  const clients = Array.isArray(clientResponse?.data)
    ? clientResponse.data
    : clientResponse

  const handleOnSubmit = async (data) => {
    try {
      if (projectData) {
        const { _id, ...updateData } = data
        await updateProject({ id: _id, ...updateData }).unwrap()
        toast.success("Project updated successfully.")
      } else {
        await createProject(data).unwrap()
        toast.success("New project added successfully.")
      }

      setTimeout(() => {
        setOpen(false)
        window.location.reload()
      }, 1500)
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong.")
    }
  }

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title className="text-base font-bold leading-6 text-gray-900 mb-4">
          {projectData ? "UPDATE PROJECT" : "ADD NEW PROJECT"}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            label="Project Name"
            name="projectName"
            type="text"
            placeholder="Enter project name"
            className="w-full"
            register={register("projectName", {
              required: "Project name is required!",
            })}
            error={errors.projectName?.message}
          />

          <Textbox
            label="Invoice ID"
            name="invoiceId"
            type="text"
            placeholder="Invoice ID"
            className="w-full"
            register={register("invoiceId", {
              required: "Invoice ID is required!",
            })}
            error={errors.invoiceId?.message}
          />

          <Textbox
            label="Rate"
            name="rate"
            type="number"
            placeholder="Rate"
            className="w-full"
            register={register("rate", {
              required: "Rate is required!",
              valueAsNumber: true,
            })}
            error={errors.rate?.message}
          />

          {/* Select Client Dropdown */}
          <div className="flex flex-col w-full">
            <label htmlFor="client" className="mb-1 font-semibold text-gray-700">
              Select Client (Optional)
            </label>
            <select
              id="client"
              className={`w-full rounded border border-gray-300 px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${errors.client ? "border-red-500" : ""}`}
              {...register("client")}
              defaultValue=""
            >
              <option value="">-- Select a Client  --</option>
              {isClientLoading ? (
                <option disabled>Loading clients...</option>
              ) : clientError ? (
                <option disabled>Error loading clients</option>
              ) : (
                clients?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} {c.email ? `(${c.email})` : ""}
                  </option>
                ))
              )}
            </select>
            {errors.client && (
              <p className="mt-1 text-sm text-red-500">
                {errors.client.message}
              </p>
            )}
          </div>

          {/* Cost Section */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Cost Details
            </label>
            {fields.map((field, index) => (
              <div key={field.id} className="mb-3 flex items-center gap-2">
                <Textbox
                  label="Description"
                  name={`costs[${index}].description`}
                  type="text"
                  placeholder="E.g., Hosting, Domain"
                  className="w-full"
                  register={register(`costs.${index}.description`, {
                    required: "Description is required",
                  })}
                  error={errors?.costs?.[index]?.description?.message}
                />
                <Textbox
                  label="Amount"
                  name={`costs[${index}].amount`}
                  type="number"
                  placeholder="Amount"
                  className="w-1/2"
                  register={register(`costs.${index}.amount`, {
                    required: "Amount is required",
                    valueAsNumber: true,
                  })}
                  error={errors?.costs?.[index]?.amount?.message}
                />
                <Button
                  type="button"
                  className="bg-red-500 px-2 text-white"
                  label="X"
                  onClick={() => remove(index)}
                />
              </div>
            ))}
            <Button
              type="button"
              className="bg-blue-500 text-white mt-2"
              label="Add Cost"
              onClick={() => append({ description: "", amount: 0 })}
            />
          </div>
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

export default AddProject
