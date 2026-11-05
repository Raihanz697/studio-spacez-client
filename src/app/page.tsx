import AboutUs from "@/components/AboutUs"
import HeroBanner from "@/components/Banner"
import BrowseCategories from "@/components/BrowseCategories"

import HowItWorks from "@/components/HowItWorks"




export default function Home() {
  return (
    <div className="relative">
      
      <HeroBanner />
      <BrowseCategories/>
      <HowItWorks/>
      <AboutUs/>
      
    </div>
  )
}
