
import { Chart } from "react-google-charts";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const options = {
  title: "Parcels Analytics",
  is3D: true,
  backgroundColor: '#f1f8e9',
  
};

export function ParcelsChart() {
    const axiosSecure = useAxiosSecure()

    const { data = [] } = useQuery({
        queryKey: ['parcels-analytics'],
        queryFn : async () => {
    
          const res = await axiosSecure.get(`/parcels-analytics`);
          return res.data;
        }
      })

  return (
    <div>
        <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />

   <section className="flex gap-4 justify-center items-center text-sm md:text-lg flex-wrap">
    {data?.slice(1).map(item =>  <h2 key={item[0]}> {item[0]} :  <span className="font-semibold text-[#014BA0]"> {item[1]} </span> </h2>)}
    </section>

    </div>
  );
}
