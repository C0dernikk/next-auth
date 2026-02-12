"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassPage(){
    const router = useRouter();
    const searchParams = useSearchParams();

    const [token, setToken] = useState("");
    const [newPass, setNewPass] = useState("");

    useEffect(() => {
        const urlToken = searchParams.get("token") || "";
        setToken(urlToken);
    }, [searchParams]);

    const updatePassValidateToken = async () => {
        try {
            await axios.post("/api/users/forgotPass", { token, newPass });
            toast.success("Password Changed");
            router.push("/login");
        } catch (error:any) {
            toast.error(error.response?.data?.error || "Something went wrong");
        }
    };

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className="w-1/2 h-3/5 rounded-3xl border p-4 flex flex-col items-center">
                <h1 className="text-4xl mb-4">Update Password</h1>

                <label className="block my-2">Enter new password</label>
                <input
                    className="w-full px-3 py-2 border rounded-lg"
                    type="password"
                    placeholder="Password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                />

                <button
                    onClick={updatePassValidateToken}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Update Password
                </button>
            </div>
        </div>
    );
}
