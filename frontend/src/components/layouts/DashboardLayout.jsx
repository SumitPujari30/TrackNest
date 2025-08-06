import React, { useContext } from "react"
import { UserContext } from "../../context/userContext"
import Navbar from "./Navbar"
import SideMenu from "./SideMenu"

const DashboardLayout = ({ children, activeMenu }) => {
    const {user} = useContext(UserContext);
    if (user === null) {
        return <div className="text-center py-10 text-lg" >Loading...</div>
    }
    if (!user) {
        return <div className="text-center mt-10">Please log in to access the dashboard.</div>
    }
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className='flex'>
            <div className='max-[1080px]:hidden'>
                <SideMenu activeMenu={activeMenu} />
            </div>
            
            <div className='grow mx-5 '>{children}</div>
        </div>
      )}
    </div>
  )
}

export default DashboardLayout
