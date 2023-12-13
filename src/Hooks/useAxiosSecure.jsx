import axios from "axios"


const axiosSecure = axios.create({
    // baseURL: 'https://rapid-parcel-server.vercel.app',
     baseURL: 'http://localhost:5000',
    withCredentials: true,
})

export default function useAxiosSecure() {

  return axiosSecure;
}