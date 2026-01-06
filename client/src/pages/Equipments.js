import React from "react";
import bot from "../assets/bot.jpg";
import bottle from "../assets/bottle.jpg";
import dumbells from "../assets/dumbells.webp";
import band from "../assets/band.webp";
import mat from "../assets/mat.jpg";
import multi from "../assets/multi.jpg";
import solid from "../assets/solid.jpg";
import step from "../assets/step.jpg";
import towel from "../assets/towel.jpg";
import straps from "../assets/straps.webp";

// Local image mapping for products
const localImages = {
  "Water Bottle": bot,
  "Protein Shaker": bottle,
  "Adjustable Dumbbells": dumbells,
  "Resistance Band": band,
  "Yoga Mat": mat,
  "Multi Resistance Train Kit": multi,
  "Solid lifting Straps": solid,
  "Aerobic Fitness Step": step,
  "Gym Towel": towel,
  "Normal lifting straps": straps
};

const Equipments = ({ onAddToCart, products, isLoading }) => {
  const handleAddToCart = (product) => {
    onAddToCart({
      ...product,
      type: 'product',
      price: `$${product.Price}`,
      name: product.Name
    });
  };

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white pt-28 px-8 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00df9a]"></div>
          <p className="mt-4 text-xl">Loading products...</p>
        </div>
      </div>
    );
  }

  // Use backend products if available, otherwise use local data
  const displayProducts = products && products.length > 0 ? products : [
    {
      ProdID: 1,
      Name: "Adjustable Dumbbells",
      Description: "Set of 2 adjustable dumbbells 10 lbs.",
      Price: "120.00",
      Stock: 50,
      type: "product"
    },
    {
      ProdID: 2,
      Name: "Yoga Mat",
      Description: "Non-slip yoga mat, 6mm thick, eco-friendly.",
      Price: "30.00",
      Stock: 100,
      type: "product"
    },
    {
      ProdID: 3,
      Name: "Solid lifting Straps",
      Description: "A pair of solid adjustable lifting hook.",
      Price: "15.00",
      Stock: 75,
      type: "product"
    },
    {
      ProdID: 4,
      Name: "Normal lifting straps",
      Description: "A pair of normal weight lifting straps.",
      Price: "10.00",
      Stock: 80,
      type: "product"
    },
    {
      ProdID: 5,
      Name: "Resistance Band",
      Description: "A 7-11kg resistance level.",
      Price: "10.00",
      Stock: 200,
      type: "product"
    },
    {
      ProdID: 6,
      Name: "Protein Shaker",
      Description: "A 1000ml Protein Shaker.",
      Price: "5.00",
      Stock: 150,
      type: "product"
    },
    {
      ProdID: 7,
      Name: "Water Bottle",
      Description: "600ml water bottle.",
      Price: "5.00",
      Stock: 200,
      type: "product"
    },
    {
      ProdID: 8,
      Name: "Aerobic Fitness Step",
      Description: "Aerobic fitness step black and red.",
      Price: "20.00",
      Stock: 60,
      type: "product"
    },
    {
      ProdID: 9,
      Name: "Multi Resistance Train Kit",
      Description: "A multi resistance train kit with a variety of levels.",
      Price: "35.00",
      Stock: 40,
      type: "product"
    },
    {
      ProdID: 10,
      Name: "Gym Towel",
      Description: "Gym towel microfiber cloths.",
      Price: "7.00",
      Stock: 300,
      type: "product"
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-28 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        Shop Fitness Equipment
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProducts.map((product) => {
          // Get image - priority: 1. Backend image, 2. Local image, 3. Placeholder
          let imageSrc;
          let imageAlt = product.Name;
          
          if (product.Image) {
            // Backend image (base64)
            imageSrc = `data:image/png;base64,${product.Image}`;
          } else if (localImages[product.Name]) {
            // Local image from assets
            imageSrc = localImages[product.Name];
          } else {
            // Placeholder
            imageSrc = null;
          }

          return (
            <div
              key={product.ProdID}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 flex flex-col"
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.onerror = null;
                    e.target.parentElement.innerHTML = `
                      <div class="h-48 w-full bg-gray-700 flex items-center justify-center text-gray-400">
                        <span>Image Not Available</span>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="h-48 w-full bg-gray-700 flex items-center justify-center text-gray-400">
                  <span>Image Coming Soon</span>
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold mb-2">{product.Name}</h2>
                <p className="text-gray-300 mb-4 flex-grow">{product.Description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[#00df9a] font-bold text-lg">${product.Price}</p>
                  <span className={`text-sm px-2 py-1 rounded ${product.Stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                    {product.Stock > 0 ? `In Stock (${product.Stock})` : 'Out of Stock'}
                  </span>
                </div>

                <button 
                  onClick={() => handleAddToCart(product)}
                  disabled={product.Stock <= 0}
                  className={`font-bold py-2 px-4 rounded-lg transition duration-300 ${
                    product.Stock > 0 
                      ? 'bg-[#00df9a] text-black hover:bg-[#00c785]' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.Stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Equipments;