import axios from "axios"


const axiosSecure = axios.create({
    baseURL: 'https://rapid-parcel-server.vercel.app',
    withCredentials: true,
})

export default function useAxiosSecure() {

  return axiosSecure;
}