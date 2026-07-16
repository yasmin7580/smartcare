import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CalendarDays, CheckCircle2, Clock3, XCircle } from 'lucide-react';
// import { Link } from 'reacnpm run devt-router';
import Loading from '../../../Components/Loading';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';

type Clinic = {
    _id: string;
    name: string;
    status: string;
}

type Appointment = {
    _id: string;
    patientName: string;
    patientAge: string;
    patientGender: string;
    patientNumber: string;
    appointmentDate: string;
    doctorName: string;
    clinicName: string;
    userEmail: string;
    status: string;
}

const TotalAppointment = () => {
    const { user } = useAuth()

    const { data: clinic, isLoading: clinicLoading } = useQuery<Clinic | null>({
        queryKey: ['clinic', user?.email],
        queryFn: async () => {
            const result = await axios.get(`https://smartcare-server.vercel.app/clinic?userEmail=${user?.email}`)
            return result.data
        },
        enabled: !!user
    })

    const { data: appointments = [], isLoading: appointmentLoading } = useQuery<Appointment[]>({
        queryKey: ['clinic-appointments', clinic?._id],
        queryFn: async () => {
            const result = await axios.get(`https://smartcare-server.vercel.app/appointment?clinicId=${clinic?._id}`)
            return result.data
        },
        enabled: !!clinic?._id
    })

    if (clinicLoading || appointmentLoading) {
        return <Loading></Loading>
    }

    if (!clinic) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="w-full max-w-md rounded-lg border border-red-100 bg-white p-8 text-center shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-900">No clinic found</h2>
                    <p className="mt-2 text-gray-500">Add your clinic first to see appointment data.</p>
                    <Link to="/dashboard/add-clinic" className="btn mt-6 bg-red-600 text-white hover:bg-red-700">
                        Add Clinic
                    </Link>
                </div>
            </div>
        )
    }

    const totalAppointments = appointments.length
    const scheduledAppointments = appointments.filter(item => item.status === "scheduled").length
    const completeAppointments = appointments.filter(item => item.status === "complete").length
    const cancelAppointments = appointments.filter(item => item.status === "cancel").length
    const scheduledPercent = totalAppointments ? Math.round((scheduledAppointments / totalAppointments) * 100) : 0
    const completePercent = totalAppointments ? Math.round((completeAppointments / totalAppointments) * 100) : 0
    const cancelPercent = totalAppointments ? Math.round((cancelAppointments / totalAppointments) * 100) : 0

    const cards = [
        {
            title: "Total Appointments",
            value: totalAppointments,
            icon: CalendarDays,
            bg: "bg-red-600",
            text: "text-white"
        },
        {
            title: "Scheduled",
            value: scheduledAppointments,
            icon: Clock3,
            bg: "bg-red-50",
            text: "text-red-600"
        },
        {
            title: "Completed",
            value: completeAppointments,
            icon: CheckCircle2,
            bg: "bg-green-50",
            text: "text-green-600"
        },
        {
            title: "Cancelled",
            value: cancelAppointments,
            icon: XCircle,
            bg: "bg-red-50",
            text: "text-red-600"
        }
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900">Total Appointments</h1>
                <p className="text-gray-500">{clinic.name} appointment overview</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map(item => {
                    const Icon = item.icon
                    return (
                        <div key={item.title} className={`${item.bg} rounded-lg p-5 shadow-sm`}>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className={`text-sm font-medium ${item.bg === "bg-red-600" ? "text-red-100" : "text-gray-500"}`}>
                                        {item.title}
                                    </p>
                                    <h2 className={`mt-2 text-4xl font-bold ${item.text}`}>{item.value}</h2>
                                </div>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${item.bg === "bg-red-600" ? "bg-white/20 text-white" : item.text}`}>
                                    <Icon size={26} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm xl:col-span-1">
                    <h2 className="text-xl font-semibold text-gray-900">Status Overview</h2>

                    <div className="mt-6 space-y-5">
                        <div>
                            <div className="mb-2 flex justify-between text-sm font-medium">
                                <span>Scheduled</span>
                                <span className="text-red-600">{scheduledPercent}%</span>
                            </div>
                            <div className="h-3 rounded-full bg-gray-100">
                                <div className="h-3 rounded-full bg-red-600" style={{ width: `${scheduledPercent}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 flex justify-between text-sm font-medium">
                                <span>Completed</span>
                                <span className="text-green-600">{completePercent}%</span>
                            </div>
                            <div className="h-3 rounded-full bg-gray-100">
                                <div className="h-3 rounded-full bg-green-500" style={{ width: `${completePercent}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 flex justify-between text-sm font-medium">
                                <span>Cancelled</span>
                                <span className="text-red-600">{cancelPercent}%</span>
                            </div>
                            <div className="h-3 rounded-full bg-gray-100">
                                <div className="h-3 rounded-full bg-red-300" style={{ width: `${cancelPercent}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-100 bg-white shadow-sm xl:col-span-2">
                    <div className="border-b border-gray-100 p-6">
                        <h2 className="text-xl font-semibold text-gray-900">Clinic Appointments</h2>
                        <p className="mt-1 text-sm text-gray-500">All appointments booked under this clinic.</p>
                    </div>

                    <div className="hidden overflow-x-auto lg:block">
                        <table className="table">
                            <thead className="bg-red-600 text-white">
                                <tr>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Date</th>
                                    <th>Contact</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(appointment => (
                                    <tr key={appointment._id} className="hover:bg-red-50">
                                        <td>
                                            <div>
                                                <p className="font-semibold text-gray-900">{appointment.patientName}</p>
                                                <p className="text-sm text-gray-500">{appointment.patientAge} years, {appointment.patientGender}</p>
                                            </div>
                                        </td>
                                        <td className="font-medium">{appointment.doctorName}</td>
                                        <td>{appointment.appointmentDate}</td>
                                        <td>{appointment.patientNumber}</td>
                                        <td>
                                            <span className={`rounded-full px-3 py-1 text-sm font-semibold
                                                ${appointment.status === "scheduled" && "bg-blue-100 text-blue-700"}
                                                ${appointment.status === "complete" && "bg-green-100 text-green-700"}
                                                ${appointment.status === "cancel" && "bg-red-100 text-red-700"}
                                            `}>
                                                {appointment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid gap-4 p-4 lg:hidden">
                        {appointments.map(appointment => (
                            <div key={appointment._id} className="rounded-lg border border-red-100 bg-white p-4 shadow-sm">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                                        <p className="text-sm text-gray-500">{appointment.doctorName}</p>
                                    </div>
                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold
                                        ${appointment.status === "scheduled" && "bg-blue-100 text-blue-700"}
                                        ${appointment.status === "complete" && "bg-green-100 text-green-700"}
                                        ${appointment.status === "cancel" && "bg-red-100 text-red-700"}
                                    `}>
                                        {appointment.status}
                                    </span>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-gray-400">Date</p>
                                        <p className="font-medium text-gray-800">{appointment.appointmentDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Contact</p>
                                        <p className="font-medium text-gray-800">{appointment.patientNumber}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {appointments.length === 0 && (
                        <div className="p-10 text-center">
                            <h3 className="text-lg font-semibold text-gray-900">No appointments yet</h3>
                            <p className="mt-1 text-gray-500">Appointments for this clinic will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TotalAppointment;
