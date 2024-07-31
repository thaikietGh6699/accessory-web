import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MorePage from "../MorePage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopSalesProducts from "./TopSalesProducts ";
import TopBrand from "./TopBrand";
import ScrollButton from "../ScrollButton ";
import FixedIcon from "../FixedIcon";

export default function IndexPage() {
  const [products, setProducts] = useState([]);
  const [display, setDisplay] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const loadMoreProducts = () => {
    setDisplay((prevCount) => prevCount + 9);
  };

  useEffect(() => {
    axios.get("/product").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleSearch = () => {
    const isSearchTermNotEmpty = searchTerm.trim() !== "";
    if (isSearchTermNotEmpty) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults(products);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  function convertPriceToMillions(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price * 1000);
  }

  return (
    <div>
      <MorePage></MorePage>

      <div className="lg:mt-10">
        <div className="flex justify-start ml-20 text-red-600">
          <li className="lg:text-3xl md:text-2xl text-xl list-none w-fit p-3">
            Tìm sản phẩm
          </li>
        </div>
        <div className="flex items-center justify-start w-full ml-20">
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Tìm kiếm trên PerfumeHaven"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-b p-2 pr-10 w-full 300"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 px-3 py-2 bg-transparent text-black rounded-r-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 focus:outline-none focus:ring focus:border-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>

        {searchTerm.trim() !== "" && (
          <div className="text-3xl lg:p-7 flex justify-center  text-red-600">
            {searchResults.length > 0 ? (
              <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 ">
                {searchResults.map((product) => (
                  <li key={product._id} className="border p-4 rounded-md">
                    <Link
                      className="inline-block transform-gpu transition duration-300 ease-in-out hover:scale-110"
                      to={`/product/${product._id}`}
                    >
                      <div className="mb-2 rounded-2xl overflow-hidden">
                        {product.photo?.[0] && (
                          <img
                            className="rounded-2xl object-cover w-full h-36"
                            src={`http://localhost:4000/uploads/${product.photo?.[0]}`}
                            alt=""
                          />
                        )}
                      </div>
                      <h3 className="text-lg text-gray-500">{product.name}</h3>
                      <div className="mt-1">
                        <span className="font-sans text-sm text-red-600">
                          {convertPriceToMillions(product.price)}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-500">Không có sản phẩm phù hợp</p>
            )}
          </div>
        )}

        <TopSalesProducts></TopSalesProducts>

        <TopBrand></TopBrand>

        <FixedIcon></FixedIcon>

        <ScrollButton></ScrollButton>

        {/* Nước Hoa */}
        <div className="flex ml-20 mt-5 text-red-600">
          <div className="lg:text-3xl  md:text-2xl text-xl list-none w-full p-3 border-b-2">
            Nước hoa
          </div>
        </div>
        <div className="py-4 px-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.length > 0 &&
            products
              .filter((product) => product.type === "nuochoa")
              .reverse()
              .slice(0, display)
              .map((product, index) => (
                <Link
                  to={`/product/${product._id}`}
                  className="relative "
                  key={product._id}
                >
                  {index === 0 && (
                    <div className="absolute -top-5  ">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3634/3634451.png"
                        className="w-32"
                        alt=""
                      />
                    </div>
                  )}
                  <div className="mb-2 rounded-2xl flex">
                    {product.photo?.[0] && (
                      <img
                        className="rounded-2xl object-cover aspect-square"
                        src={`http://localhost:4000/uploads/${product.photo?.[0]}`}
                        alt=""
                      />
                    )}
                  </div>
                  <h3 className="text-lg text-gray-500">{product.name}</h3>
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
          {products.length > display && (
            <Link
              to={"nuochoa"}
              className=" bg-slate-100 flex justify-center items-center h-1/5 my-auto hover:bg-white hover:border rounded-sm"
            >
              Xem thêm
            </Link>
          )}
        </div>

        {/* TÚi Xách */}
        <div className="flex ml-20 mt-5 text-red-600">
          <li className="lg:text-3xl  md:text-2xl text-xl list-none w-full p-3 border-b-2">
            Túi xách
          </li>
        </div>
        <div className="py-4 px-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {products.length > 0 &&
            products
              .filter((product) => product.type === "tuixach")
              .reverse()
              .slice(0, display)
              .map((product, index) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="relative"
                >
                  {index === 0 && (
                    <div className="absolute -top-5  ">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3634/3634451.png"
                        className="w-32"
                        alt=""
                      />
                    </div>
                  )}
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
          {products.length > display && (
            <Link
              to={"tuixach"}
              className=" bg-slate-100 flex justify-center items-center h-1/5 w-2/3 my-auto hover:bg-white hover:border rounded-sm"
            >
              Xem thêm
            </Link>
          )}
        </div>

        {/* Mũ nón */}
        <div className="flex ml-20 mt-5 text-red-600">
          <li className="lg:text-3xl  md:text-2xl text-xl list-none w-full p-3 border-b-2">
            Mũ nón
          </li>
        </div>
        <div className="py-4 px-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {products.length > 0 &&
            products
              .filter((product) => product.type === "cap")
              .reverse()
              .slice(0, display)
              .map((product, index) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="relative"
                >
                  {index === 0 && (
                    <div className="absolute -top-5  ">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3634/3634451.png"
                        className="w-32"
                        alt=""
                      />
                    </div>
                  )}
                  <div className=" mb-2 rounded-2xl flex justify-around">
                    {product.photo?.[0] && (
                      <img
                        className="rounded-2xl w-2/3 object-cover aspect-square"
                        src={`http://localhost:4000/uploads/${product.photo?.[0]}`}
                        alt=""
                      />
                    )}
                  </div>
                  <div className=" ml-10">
                    <h3 className="text-lg text-gray-500">{product.name}</h3>
                    <h3 className="text-sm text-gray-500 italic">
                      Đã bán({product.sales})
                    </h3>
                    <div className="mt-1">
                      <span className="italic font-sans text-red-600">
                        {convertPriceToMillions(product.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          {products.length > display && (
            <Link
              to={"munon"}
              className=" bg-slate-100 flex justify-center items-center h-1/5 w-2/3 my-auto hover:bg-white hover:border rounded-sm"
            >
              Xem thêm
            </Link>
          )}
        </div>

        {/* Mỹ Phẩm */}
        <div className="flex ml-20 mt-5 text-red-600">
          <li className="lg:text-3xl  md:text-2xl text-xl list-none w-full p-3 border-b-2">
            Mỹ phẩm
          </li>
        </div>
        <div className="py-4 px-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {products.length > 0 &&
            products
              .filter((product) => product.type === "mypham")
              .reverse()
              .slice(0, display)
              .map((product, index) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="relative"
                >
                  {index === 0 && (
                    <div className="absolute -top-5  ">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3634/3634451.png"
                        className="w-32"
                        alt=""
                      />
                    </div>
                  )}
                  <div className=" mb-2 rounded-2xl flex justify-around">
                    {product.photo?.[0] && (
                      <img
                        className="rounded-2xl w-2/3 object-cover aspect-square"
                        src={`http://localhost:4000/uploads/${product.photo?.[0]}`}
                        alt=""
                      />
                    )}
                  </div>
                  <div className=" ml-10">
                    <h3 className="text-lg text-gray-500">{product.name}</h3>
                    <h3 className="text-sm text-gray-500 italic">
                      Đã bán({product.sales})
                    </h3>
                    <div className="mt-1">
                      <span className="italic font-sans text-red-600">
                        {convertPriceToMillions(product.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          {products.length > display && (
            <Link
              to={"mypham"}
              className=" h-1/5 w-1/2 p-3 my-auto bg-gray-300 hover:bg-white hover:border rounded-sm"
            >
              Xem thêm
            </Link>
          )}
        </div>

        {/* Phụ kiện*/}
        <div className="flex ml-20 mt-5 text-red-600">
          <li className="lg:text-3xl  md:text-2xl text-xl list-none w-full p-3 border-b-2">
            Phụ kiện
          </li>
        </div>
        <div className="py-4 px-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {products.length > 0 &&
            products
              .filter((product) => product.type === "phukien")
              .reverse()
              .slice(0, display)
              .map((product, index) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="relative"
                >
                  {index === 0 && (
                    <div className="absolute -top-5  ">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3634/3634451.png"
                        className="w-32"
                        alt=""
                      />
                    </div>
                  )}
                  <div className=" mb-2 rounded-2xl flex justify-around">
                    {product.photo?.[0] && (
                      <img
                        className="rounded-2xl w-2/3 object-cover aspect-square"
                        src={`http://localhost:4000/uploads/${product.photo?.[0]}`}
                        alt=""
                      />
                    )}
                  </div>
                  <div className=" ml-10">
                    <h3 className="text-lg text-gray-500">{product.name}</h3>
                    <h3 className="text-sm text-gray-500 italic">
                      Đã bán({product.sales})
                    </h3>
                    <div className="mt-1">
                      <span className="italic font-sans text-red-600">
                        {convertPriceToMillions(product.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          {products.length > display && (
            <Link
              to={"mypham"}
              className=" h-1/5 w-1/2 p-3 my-auto bg-gray-300 hover:bg-white hover:border rounded-sm"
            >
              Xem thêm
            </Link>
          )}
        </div>

        {/* Mắt kính*/}
        <div className="flex ml-20 mt-5 text-red-600">
          <li className="lg:text-3xl  md:text-2xl text-xl list-none w-full p-3 border-b-2">
            Mắt kinh
          </li>
        </div>
        <div className="py-4 px-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {products.length > 0 &&
            products
              .filter((product) => product.type === "matkinh")
              .reverse()
              .slice(0, display)
              .map((product, index) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="relative"
                >
                  {index === 0 && (
                    <div className="absolute -top-5  ">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3634/3634451.png"
                        className="w-32"
                        alt=""
                      />
                    </div>
                  )}
                  <div className=" mb-2 rounded-2xl flex justify-around">
                    {product.photo?.[0] && (
                      <img
                        className="rounded-2xl w-2/3 object-cover aspect-square"
                        src={`http://localhost:4000/uploads/${product.photo?.[0]}`}
                        alt=""
                      />
                    )}
                  </div>
                  <div className=" ml-10">
                    <h3 className="text-lg text-gray-500">{product.name}</h3>
                    <h3 className="text-sm text-gray-500 italic">
                      Đã bán({product.sales})
                    </h3>
                    <div className="mt-1">
                      <span className="italic font-sans text-red-600">
                        {convertPriceToMillions(product.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          {products.length > display && (
            <Link
              to={"matkinh"}
              className=" h-1/5 w-1/2 p-3 my-auto bg-gray-300 hover:bg-white hover:border rounded-sm"
            >
              Xem thêm
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
