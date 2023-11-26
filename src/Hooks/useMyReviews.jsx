
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function useMyReviews() {

  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth()

    const { data: allReviews =[], isLoading, refetch } = useQuery({
        queryKey: ['my-reviews'],
        queryFn: async () => {
          const res = await axiosSecure.get(`/my-reviews/${currentUser.email}`);
          return res.data[0].my_reviews;
        }
      })
      return { allReviews, isLoading, refetch };
}
