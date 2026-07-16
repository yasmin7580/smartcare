import React, { useRef, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Plus } from 'lucide-react';
// import { format } from 'date-fns';
// import { data } from 'react-router';
type Doctor = {
    _id: string;
    availableFrom: string;
    availableTo: string;
    clinicId: string;
    clinicName: string;
    degree: string;
    fee: string;
    image: string;
    name: string;
    selectedDays: string;
};
const days = [
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
];
const Doctors = () => {
    const inputElement = useRef<HTMLInputElement | null>(null)
    const [image, setImage] = useState<FormData | null>(null)
    const [imageUrl, setImageUrl] = useState<string>()
    const modalElement = useRef<HTMLDialogElement | null>(null)
    const [selectedDays, setSelectedDays] = useState<string[]>([]) // array
    console.log(selectedDays)
    const [modalData, setModalData] = useState<Doctor | null>(null)
    const { user } = useAuth()
    const { data: clinic, isLoading: clinicLoading, } = useQuery({
        queryKey: ["clinics"],
        queryFn: async () => {
            const result = await axios.get(`https://smartcare-server.vercel.app/clinic?userEmail=${user?.email}`)
            return result.data
        },
        enabled: user ? true : false
    })

    const { data: doctors, isLoading: doctorLoading, refetch } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
            const result = await axios.get(`https://smartcare-server.vercel.app/doctors?id=${clinic._id}`)
            return result.data
        },
        enabled: !clinicLoading
    })
    if (doctorLoading) {
        console.log('Loading')
    }
    console.log(doctors);

    const handleTriggerImage = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault()
        inputElement.current?.click()
    }
    const handleImage = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0]
        if (!file) return
        const formData = new FormData()
        formData.append("image", file)
        setImage(formData)
        const url = URL.createObjectURL(file)
        setImageUrl(url)
        console.log(url)


    }

    const handleModal = (doctor: Doctor) => {
        modalElement.current?.showModal()
        setModalData(doctor)
        const days = doctor.selectedDays.split(",") // string
        setSelectedDays(days)
    }
    const handleDays = (day: string) => {
        // check if it already exist or not
        if (selectedDays.includes(day)) { // true
            const newSelectedDays = selectedDays.filter(item => item !== day)
            setSelectedDays(newSelectedDays)
        }
        else {
            setSelectedDays([...selectedDays, day])
        }
    }


    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const toastId = toast.loading("Deleting")
                try {
                    const { data: result } = await axios.delete(`https://smartcare-server.vercel.app/doctor/${id}`)

                    if (result.deletedCount !== 1) {
                        toast.dismiss(toastId)
                        throw new Error("Something went wrong")
                    }
                    await refetch()
                    toast.dismiss(toastId)
                    toast.success("Deleted")

                } catch {
                    toast.dismiss(toastId)
                    toast.error("Something went wrong")

                }
            }
        });

    }

    const handleUpdate = async (e: React.SyntheticEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        modalElement.current?.close()
        const toastId = toast.loading("Updating")

        const formData = Object.fromEntries(new FormData(e.currentTarget))

        formData.selectedDays = selectedDays.join(",")
        if (!formData.availableFrom) {
            formData.availableFrom = modalData?.availableFrom || ''
        }
        if (!formData.availableTo) {
            formData.availableTo = modalData?.availableTo || ''
        }
        if (!image) {
            formData.image = modalData?.image || ""
        }
        try {
            if (image) {
                const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`, image)
                const photoUrl = data.data.url
                formData.image = photoUrl
            }

            const { data: result } = await axios.patch(`https://smartcare-server.vercel.app/doctor`, { id, formData })
            if (result.modifiedCount !== 1) {
                toast.dismiss(toastId)
                throw new Error("Something went wrong")
            }
            await refetch()
            setImage(null)
            setModalData(null)
            toast.dismiss(toastId)
            toast.success("Updated successfully")
        } catch(error) {
            toast.dismiss(toastId)
            toast.error("Something went wrong")
            console.log(error)
        }


        console.log(formData.availableFrom)
        console.log(formData)
    }



    return (
        <div>
            <Toaster />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {doctors?.map((doctor: Doctor) => (
                    <div
                        key={doctor.name}
                        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                        {/* Doctor Image */}
                        <div className="relative">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="h-72 w-full object-cover"
                            />

                            <div className="absolute right-4 top-4 rounded-full bg-[#FF0000] px-4 py-1 text-sm font-semibold text-white shadow">
                                ৳{doctor.fee}
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Doctor Info */}
                            <h2 className="text-2xl font-bold text-gray-900">
                                {doctor.name}
                            </h2>

                            <p className="mt-1 text-sm font-medium text-[#FF0000]">
                                {doctor.degree}
                            </p>

                            {/* Clinic */}
                            <div className="mt-5 rounded-xl bg-red-50 p-3">
                                <p className="text-xs text-gray-500">Clinic</p>
                                <p className="font-semibold text-gray-800">
                                    {doctor.clinicName}
                                </p>
                            </div>

                            {/* Availability */}
                            <div className="mt-5 flex items-center justify-between text-sm">
                                <span className="text-gray-500">Available</span>

                                <span className="font-semibold text-gray-800">
                                    {doctor.availableFrom} - {doctor.availableTo}
                                </span>
                            </div>

                            {/* Working Days */}
                            <div className="mt-5">
                                <p className="mb-2 text-sm text-gray-500">Working Days</p>

                                <div className="flex flex-wrap gap-2">
                                    {doctor.selectedDays.split(",").map((day) => (
                                        <span
                                            key={day}
                                            className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-[#FF0000]"
                                        >
                                            {day}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-6 flex gap-3">
                                <button onClick={() => handleModal(doctor)} className="flex-1 rounded-xl bg-[#FF0000] py-3 font-semibold text-white transition hover:bg-red-700">
                                    Update
                                </button>

                                <button onClick={() => handleDelete(doctor._id)} className="rounded-xl border border-[#FF0000] px-5 py-3 font-semibold text-[#FF0000] transition hover:bg-red-50">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <dialog ref={modalElement} className="modal">
                <div className="modal-box max-w-3xl">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>

                    <h2 className="mb-6 text-2xl font-bold">
                        Update Doctor Information
                    </h2>
                    {
                        modalData &&
                        <form onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => handleUpdate(e, modalData?._id)} className="space-y-5">

                            {/* Doctor Image */}
                            <div className="flex flex-col items-center gap-3">
                                <div className='relative'>
                                    <img
                                        src={imageUrl || modalData?.image}
                                        alt={modalData?.name}
                                        className="h-28 w-28 rounded-full object-cover border-4 border-red-100"
                                    />
                                    <button type='button' onClick={handleTriggerImage} className='absolute top-0 right-0 rounded-full flex items-center justify-center bg-white border border-dashed border-red-600 text-red-600 h-8 w-8'><Plus size={16} /></button>
                                </div>
                                <input onChange={handleImage}
                                    ref={inputElement}
                                    type="file"
                                    className='h-0 w-0 '

                                />



                            </div>

                            {/* Name & Degree */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div>
                                    <label className="label">
                                        <span className="label-text">Doctor Name</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={modalData?.name}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Degree</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="degree"
                                        defaultValue={modalData?.degree}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                            </div>

                            {/* Clinic & Fee */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div>
                                    <label className="label">
                                        <span className="label-text">Clinic Name</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="clinicName"
                                        defaultValue={modalData?.clinicName}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Consultation Fee</span>
                                    </label>

                                    <input
                                        type="number"
                                        name="fee"
                                        defaultValue={modalData?.fee}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                            </div>

                            {/* Time */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div>
                                    <label className="label">
                                        <span className="label-text">Available From {`(${modalData?.availableFrom})`}</span>
                                    </label>

                                    <input
                                        type="time"
                                        name="availableFrom"
                                        // defaultValue={modalData ? format(modalData?.availableFrom, "k:m") : ""}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Available To {`(${modalData?.availableTo})`}</span>
                                    </label>

                                    <input
                                        type="time"
                                        name="availableTo"
                                        // defaultValue={modalData ? format(modalData?.availableTo, "k:m") : ""}
                                        className="input input-bordered w-full"
                                    />
                                </div>

                            </div>

                            {/* Days */}
                            <div>
                                <label className="label">
                                    <span className="label-text">Available Days</span>
                                </label>

                                <div className="flex flex-wrap justify-center gap-2 md:justify-between">
                                    {days.map((day) => {
                                        const isDay = !!selectedDays.includes(day);

                                        return (
                                            <button
                                                key={day}
                                                onClick={() => handleDays(day)} // "sun"
                                                type="button"
                                                className={`w-12 rounded-full border py-2 text-sm shadow transition
                  ${isDay
                                                        ? "bg-red-600 text-white border-red-600"
                                                        : "bg-white hover:bg-red-50"
                                                    }`}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Hidden clinic id */}
                            <input
                                type="hidden"
                                name="clinicId"
                                defaultValue={modalData?.clinicId}
                            />

                            {/* Submit */}
                            <button
                                type="submit"
                                className="btn w-full bg-red-600 text-white hover:bg-red-700"
                            >
                                Update Doctor
                            </button>

                        </form>
                    }

                </div>
            </dialog>
        </div>
    );
};

export default Doctors;