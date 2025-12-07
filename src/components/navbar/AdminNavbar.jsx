import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, User, RefreshCcw, ChevronDown, SquareArrowOutUpRight } from "lucide-react";
import Avatar from "../Avatar";
import { useAuth } from "@/context/authentication";
import axios from "axios";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileNotificationOpen, setIsMobileNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const { logout, state } = useAuth();

  const username = state.user?.username || "User";
  const avatarUrl = state.user?.profilePic || "";

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        "https://tawann-space-db-api.vercel.app/auth/notifications?page=1&unreadOnly=true",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) + " at " + date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        "https://tawann-space-db-api.vercel.app/auth/notifications/read",
        { notificationId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the notification from the list
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <nav className="w-full bg-brown-1 border-b border-brown-3 fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-7 py-2 md:px-30 md:py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl md:text-4xl text-brown-6 flex items-center cursor-pointer"
        >
          Tawann<span className="text-green-2 text-2xl md:text-4xl">.</span>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative flex items-center justify-center bg-white rounded-full w-12 h-12 border border-brown-2 cursor-pointer hover:bg-brown-2"
            >
              <Bell className="w-5 h-5 text-brown-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-3 w-96 bg-white rounded-md shadow-xl z-50 max-h-[500px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-brown-4">
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div>
                    {notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        onClick={async () => {
                          await markNotificationAsRead(notification.id);
                          setIsNotificationOpen(false);
                          navigate("/admin/notification");
                        }}
                        className="flex gap-3 p-4 border-b border-brown-3 hover:bg-brown-2 cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-brown-3 flex items-center justify-center bg-brown-2 flex-shrink-0">
                          {notification.userAvatar ? (
                            <img
                              src={notification.userAvatar}
                              alt={notification.userName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-brown-4" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-brown-6">
                            <span className="font-semibold">{notification.userName}</span>
                            {notification.type === "comment" ? (
                              <span className="text-brown-5"> Comment on the article you have commented on.</span>
                            ) : (
                              <span className="text-brown-5"> Liked your article.</span>
                            )}
                          </p>
                          <p className="text-xs text-brown-4 mt-1">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {notifications.length > 5 && (
                      <div
                        onClick={() => {
                          setIsNotificationOpen(false);
                          navigate("/admin/notification");
                        }}
                        className="p-3 text-center text-sm text-green-2 font-medium hover:bg-brown-2 cursor-pointer"
                      >
                        View all notifications
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Avatar src={avatarUrl} name={username} className="!w-11 !h-11"/>
              <span className="text-brown-5 font-medium text-base">
                {username}
              </span>
              <ChevronDown className="w-5 h-5 text-brown-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-white rounded-md shadow-xl z-50 overflow-hidden">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 font-medium hover:bg-brown-2 text-brown-5 cursor-pointer"
                >
                  <User className="w-5 h-5" /> Profile
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/reset-password");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 font-medium hover:bg-brown-2 text-brown-5 cursor-pointer"
                >
                  <RefreshCcw className="w-5 h-5" /> Reset password
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/admin/article");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 font-medium hover:bg-brown-2 text-brown-5 cursor-pointer"
                >
                  <SquareArrowOutUpRight className="w-5 h-5" /> Admin panel
                </button>
                <hr className="border-brown-3" />
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 font-medium hover:bg-brown-2 text-brown-5 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" /> Log out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="text-4xl text-brown-5 md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-6 px-6 py-8 bg-brown-1 border-t border-brown-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
            <Avatar src={avatarUrl} name={username} size={44} />
            <span className="font-medium text-brown-5">{username}</span>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsMobileNotificationOpen(!isMobileNotificationOpen)}
                className="relative flex items-center justify-center bg-white rounded-full w-12 h-12 border border-brown-2 cursor-pointer hover:bg-brown-2"
              >
                <Bell className="w-5 h-5 text-brown-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-0 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {isMobileNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-md shadow-xl z-50 max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-brown-4">
                      <p>No notifications yet</p>
                    </div>
                  ) : (
                    <div>
                      {notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          onClick={async () => {
                            await markNotificationAsRead(notification.id);
                            setIsMobileNotificationOpen(false);
                          }}
                          className="flex gap-3 p-4 border-b border-brown-3 hover:bg-brown-2 cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-brown-3 flex items-center justify-center bg-brown-2 flex-shrink-0">
                            {notification.userAvatar ? (
                              <img
                                src={notification.userAvatar}
                                alt={notification.userName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5 text-brown-4" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-brown-6">
                              <span className="font-semibold">{notification.userName}</span>
                              {notification.type === "comment" ? (
                                <span className="text-brown-5"> Commented on your article.</span>
                              ) : (
                                <span className="text-brown-5"> Liked your article.</span>
                              )}
                            </p>
                            <p className="text-xs text-brown-4 mt-1">
                              {formatTimestamp(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-5">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/profile");
              }}
              className="flex items-center gap-3 text-brown-5 font-medium px-3 cursor-pointer"
            >
              <User className="w-6 h-6" /> Profile
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/reset-password");
              }}
              className="flex items-center gap-3 text-brown-5 font-medium px-3 cursor-pointer"
            >
              <RefreshCcw className="w-6 h-6" /> Reset password
            </button>
            <hr className="border-brown-3" />
            <button
              onClick={() => {
                setIsMenuOpen(false);
                logout();
              }}
              className="flex items-center gap-3 text-brown-5 font-medium px-3 cursor-pointer"
            >
              <LogOut className="w-6 h-6" /> Log out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
