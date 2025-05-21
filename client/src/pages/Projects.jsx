import React, { useState, useEffect } from "react"
import Title from "../components/Title"
import Button from "../components/Button"
import { IoMdAdd } from "react-icons/io"
import AddProject from "../components/AddProject"
import ConfirmatioDialog from "../components/Dialogs"
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useAddCostToProjectMutation,
} from "../redux/slices/api/projectApiSlice"
import { toast } from "sonner"
import {
    useGetProspectsQuery,
    useDeleteProspectMutation,
} from "../redux/slices/api/prospectApiSlice"

// Cost Modal
const AddCostModal = ({ open, onClose, onSubmit, projectName }) => {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = () => {
    if (!description || !amount) {
      toast.error("Please fill in all fields")
      return
    }
    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount)) {
      toast.error("Amount must be a number")
      return
    }
    onSubmit({ description, amount: parsedAmount })
    setDescription("")
    setAmount("")
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">
          Add Cost to <span className="text-blue-600">{projectName}</span>
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-end">
            <Button label="Add Cost" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

// View Modal
const ProjectDetailsModal = ({ open, onClose, project }) => {
  if (!open || !project) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Project Details</h2>
        <div className="space-y-2 text-gray-700">
          <p><strong>Name:</strong> {project.projectName}</p>
          <p><strong>Invoice ID:</strong> {project.invoiceId}</p>
          <p><strong>Rate:</strong> ${project.rate}</p>
          <p><strong>Profit:</strong> ${project.profit}</p>
          <p><strong>Last Updated:</strong> {new Date(project.updatedAt).toLocaleString()}</p>
          <div>
            <strong>Costs:</strong>
            <ul className="list-disc ml-5 space-y-1">
              {project.costs?.map((cost, index) => (
                <li key={index}>
                  <span className="font-medium">{cost.description}</span>: ${cost.amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [selected, setSelected] = useState(null)
  const [viewProject, setViewProject] = useState(null)
  const [addCostProject, setAddCostProject] = useState(null)

  const { data, refetch } = useGetProjectsQuery()
  const [deleteProject] = useDeleteProjectMutation()
  const [addCost] = useAddCostToProjectMutation()

  const handleDelete = async () => {
    try {
      await deleteProject(selected._id).unwrap()
      toast.success("Project deleted successfully.")
      setSelected(null)
      setTimeout(() => setOpenDialog(false), 100)
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.message)
    }
  }

  const handleSubmitCost = async (costData) => {
    try {
      await addCost({ id: addCostProject._id, cost: costData }).unwrap()
      toast.success("Cost added successfully.")
      setAddCostProject(null)
      refetch()
    } catch (err) {
      toast.error(err?.data?.message || err.message)
    }
  }

  const TableHeader = () => (
    <thead className="border-b border-gray-300 text-left text-black">
      <tr>
        <th className="py-2">Name</th>
        <th className="py-2">Invoice ID</th>
        <th className="py-2">Rate</th>
        <th className="py-2">Profit</th>
        <th className="py-2">Updated</th>
        <th className="py-2 text-right">Actions</th>
      </tr>
    </thead>
  )

  const TableRow = ({ project }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-100">
      <td className="p-2">{project.projectName}</td>
      <td className="p-2">{project.invoiceId}</td>
      <td className="p-2">${project.rate}</td>
      <td className="p-2">${project.profit}</td>
      <td className="p-2">{new Date(project.updatedAt).toLocaleDateString()}</td>
      <td className="p-2 flex justify-end gap-3 flex-wrap">
        <Button
          label="View"
          className="text-green-600"
          onClick={() => setViewProject(project)}
        />
        <Button
          label="Add Cost"
          className="text-yellow-600"
          onClick={() => setAddCostProject(project)}
        />
        <Button
          label="Edit"
          className="text-blue-600"
          onClick={() => {
            setSelected(project)
            setOpen(true)
          }}
        />
        <Button
          label="Delete"
          className="text-red-600"
          onClick={() => {
            setSelected(project)
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
          <Title title="Projects" />
          <Button
            label="Add New Project"
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
                {data?.map((project) => (
                  <TableRow key={project._id} project={project} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddProject
        open={open}
        setOpen={setOpen}
        projectData={selected}
        key={selected?._id || "new"}
        onSuccess={refetch}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={handleDelete}
      />

      <ProjectDetailsModal
        open={!!viewProject}
        project={viewProject}
        onClose={() => setViewProject(null)}
      />

      <AddCostModal
        open={!!addCostProject}
        onClose={() => setAddCostProject(null)}
        onSubmit={handleSubmitCost}
        projectName={addCostProject?.projectName}
      />
    </>
  )
}

export default Projects



