// import { NavBar } from "./home";

export default function Notification() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header: Notifications + Button */}
      <div className="flex justify-between items-center mb-6 w-full sm:w-3/4">
        <h4 className="text-xl font-semibold">Notifications</h4>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition">
          Mark all as read
        </button>
      </div>

      {/* Notification Categories */}
      <div className="flex gap-6 mb-2">
        <p className="text-blue-600 font-medium cursor-pointer">All</p>
        <p className="text-gray-500 hover:text-blue-500 cursor-pointer transition">Recipes</p>
        <p className="text-gray-500 hover:text-blue-500 cursor-pointer transition">Orders</p>
      </div>

      <hr className="border-t border-gray-300 w-full sm:w-3/4" />
    </div>
  );
}
