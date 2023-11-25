import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useAllDeliveryMan() {

  const axiosSecure = useAxiosSecure();

    const { data: allDeliveryMan =[], isLoading, refetch } = useQuery({
        queryKey: ['all-delivery-man'],
        queryFn: async () => {
          const data = await axiosSecure.get(`/all-delivery-man`);
          return data.data;
        }
      })
      return { allDeliveryMan, isLoading, refetch };
}
