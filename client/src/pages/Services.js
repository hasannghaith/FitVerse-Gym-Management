import React, { useState } from "react";

const Services = ({ onAddToCart, programs, isLoading }) => {
  const [selectedProgram, setSelectedProgram] = useState(null); 

  const handleAddToCart = (program) => {
    onAddToCart({
      ...program,
      type: 'program',
      price: `$${program.Price}`,
      name: program.Name
    });
    setSelectedProgram(null);
  };

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white pt-28 px-8 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00df9a]"></div>
          <p className="mt-4 text-xl">Loading programs...</p>
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
          <p className="mb-4 text-[#00df9a] font-bold">${selectedProgram.Price}</p>
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
          {programs.map((program) => (
            <div
              key={program.ProgID}
              className="bg-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:scale-105 transform transition duration-300 min-h-96"
            >
              {program.Image && (
                <div className="mb-4">
                  <img 
                    src={`data:image/png;base64,${program.Image}`} 
                    alt={program.Name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{program.Name}</h3>
              <p className="mb-4 text-gray-300">{program.Description}</p>
              <div className="mt-auto">
                <p className="text-[#00df9a] font-bold text-xl mb-2">${program.Price}</p>
                <p className="text-gray-400 text-sm mb-4">Duration: {program.Duration}</p>
                
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="mt-4 bg-[#00df9a] text-black font-bold py-2 px-4 rounded-lg w-full hover:bg-[#00c785] transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;