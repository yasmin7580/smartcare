import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    BadgeCheck,
    Building2,
    CalendarCheck,
    Clock3,
    Plus,
    Stethoscope,
    XCircle
} from "lucide-react";
import { Link } from "react-router";
import Loading from "../../../Components/Loading";
import useAuth from "../../../Hooks/useAuth";

type Clinic = {
    _id: string;
    image: string;
    name: string;
    location: string;
    contact: string;
    description: string;
    status: string;
    userEmail: string;
}

type Doctor = {
    _id: string;
    name: string;
    degree: string;
    image: string;
    availableFrom: string;
    availableTo: string;
    selectedDays: string;
    fee: string;
}

type Appointment = {
    _id: string;
    patientName: string;
    patientAge: string;
    patientGender: string;
    patientNumber: string;
    appointmentDate: string;
    doctorName: string;
    status: string;
}

type AuthorityData = {
    clinic: Clinic | null;
    totalDoctors: number;
    totalAppointments: number;
    scheduledAppointments: number;
    completeAppointments: number;
    cancelAppointments: number;
    doctors: Doctor[];
    recentAppointments: Appointment[];
}

const AuthorityHome = () => {
    const { user } = useAuth()

    const { data, isLoading } = useQuery<AuthorityData>({
        queryKey: ["authorityHome", user?.email],
        queryFn: async () => {
            const result = await axios.get(`https://smartcare-server.vercel.app/authorityHome?email=${user?.email}`)
            return result.data
        },
        enabled: !!user?.email
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(data)

    if (!data?.clinic) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="max-w-lg rounded-lg border border-red-100 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <Building2 size={32} />
                    </div>
                    <h2 className="mt-5 text-2xl font-bold text-gray-900">Create your clinic first</h2>
                    <p className="mt-2 text-gray-500">
                        Your authority dashboard will show doctors and appointments after your clinic is added.
                    </p>
                    <Link to="/dashboard/add-clinic" className="btn mt-6 bg-red-600 text-white hover:bg-red-700">
                        <Plus size={18} /> Add Clinic
                    </Link>
                </div>
            </div>
        )
    }

    const cards = [
        {
            title: "Doctors",
            value: data.totalDoctors,
            icon: Stethoscope,
            color: "text-red-600",
            bg: "bg-red-50"
        },
        {
            title: "Appointments",
            value: data.totalAppointments,
            icon: CalendarCheck,
            color: "text-red-600",
            bg: "bg-red-50"
        },
        {
            title: "Scheduled",
            value: data.scheduledAppointments,
            icon: Clock3,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Cancelled",
            value: data.cancelAppointments,
            icon: XCircle,
            color: "text-red-600",
            bg: "bg-red-50"
        }
    ]

    return (
        <div className="space-y-8">
            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                <div className="grid lg:grid-cols-[320px_1fr]">
                    <img src={data.clinic.image} alt={data.clinic.name} className="h-full min-h-64 w-full object-cover" />
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                            <div>
                                <p className="text-sm font-semibold text-red-600">Authority Dashboard</p>
                                <h1 className="mt-2 text-3xl font-bold text-gray-900">{data.clinic.name}</h1>
                                <p className="mt-3 max-w-3xl text-gray-600">{data.clinic.description}</p>
                            </div>
                            <span className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${data.clinic.status === "VERIFIED" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                                {data.clinic.status}
                            </span>
                        </div>

                        <div className="mt-6 grid gap-3 text-sm text-gray-600 md:grid-cols-2">
                            <p><span className="font-semibold text-gray-900">Location:</span> {data.clinic.location}</p>
                            <p><span className="font-semibold text-gray-900">Contact:</span> {data.clinic.contact}</p>
                            <p className="break-all"><span className="font-semibold text-gray-900">Email:</span> {data.clinic.userEmail}</p>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link to="/dashboard/add-doctors" className="btn bg-red-600 text-white hover:bg-red-700">
                                <Plus size={18} /> Add Doctor
                            </Link>
                            <Link to="/dashboard/total-appointments" className="btn border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                                View Appointments
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map(card => {
                    const Icon = card.icon
                    return (
                        <div key={card.title} className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{card.title}</p>
                                    <h2 className="mt-2 text-4xl font-bold text-gray-900">{card.value}</h2>
                                </div>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${card.bg} ${card.color}`}>
                                    <Icon size={26} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-gray-900">Clinic Doctors</h2>
                        <Link to="/dashboard/doctors" className="text-sm font-semibold text-red-600">View all</Link>
                    </div>

                    <div className="space-y-4">
                        {data.doctors.map(doctor => (
                            <div key={doctor._id} className="flex items-center gap-4 rounded-lg border border-gray-100 p-4">
                                <img src={doctor.image} alt={doctor.name} className="h-16 w-16 rounded-full object-cover" />
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                                    <p className="text-sm text-red-600">{doctor.degree}</p>
                                    <p className="mt-1 text-sm text-gray-500">{doctor.availableFrom} - {doctor.availableTo}</p>
                                </div>
                                <p className="shrink-0 font-semibold text-gray-900">৳ {doctor.fee}</p>
                            </div>
                        ))}
                    </div>

                    {data.doctors.length === 0 && (
                        <p className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">No doctors added yet.</p>
                    )}
                </div>

                <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-gray-900">Recent Appointments</h2>
                        <Link to="/dashboard/total-appointments" className="text-sm font-semibold text-red-600">View all</Link>
                    </div>

                    <div className="space-y-4">
                        {data.recentAppointments.map(appointment => (
                            <div key={appointment._id} className="rounded-lg border border-gray-100 p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                                        <p className="text-sm text-gray-500">{appointment.patientGender}, {appointment.patientAge}</p>
                                    </div>
                                    <span className={`rounded-full px-3 py-1 text-xs font-semibold
                                        ${appointment.status === "scheduled" && "bg-blue-100 text-blue-700"}
                                        ${appointment.status === "complete" && "bg-green-100 text-green-700"}
                                        ${appointment.status === "cancel" && "bg-red-100 text-red-700"}
                                    `}>
                                        {appointment.status}
                                    </span>
                                </div>
                                <div className="mt-4 grid gap-2 text-sm text-gray-600 sm:grid-cols-3">
                                    <p><span className="font-semibold text-gray-900">Doctor:</span> {appointment.doctorName}</p>
                                    <p><span className="font-semibold text-gray-900">Date:</span> {appointment.appointmentDate}</p>
                                    <p><span className="font-semibold text-gray-900">Phone:</span> {appointment.patientNumber}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {data.recentAppointments.length === 0 && (
                        <p className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">No appointments found for this clinic.</p>
                    )}
                </div>
            </div>

            <div className="rounded-lg border border-red-100 bg-red-50 p-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <div className="flex items-center gap-2 text-red-600">
                            <BadgeCheck size={22} />
                            <p className="font-semibold">Clinic performance</p>
                        </div>
                        <h2 className="mt-2 text-2xl font-bold text-gray-900">
                            {data.completeAppointments} completed appointments from {data.totalAppointments} total bookings.
                        </h2>
                    </div>
                    <Link to="/dashboard/total-appointments" className="btn bg-red-600 text-white hover:bg-red-700">
                        Manage Appointments
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthorityHome;
