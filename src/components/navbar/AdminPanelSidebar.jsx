import {
  FileText,
  Folder,
  User,
  Bell,
  LogOut,
  ExternalLink,
  RefreshCcw,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/authentication";

export default function AdminPanelSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-4 ${
      isActive(path)
        ? "bg-brown-3 text-brown-6 font-medium"
        : "!text-brown-4 hover:bg-brown-3"
    }`;

  return (
    <aside className="w-65 h-screen bg-brown-2 border-r border-gray-200 flex flex-col justify-between py-6">
      <div>
        {/* Logo & Title */}
        <div className="px-6 mb-8 mt-10">
          <p className="text-5xl text-brown-6">
            hh<span className="text-green-2">.</span>
          </p>
          <p className="text-orange text-xl font-semibold mt-1">Admin panel</p>
        </div>

        {/* Menu items */}
        <nav>
          <Link
            to="/admin/article"
            className={linkClass("/admin/article")}
          >
            <FileText className="w-5 h-5" />
            Article management
          </Link>
          <Link
            to="/admin/category"
            className={linkClass("/admin/category")}
          >
            <Folder className="w-5 h-5" />
            Category management
          </Link>
          <Link
            to="/admin/profile"
            className={linkClass("/admin/profile")}
          >
            <User className="w-5 h-5" />
            Profile
          </Link>
          <Link
            to="/admin/notification"
            className={linkClass("/admin/notification")}
          >
            <Bell className="w-5 h-5" />
            Notification
          </Link>
          <Link
            to="/admin/reset-password"
            className={linkClass("/admin/reset-password")}
          >
            <RefreshCcw className="w-5 h-5" />
            Reset password
          </Link>
        </nav>
      </div>

      {/* Footer section */}
      <div>
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-6 py-4 !text-brown-4 hover:bg-brown-3"
        >
          <ExternalLink className="w-5 h-5" />
          hh. website
        </Link>
        <button
          className="flex items-center gap-3 px-6 py-4 !text-brown-4 hover:text-brown-6 w-full text-left font-medium hover:bg-brown-3 cursor-pointer border-t border-brown-3"
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>
      </div>
    </aside>
  );
}
