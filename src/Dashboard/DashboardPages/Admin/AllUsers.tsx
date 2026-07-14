import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import toast, { Toaster } from 'react-hot-toast';
type User = {
    _id: string;
    name: string;
    email: string;
    photoUrl: string;
    role: string;
    isBlock?: boolean
};



const AllUsers = () => {

    const { data: users, refetch } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/users`)
            return result.data

        }

    })
    console.log(users);

    const handleBlock = async (id: string, status: boolean) => { // current status block
        const toastId = toast.loading(status ? "Unblocking" : "Blocking")
        try {
            const { data: result } = await axios.patch(`http://localhost:8000/user`, { id, status: !status })
            console.log(result);
            if (result.modifiedCount !== 1) {
                toast.dismiss(toastId)
                throw new Error("failed")
            }
            await refetch()
            toast.dismiss(toastId)
            toast.success(status ? "Unblocked" : "Blocked")
        }
        catch {
            toast.error('Something went wrong')
        }

    }

    // console.log(data);

    return (
        <div>
            <Toaster />
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {users?.map((user: User) => {
                    const isBlock = user.isBlock ?? false;

                    return (
                        <div
                            key={user.email}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-4 border-b bg-[#FF0000] px-5 py-4">
                                <img
                                    src={user.photoUrl}
                                    alt={user.name}
                                    className="h-16 w-16 rounded-full border-2 border-white object-cover"
                                />

                                <div className="min-w-0 text-white">
                                    <h2 className="truncate text-lg font-bold">{user.name}</h2>
                                    <p className="truncate text-sm text-red-100">{user.email}</p>
                                </div>
                            </div>

                            {/* Table-like Body */}
                            <div className="divide-y">
                                <div className="flex items-center justify-between px-5 py-3">
                                    <span className="font-medium text-gray-500">Role</span>
                                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold capitalize text-[#FF0000]">
                                        {user.role}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between px-5 py-3">
                                    <span className="font-medium text-gray-500">Status</span>

                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-semibold ${isBlock
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {isBlock ? "Blocked" : "Active"}
                                    </span>
                                </div>

                                <div className="flex items-start justify-between gap-4 px-5 py-3">
                                    <span className="font-medium text-gray-500">Email</span>

                                    <span className="max-w-[60%] break-all text-right text-sm">
                                        {user.email}
                                    </span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t p-4">
                                <button onClick={() => handleBlock(user._id, isBlock)}

                                    className={`btn w-full border-none text-white ${isBlock
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-[#FF0000] hover:bg-red-700"
                                        }`}
                                >
                                    {isBlock ? "Unblock User" : "Block User"}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );
};

export default AllUsers;