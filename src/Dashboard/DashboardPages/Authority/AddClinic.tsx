import axios from 'axios';
import { Plus } from 'lucide-react';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast, { Toaster } from "react-hot-toast"
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const AddClinic = () => {
    const axiosSecure = useAxiosSecure()
    const inputElement = useRef<HTMLInputElement | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [image, setImage] = useState<object | null>(null)
    const { user } = useAuth()

    // get the data by providing userEmail (if no userEmail , dont call the api use *enable*)

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["clinics"],
        queryFn: async () => {
            const result = await axios.get(`https://smartcare-server.vercel.app/clinic?userEmail=${user?.email}`)
            return result.data
        },
        enabled: user ? true : false


    })
    if (isLoading) {
        return <span className="loading loading-bars loading-xl"></span>
    }
    console.log(data)




    const handleImage = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        setImageUrl(url)
        const formData = new FormData()
        formData.append("image", file)
        setImage(formData)
        // console.log(import.meta.env.VITE_imgbb_api)
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const toastId = toast.loading("Loading")
        try {
            const formData = Object.fromEntries(new FormData(e.currentTarget))
            console.log(formData)
            // console.log(image)
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api}`, image)
            const photoUrl = data.data.url
            formData.image = photoUrl
            formData.userEmail = user?.email || ''
            formData.status = 'pending'

            console.log(formData)


            await axiosSecure.post("/clinics", formData)
            await refetch()
            toast.dismiss(toastId)
            toast.success("Successful")

        }
        catch {
            toast.dismiss(toastId)
            toast.error('Something went wrong')
        }

    }




    return (
        <div className="min-h-screen flex items-center justify-center p-6 max-w-3xl w-full">
            <Toaster />
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6 text-red-600">Add Clinic</h2>

                {!data ?
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            <label className="block mb-1 font-medium">Clinic Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Clinic Name"
                                required
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Location</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="City, Address"
                                required
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Contact Number</label>
                            <input
                                type="tel"
                                name="contact"
                                placeholder="0123456789"
                                required
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Description (optional)</label>
                            <textarea
                                name="description"
                                placeholder="Short description (optional)"
                                className="w-full border rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                Add Clinic
                            </button>
                        </div>
                    </form> :


                    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-4">
                        {/* Image */}
                        <div className="relative">
                            <img
                                src="https://i.ibb.co/nXv4Y09/logo.png"
                                alt="Tasha Macias"
                                className="w-full h-56 object-cover"
                            />

                            <span className="absolute top-4 right-4 bg-[#FF0000] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
                                {data.status}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Tasha Macias
                                </h2>
                                <p className="text-gray-500">
                                    Et provident dolor
                                </p>
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                                Eveniet voluptate a
                            </p>

                            <div className="space-y-2 border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-500">📞 Contact</span>
                                    <span className="text-gray-800">
                                        +1 (803) 764-8355
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-500">✉️ Email</span>
                                    <span className="text-gray-800 text-sm">
                                        authority@demo.com
                                    </span>
                                </div>
                            </div>

                            <button className="w-full bg-[#FF0000] hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-300">
                                Contact Now
                            </button>
                        </div>
                    </div>

                }
            </div>
        </div>
    );
};

export default AddClinic;