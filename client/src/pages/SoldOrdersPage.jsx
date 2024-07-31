import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNavi";

const SoldOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders-for-admin").then((response) => {
      const filteredOrders = response.data.filter((order) => order.sold);
      const sortedOrders = filteredOrders.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );
      setOrders(sortedOrders);
    });
  }, []);

  return (
    <div className="container mx-auto my-8">
      <AccountNav></AccountNav>
      <h2 className="text-2xl mb-4 mt-4 text-blue-500 flex items-center">
        MẶT HÀNG ĐÃ BÁN
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-currency-dollar"
          viewBox="0 0 16 16"
        >
          <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
        </svg>
      </h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white lg:p-4 sm:p-2 mb-4 shadow-md border-2 border-gray flex"
        >
          <img
            src={`http://localhost:4000/uploads/${order.product.photo?.[0]}`}
            alt={order.product.name}
            className="w-20 h-20 object-cover rounded"
          />

          <div className="ml-4 w-1/6">
            <p className="text-xl font-semibold">{order.product.name}</p>
            <p className="">Emai: {order.email}</p>
            <p className="">SL: {order.quantity}</p>
            <p className="text-gray-600">
              Giá:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(order.product.price * 1000)}
            </p>
          </div>

          <div className="lg:ml-4 md:ml-16 ml-28 lg:w-1/6 w-full">
            <p className="">Người mua: {order.name}</p>
            <p className="">Địa chỉ: {order.address}</p>
            <p className="">SĐT: {order.phone}</p>
            <p className="">
              Ngày: {new Date(order.orderDate).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SoldOrdersPage;
