import { Link } from "react-router-dom";


export default function NotFound() {

  return (
 
<div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center md:pt-40 lg:pt-64">
    <div className="bg-white border border-gray-200 flex flex-col mb-80 items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
      
        <img src="https://i.ibb.co/mN1k2c8/569847135545c215c70905a17e055c4b.jpg" className="md:max-w-[550px]" />
       
        <Link to='/' className="flex items-center space-x-2 bg-lime-600 hover:bg-lime-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150" title="Return Home">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
            </svg>
            <span>Return Home</span>
        </Link>
    </div>
</div>
  )
}
