import axios from "axios";

 export const axiosPublic = axios.create({
    baseURL: 'https://rapid-parcel-server.vercel.app'
})

export default function useAxiosPublic() {
    return axiosPublic;
 
}
