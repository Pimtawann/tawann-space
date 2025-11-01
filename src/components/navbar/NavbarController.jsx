import PublicNavbar from "./PublicNavbar";
import MemberNavbar from "./MemberNavbar";
import AdminNavbar from "./AdminNavbar";
import { useAuth } from "@/context/authentication";

export default function NavbarController() {
    const { state } = useAuth();
    const user = state.user;

    if (user?.role === "admin") {
        return <AdminNavbar />
    }

    if (user?.role === "user") {
        return <MemberNavbar />
    }

    return <PublicNavbar />
}