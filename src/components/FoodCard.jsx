import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/CartSlice";

const FoodCard = (props) => {
  const { product, handleToast } = props;

  const { id: id, unit_amount: price, product: productInfo } = product;
  const { name, description, images: img } = productInfo;
  const { rating } = productInfo.metadata;

  const dispatch = useDispatch();
  //   const setProduct = useCart((state) => state.setProduct);
  return (
    <div
      className="font-bold w-[250px] bg-white p-5 flex flex-col rounded-2xl gap-2 shadow-xl
      "
    >
      <img
        src={img}
        alt=""
        className="w-auto h-[130px]  hover:scale-110 cursor-grab transition-all duration-500 ease-in-out "
      />
      <div className="flex justify-between text-sm">
        <h2>{name}</h2>
        <span className="text-yellow ">₹{price / 100}</span>
      </div>
      <p className="text-sm font-normal">{description.slice(0, 40)}...</p>
      <div className="flex justify-between ">
        <span className="flex items-center justify-center">
          <AiFillStar className="mr-1 text-yellow" /> {rating}
        </span>

        {/* Add to Cart */}
        <button
          onClick={() => {
            dispatch(addToCart({ id, name, price, rating, img, qty: 1 }));
            handleToast({ name });
          }}
          className="p-1 text-sm text-white rounded-lg bg-yellow hover:text-black"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
