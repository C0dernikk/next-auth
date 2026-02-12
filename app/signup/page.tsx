"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function SignUpUser(){
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    })
    
    const buttonDisabled = !user.email || !user.password || !user.username

    //No need to create a state and use useEffect
    // const [buttonDisabled, setButtonDisabled] = useState(false)

    // useEffect(() => {
    //     if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
    //         setButtonDisabled(false)
    //     }else{
    //         setButtonDisabled(true)
    //     }
    // }, [user])
    const [loading, setLoading] = useState(false)
    //log messages of client are availabe in clients browser and of server are availabe in terminal of vs code or server's terminal
    const handleSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            toast.success("Registered Successfully")
            router.push("/login")
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message)
            
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <Toaster />
            <div className="w-1/2 h-3/5 outline-amber-50 rounded-3xl border-amber-200 p-2 flex flex-col items-center">
                <div className="mb-4 w-full flex justify-center">
                    <h1 className="font-semibold text-2xl">{loading ? "Processing" : "Signup"}</h1>
                </div>
                <div className="w-full">
                    <label className="block my-2" htmlFor="username">Username</label>
                    <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                transition"
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>
                <div className="w-full">
                    <label className="block my-2" htmlFor="email">Email</label>
                    <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                transition"
                    type="text"
                    id="email"
                    placeholder="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="w-full">
                    <label className="block my-2" htmlFor="password">Password</label>
                    <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                transition"
                    type="password"
                    id="password"
                    placeholder="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <div className="w-full flex flex-col mt-6">
                    <button
                    disabled={buttonDisabled}
                    className={`py-2 px-6 rounded-2xl ${
                    buttonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-400 hover:bg-blue-600"
                    }`}
                    onClick={handleSignup}
                    >Submit credentials</button>
                    <div className="flex w-full justify-between mt-2">
                    <Link href="/login">Already have an account?</Link>
                    <Link href="/forgotPassEmail">Forgot Password</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}