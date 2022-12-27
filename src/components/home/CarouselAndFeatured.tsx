import Image from "next/image"
import { Carousel as ReactCarousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import PartsImage from '../../assets/parts.png'
import HouseholdAppliancesImage from '../../assets/householdappliances.png'

const CarouselAndFeatured = () => {
    return (
	<div className="flex flex-row space-x-4 py-5">
	    <Carousel/>
	    <Featured/>
	</div>
    )
}

const Carousel = () => {
    return (
	<div className="basis-3/4 rounded-xl">
	    <ReactCarousel infiniteLoop interval={5000} autoPlay showStatus={false} stopOnHover={false} transitionTime={500}>
		<div className="flex flex-row bg-gradient-to-br from-cyan-200 to-blue-500 rounded-xl items-center px-4">
		    <Image className="" src={HouseholdAppliancesImage} alt='Бытовые товары'/>
		    <div className="basis-3/4 space-y-2">
			<p className="text-white font-bold text-4xl">Доставим быстро</p>
			<p className="text-white font-medium text-lg">Оформляйте покупки за 5 минут</p>
		    </div>
		</div>
		<div className="flex flex-row rounded-xl bg-gradient-to-br from-gray-600 to-gray-900 items-center px-4 h-full">
		    <div className="space-y-2 basis-3/4">
			<p className="text-white font-bold text-4xl">Широкий ассортимент</p>
			<p className="text-white font-medium text-lg">Запчасти для любой бытовой техники</p>
		    </div>
		    <Image className="" src={PartsImage} alt='Бытовые товары'/>
		</div>
	    </ReactCarousel>
	</div>
    )
}

const Featured = () => {
    return (
	<div className="basis-1/4">
	    <ReactCarousel infiniteLoop interval={5000} autoPlay showStatus={false} stopOnHover={false} transitionTime={500}>
		
	    </ReactCarousel>
	</div>
    )
}

export default CarouselAndFeatured
