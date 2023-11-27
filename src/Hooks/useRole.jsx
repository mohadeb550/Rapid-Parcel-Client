import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useRole() {
    const { currentUser } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data:user ={} , isLoading } = useQuery({
        queryKey: ['role'],
        queryFn: async () => {
           const res = await axiosSecure.get(`/user-role/${currentUser.email}`);
           return res.data;
        }
    })
  return { user , isLoading };
}
