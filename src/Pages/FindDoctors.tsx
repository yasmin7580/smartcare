import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CalendarDays, Clock, Filter, X } from "lucide-react";
import { Link } from "react-router";
import Loading from "../Components/Loading";
import AppointmentModal from "../Components/AppointmentModal";

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

const FindDoctors = () => {

    const modalElement = useRef<HTMLDialogElement | null>(null)
    const [showFilter, setShowFilter] = useState(false);
    const [doctor, setDoctor] = useState<object | null>(null)


    const { data: doctors, isLoading } = useQuery({
        queryKey: ["detail"],
        queryFn: async () => {
            const { data } = await axios.get(`https://smartcare-server.vercel.app/doctors`)
            return data
        },

    });
    if (isLoading) {
        return <Loading />
    }
    const handleModal = (data: object) => {
        setDoctor(data)
        modalElement.current?.showModal()
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <AppointmentModal modalRef={modalElement} data={doctor}></AppointmentModal>

            <div className="max-w-7xl mx-auto">
                <div className="mb-8">

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Find Your Doctor
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Search and book appointments with experienced doctors.
                    </p>

                </div>


                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-md p-5 mb-8 relative">


                    <div className="flex flex-col md:flex-row gap-4">


                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search doctor..."
                            className="flex-1  border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-red-600
                            "
                        />



                        {/* Filter Button */}
                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition "
                        >

                            <Filter size={20} />

                            Filter

                        </button>


                    </div>



                    {/* Filter Dropdown */}
                    {
                        showFilter && (

                            <div className="mt-5 border rounded-2xl p-5 bg-slate-50 absolute right-0">

                                <div className="flex justify-between items-center mb-5">

                                    <h2 className="text-xl font-bold text-gray-800">
                                        Filter Doctors
                                    </h2>


                                    <button
                                        onClick={() => setShowFilter(false)}
                                        className=" cursor-pointer"
                                    >
                                        <X size={22} />
                                    </button>

                                </div>



                                <div className="grid  gap-4 items-start">


                                    {/* Specialist */}
                                    <select
                                        className="select w-full border border-gray-200 rounded-xl px-4 py-6   bg-white  " defaultValue={"Select Specialist"} >

                                        <option disabled>
                                            Select Specialist
                                        </option>

                                        <option>
                                            Cardiology
                                        </option>

                                        <option>
                                            Neurology
                                        </option>

                                    </select>



                                    {/* Available Days */}
                                    <div className="border border-gray-200 rounded-xl p-4 bg-white">

                                        <h4 className="font-semibold text-gray-700 mb-3">
                                            Available Days
                                        </h4>


                                        <div className="grid grid-cols-2 gap-3">

                                            {
                                                ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map(day => (

                                                    <label
                                                        key={day}
                                                        className="flex items-center gap-2 cursor-pointer group"
                                                    >

                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4 accent-red-600 " />

                                                        <span className="text-gray-600 group-hover:tracking-wider duration-100">
                                                            {day}
                                                        </span>

                                                    </label>

                                                ))
                                            }

                                        </div>

                                    </div>




                                    {/* Fee */}
                                    {/* Fee Range */}
                                    <div className="border border-gray-200 rounded-xl p-4 bg-white">

                                        <h4 className="font-semibold text-gray-700 mb-3">
                                            Consultation Fee
                                        </h4>


                                        <div className="grid grid-cols-2 gap-3">

                                            <input
                                                type="number"
                                                placeholder="Min fee"
                                                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 "
                                            />


                                            <input
                                                type="number"
                                                placeholder="Max fee"
                                                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 "
                                            />

                                        </div>

                                    </div>

                                </div>




                                {/* Buttons */}
                                <div className="flex justify-end gap-3 mt-5">


                                    <button
                                        className="px-6 py-3 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100" >
                                        Clear
                                    </button>



                                    <button
                                        className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700" >
                                        Apply
                                    </button>


                                </div>


                            </div>

                        )
                    }


                </div>





                {/* Doctor Cards */}
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


                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        to={`/doctor/${doctor._id}`}
                                    >
                                        <button
                                            className="w-full mt-6  bg-red-600  text-white py-3  rounded-xl font-semibold  hover:bg-red-700 transition hover:shadow-lg " >
                                            View
                                        </button>
                                    </Link>

                                    <button
                                        onClick={() => handleModal(doctor)}
                                        className="w-full mt-6  bg-red-600  text-white py-3  rounded-xl font-semibold  hover:bg-red-700 transition hover:shadow-lg " >
                                        Appointment
                                    </button>
                                </div>


                            </div>

                        ))
                    }

                </div>


            </div>

        </div>
    );
};

export default FindDoctors;