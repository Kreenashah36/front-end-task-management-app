import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FoodCard from "./FoodCard";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51QnL99SIUCovxDtGGj0ahnp1F5Vls7TBS7VyiXwOqH0bm8CVKyn5ML1awZheM3PHAgGNgLgF5lBqxn8yyRk8YaeS00uXRa8TGs" ??
    "",
  {
    apiVersion: "2024-04-10",
  }
);

async function getStripeProducts() {
  const res = await stripe.prices.list({
    expand: ["data.product"],
  });
  return res.data;
}

const FoodItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getStripeProducts();
        setProducts(products);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleToast = ({ name }) => toast.success(` Added ${name} to cart`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
