import { useEffect, useState } from "react";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import Typed from "react-typed";
import { Link } from "react-router-dom";

const images = [image1, image2, image3];

const Intro = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen pt-24">
      {/* Slideshow Background */}
      <div className="w-full h-screen overflow-hidden">
        <img
          src={images[index]}
          alt={`slide-${index}`}
          className="w-full h-full object-cover object-center transition-all duration-700"
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <p className="text-[#00df9a] font-bold mb-4 text-xl md:text-2xl">
          Your Fitness Journey Starts Here.
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Push your limits, transform your body <br /> and unlock your full potential.
        </h1>

        <div className="font-bold text-xl text-[#00df9a] mb-6">
          <Typed
            strings={["Transform Your Body Now"]}
            typeSpeed={50}
            backSpeed={50}
            loop
          />
        </div>

        <p className="text-lg text-white font-bold mb-6">
          The Future of Fitness Starts Here.
        </p>

        <Link to="/services">
          <button className="bg-[#00df9a] w-[200px] rounded-lg font-bold py-3 text-black hover:bg-[#00c785] transition-all duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;