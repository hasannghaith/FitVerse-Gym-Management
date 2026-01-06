import React, { useState } from "react";

const Services = ({ onAddToCart, programs = [], isLoading = false }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const handleAddToCart = (program) => {
    if (!onAddToCart) return;

    onAddToCart({
      ...program, // ✅ FIXED (was ".program")
      type: "program",
      // ✅ store as NUMBER (not "$xx")
      price: Number(program.Price),
      name: program.Name,
    });

    setSelectedProgram(null);
  };

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white pt-28 px-8 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00df9a]"></div>
          <p className="mt-4 text-xl">Loading programs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pt-28 px-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Programs</h1>

      {selectedProgram && (
        <div className="bg-gray-900 rounded-xl p-6 mb-8 shadow-lg text-white max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Add to Cart: {selectedProgram.Name}
          </h2>

          <p className="mb-4">{selectedProgram.Description}</p>

          <p className="mb-4 text-[#00df9a] font-bold">
            ${Number(selectedProgram.Price).toFixed(2)}
          </p>

          <button
            onClick={() => handleAddToCart(selectedProgram)}
            className="bg-[#00df9a] text-black font-bold py-2 px-4 rounded-lg mr-4 hover:bg-[#00c785] transition duration-300"
          >
            Add to Cart
          </button>

          <button
            onClick={() => setSelectedProgram(null)}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      )}

      {programs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No programs available.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => {
            const priceNum = Number(program.Price);

            return (
              <div
                key={program.ProgID || program.id || program.Name}
                className="bg-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:scale-105 transform transition duration-300 min-h-96"
              >
                {/* Placeholder image section */}
                <div className="mb-4 h-48 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏃‍♂️</div>
                    <span className="text-gray-300">{program.Name}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2">{program.Name}</h3>

                <p className="mb-4 text-gray-300">
                  {program.Description || "No description available."}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <p className="text-[#00df9a] font-bold text-lg">
                    ${Number.isFinite(priceNum) ? priceNum.toFixed(2) : "0.00"}
                  </p>

                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="bg-[#00df9a] text-black font-bold py-2 px-4 rounded-lg hover:bg-[#00c785] transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Services;
