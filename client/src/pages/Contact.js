import React, { useState } from "react";

const Contact = () => {
  const [state, setState] = useState({ 
    fname: "", 
    email: "", 
    message: "" 
  });

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(JSON.stringify(state));
    setState({ fname: "", email: "", message: "" });
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center p-4 pt-28">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              name="fname"
              type="text"
              placeholder="Enter your name"
              value={state.fname}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={state.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Write your message..."
              value={state.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00df9a] text-black font-bold py-3 rounded-lg hover:bg-[#00c785] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;