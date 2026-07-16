import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import { CalendarDays, Clock, MapPin, Phone, Stethoscope } from "lucide-react";
import { useRef, useState } from "react";
import AppointmentModal from "../../Components/AppointmentModal";

type Doctor = {
    _id: string;
    clinicId: string;
    clinicName: string;
    name: string;
    degree: string;
    fee: string;
    image: string;
    availableFrom: string;
    availableTo: string;
    selectedDays: string;
};
const ClinicsDetails = () => {
    const { id } = useParams();
    const modalElement = useRef<HTMLDialogElement | null>(null)

    const { data: details, isLoading } = useQuery({
        queryKey: ["detail", id],
        queryFn: async () => {
            const [clinicsRes, doctorsRes] = await Promise.all([
                axios.get(`https://smartcare-server.vercel.app/clinic/${id}`),
                axios.get(`https://smartcare-server.vercel.app/doctors?id=${id}`),
            ]);

            return {
                clinic: clinicsRes.data,
                doctors: doctorsRes.data,
            };
        },
        enabled: !!id,
    });

    const [doctor, setDoctor] = useState<object | null>(null)

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner text-red-600"></span>
            </div>
        );
    }


    const clinic = details?.clinic;
    const doctors = details?.doctors || []
    const handleModal = (data: object) => {
        modalElement.current?.showModal()
        setDoctor(data)

    }


    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <AppointmentModal modalRef={modalElement} data={doctor}></AppointmentModal>

            <div className="max-w-6xl mx-auto">


                {/* Clinic Header */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                    <div className="grid md:grid-cols-3 gap-6 p-6 md:p-10">


                        {/* Image */}
                        <div className="md:col-span-1">
                            <img
                                src={clinic?.image}
                                alt={clinic?.name}
                                className="w-full h-64 object-cover rounded-2xl"
                            />
                        </div>


                        {/* Details */}
                        <div className="md:col-span-2 space-y-4">

                            <div>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {clinic?.status}
                                </span>

                                <h1 className="text-3xl font-bold mt-3 text-gray-800">
                                    {clinic?.name}
                                </h1>
                            </div>


                            <p className="text-gray-600 leading-relaxed">
                                {clinic?.description}
                            </p>


                            <div className="grid sm:grid-cols-2 gap-4 text-gray-700">

                                <p className="flex items-center gap-2">
                                    <MapPin className="text-red-600" size={20} />
                                    {clinic?.location}
                                </p>


                                <p className="flex items-center gap-2">
                                    <Phone className="text-red-600" size={20} />
                                    {clinic?.contact}
                                </p>

                            </div>

                        </div>


                    </div>

                </div>




                {/* Doctors Section */}

                <div className="mt-12">

                    <div className="flex items-center gap-3 mb-6">

                        <Stethoscope
                            className="text-red-600"
                            size={32}
                        />

                        <h2 className="text-3xl font-bold text-gray-800">
                            Our Doctors
                        </h2>

                    </div>



                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">


                        {
                            doctors?.map((doctor: Doctor) => (

                                <div
                                    key={doctor._id}
                                    className="bg-white rounded-3xl shadow-md hover:shadow-xl transition p-6"
                                >

                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="h-40 w-40 mx-auto rounded-full object-cover border-4 border-red-100"
                                    />


                                    <div className="text-center mt-5">

                                        <h3 className="text-xl font-bold text-gray-800">
                                            {doctor.name}
                                        </h3>


                                        <p className="text-red-600 font-medium mt-1">
                                            {doctor.degree}
                                        </p>


                                    </div>



                                    <div className="mt-5 space-y-3 text-gray-600">


                                        <p className="flex gap-2 items-center">
                                            <Clock size={18} className="text-red-600" />
                                            {doctor.availableFrom} - {doctor.availableTo}
                                        </p>


                                        <p className="flex gap-2 items-center">
                                            <CalendarDays size={18} className="text-red-600" />
                                            {doctor.selectedDays}
                                        </p>


                                        <p className="font-semibold text-gray-800">
                                            Consultation Fee:
                                            <span className="text-red-600 ml-2">
                                                ৳ {doctor.fee}
                                            </span>
                                        </p>


                                    </div>



                                    <button
                                        onClick={() => handleModal(doctor)}
                                        className="
                                        w-full mt-6 
                                        bg-red-600 
                                        text-white 
                                        py-3 
                                        rounded-xl 
                                        font-semibold
                                        hover:bg-red-700
                                        transition
                                        hover:shadow-lg
                                        "
                                    >
                                        Appointment
                                    </button>


                                </div>

                            ))
                        }


                    </div>


                </div>


            </div>

        </div>
    );
};

export default ClinicsDetails;