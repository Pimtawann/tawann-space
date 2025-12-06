import { useState, useEffect } from "react";
import { User } from "lucide-react";
import axios from "axios";

export default function AdminNotification() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNotifications, setTotalNotifications] = useState(0);

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [currentPage]);

  const fetchNotifications = async (page) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token missing");
      }

      const response = await axios.get(
        `https://tawann-space-db-api.vercel.app/auth/notifications?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(response.data.notifications);
      setTotalPages(response.data.totalPages);
      setTotalNotifications(response.data.totalNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffMs = now - notifTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div>
      <div className="px-8 pb-15">
        {isLoading ? (
          <div className="text-center text-brown-4 py-12">
            <p className="text-lg">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-brown-4 py-12">
            <p className="text-lg">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex gap-4 p-4 bg-brown-1 border-b border-brown-3"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brown-3 flex items-center justify-center bg-brown-2 flex-shrink-0">
                  {notification.userAvatar ? (
                    <img
                      src={notification.userAvatar}
                      alt={notification.userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-brown-4" />
                  )}
                </div>

                {/* Notification content */}
                <div className="flex-1">
                  <p className="text-brown-6">
                    <span className="font-semibold">{notification.userName}</span>
                    {notification.type === "comment" ? (
                      <span className="text-brown-5"> commented on your article: </span>
                    ) : (
                      <span className="text-brown-5"> liked your article: </span>
                    )}
                    <span className="font-medium">{notification.articleTitle}</span>
                  </p>

                  {notification.type === "comment" && notification.content && (
                    <p className="text-brown-4 mt-2 text-sm">
                      "{notification.content}"
                    </p>
                  )}

                  <p className="text-orange text-sm mt-2">
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-brown-6 text-white rounded-lg hover:bg-brown-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? "bg-brown-6 text-white"
                      : "bg-brown-2 text-brown-6 hover:bg-brown-3"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-brown-6 text-white rounded-lg hover:bg-brown-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
