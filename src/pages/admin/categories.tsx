import type {ReactElement} from "react"
import MainLayout from "../../components/layouts/admin/MainLayout"

const Categories = () => {
    return(
	<div className="flex flex-row">
	    Categories page
	</div>
    )
}

Categories.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>
    )
}

export default Categories
