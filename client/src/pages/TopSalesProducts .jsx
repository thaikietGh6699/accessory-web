import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSalesProducts = () => {
  const [topSales, setTopSales] = useState([]);

  useEffect(() => {
    const fetchTopSalesProducts = async () => {
      try {
        const response = await axios.get("/top-sales-products");
        setTopSales(response.data);
      } catch (error) {
        console.error("Error fetching top sales products:", error);
      }
    };

    fetchTopSalesProducts();
  }, []);

  function convertPriceToMillions(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price * 1000);
  }

  return (
    <div className="ml-20">
      <div className="flex justify-start mt-5 items-center ">
        <li className="lg:text-3xl  md:text-2xl text-xl list-none w-fit px-3 uppercase border-r-2">
          Hàng bán chạy
        </li>
        <img
          src="https://cdn-icons-png.flaticon.com/512/600/600217.png"
          className="w-10 h-10"
          alt=""
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {topSales.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className=" rounded-md overflow-hidden px-4 py-3"
          >
            <img
              className="rounded-2xl object-cover aspect-square lg:w-1/2"
              src={`http://localhost:4000/uploads/${product.photo?.[0]}`}
              alt=""
            />
            <div className="">
              <p className="text-lg text-gray-500">{product.name}</p>
            </div>
            <h3 className="text-sm text-gray-500 italic">
              Đã bán({product.sales})
            </h3>
            <div className="mt-1">
              <span className="italic font-sans text-red-600">
                {convertPriceToMillions(product.price)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopSalesProducts;
