export default function Contact() {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold mb-2">Contact Us</h1>
      <p className="text-center text-gray-600 text-sm mb-6">
        We're here to help! Please fill out the form below or use the contact information provided.
      </p>

      <div className="flex flex-col items-center">
        <form className="flex flex-col w-full max-w-md">
          <label htmlFor="username" className="font-bold mt-4">
            Name
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your Name"
            className="mt-2 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="email" className="font-bold mt-4">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            className="mt-2 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="subject" className="font-bold mt-4">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            className="mt-2 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="message" className="font-bold mt-4">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            placeholder="Your Message"
            className="mt-2 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-40"
          ></textarea>

          <input
            type="submit"
            value="Send Message"
            className="mt-6 bg-blue-600 text-white py-2 rounded cursor-pointer hover:bg-blue-700 transition"
          />
        </form>

        <div className="flex gap-6 mt-6 mb-6">
          <button className="hover:text-blue-600 transition">
            <i className="fa-brands fa-instagram text-3xl text-black"></i>
          </button>
          <button className="hover:text-blue-600 transition">
            <i className="fa-brands fa-facebook-f text-3xl text-black"></i>
          </button>
          <button className="hover:text-blue-600 transition">
            <i className="fa-brands fa-square-x-twitter text-3xl text-black"></i>
          </button>
        </div>
      </div>
    </>
  );
}
