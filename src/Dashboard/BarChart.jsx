
import { Chart } from "react-google-charts";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


export function BarChart() {
    const axiosSecure = useAxiosSecure()

    const { data = [] } = useQuery({
        queryKey: ['booking-by-date'],
        queryFn : async () => {
    
          const res = await axiosSecure.get(`/booking-by-date`);
          return res.data;
        }
      })

    const options = {
        title: "Bookings By DATE",
        chartArea: { width: "50%" },
        backgroundColor: '#f1f8e9'
      };

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
      legendToggle
    />
  );
}