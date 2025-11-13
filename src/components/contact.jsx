import { BiSolidPhoneCall } from "react-icons/bi";
import { MdMarkEmailRead } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

export default function Contact() {
  return (
   <div className="flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20 lg:px-50 py-10 gap-10">

      <div className="space-y-10">
        <div className="bg-blue-200 shadow-xl w-72 h-30 text-center border rounded-xl hover:shadow-2xl transition duration-300 border-y border-transparent hover:border-blue-700">
          <div className="flex flex-col items-center mt-5">
            <BiSolidPhoneCall className="h-8 w-8 text-gray-800" />
            <p className="font-bold text-gray-800 mt-2">Phone</p>
            <p className="text-gray-600 mt-1">Toll-free: 432000</p>
          </div>
        </div>

        <div className="bg-rose-300 shadow-xl w-72 h-32 text-center border rounded-xl hover:shadow-2xl transition duration-300 border-y border-transparent hover:border-rose-400">
          <div className="flex flex-col items-center mt-5">
            <MdMarkEmailRead className="h-8 w-8 text-gray-800" />
            <p className="font-bold text-gray-800 mt-2">Email</p>
            <p className="text-gray-600 mt-1">new@gmail.com</p>
          </div>
        </div>

        <div className="bg-orange-300 shadow-xl w-72 h-32 text-center border rounded-xl hover:shadow-2xl transition duration-300 border-y border-transparent hover:border-orange-600">
          <div className="flex flex-col items-center mt-5">
            <SlLocationPin className="h-8 w-8 text-gray-800" />
            <p className="font-bold text-gray-800 mt-2">Address</p>
            <p className="text-gray-600 mt-1">
              79A1 Vallankumaranvilai, Nagercoil.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form (Visible always) */}
      <div className="flex flex-col space-y-6 w-full md:w-110 border rounded-xl shadow-xl hover:shadow-2xl transition duration-300 p-8">
        <h1 className="font-bold text-gray-800 text-center text-lg">Contact Form</h1>
        <p className="text-center text-gray-600 text-sm">
          Send us your details and we’ll get in touch with you.
        </p>

        <input
          type="text"
          placeholder="Name"
          className="outline p-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          placeholder="Number"
          className="outline p-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          placeholder="Email"
          className="outline p-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <textarea
          placeholder="Message"
          className="outline p-3 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        ></textarea>

        <button
          type="submit"
          className="font-bold self-end bg-amber-500 text-white px-5 py-2 rounded-xl hover:bg-amber-400 transition-all duration-300 w-32"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
