import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    ArrowRight,
    BadgeCheck,
    Building2,
    CalendarCheck,
    CalendarClock,
    ClipboardList,
    Clock3,
    HeartPulse,
    ShieldCheck,
    Stethoscope,
    Users,
    XCircle
} from "lucide-react";
import { Link } from "react-router";
import Banner from "./Banner";

type Clinic = {
    _id: string;
    contact: string;
    description: string;
    image: string;
    location: string;
    name: string;
    status: string;
    userEmail: string;
}

type Doctor = {
    _id: string;
    availableFrom: string;
    availableTo: string;
    clinicName: string;
    degree: string;
    fee: string;
    image: string;
    name: string;
    selectedDays: string;
}

type HomeData = {
    totalUsers: number;
    totalClinics: number;
    totalDoctors: number;
    totalAppointments: number;
    scheduledAppointments: number;
    cancelAppointments: number;
    completeAppointments: number;
    clinics: Clinic[];
    doctors: Doctor[];
}

const Home = () => {
    const { data, isLoading } = useQuery<HomeData>({
        queryKey: ["homeData"],
        queryFn: async () => {
            const result = await axios.get("https://smartcare-server.vercel.app/homeData")
            return result.data
        }
    })

    const stats = [
        {
            title: "Verified Clinics",
            value: data?.totalClinics ?? 0,
            icon: Building2
        },
        {
            title: "Available Doctors",
            value: data?.totalDoctors ?? 0,
            icon: Stethoscope
        },
        {
            title: "Total Appointments",
            value: data?.totalAppointments ?? 0,
            icon: CalendarCheck
        },
        {
            title: "Registered Users",
            value: data?.totalUsers ?? 0,
            icon: Users
        }
    ]

    const steps = [
        {
            title: "Choose a Clinic",
            description: "Browse verified clinics and check location, contact, and available healthcare support.",
            icon: Building2
        },
        {
            title: "Select a Doctor",
            description: "Review doctor profile, consultation fee, available days, and clinic details.",
            icon: Stethoscope
        },
        {
            title: "Book Appointment",
            description: "Submit patient information and track appointment status from your dashboard.",
            icon: ClipboardList
        }
    ]

    const appointmentStatus = [
        {
            title: "Scheduled",
            value: data?.scheduledAppointments ?? 0,
            icon: CalendarClock,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Completed",
            value: data?.completeAppointments ?? 0,
            icon: BadgeCheck,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            title: "Cancelled",
            value: data?.cancelAppointments ?? 0,
            icon: XCircle,
            color: "text-red-600",
            bg: "bg-red-50"
        }
    ]

    return (
        <div className="bg-white">
            <Banner></Banner>

            <section className="px-4 py-14">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map(item => {
                        const Icon = item.icon
                        return (
                            <div key={item.title} className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{item.title}</p>
                                        <h2 className="mt-2 text-4xl font-bold text-gray-900">
                                            {isLoading ? "..." : item.value}
                                        </h2>
                                    </div>
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                                        <Icon size={26} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            <section className="px-4 py-14">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <div>
                        <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                            Simple Care Journey
                        </span>
                        <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl">
                            Book trusted healthcare without extra waiting.
                        </h2>
                        <p className="mt-4 text-gray-600">
                            SmartCare connects patients with verified clinics and doctors, then keeps appointment records organized for patients, authorities, and admins.
                        </p>
                        <Link to="/find-doctors" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
                            Find Doctors <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="grid gap-4">
                        {steps.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <div key={item.title} className="flex gap-4 rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-600 font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Icon size={20} className="text-red-600" />
                                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                        </div>
                                        <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="px-4 py-14">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                            Verified Network
                        </span>
                        <h2 className="mt-5 text-3xl font-bold text-gray-900">Featured Clinics</h2>
                        <p className="mt-2 text-gray-600">Explore approved clinics already available in SmartCare.</p>
                    </div>
                    <Link to="/clinics" className="inline-flex items-center gap-2 font-semibold text-red-600">
                        View All Clinics <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data?.clinics?.map(clinic => (
                        <div key={clinic._id} className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                            <img src={clinic.image} alt={clinic.name} className="h-52 w-full object-cover" />
                            <div className="p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="text-xl font-bold text-gray-900">{clinic.name}</h3>
                                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                        {clinic.status}
                                    </span>
                                </div>
                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{clinic.description}</p>
                                <p className="mt-4 text-sm font-medium text-gray-700">{clinic.contact}</p>
                                <Link to={`/clinic/${clinic._id}`} className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700">
                                    View Clinic
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-4 py-14">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <span className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                            Doctor Directory
                        </span>
                        <h2 className="mt-5 text-3xl font-bold text-gray-900">Available Doctors</h2>
                        <p className="mt-2 text-gray-600">Check doctor schedules, clinic names, and consultation fees.</p>
                    </div>
                    <Link to="/find-doctors" className="inline-flex items-center gap-2 font-semibold text-red-600">
                        Find More Doctors <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data?.doctors?.map(doctor => (
                        <div key={doctor._id} className="rounded-lg border border-gray-100 bg-white p-6 text-center shadow-sm">
                            <img src={doctor.image} alt={doctor.name} className="mx-auto h-32 w-32 rounded-full border-4 border-red-100 object-cover" />
                            <h3 className="mt-5 text-xl font-bold text-gray-900">{doctor.name}</h3>
                            <p className="mt-1 font-medium text-red-600">{doctor.degree}</p>
                            <p className="mt-3 text-sm text-gray-500">{doctor.clinicName}</p>
                            <div className="mt-5 space-y-2 text-left text-sm text-gray-600">
                                <p className="flex items-center gap-2">
                                    <Clock3 size={17} className="text-red-600" />
                                    {doctor.availableFrom} - {doctor.availableTo}
                                </p>
                                <p className="flex items-center gap-2">
                                    <CalendarCheck size={17} className="text-red-600" />
                                    {doctor.selectedDays}
                                </p>
                                <p className="font-semibold text-gray-900">
                                    Fee: <span className="text-red-600">৳ {doctor.fee}</span>
                                </p>
                            </div>
                            <Link to={`/doctor/${doctor._id}`} className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-red-600 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white">
                                View Doctor
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-4 py-14">
                <div className="rounded-lg bg-gray-950 p-6 text-white md:p-10">
                    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                            <span className="rounded-full bg-red-600/20 px-4 py-2 text-sm font-semibold text-red-200">
                                Appointment Insight
                            </span>
                            <h2 className="mt-5 text-3xl font-bold md:text-4xl">Track appointment flow clearly.</h2>
                            <p className="mt-4 text-gray-300">
                                Your system already stores scheduled, completed, and cancelled appointments, so patients and clinic authorities can follow real appointment progress.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {appointmentStatus.map(item => {
                                const Icon = item.icon
                                return (
                                    <div key={item.title} className="rounded-lg bg-white p-5 text-gray-900">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${item.bg} ${item.color}`}>
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="mt-5 text-3xl font-bold">{isLoading ? "..." : item.value}</h3>
                                        <p className="mt-1 text-sm font-medium text-gray-500">{item.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 py-14">
                <div className="grid overflow-hidden rounded-lg border border-red-100 bg-red-50 lg:grid-cols-2">
                    <div className="p-8 md:p-10">
                        <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-600">
                            For Clinic Authorities
                        </span>
                        <h2 className="mt-5 text-3xl font-bold text-gray-900 md:text-4xl">
                            Manage clinic doctors and appointment requests from one dashboard.
                        </h2>
                        <p className="mt-4 text-gray-600">
                            SmartCare supports clinic registration, admin approval, doctor management, and clinic-wise appointment tracking for authority users.
                        </p>
                        <div className="mt-6 grid gap-3 text-sm font-medium text-gray-700 sm:grid-cols-2">
                            <p className="flex items-center gap-2"><ShieldCheck size={18} className="text-red-600" /> Admin clinic approval</p>
                            <p className="flex items-center gap-2"><Stethoscope size={18} className="text-red-600" /> Doctor management</p>
                            <p className="flex items-center gap-2"><CalendarCheck size={18} className="text-red-600" /> Appointment tracking</p>
                            <p className="flex items-center gap-2"><HeartPulse size={18} className="text-red-600" /> Patient care records</p>
                        </div>
                        <Link to="/register" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
                            Join as Authority <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className="min-h-[320px] bg-[url('/banner-2.png')] bg-cover bg-center"></div>
                </div>
            </section>
        </div>
    );
};

export default Home;
