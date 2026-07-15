import { useState } from "react";
import { Pencil, Save } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../../firebase.init";

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    photoUrl: string;
    isBlock: boolean;
};

const UserProfile = () => {
    const { user: theUser } = useAuth()
    console.log(theUser)
    const { data: user, isLoading, refetch } = useQuery({
        queryKey: [theUser],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8000/user?email=${theUser?.email}`)
            return data
        },
        enabled: !!theUser
    })


    const [isEdit, setIsEdit] = useState(false); // form modal 
    const [preview, setPreview] = useState(user?.photoUrl || theUser?.photoURL);
    // console.log(preview)
    const [image, setImage] = useState<FormData | null>(null)

    const handlePhotoChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
        else return
        const formData = new FormData()
        formData.append("image", file)
        setImage(formData)

    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth.currentUser) {
            return
        }
        // const { name } = Object.fromEntries(new FormData(e.currentTarget))
        const name = e.currentTarget.userName.value
        const toastId = toast.loading("Updating")
        console.log(name)
        try {
            let photoUrl
            if (image) {
                const { data } = await axios.post("https://api.imgbb.com/1/upload?key=46cef828a7aeed48196e6dc399220d34", image)
                photoUrl = data.data.url
            }
            await updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl })

            await axios.patch(`http://localhost:8000/userUpdate?email=${user?.email}`, { name: name, photoUrl: photoUrl || user.photoUrl })
            await refetch()
            toast.dismiss(toastId)
            toast.success('Updated')
            setIsEdit(false);


        } catch (error: any) {
            toast.dismiss(toastId)
            toast.error(error.messge || "something went wrong")
        }




    };
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            {!isEdit ? (
                <>
                    <div className="flex items-center gap-5">
                        <img
                            src={preview}
                            alt={user.name}
                            className="h-24 w-24 rounded-full border-4 border-red-600 object-cover"
                        />

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {user.name}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>

                            <span className="mt-2 inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl bg-gray-50 p-4">
                        <p className="text-gray-700">
                            <span className="font-semibold">
                                Account Status:
                            </span>{" "}
                            <span
                                className={
                                    user.isBlock
                                        ? "text-red-600"
                                        : "text-green-600"
                                }
                            >
                                {user.isBlock ? "Blocked" : "Active"}
                            </span>
                        </p>
                    </div>

                    <button
                        onClick={() => setIsEdit(true)}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                        <Pencil size={18} />
                        Edit Profile
                    </button>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center">
                        <img
                            src={preview}
                            alt="preview"
                            className="h-28 w-28 rounded-full border-4 border-red-600 object-cover"
                        />

                        <label className="mt-4 w-full">
                            <span className="mb-2 block font-medium text-gray-700">
                                Change Photo
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-2 text-sm"
                            />
                        </label>
                    </div>

                    <div className="mt-5">
                        <label className="mb-2 block font-medium text-gray-700">
                            Name
                        </label>

                        <input
                            type="text"
                            defaultValue={user.name}
                            name="userName"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="mb-2 block font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                        />
                    </div>

                    <div className="mt-4">
                        <label className="mb-2 block font-medium text-gray-700">
                            Role
                        </label>

                        <input
                            type="text"
                            value={user.role}
                            disabled
                            className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                        />
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button
                            type="submit"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                        >
                            <Save size={18} />
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsEdit(false)}
                            className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UserProfile;