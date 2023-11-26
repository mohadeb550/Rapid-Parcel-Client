import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useAllDeliveryMan( skip, limit ) {

  const axiosSecure = useAxiosSecure();

    const { data={}, isLoading, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
          const data = await axiosSecure.get(`/all-users?skip=${skip}&limit=${limit}`);
          return data.data;
        }
      })
      return { allUsers : data.allUsers, total: data.totalUsers, isLoading, refetch };
}
