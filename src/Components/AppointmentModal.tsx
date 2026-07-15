import axios from "axios";
import { format } from "date-fns";
import type { RefObject } from "react";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
// import { WavesHorizontal } from "lucide-react";
type Data = {
    _id?: string
    name?: string
    clinicId?: string
    clinicName?: string
}

type AppointmentModalProps = {
    modalRef: RefObject<HTMLDialogElement | null>;
    data: Data | null
};

const AppointmentModal = ({ modalRef, data }: AppointmentModalProps) => {
    const { user, userLoading } = useAuth()
    console.log(data)
    // const navigate = useNavigate()
    const appointmentDetails = {
        doctorId: data?._id,
        doctorName: data?.name,
        clinicId: data?.clinicId,
        clinicName: data?.clinicName
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        modalRef.current?.close()
        const toastId = toast.loading("Appointment Submitting")
        const formData = Object.fromEntries(new FormData(e.currentTarget))
        formData.status = 'scheduled'
        formData.userEmail = user?.email || ""


        console.log({ ...formData, ...appointmentDetails })
        try {
            const { data: result } = await axios.post('http://localhost:8000/appointment', { ...formData, ...appointmentDetails })
            if (!result.insertedId) {
                // toast.error("Submit failed")
                throw new Error("Submit failed")
            }
            toast.dismiss(toastId)
            toast.success("Appointment Submitted")
            // navigate("/dashboard/my-appointments")
        }
        catch (error: any) {
            toast.dismiss(toastId)
            toast.error(error.message || 'Something went wrong')
        }

    }


    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-2xl text-gray-800 mb-6">
                    Book Appointment
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Patient Name
                        </label>
                        <input
                            required
                            name="patientName"
                            type="text"
                            placeholder="Enter patient name"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Patient Age
                            </label>
                            <input
                                required
                                name="patientAge"
                                type="number"
                                placeholder="Enter age"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-2">
                                Gender
                            </label>

                            <select
                                required
                                name="patientGender"
                                className="select w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none" defaultValue={"Select gender"}>
                                <option disabled>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>

                    </div>


                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>

                        <input
                            required
                            name="patientNumber"

                            type="tel"
                            placeholder="Enter phone number"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>


                    <div>
                        <label className="block font-medium text-gray-700 mb-2">
                            Preferred Appointment Date
                        </label>

                        <input
                            required
                            min={format(new Date(), "yyyy-MM-dd")}
                            type="date"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
                            name="appointmentDate"
                        />
                    </div>
                    <button
                        disabled={!user?.email || userLoading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition">
                        Confirm Appointment
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default AppointmentModal;