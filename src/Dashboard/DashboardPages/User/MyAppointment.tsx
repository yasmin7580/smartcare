// import React from 'react';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";
type Appointment = {
    _id: string;
    userEmail: string;
    clinicId: string;
    clinicName: string;
    doctorId: string;
    doctorName: string;
    patientName: string;
    patientAge: string;
    patientGender: "Male" | "Female" | "Other";
    patientNumber: string;
    appointmentDate: string;
    status: "scheduled" | "cancel" | "complete";
};
const MyAppointment = () => {
    const { user } = useAuth()

    const { data: appointments, isLoading, refetch } = useQuery({
        queryKey: ["my-appointments"],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/appointment?userEmail=${user?.email}`)
            return result.data
        },
        enabled: !!user

    })
    console.log(appointments)
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleCancel = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Canceling")
                const status = "cancel"
                try {
                    const { data: result } = await axios.patch(`http://localhost:8000/appointment?id=${id}&status=${status}`)
                    if (result.modifiedCount !== 1) {
                        throw new Error("Cancel failed")
                    }
                    await refetch()
                    toast.dismiss(toastId)
                    toast.success("Canceled")
                }
                catch (error: any) {
                    toast.dismiss(toastId)
                    toast.error(error.message || 'Something went wrong')
                }
            }
        });

    }

    const getRemainingDays = (date: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const appointment = new Date(date);
        appointment.setHours(0, 0, 0, 0);

        const diff =
            appointment.getTime() - today.getTime();

        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="space-y-6">

            {/* Desktop */}
            <div className="hidden lg:block overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-xl">

                <table className="table">

                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th className="py-5">Doctor</th>
                            <th>Patient</th>
                            <th>Appointment</th>
                            <th>Status</th>
                            <th>Remaining</th>
                            <th className="text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {appointments?.map((appointment: Appointment) => {
                            const days = getRemainingDays(appointment.appointmentDate);

                            return (
                                <tr
                                    key={appointment._id}
                                    className="hover transition duration-300"
                                >
                                    <td>
                                        <div className="flex items-center gap-4">

                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white">
                                                {appointment.doctorName.charAt(0).toUpperCase()}
                                            </div>

                                            <div>
                                                <h2 className="font-bold text-lg">
                                                    {appointment.doctorName}
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    {appointment.clinicName}
                                                </p>
                                            </div>

                                        </div>
                                    </td>

                                    <td>
                                        <p className="font-semibold">
                                            {appointment.patientName}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {appointment.patientNumber}
                                        </p>
                                    </td>

                                    <td>
                                        <p className="font-semibold">
                                            {appointment.appointmentDate}
                                        </p>
                                    </td>

                                    <td>
                                        <span
                                            className={`rounded-full px-4 py-1 text-sm font-semibold
                                        ${appointment.status === "scheduled" && "bg-blue-100 text-blue-700"}
                                        ${appointment.status === "complete" && "bg-green-100 text-green-700"}
                                        ${appointment.status === "cancel" && "bg-red-100 text-red-700"}
                                    `}
                                        >
                                            {appointment.status}
                                        </span>
                                    </td>

                                    <td>

                                        {appointment.status === "scheduled" ? (
                                            days > 0 ? (
                                                <span className="rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
                                                    {days} Days Left
                                                </span>
                                            ) : days === 0 ? (
                                                <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                                                    Today
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-semibold text-gray-700">
                                                    Passed
                                                </span>
                                            )
                                        ) : (
                                            "-"
                                        )}

                                    </td>

                                    <td className="text-right">

                                        {appointment.status === "scheduled" ? (
                                            <button
                                                onClick={() => handleCancel(appointment._id)}
                                                className="btn border-red-600 bg-red-600 text-white hover:bg-red-700"
                                            >
                                                Cancel
                                            </button>
                                        ) : (
                                            <button className="btn btn-disabled">
                                                {appointment.status === "complete"
                                                    ? "Completed"
                                                    : "Cancelled"}
                                            </button>
                                        )}

                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div>

            {/* Mobile */}

            <div className="space-y-5 lg:hidden">

                {appointments?.map((appointment: Appointment) => {
                    const days = getRemainingDays(appointment.appointmentDate);

                    return (
                        <div
                            key={appointment._id}
                            className="overflow-hidden rounded-3xl border border-red-100 bg-white shadow-xl"
                        >

                            <div className="bg-red-600 p-5 text-white">

                                <div className="flex justify-between">

                                    <div>

                                        <h2 className="text-xl font-bold">
                                            {appointment.doctorName}
                                        </h2>

                                        <p className="text-red-100">
                                            {appointment.clinicName}
                                        </p>

                                    </div>

                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-xl font-bold text-red-600">
                                        {appointment.doctorName.charAt(0).toUpperCase()}
                                    </div>

                                </div>

                            </div>

                            <div className="space-y-5 p-5">

                                <div className="grid grid-cols-2 gap-4">

                                    <div>

                                        <p className="text-xs uppercase tracking-wider text-gray-400">
                                            Patient
                                        </p>

                                        <p className="font-semibold">
                                            {appointment.patientName}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase tracking-wider text-gray-400">
                                            Phone
                                        </p>

                                        <p className="font-semibold">
                                            {appointment.patientNumber}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase tracking-wider text-gray-400">
                                            Appointment
                                        </p>

                                        <p className="font-semibold">
                                            {appointment.appointmentDate}
                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-xs uppercase tracking-wider text-gray-400">
                                            Remaining
                                        </p>

                                        {appointment.status === "scheduled" ? (
                                            days > 0 ? (
                                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                                                    {days} Days Left
                                                </span>
                                            ) : days === 0 ? (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                                    Today
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                                                    Passed
                                                </span>
                                            )
                                        ) : (
                                            "-"
                                        )}

                                    </div>

                                </div>

                                <div className="flex items-center justify-between">

                                    <span
                                        className={`rounded-full px-4 py-2 text-sm font-semibold
                                    ${appointment.status === "scheduled" && "bg-blue-100 text-blue-700"}
                                    ${appointment.status === "complete" && "bg-green-100 text-green-700"}
                                    ${appointment.status === "cancel" && "bg-red-100 text-red-700"}
                                `}
                                    >
                                        {appointment.status}
                                    </span>

                                    {appointment.status === "scheduled" ? (
                                        <button
                                            onClick={() => handleCancel(appointment._id)}
                                            className="btn bg-red-600 text-white hover:bg-red-700"
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        <button className="btn btn-disabled">
                                            {appointment.status === "complete"
                                                ? "Completed"
                                                : "Cancelled"}
                                        </button>
                                    )}

                                </div>

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>

    );
};

export default MyAppointment;