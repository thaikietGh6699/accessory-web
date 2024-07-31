import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReceivedPage = () => {
  const [orders, setOrders] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    axios.get("/oder").then((res) => {
      const filteredOders = res.data.filter((oder) => oder.received);
      setOrders(filteredOders);
      const quantitySum = filteredOders.reduce(
        (total, order) => total + order.quantity,
        0
      );
      const amountSum = filteredOders.reduce(
        (total, order) => total + order.product.price * order.quantity,
        0
      );

      setTotalQuantity(quantitySum);
      setTotalAmount(amountSum);
    });
  }, []);

  return (
    <div className="px-20 py-10 my-8 bg-gradient-to-r from-blue-100 to-blue-300">
      <h2 className="text-2xl font-bold mb-4">ĐÃ MUA</h2>
      <div className="my-4">
        <p className="text-xl">Đã mua: {totalQuantity} sản phẩm</p>
        <p className="text-xl">
          Chi tiêu:{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalAmount * 1000)}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {orders.map((order) => (
          <Link
            to={`/product/${order.product._id}`}
            key={order._id}
            className="bg-white p-4 rounded-md shadow-md overflow-hidden hover:shadow-lg"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={`http://localhost:4000/uploads/${order.product.photo?.[0]}`}
                alt={order.product.name}
                className="w-1/2 h-full mx-auto object-cover rounded"
              />
            </div>

            <div className="text-lg font-semibold mb-2">
              {order.product.name}
            </div>
            <div className="text-gray-600">
              Số lượng: {order.quantity} sản phẩm
            </div>
            <p className="text-gray-600">
              Giá:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(order.product.price * 1000)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReceivedPage;
