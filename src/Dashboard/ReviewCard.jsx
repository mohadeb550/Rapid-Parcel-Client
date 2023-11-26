import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import Rating from "react-rating";

export default function ReviewCard({review}) {

    const { name, email, image, review_date, rating, feedback_title, feedback_description, deliveryManId} = review ;

  return (
     <div className="border shadow-sm p-5 max-w-5xl mx-auto rounded-md">
            <div className="flex justify-between items-center gap-3 border-b pb-1">
                <div className="flex items-center gap-2">
                    <img className="md:w-28 w-20 object-cover h-20 md:h-28 rounded-full" src="https://i.ibb.co/DRxrXKx/angry-smiley-white-background-vector-illustration-angry-smiley-white-background-114680866.jpg" />
                    <div>
                        <h4 className="md:text-xl font-semibold "> {name} </h4>
                        <p className="text-gray-500"> {review_date} </p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h4 className="md:text-lg "> Rating : {rating} </h4>
                    <div className="my-2 text-2xl text-orange-400">
                 <Rating
            initialRating={rating}
            emptySymbol={<IoMdStarOutline/>}
            fullSymbol={<IoMdStar/>}
          />
        </div>
                </div>
            </div>
            <div className="space-y-3 mt-1">
                <h2 className="md:text-lg font-medium "> {feedback_title} </h2>
                <p className="text-gray-500"> {feedback_description} </p>
            </div>
        </div>
  )
}
