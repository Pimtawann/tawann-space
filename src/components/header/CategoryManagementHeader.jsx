import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CategoryManagementHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-8 py-4 mb-8 border-b border-brown-3">
      <p className="text-2xl font-semibold text-brown-6">Category management</p>
      <button
        onClick={() => navigate("/admin/create-category")}
        className="flex gap-2 bg-brown-6 text-white font-medium px-6 py-3 rounded-full hover:bg-brown-4 cursor-pointer"
      >
        <Plus /> Create category
      </button>
    </div>
  );
}
