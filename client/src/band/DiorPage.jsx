import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DiorPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/product").then((response) => {
      setProducts(response.data);
    });
  }, []);

  function convertPriceToMillions(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price * 1000);
  }
  return (
    <div>
      <div className="flex justify-around p-2 border-b-2 mb-2 mt-10">
        <Link to={"/dior"} className=" lg:text-xl text-lg hover:font-bold">
          DIOR
        </Link>
        <Link to={"/chanel"} className=" lg:text-xl text-lg hover:font-bold">
          Chanel
        </Link>
        <Link to={"/gucci"} className=" lg:text-xl text-lg hover:font-bold">
          Gucci
        </Link>
        <Link to={"/versace"} className=" lg:text-xl text-lg hover:font-bold">
          Versace
        </Link>
        <Link to={"/mbl"} className=" lg:text-xl text-lg hover:font-bold">
          MLB
        </Link>
        <Link to={"/nike"} className=" lg:text-xl text-lg hover:font-bold">
          NIKE
        </Link>
      </div>{" "}
      <div className="text-3xl flex justify-center mt-5 text-red-600">
        <li className=" list-none w-fit p-3 border-b-2">DiOR</li>
      </div>
      <div className="py-4 px-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {products.length > 0 &&
          products
            .filter((product) => product.name === "DIOR")
            .map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {product.photo?.[0] && (
                    <img
                      className="rounded-2xl object-cover aspect-square"
                      src={`http://localhost:4000/uploads/${product.photo?.[0]}`}
                      alt=""
                    />
                  )}
                </div>
                <h3 className="text-lg text-gray-500">{product.name}</h3>
                <div className="mt-1">
                  <span className="font-sans text-red-600">
                    {convertPriceToMillions(product.price)}
                  </span>
                </div>
                <h3 className="text-sm text-gray-500">
                  Đã bán({product.sales})
                </h3>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default DiorPage;
