import React, { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNavi";

const AdminAccountPage = () => {
  const [oders, setOders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders-for-admin").then((response) => {
      const filteredOders = response.data.filter((oder) => !oder.sold);
      setOders(filteredOders);
    });
  }, []);

  const handleSellOder = (oder) => {
    const updatedOders = oders.filter((o) => o._id !== oder._id);

    axios
      .patch(`/update-order/${oder._id}`, { sold: true })
      .then((response) => {})
      .catch((error) => {
        console.error("Lỗi khi cập nhật đơn hàng:", error);
      });

    setOders(updatedOders);
  };

  return (
    <div className="container mx-auto my-8">
      <AccountNav></AccountNav>
      <h2 className="text-2xl font-bold mb-4">Đơn hàng được đặt</h2>
      {oders.map((oder) => (
        <div
          key={oder._id}
          className="bg-white p-4 mb-4 shadow-md flex oders-center"
        >
          {/* Hình ảnh sản phẩm */}
          <img
            src={`http://localhost:4000/uploads/${oder.product.photo?.[0]}`}
            alt={oder.product.name}
            className="w-20 h-20 object-cover rounded"
          />

          {/* Thông tin sản phẩm */}
          <div className="ml-4 w-1/6">
            <p className="text-xl font-semibold">{oder.product.name}</p>
            <p className="">Emai: {oder.email}</p>
            <p className="">SL: {oder.quantity}</p>
            <p className="text-gray-600">
              Giá:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(oder.product.price * 1000)}
            </p>
          </div>
          <div className="ml-4 w-1/6">
            <p className="">Nhận: {oder.name}</p>
            <p className="">Địa chỉ: {oder.address}</p>
            <p className="">SĐT: {oder.phone}</p>
          </div>
          <button
            onClick={() => handleSellOder(oder)}
            className="bg-blue-500 text-white h-16 my-auto p-2 ml-4 rounded-2xl"
          >
            Gửi Hàng
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminAccountPage;
