import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RelatedProducts = ({ currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchTopSalesProducts = async () => {
      try {
        const response = await axios.get("/top-sales-products");
        setRelatedProducts(response.data);
      } catch (error) {
        console.error("Error fetching top sales products:", error);
      }
    };

    fetchTopSalesProducts();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [relatedProducts]);

  function convertPriceToMillions(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price * 1000);
  }

  return (
    <div className="mt-4 bg-white p-4 rounded-md">
      <div className="flex justify-center mb-4">
        <h2 className="lg:text-2xl">Sản phẩm được ưa thích</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {relatedProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded-md">
            <Link to={`/product/${product._id}`}>
              <img
                className="w-40 h-28 object-cover"
                src={`http://localhost:4000/uploads/${product.photo[0]}`}
                alt={product.name}
              />
              <p className="font-bold">{product.name}</p>
              <p className=" text-red-500">
                {convertPriceToMillions(product.price)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
