import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function RootLayout() {
    return (
        <div className='flex flex-col min-h-screen'>
            <NavBar />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}