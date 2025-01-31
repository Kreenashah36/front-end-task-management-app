import React from "react";
import toast, { Toaster } from "react-hot-toast";
import FoodCard from "./FoodCard";
import Stripe from "stripe";
async function getStripeProducts() {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET ?? "", {
    apiVersion: "2024-04-10",
  });
  const res = await stripe.prices.list({
    expand: ["data.product"],
  });
  const prices = res.data;
  return prices;
}
const products = await getStripeProducts();

const FoodItems = () => {
  const handleToast = ({ name }) => toast.success(` Added ${name} to cart`);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="py-5">
        <span className="flex items-center justify-center lg:w-full lg:h[100vw] lg:my-14">
          <h1 className="text-2xl font-bold lg:text-5xl">
            Find the <span className="font-serif text-yellow">Best</span> food
          </h1>
        </span>
        <div className="flex flex-wrap justify-center gap-10 lg:mx-20">
          {products.map((product, productIndex) => {
            return (
              <FoodCard
                key={productIndex}
                product={product}
                handleToast={handleToast}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FoodItems;
