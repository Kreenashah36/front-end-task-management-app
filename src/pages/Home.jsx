import React from "react";
import Navbar from "../components/Navbar";
import FoodItems from "../components/FoodItems";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FoodItems />
      <Footer />
    </>
  );
};

export default Home;
