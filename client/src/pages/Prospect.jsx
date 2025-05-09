

// import React, { useState } from "react"
// import Title from "../components/Title"
// import Button from "../components/Button"
// import { IoMdAdd } from "react-icons/io"
// import { getInitials } from "../utils"
// import AddProspect from "../components/AddProspect"
// import ConfirmatioDialog from "../components/Dialogs"
// import {
//     useGetProspectsQuery,
//     useDeleteProspectMutation,
// } from "../redux/slices/api/prospectApiSlice"
// import { toast } from "sonner"

// const Prospects = () => {
//     const [open, setOpen] = useState(false)
//     const [openDialog, setOpenDialog] = useState(false)
//     const [selected, setSelected] = useState(null)

//     const { data, refetch } = useGetProspectsQuery()
//     const [deleteProspect] = useDeleteProspectMutation()

//     const handleDelete = async () => {
//         try {
//             await deleteProspect(selected._id).unwrap()
//             toast.success("Deleted prospect successfully.")
//             setSelected(null)
//             setTimeout(() => {
//                 setOpenDialog(false)
//             }, 100)
//             refetch()
//         } catch (err) {
//             toast.error(err?.data?.message || err.message)
//         }
//     }

//     const TableHeader = () => (
//         <thead className="border-b border-gray-300">
//             <tr className="text-black text-left">
//                 <th className="py-2">Name</th>
//                 <th className="py-2">Company</th>
//                 <th className="py-2">Email</th>
//                 <th className="py-2">Phone</th>
//                 <th className="py-2">Description</th>
//             </tr>
//         </thead>
//     )

//     const TableRow = ({ prospect }) => (
//         <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
//             <td className="p-2 flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-green-700">
//                     {getInitials(prospect.name)}
//                 </div>
//                 {prospect.name}
//             </td>
//             <td className="p-2">{prospect.companyName}</td>
//             <td className="p-2">{prospect.email}</td>
//             <td className="p-2">{prospect.number || "N/A"}</td>
//             <td className="p-2">{prospect.description || "N/A"}</td>
//             <td className="p-2 flex gap-3 justify-end">
//                 <Button
//                     label="Edit"
//                     type="button"
//                     className="text-blue-600"
//                     onClick={() => {
//                         setSelected(prospect)
//                         setOpen(true)
//                     }}
//                 />
//                 <Button
//                     label="Delete"
//                     type="button"
//                     className="text-red-600"
//                     onClick={() => {
//                         setSelected(prospect)
//                         setOpenDialog(true)
//                     }}
//                 />
//             </td>
//         </tr>
//     )

//     return (
//         <>
//             <div className="w-full md:px-1 px-0 mb-6">
//                 <div className="flex items-center justify-between mb-8">
//                     <Title title="Prospects" />
//                     <Button
//                         label="Add New Prospect"
//                         icon={<IoMdAdd className="text-lg" />}
//                         className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
//                         onClick={() => {
//                             setSelected(null)
//                             setOpen(true)
//                         }}
//                     />
//                 </div>

//                 <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
//                     <div className="overflow-x-auto">
//                         <table className="w-full mb-5">
//                             <TableHeader />
//                             <tbody>
//                                 {data?.map((prospect, index) => (
//                                     <TableRow key={index} prospect={prospect} />
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             <AddProspect
//                 open={open}
//                 setOpen={setOpen}
//                 prospectData={selected}
//                 key={selected?._id || "new"}
//             />

//             <ConfirmatioDialog
//                 open={openDialog}
//                 setOpen={setOpenDialog}
//                 onClick={handleDelete}
//             />
//         </>
//     )
// }

// export default Prospects



import React, { useState } from "react"
import Title from "../components/Title"
import Button from "../components/Button"
import { IoMdAdd } from "react-icons/io"
import { getInitials } from "../utils"
import AddProspect from "../components/AddProspect"
import ConfirmatioDialog from "../components/Dialogs"
import {
    useGetProspectsQuery,
    useDeleteProspectMutation,
} from "../redux/slices/api/prospectApiSlice"
import { toast } from "sonner"

// View Modal Component
const ProspectDetailsModal = ({ open, onClose, prospect }) => {
    if (!open || !prospect) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                >
                    &times;
                </button>
                <h2 className="text-lg font-semibold mb-4">Prospect Details</h2>
                <div className="space-y-2">
                    <p><strong>Name:</strong> {prospect.name}</p>
                    <p><strong>Company:</strong> {prospect.companyName}</p>
                    <p><strong>Email:</strong> {prospect.email}</p>
                    <p><strong>Phone:</strong> {prospect.number || "N/A"}</p>
                    <p><strong>Description:</strong> {prospect.description || "N/A"}</p>
                    {/* Add more fields if needed */}
                </div>
            </div>
        </div>
    )
}

const Prospects = () => {
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [selected, setSelected] = useState(null)
    const [viewProspect, setViewProspect] = useState(null)

    const { data, refetch } = useGetProspectsQuery()
    const [deleteProspect] = useDeleteProspectMutation()

    const handleDelete = async () => {
        try {
            await deleteProspect(selected._id).unwrap()
            toast.success("Deleted prospect successfully.")
            setSelected(null)
            setTimeout(() => {
                setOpenDialog(false)
            }, 100)
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
                
            </tr>
        </thead>
    )

    const TableRow = ({ prospect }) => (
        <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
            <td className="p-2 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-green-700">
                    {getInitials(prospect.name)}
                </div>
                {prospect.name}
            </td>
            <td className="p-2">{prospect.companyName}</td>
            <td className="p-2">{prospect.email}</td>
            <td className="p-2">{prospect.number || "N/A"}</td>
            <td className="p-2">{prospect.description || "N/A"}</td>
            <td className="p-2 flex gap-3 justify-end flex-wrap">
                <Button
                    label="View"
                    type="button"
                    className="text-green-600"
                    onClick={() => setViewProspect(prospect)}
                />
                <Button
                    label="Edit"
                    type="button"
                    className="text-blue-600"
                    onClick={() => {
                        setSelected(prospect)
                        setOpen(true)
                    }}
                />
                <Button
                    label="Delete"
                    type="button"
                    className="text-red-600"
                    onClick={() => {
                        setSelected(prospect)
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
                    <Title title="Prospects" />
                    <Button
                        label="Add New Prospect"
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
                                {data?.map((prospect, index) => (
                                    <TableRow key={index} prospect={prospect} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AddProspect
                open={open}
                setOpen={setOpen}
                prospectData={selected}
                key={selected?._id || "new"}
            />

            <ConfirmatioDialog
                open={openDialog}
                setOpen={setOpenDialog}
                onClick={handleDelete}
            />

            {/* View Prospect Modal */}
            <ProspectDetailsModal
                open={!!viewProspect}
                prospect={viewProspect}
                onClose={() => setViewProspect(null)}
            />
        </>
    )
}

export default Prospects
