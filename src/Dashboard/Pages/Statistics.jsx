import { BarChart } from "../BarChart";
import { ParcelsChart } from "../ParcelsChart";


export default function Statistics() {

  return (
    <>
    <div className="bg-[#f1f8e9] fixed w-full h-full top-0 left-0 right-0 bottom-0 -z-30"> </div>
    <BarChart/>
    <ParcelsChart/>
    
    </>
  )
}
