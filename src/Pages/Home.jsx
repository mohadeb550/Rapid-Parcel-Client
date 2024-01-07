import Banner from "../Components/Banner";
import ContactUs from "../Components/ContactUs";
import Insights from "../Components/Insights";
import OurFeatures from "../Components/OurFeatures";
import TopDeliveryMen from "../Components/TopDeliveryMen";




export default function Home() {

  return (
    <>
    <Banner/>

    <section className="md:px-6 lg:px-4 xl:px-0">

    <OurFeatures/>
    <Insights/>
    <TopDeliveryMen/>
    <div className="relative z-40">
   </div>
    <ContactUs/>
    </section>
    </>
  )
}
