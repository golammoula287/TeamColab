import React, { useState } from "react"
import Title from "../components/Title"
import Button from "../components/Button"
import { IoMdAdd } from "react-icons/io"
import { getInitials } from "../utils"
import AddClient from "../components/AddClient"
import ConfirmatioDialog from "../components/Dialogs"
import {
    useGetClientsQuery,
    useDeleteClientMutation,
} from "../redux/slices/api/clientApiSlice"
import { toast } from "sonner"

// View Modal Component
const ClientDetailsModal = ({ open, onClose, client }) => {
    if (!open || !client) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                >
                    &times;
                </button>
                <h2 className="text-lg font-semibold mb-4">Client Details</h2>
                <div className="space-y-2">
                    <p><strong>Name:</strong> {client.name}</p>
                    <p><strong>Company:</strong> {client.companyName}</p>
                    <p><strong>Email:</strong> {client.email}</p>
                    <p><strong>Phone:</strong> {client.number || "N/A"}</p>
                    <p><strong>Description:</strong> {client.description || "N/A"}</p>
                    <p><strong>WhatsApp:</strong> {client.whatsapp ? "Yes" : "No"}</p>
                </div>
            </div>
        </div>
    )
}

const Clients = () => {
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [selected, setSelected] = useState(null)
    const [viewClient, setViewClient] = useState(null)

    const { data, refetch } = useGetClientsQuery()
    const [deleteClient] = useDeleteClientMutation()

    const handleDelete = async () => {
        try {
            await deleteClient(selected._id).unwrap()
            toast.success("Deleted client successfully.")
            setSelected(null)
            setOpenDialog(false)
            refetch()
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    }

    const TableHeader = () => (
        <thead className="border-b border-gray-300">
            <tr className="text-black text-left">
                <th className="py-2">Name</th>
                <th className="py-2">Company</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Description</th>
                <th className="py-2">WhatsApp</th>
                <th className="py-2 text-right">Actions</th>
            </tr>
        </thead>
    )

    const TableRow = ({ client }) => (
        <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
            <td className="p-2 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-green-700">
                    {getInitials(client.name)}
                </div>
                {client.name}
            </td>
            <td className="p-2">{client.companyName}</td>
            <td className="p-2">{client.email}</td>
            <td className="p-2">{client.number || "N/A"}</td>
            <td className="p-2">{client.description || "N/A"}</td>
            <td className="p-2">{client.whatsapp ? "Yes" : "No"}</td>
            <td className="p-2 flex gap-3 justify-end flex-wrap">
                <Button
                    label="View"
                    type="button"
                    className="text-green-600"
                    onClick={() => setViewClient(client)}
                />
                <Button
                    label="Edit"
                    type="button"
                    className="text-blue-600"
                    onClick={() => {
                        setSelected(client)
                        setOpen(true)
                    }}
                />
                <Button
                    label="Delete"
                    type="button"
                    className="text-red-600"
                    onClick={() => {
                        setSelected(client)
                        setOpenDialog(true)
                    }}
                />
            </td>
        </tr>
    )

    return (
        <>
            <div className="w-full md:px-1 px-0 mb-6">
                <div className="flex items-center justify-between mb-8">
                    <Title title="Clients" />
                    <Button
                        label="Add New Client"
                        icon={<IoMdAdd className="text-lg" />}
                        className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
                        onClick={() => {
                            setSelected(null)
                            setOpen(true)
                        }}
                    />
                </div>

                <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
                    <div className="overflow-x-auto">
                        <table className="w-full mb-5">
                            <TableHeader />
                            <tbody>
                                {data?.map((client, index) => (
                                    <TableRow key={index} client={client} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AddClient
                open={open}
                setOpen={setOpen}
                clientData={selected}
                key={selected?._id || "new"}
                onSuccess={() => window.location.reload()}
            />

            <ConfirmatioDialog
                open={openDialog}
                setOpen={setOpenDialog}
                onClick={handleDelete}
            />

            <ClientDetailsModal
                open={!!viewClient}
                client={viewClient}
                onClose={() => setViewClient(null)}
            />
        </>
    )
}

export default Clients
