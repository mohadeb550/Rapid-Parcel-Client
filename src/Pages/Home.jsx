import Banner from "../Components/Banner";
import Insights from "../Components/Insights";
import OurFeatures from "../Components/OurFeatures";


export default function Home() {

  return (
    <>
    <Banner/>

    <section className="md:px-6 lg:px-4 xl:px-0">

    <OurFeatures/>
    <Insights/>
    </section>
    </>
  )
}
