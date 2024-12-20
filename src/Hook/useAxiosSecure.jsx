import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    useEffect(() => {
        axiosSecure.interceptors.response.use(
            res => {
                return res
            },
            async error => {
                console.log('error cougth from our very own axios interceptor----->',
                    error.response)
                if (error.response.status === 401 || error.response.status === 403) {
                    logOut();
                    navigate("/login")
                }
            }
        )
    }, [logOut, navigate])
    return axiosSecure;
}
export default useAxiosSecure;