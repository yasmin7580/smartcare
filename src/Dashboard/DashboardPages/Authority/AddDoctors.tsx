import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Plus } from 'lucide-react';
import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import { format } from 'date-fns'

// 1-doctors name 
// 2-doctors image
// 3-doctors category
// 4-Degree
// 5- fee
// Available at 
// 
const doctorCategories = [
    "Cardiologist",
    "Orthopedic",
    "Neurologist",
    "Dermatologist",
    "Pediatrician",
    "Gynecologist",
    "Psychiatrist",
    "Ophthalmologist",
    "ENT Specialist",
    "Dentist",
    "General Physician",
];
const days = [
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
];

const AddDoctors = () => {
    const inputElement = useRef<HTMLInputElement | null>(null)
    const { user } = useAuth() // undefined = true = false 

    const [image, setImage] = useState<FormData | null>(null)
    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const [imageUrl, setImageUrl] = useState<string>()

    const handleDays = (day: string) => {

        const hasDay = selectedDays.find((d) => d === day)
        if (hasDay) {
            const newDays = selectedDays.filter((item) => item !== day)
            setSelectedDays(newDays)
        }
        else {
            setSelectedDays([...selectedDays, day])
        }
    }
    console.log(selectedDays)

    // check if the user has any clinic or not

    const { data: clinic, isLoading } = useQuery({
        queryKey: ['clinic', user?.email],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/clinic?userEmail=${user?.email}`)
            return result.data
        },
        enabled: !!user
    })
    if (isLoading) {
        return <div className='flex items-center justify-center h-dvh'><span className="loading loading-bars loading-xl"></span></div>
    }
    if (!clinic) {
        return <div className=''><h1>You have to add clinic first</h1><Link to={"/dashboard/add-clinic"} className='btn btn-primary mx-auto'>Add Clinic</Link></div>
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




    const handleDoctors = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(selectedDays.length === 0){
            toast.error("Please select Days")
        }
        const toastId = toast.loading('Adding Doctor')
        const formData = Object.fromEntries(new FormData(e.currentTarget)) // image file => url
        const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`, image)
        const photoUrl = data.data.url
        formData.image = photoUrl
        formData.clinicName = clinic.name
        formData.clinicId = clinic._id
        formData.selectedDays = selectedDays.join(",")
        const from = format(new Date(`1970-01-01T${formData.availableFrom}`),"p")
        const to = format(new Date(`1970-01-01T${formData.availableTo}`),"p")
        formData.availableFrom = from
        formData.availableTo = to
        console.log(formData)

        try {
            const { data: result } = await axios.post("http://localhost:8000/doctor", formData)
            if (!result.insertedId) {
                throw new Error("Something Went Wrong")
            }
            // await refetch()
            toast.dismiss(toastId)
            toast.success("Added")
        }
        catch {
            toast.error("Something went wrong")
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <Toaster/>
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6 text-red-600">Add Doctor</h2>

                <form
                    onSubmit={handleDoctors}
                    className="space-y-5">


                    <div>
                        <label> Profile Image</label>
                        <div className='flex gap-3 items-center'>

                            <div
                                onClick={() => inputElement.current?.click()}
                                className={`${!imageUrl ? "border" : ""} h-18 w-18  rounded-full flex items-center justify-center border-red-600 border-dashed`}>
                                {imageUrl ?
                                    <img className='h-18 w-18 object-cover rounded-full' src={imageUrl} alt="" /> :
                                    <Plus className='text-red-600' />
                                }
                            </div>
                            <input
                                required
                                ref={inputElement}
                                onChange={handleImage}
                                type="file"
                                name='image'
                                placeholder='Enter your image'
                                className=' border h-0 w-0 border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-[#00d3f2]'
                            />



                        </div>

                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Doctor's Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Dr. Jane Doe"
                            required
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Category</label>
                        <select
                            // value={user.category ?? ""}
                            // onChange={(e) => handleCategoryChange(user.email, e.target.value)}
                            className="select select-bordered w-full px-3 py-5 border border-black"
                        >
                            <option value="">Select Category</option>

                            {doctorCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Degree</label>
                        <input
                            type="text"
                            name="degree"
                            placeholder="MBBS, MD, etc."
                            required
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Fee</label>
                        <input
                            type="number"
                            name="fee"
                            placeholder="1000"
                            required
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-2'>
                        <div>

                            <label className="block mb-2 font-medium">Available  From</label>
                            <input
                                type="time"
                                name="availableFrom"
                                placeholder="Clinic name or location"
                                required
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <div>

                            <label className="block mb-2 font-medium">Available  To</label>
                            <input
                                type="time"
                                name="availableTo"
                                placeholder="Clinic name or location"
                                required
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        {
                            days.map(day => {
                                const isDay = !!selectedDays.includes(day)
                                return <button onClick={() => handleDays(day)} type='button' className={`shadow rounded-full text-center w-12 ${isDay ? "bg-red-600 text-white" : ""}`}>{day}</button>
                            })
                        }

                    </div>


                    <div>
                        <button
                            // onClick={handleDoctors}
                            type="submit"
                            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Add Doctor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDoctors;