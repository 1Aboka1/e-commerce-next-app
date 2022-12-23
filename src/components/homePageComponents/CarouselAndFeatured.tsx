import { Carousel as ReactCarousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const CarouselAndFeatured = () => {
    return (
	<div>
	    <Carousel/>
	</div>
    )
}

const Carousel = () => {
    return (
	<div>
	    <ReactCarousel>
		<div className="">
		    <p>dfdsfsdf</p>
		</div>
		<div>
		    <p>dfdsfsdf</p>
		</div>
	    </ReactCarousel>
	</div>
    )
}

const Featured = () => {
    return (
	<div>

	</div>
    )
}

export default CarouselAndFeatured
