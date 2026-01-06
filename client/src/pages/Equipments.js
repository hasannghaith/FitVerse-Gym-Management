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
  "Normal lifting straps": straps,
};

const Equipments = ({ onAddToCart, products = [], isLoading = false }) => {
  const handleAddToCart = (product) => {
    if (!onAddToCart) return;

    onAddToCart({
      ...product, // ✅ FIXED (was ".product")
      type: "product",
      // ✅ store as NUMBER (not "$xx")
      price: Number(product.Price),
      name: product.Name,
    });
  };

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white pt-28 px-8 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00df9a]"></div>
          <p className="mt-4 text-xl">Loading products.</p>
        </div>
      </div>
    );
  }

  // Use backend products if available, otherwise use local data
  const displayProducts =
    products && products.length > 0
      ? products
      : [
          {
            ProdID: 1,
            Name: "Adjustable Dumbbells",
            Description: "Set of 2 adjustable dumbbells 10 lbs.",
            Price: "120.00",
            Stock: 50,
          },
          {
            ProdID: 2,
            Name: "Yoga Mat",
            Description: "Non-slip yoga mat, 6mm thick, eco-friendly.",
            Price: "30.00",
            Stock: 100,
          },
          {
            ProdID: 3,
            Name: "Solid lifting Straps",
            Description: "A pair of solid adjustable lifting hook.",
            Price: "15.00",
            Stock: 75,
          },
          {
            ProdID: 4,
            Name: "Normal lifting straps",
            Description: "A pair of normal weight lifting straps.",
            Price: "10.00",
            Stock: 80,
          },
          {
            ProdID: 5,
            Name: "Resistance Band",
            Description: "A 7-11kg resistance level.",
            Price: "10.00",
            Stock: 200,
          },
          {
            ProdID: 6,
            Name: "Protein Shaker",
            Description: "A 1000ml Protein Shaker.",
            Price: "5.00",
            Stock: 150,
          },
          {
            ProdID: 7,
            Name: "Water Bottle",
            Description: "600ml water bottle.",
            Price: "5.00",
            Stock: 200,
          },
          {
            ProdID: 8,
            Name: "Aerobic Fitness Step",
            Description: "Aerobic fitness step black and red.",
            Price: "20.00",
            Stock: 60,
          },
          {
            ProdID: 9,
            Name: "Multi Resistance Train Kit",
            Description: "A multi resistance train kit with a variety of levels.",
            Price: "35.00",
            Stock: 40,
          },
          {
            ProdID: 10,
            Name: "Gym Towel",
            Description: "Soft gym towel for training sessions.",
            Price: "7.00",
            Stock: 120,
          },
        ];

  return (
    <div className="bg-black min-h-screen text-white pt-28 px-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gym Equipment</h1>

      {displayProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No products available.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product) => {
            const imgSrc = localImages[product.Name] || bot;
            const priceNum = Number(product.Price);

            return (
              <div
                key={product.ProdID || product.id || product.Name}
                className="bg-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:scale-105 transform transition duration-300 min-h-96"
              >
                <div className="mb-4 h-48 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt={product.Name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-2">{product.Name}</h3>
                <p className="mb-4 text-gray-300">
                  {product.Description || "No description available."}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-[#00df9a] font-bold text-lg">
                    ${Number.isFinite(priceNum) ? priceNum.toFixed(2) : "0.00"}
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#00df9a] text-black font-bold py-2 px-4 rounded-lg hover:bg-[#00c785] transition duration-300"
                  >
                    Add to Cart
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

export default Equipments;
