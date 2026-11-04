import AboutUs from "@/components/AboutUs"
import HeroBanner from "@/components/Banner"
import BrowseCategories from "@/components/BrowseCategories"
import Footer from "@/components/Footer"
import HowItWorks from "@/components/HowItWorks"
import Navbar from "@/components/Navbar"



export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <HeroBanner />
      <BrowseCategories/>
      <HowItWorks/>
      <AboutUs/>
      <Footer/>
    </div>
  )
}
