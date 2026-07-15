import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';
type Clinic = {
    _id: string;
    contact: string;
    description: string;
    image: string;
    location: string;
    name: string;
    status: string;
    userEmail: string;
};
const Clinics = () => {
    const [search, setSearch] = useState<string>("")
    const { data: clinics = [], isLoading, isFetching } = useQuery({
        queryKey: ["clinic", search],
        queryFn: async ({ signal }) => {
            const { data } = await axios.get("http://localhost:8000/clinics?status=VERIFIED", {
                params: { name: search },
                signal,
            })
            return data
        },
        placeholderData: keepPreviousData,
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearch(e.currentTarget?.value)
    }

    return (
        <div>
            <div className="max-w-md w-full mx-auto my-10">
                <div className="relative">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        onChange={handleSearch}
                        value={search}
                        type="text"
                        placeholder="Search clinics..."
                        className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    />
                </div>
                {isFetching && <p className="mt-2 text-sm text-gray-500">Searching clinics...</p>}
            </div>
            {isLoading && clinics.length === 0 ?
                <p className="text-center text-gray-500">Loading clinics...</p> : clinics.length === 0 ?
                    <h1 className="text-center text-gray-500">No clinics found.</h1> :



                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {clinics.map((clinic: Clinic) => (
                            <div
                                key={clinic.userEmail}
                                className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition"
                            >
                                <img
                                    src={clinic.image}
                                    alt={clinic.name}
                                    className="h-48  object-cover mx-auto"
                                />

                                <div className="p-5 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold">{clinic.name}</h2>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${clinic.status === "VERIFIED"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {clinic.status}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm">
                                        {clinic.description}
                                    </p>

                                    <div className="space-y-2 text-sm">
                                        <p>
                                            <span className="font-semibold">📍 Location:</span>{" "}
                                            {clinic.location}
                                        </p>

                                        <p>
                                            <span className="font-semibold">📞 Contact:</span>{" "}
                                            {clinic.contact}
                                        </p>

                                        <p className="break-all">
                                            <span className="font-semibold">✉️ Email:</span>{" "}
                                            {clinic.userEmail}
                                        </p>
                                    </div>
                                    <Link to={`/clinic/${clinic._id}`} className='btn bg-red-600 text-white w-full'>View</Link>
                                </div>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
};

export default Clinics;
