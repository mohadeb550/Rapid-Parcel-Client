

export default function Pagination({pageArray, currentPage, setCurrentPage }) {

	const handlePrev = () => {
		if(0 < currentPage){
			setCurrentPage(currentPage -1)
		}
	}
	const handleNext = () => {
		if( pageArray[pageArray.length - 1] >  currentPage){
			setCurrentPage(currentPage + 1)
		}
	}

  return (

<div className="mx-auto mb-14">

	<nav aria-label="Page navigation example" className="flex justify-center items-center">
		<ul className="inline-flex">
			<li onClick={handlePrev}
			className="bg-white border border-gray-300 border-l-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-sm leading-tight py-2 px-6 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">Previous
			</li>
			
			{pageArray.map(page => <li onClick={()=> setCurrentPage(page)} key={page} className={` hover:opacity-90 border leading-tight py-2 px-6 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer ${currentPage === page && 'text-gray-200 bg-[#014BA0] border-0'}`} > {page +1}
			</li> )}

			<li onClick={handleNext} className="bg-white border border-gray-300 border-r-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-sm leading-tight py-2 px-7 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">Next
			</li>
		</ul>
	</nav>

	
</div>
  )
}
