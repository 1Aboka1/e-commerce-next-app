import type {ReactElement} from "react"
import MainLayout from "../../../components/layouts/admin/MainLayout"

const Products = () => {
    return(
	<div className="flex flex-row">
	    Products page
	</div>
    )
}

Products.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>
    )
}

export default Products
