import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
    Users,
    Building2,
    Stethoscope,
    CalendarDays,
    UserRoundCheck,
    Clock3,
    XCircle,
} from "lucide-react";


type Appointment = {
    _id: string;
    patientName: string;
    patientAge: string;
    patientGender: string;
    patientNumber: string;
    appointmentDate: string;
    doctorName: string;
    clinicName: string;
    status: string;
};


type AdminData = {
    totalUsers: number;
    totalClinics: number;
    totalDoctors: number;
    totalAppointments: number;
    totalNormalUsers: number;
    totalAuthorities: number;
    totalAdmins: number;
    verifiedClinics: number;
    pendingClinics: number;
    scheduledAppointments: number;
    cancelAppointments: number;
    recentAppointments: Appointment[];
    pendingClinicsData: {
        _id: string;
        image: string;
        name: string;
        location: string;
        contact: string;
        description: string;
        userEmail: string;
        status: string;
    }[];
};


const AdminHome = () => {

    const { data, isLoading } = useQuery<AdminData>({
        queryKey: ["adminHome"],
        queryFn: async () => {
            const res = await axios.get(
                "http://localhost:8000/adminHome"
            );

            return res.data;
        },
    });


    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }


    const cards = [
        {
            title: "Total Users",
            value: data?.totalUsers,
            icon: Users,
        },
        {
            title: "Clinics",
            value: data?.totalClinics,
            icon: Building2,
        },
        {
            title: "Doctors",
            value: data?.totalDoctors,
            icon: Stethoscope,
        },
        {
            title: "Appointments",
            value: data?.totalAppointments,
            icon: CalendarDays,
        },
        {
            title: "Normal Users",
            value: data?.totalNormalUsers,
            icon: Users,
        },
        {
            title: "Authorities",
            value: data?.totalAuthorities,
            icon: UserRoundCheck,
        },
        {
            title: "Scheduled",
            value: data?.scheduledAppointments,
            icon: Clock3,
        },
        {
            title: "Cancelled",
            value: data?.cancelAppointments,
            icon: XCircle,
        },
    ];


    return (
        <div className="space-y-8">

            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {
                    cards.map((card, index) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={index}
                                className="rounded-xl border bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {card.title}
                                        </p>

                                        <h2 className="mt-2 text-3xl font-bold text-gray-800">
                                            {card.value}
                                        </h2>
                                    </div>

                                    <div className="rounded-full bg-red-100 p-3 text-red-600">
                                        <Icon size={25}/>
                                    </div>

                                </div>
                            </div>
                        );
                    })
                }

            </div>



            {/* Recent Appointments */}

            <div className="rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-bold text-gray-800">
                    Recent Appointments
                </h2>


                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>
                            <tr className="border-b text-left text-sm text-gray-500">

                                <th className="p-3">
                                    Patient
                                </th>

                                <th className="p-3">
                                    Doctor
                                </th>

                                <th className="p-3">
                                    Clinic
                                </th>

                                <th className="p-3">
                                    Date
                                </th>

                                <th className="p-3">
                                    Status
                                </th>

                            </tr>
                        </thead>


                        <tbody>

                        {
                            data?.recentAppointments.map(item => (

                                <tr
                                    key={item._id}
                                    className="border-b"
                                >

                                    <td className="p-3">
                                        <p className="font-semibold">
                                            {item.patientName}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {item.patientGender}, {item.patientAge}
                                        </p>
                                    </td>


                                    <td className="p-3">
                                        {item.doctorName}
                                    </td>


                                    <td className="p-3">
                                        {item.clinicName}
                                    </td>


                                    <td className="p-3">
                                        {item.appointmentDate}
                                    </td>


                                    <td className="p-3">

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm ${
                                                item.status === "scheduled"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>


                                </tr>

                            ))
                        }

                        </tbody>

                    </table>

                </div>

            </div>




            {/* Pending Clinics */}

            <div className="rounded-xl border bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-bold text-gray-800">
                    Pending Clinics
                </h2>


                <div className="grid gap-5 md:grid-cols-2">

                {
                    data?.pendingClinicsData.map(clinic => (

                        <div
                            key={clinic._id}
                            className="rounded-xl border p-5"
                        >

                            <div className="flex gap-4">

                                <img
                                    src={clinic.image}
                                    className="h-20 w-20 rounded-xl object-cover"
                                />

                                <div>
                                    <h3 className="font-bold">
                                        {clinic.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {clinic.contact}
                                    </p>

                                    <span className="mt-2 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                        Pending
                                    </span>

                                </div>

                            </div>


                            <p className="mt-4 text-sm text-gray-600">
                                {clinic.location}
                            </p>


                        </div>

                    ))
                }

                </div>

            </div>


        </div>
    );
};

export default AdminHome;