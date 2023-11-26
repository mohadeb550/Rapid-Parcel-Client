
import useMyReviews from "../../Hooks/useMyReviews";
import ReviewCard from "../ReviewCard";


export default function MyReviews() {

    const { allReviews } = useMyReviews();

  return (
    <section className="space-y-5 md:space-y-8">
        <div className="flex justify-center items-center mb-8">
   <h2 className="text-2xl md:text-3xl font-extrabold text-gray-500 font-play"> Your Reviews 🎈🎈</h2>
   </div>
        {/* card */}
        {allReviews?.map(review => <ReviewCard key={review._id} review={review} />)}

    </section>
  )
}
