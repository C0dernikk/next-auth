"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";

export default  function UserProfile({params}: any) {
  const { id } = params

  const router = useRouter()

    const logout = async () => {
        try {   
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
            
        }
    }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1>Profile</h1>
      <p>Profile page <span
      className="px-4 py-2 bg-amber-600 text-white rounded-lg"
      >{id}</span></p>
      <button
            className="bg-blue-300 hover:bg-blue-600 mt-4 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={logout}
            >Logout</button>
    </div>
  );
}
