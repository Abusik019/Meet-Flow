import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import googleImg from "../../assets/icons/google.svg";

export const GoogleLoginBtn: React.FC = () => {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                if (tokenResponse.code) {
                    const res = await axios.post(
                        "http://localhost:9090/api/auth/google/callback",
                        { code: tokenResponse.code }
                    );
                    if (res.data.token) {
                        localStorage.setItem("token", res.data.token);
                        window.location.reload();
                    } else {
                        console.warn("No token in response", res.data);
                    }
                }
            } catch (error) {
                console.error("Google login error:", error);
            }
        },
        flow: "auth-code",
    });

    return (
        <button onClick={() => login()} className='w-[50%] py-2 box-border border border-[#eaeaea] flex items-center justify-center gap-2 rounded-lg transition-all hover:bg-[#00000010] cursor-pointer'>
            <img src={googleImg} width={24} height={24} alt="google" />
            <span className='font-medium'>Google</span>
        </button>
    );
};