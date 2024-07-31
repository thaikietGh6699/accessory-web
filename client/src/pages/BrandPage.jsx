import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BrandPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/user-product").then(({ data }) => {
      console.log(data);
      setProducts(data);
    });
  });

  function convertPriceToMillions(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price * 1000);
  }

  const diorProducts = products.filter((product) => product.name === "DIOR");
  const vsProducts = products.filter((product) => product.name === "VERSACE");
  const mlbProducts = products.filter((product) => product.name === "MLB");
  const nikeProducts = products.filter((product) => product.name === "NIKE");
  const gucciProducts = products.filter((product) => product.name === "GUCCI");
  const chanelProducts = products.filter(
    (product) => product.name === "CHANEL"
  );

  const totalDior = diorProducts.length;
  const totalVS = vsProducts.length;
  const totalMLB = mlbProducts.length;
  const totalGucci = gucciProducts.length;
  const totalNike = nikeProducts.length;
  const totalChanel = chanelProducts.length;
  const totalProduct = products.length;

  return (
    <div className=" p-4">
      <div className="mb-4 flex justify-center">
        <Link
          to={"/type"}
          className=" w-1/7 inline-flex gap-1 border-2 bg-blue-400 text-white py-2 overflow-hidden px-6 rounded mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-hash"
            viewBox="0 0 16 16"
          >
            <path d="M8.39 12.648a1.32 1.32 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 0 0-.523-.516.539.539 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z" />
          </svg>
          Phân Loại
        </Link>
        <Link
          to={"/brand"}
          className=" w-1/7 inline-flex gap-1 border-2 bg-blue-400 text-white py-2 overflow-hidden px-6 rounded mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            class="bi bi-check2-square"
            viewBox="0 0 16 16"
          >
            <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
            <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
          </svg>
          Thương hiệu
        </Link>
      </div>
      <div className="flex justify-center">
        <h1 className=" lg:text-3xl">THƯƠNG HIỆU ĐÃ NHẬP</h1>
      </div>
      <h2 className=" lg:text-3xl">Tổng sản phẩm: {totalProduct}</h2>
      <h2 className="text-2xl">DIOR: {totalDior}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {diorProducts.map((product) => (
          <div
            key={product._id}
            className="flex cursor-pointer bg-gray-100 p-4 rounded-2xl overflow-hidden"
          >
            <Link
              to={`/account/product/${product._id}`}
              key={product._id}
              className={
                "flex cursor-pointer bg-gray-100 rounded-2xl overflow-hidden"
              }
            >
              <div className="w-28 h-24 bg-gray-300">
                <img
                  className="w-40 h-28 object-cover"
                  src={`http://localhost:4000/uploads/${product.photo[0]}`}
                  alt={product.name}
                />
              </div>
              <div className="w-2/3 ml-4">
                <h2 className="text-xl">{product.name}</h2>
                <p className="text-sm mt-1 text-red-500">
                  {" "}
                  {convertPriceToMillions(product.price)}
                </p>
                <h2 className="text-sm">{product.from}</h2>
                <h3 className="text-sm text-gray-500">
                  Đã bán({product.sales})
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <h2 className="text-2xl mt-4">CHANEL: {totalChanel}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {chanelProducts.map((product) => (
          <div
            key={product._id}
            className="flex cursor-pointer bg-gray-100 p-4 rounded-2xl overflow-hidden"
          >
            <Link
              to={`/account/product/${product._id}`}
              key={product._id}
              className={
                "flex cursor-pointer bg-gray-100 rounded-2xl overflow-hidden"
              }
            >
              <div className="w-28 h-24 bg-gray-300">
                <img
                  className="w-40 h-28 object-cover"
                  src={`http://localhost:4000/uploads/${product.photo[0]}`}
                  alt={product.name}
                />
              </div>
              <div className="w-2/3 ml-4">
                <h2 className="text-xl">{product.name}</h2>
                <p className="text-sm mt-1 text-red-500">
                  {" "}
                  {convertPriceToMillions(product.price)}
                </p>
                <h2 className="text-sm">{product.from}</h2>
                <h3 className="text-sm text-gray-500">
                  Đã bán({product.sales})
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <h2 className="text-2xl mt-4">VERSACE: {totalVS}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {vsProducts.map((product) => (
          <div
            key={product._id}
            className="flex cursor-pointer bg-gray-100 p-4 rounded-2xl overflow-hidden"
          >
            <Link
              to={`/account/product/${product._id}`}
              key={product._id}
              className={
                "flex cursor-pointer bg-gray-100 rounded-2xl overflow-hidden"
              }
            >
              <div className="w-28 h-24 bg-gray-300">
                <img
                  className="w-40 h-28 object-cover"
                  src={`http://localhost:4000/uploads/${product.photo[0]}`}
                  alt={product.name}
                />
              </div>
              <div className="w-2/3 ml-4">
                <h2 className="text-xl">{product.name}</h2>
                <p className="text-sm mt-1 text-red-500">
                  {" "}
                  {convertPriceToMillions(product.price)}
                </p>
                <h2 className="text-sm">{product.from}</h2>
                <h3 className="text-sm text-gray-500">
                  Đã bán({product.sales})
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <h2 className="text-2xl mt-4">GUCCI: {totalGucci}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {gucciProducts.map((product) => (
          <div
            key={product._id}
            className="flex cursor-pointer bg-gray-100 p-4 rounded-2xl overflow-hidden"
          >
            <Link
              to={`/account/product/${product._id}`}
              key={product._id}
              className={
                "flex cursor-pointer bg-gray-100 rounded-2xl overflow-hidden"
              }
            >
              <div className="w-28 h-24 bg-gray-300">
                <img
                  className="w-40 h-28 object-cover"
                  src={`http://localhost:4000/uploads/${product.photo[0]}`}
                  alt={product.name}
                />
              </div>
              <div className="w-2/3 ml-4">
                <h2 className="text-xl">{product.name}</h2>
                <p className="text-sm mt-1 text-red-500">
                  {" "}
                  {convertPriceToMillions(product.price)}
                </p>
                <h2 className="text-sm">{product.from}</h2>
                <h3 className="text-sm text-gray-500">
                  Đã bán({product.sales})
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <h2 className="text-2xl mt-4">MLB: {totalMLB}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {mlbProducts.map((product) => (
          <div
            key={product._id}
            className="flex cursor-pointer bg-gray-100 p-4 rounded-2xl overflow-hidden"
          >
            <Link
              to={`/account/product/${product._id}`}
              key={product._id}
              className={
                "flex cursor-pointer bg-gray-100 rounded-2xl overflow-hidden"
              }
            >
              <div className="w-28 h-24 bg-gray-300">
                <img
                  className="w-40 h-28 object-cover"
                  src={`http://localhost:4000/uploads/${product.photo[0]}`}
                  alt={product.name}
                />
              </div>
              <div className="w-2/3 ml-4">
                <h2 className="text-xl">{product.name}</h2>
                <p className="text-sm mt-1 text-red-500">
                  {" "}
                  {convertPriceToMillions(product.price)}
                </p>
                <h2 className="text-sm">{product.from}</h2>
                <h3 className="text-sm text-gray-500">
                  Đã bán({product.sales})
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <h2 className="text-2xl mt-4">NIKE: {totalNike}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {nikeProducts.map((product) => (
          <div
            key={product._id}
            className="flex cursor-pointer bg-gray-100 p-4 rounded-2xl overflow-hidden"
          >
            <Link
              to={`/account/product/${product._id}`}
              key={product._id}
              className={
                "flex cursor-pointer bg-gray-100 rounded-2xl overflow-hidden"
              }
            >
              <div className="w-28 h-24 bg-gray-300">
                <img
                  className="w-40 h-28 object-cover"
                  src={`http://localhost:4000/uploads/${product.photo[0]}`}
                  alt={product.name}
                />
              </div>
              <div className="w-2/3 ml-4">
                <h2 className="text-xl">{product.name}</h2>
                <p className="text-sm mt-1 text-red-500">
                  {" "}
                  {convertPriceToMillions(product.price)}
                </p>
                <h2 className="text-sm">{product.from}</h2>
                <h3 className="text-sm text-gray-500">
                  Đã bán({product.sales})
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
