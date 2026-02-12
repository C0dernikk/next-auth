"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";



export default function Profile(){
    const router = useRouter()

    const logout = async () => {
        try {   
            await axios.get('api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
            
        }
    }
    const [data, setData] = useState("Nothing")
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res);
        setData(res.data.data._id)
    }
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <Toaster />
            <h1>Profile</h1>
            <p>Profile page</p>
            <h2>{data === "Nothing" ? "Nothing" : 
                <Link
                className="bg-green-400 hover:bg-green-500 px-2 py-1 rounded-lg"
                href={`/profile/${data}`}
                >{data}</Link>
                }</h2>
            <hr />
            <button
            className="bg-blue-300 hover:bg-blue-600 mt-4 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={logout}
            >Logout</button>
            <button
            className="bg-green-400 hover:bg-green-500 mt-4 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={getUserDetails}
            >GetUser Details</button>
        </div>
    )
}   