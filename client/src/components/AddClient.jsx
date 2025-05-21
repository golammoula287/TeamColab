import React from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { toast } from "sonner";
import {
  useCreateClientMutation,
  useUpdateClientMutation,
} from "../redux/slices/api/clientApiSlice";

const AddClient = ({ open, setOpen, clientData }) => {
  const defaultValues = clientData ?? {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [createClient, { isLoading: isCreating }] = useCreateClientMutation();
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();

  const handleOnSubmit = async (data) => {
    try {
      if (clientData) {
        const { _id, ...updateData } = data;
        await updateClient({ id: _id, ...updateData }).unwrap();
        toast.success("Client updated successfully.");
      } else {
        await createClient(data).unwrap();
        toast.success("New client added successfully.");
      }

      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title className="text-base font-bold leading-6 text-gray-900 mb-4">
          {clientData ? "UPDATE CLIENT" : "ADD NEW CLIENT"}
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
            register={register("companyName")}
          />
          <Textbox
            placeholder="Email Address"
            type="email"
            name="email"
            label="Email Address"
            className="w-full rounded"
            register={register("email")}
          />
          <Textbox
            placeholder="Phone Number"
            type="text"
            name="number"
            label="Phone Number"
            className="w-full rounded"
            register={register("number")}
          />
          <Textbox
            placeholder="Brief description (optional)"
            type="text"
            name="description"
            label="Description"
            className="w-full rounded"
            register={register("description")}
          />

          {/* ✅ WhatsApp Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="whatsapp"
              {...register("whatsapp")}
              className="w-4 h-4"
              defaultChecked={defaultValues.whatsapp}
            />
            <label htmlFor="whatsapp" className="text-sm text-gray-700">
              WhatsApp?
            </label>
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
  );
};

export default AddClient;
