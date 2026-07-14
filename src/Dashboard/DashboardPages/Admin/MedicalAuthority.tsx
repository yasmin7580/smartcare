import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ArrowUpSquare } from 'lucide-react';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
type Clinic = {
    _id: string,
    name: string,
    contact: number,
    location: string,
    description: string,
    status: string,
    userEmail: string,
    image: string
}



const MedicalAuthority = () => {

    const { data: clinics,  refetch } = useQuery({
        queryKey: ["medical-authority"],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/clinics?status=pending`)
            return result.data
        }
    })
    console.log(clinics)

    const handleStatus = async (id: string, status: string) => {
        const toastId = toast.loading("Updating")
        try {
            await axios.patch("http://localhost:8000/clinic", { id, status })
            await refetch() // done
            toast.dismiss(toastId)
            toast.success(status)
        }
        catch {
            toast.error("Something Went wrong")
        }
    }

    return (

        <div className='grid grid-cols-4 gap-3'>
            <Toaster />
            {clinics?.map((clinic: Clinic) => (
                <div
                    key={clinic._id}
                    className="max-w-sm rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg "
                >

                    <img
                        src={clinic.image}
                        alt={clinic.name}
                        className="h-52 w-auto object-cover mx-auto"
                    />

                    <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">{clinic.name}</h2>

                            <span className="badge bg-yellow-100 text-yellow-700 border-yellow-300 capitalize">
                                {clinic.status}
                            </span>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <p>
                                <span className="font-semibold">📍 Location:</span> {clinic.location}
                            </p>

                            <p>
                                <span className="font-semibold">📞 Contact:</span> {clinic.contact}
                            </p>

                            <p>
                                <span className="font-semibold">✉️ Email:</span> {clinic.userEmail}
                            </p>

                            <p>
                                <span className="font-semibold">📝 Description:</span>
                            </p>

                            <p>{clinic.description}</p>
                        </div>

                        <div className="flex gap-3 pt-3">
                            <button onClick={() => handleStatus(clinic._id, "VERIFIED")} className="btn flex-1 bg-[#FF0000] border-none text-white">
                                Accept
                            </button>

                            <button onClick={() => handleStatus(clinic._id, "REJECTED")} className="btn btn-outline flex-1 border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000] hover:text-white">
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MedicalAuthority;