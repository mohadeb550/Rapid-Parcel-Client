import axios from "axios"


const axiosSecure = axios.create({
    baseURL: '',
    withCredentials: true,
})

export default function useAxios() {

  return axiosSecure;
}