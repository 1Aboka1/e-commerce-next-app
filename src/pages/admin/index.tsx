import {ReactElement} from "react"
import Navbar from "../../components/layouts/admin/layoutComponents/Navbar"
import Sidebar from "../../components/layouts/admin/layoutComponents/Sidebar"

const Admin = () => {
    return(
	<div className="flex flex-row bg-white">
	    Admin page
	</div>
    )
}

Admin.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <div className="flex flex-row">
		<Sidebar/>
		<div className="flex flex-col grow">
		    <Navbar/>
		    {page}
		</div>
	    </div>
	</>
    )
}

export default Admin
