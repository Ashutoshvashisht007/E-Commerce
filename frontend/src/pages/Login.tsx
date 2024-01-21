import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react"
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc"
import { auth } from "../Firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { messageResponse } from "../types/api_types";

const Login = () => {

    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");

    const [login] = useLoginMutation();

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();

            const { user } = await signInWithPopup(auth, provider);

            const res = await login({
                name: "asidgj",
                email: "Asigih",
                photo: "asdguh",
                gender,
                role: "user",
                dob: date,
                _id: "asdgas",
            });

            if ("data" in res) {
                console.log(res.data);
                toast.success(res.data.message);
            } else {
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as messageResponse)?.message || "Unknown error";
                console.log(message);
                toast.error(message);
            }
            console.log(user);
        } catch (error) {
            toast.error("Sign in Failed");
        }
    }

    return (
        <div className='login'>
            <main className="loginForm">
                <h1>LOGIN</h1>
                <div>
                    <label>Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div className="loginBtn">
                    <p>Already Signed In Once</p>
                    <button onClick={loginHandler}>
                        <FcGoogle />
                        <span>Sign in with Google</span>
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login