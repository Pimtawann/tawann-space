import { NavBar } from "@/components/NavBar"
import { Footer } from "@/components/Footer"
import NotFound from "@/components/NotFound"
import { useNavigate } from "react-router-dom"

function NotFoundPage () {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-grow pt-11">
            <NotFound 
            title = "Page Not Found"
            onAction = {() => navigate("/")}
            />
            </div>
            
            <Footer />
        </div>
    )
}

export default NotFoundPage