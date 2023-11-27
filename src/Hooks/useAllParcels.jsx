import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export default function useAllParcels( startDate , endDate ) {

  const axiosSecure = useAxiosSecure();

    const { data: allParcels =[], isLoading, refetch } = useQuery({
        queryKey: ['all-parcels'],
        queryFn: async () => {
          const data = await axiosSecure.get(`/all-parcels?start=${startDate}&end=${endDate}`);
          return data.data;
        }
      })
      return { allParcels, isLoading, refetch };
}
