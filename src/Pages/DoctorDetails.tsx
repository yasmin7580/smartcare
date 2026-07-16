// import React from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import {
    CalendarDays,
    Clock3,
    DollarSign,
    Hospital,
} from "lucide-react";
import { useRef } from "react";
import AppointmentModal from "../Components/AppointmentModal";

const DoctorDetails = () => {
    const { id } = useParams();
    const modalElement = useRef<HTMLDialogElement | null>(null)


    const { data: doctor, isLoading } = useQuery({
        queryKey: ["detail", id],
        queryFn: async () => {
            const { data } = await axios.get(
                `https://smartcare-server.vercel.app/doctor/${id}`
            );

            return data
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    // const { doctor, clinic } = details;




    return (
        <div className="bg-slate-50 min-h-screen py-10 px-4">

            <div className="max-w-7xl mx-auto space-y-10">

                {/* Doctor Card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                    <div className="grid lg:grid-cols-3 gap-8 p-8">

                        {/* Image */}
                        <div className="flex justify-center items-start">

                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-72 h-72 rounded-3xl object-cover border-4 border-red-100"
                            />

                        </div>

                        {/* Details */}
                        <div className="lg:col-span-2">

                            <div className="flex flex-wrap items-center gap-3">

                                <h1 className="text-4xl font-bold text-slate-800">
                                    {doctor.name}
                                </h1>

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Available
                                </span>

                            </div>

                            <p className="text-red-600 font-semibold text-xl mt-2">
                                {doctor.degree}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-5 mt-8">

                                <div className="flex items-center gap-3">
                                    <Clock3 className="text-red-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Available Time
                                        </p>
                                        <p className="font-semibold">
                                            {doctor.availableFrom} - {doctor.availableTo}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CalendarDays className="text-red-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Available Days
                                        </p>
                                        <p className="font-semibold">
                                            {doctor.selectedDays}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <DollarSign className="text-red-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Consultation Fee
                                        </p>
                                        <p className="font-semibold">
                                            ৳ {doctor.fee}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Hospital className="text-red-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Clinic
                                        </p>
                                        <p className="font-semibold">
                                            {doctor.clinicName}
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-10">

                                <button
                                    onClick={() => modalElement.current?.showModal()}
                                    className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-semibold  transition shadow-lg "
                                >
                                    Book Appointment
                                </button>

                            </div>

                        </div>

                    </div>

                </div>







            </div>
            <AppointmentModal modalRef={modalElement} data={doctor}></AppointmentModal>

        </div>
    );
};

export default DoctorDetails;