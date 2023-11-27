import { DateRange } from "react-date-range";


export default function ManageDateModal({ openDate, setOpenDate, state, setState}) {

  return (


    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/30 flex justify-center items-center">
       
       <div className="w-[400px] md:w-[500px] p-7 bg-white" >

       
       <DateRange
  editableDateInputs={true}
  onChange={item => setState([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={state}
/>


<button onClick={() => setOpenDate(!openDate)} className="text-white bg-black/80 hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm mt-2 md:ml-3  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Close </button>
</div>
       
       </section>

  )
}
