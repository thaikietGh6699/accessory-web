import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNavi";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductImg from "../ProductImg";

const OrderPage = () => {
  const [oders, setOders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOders, setTotalOders] = useState(0);

  useEffect(() => {
    axios.get("/oder").then((res) => {
      const filteredOders = res.data.filter((oder) => !oder.received);
      setOders(filteredOders);
      const total = res.data.reduce((acc, oder) => {
        return acc + oder.quantity * oder.product.price;
      }, 0);
      setTotalPrice(total);
      setTotalOders(res.data.length);
    });
  }, []);

  function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price * 1000);
  }

  const handleReceived = (order) => {
    if (order.sold) {
      const updatedOders = oders.filter((o) => o._id !== order._id);
      axios
        .patch(`/update-order-daban/${order._id}`, { received: true })
        .then((response) => {
          console.log("Đã cập nhật trạng thái đơn hàng");
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
        });
      setOders(updatedOders);
    } else {
      alert("Đơn hàng đang trong quá trình đóng gói");
    }
  };

  return (
    <div>
      <AccountNav></AccountNav>
      <div className="lg:p-10 p-4 lg:w-2/3 w-full mx-auto">
        <h2 className=" text-3xl flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-cart4 mr-2"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          Đơn hàng đã đặt
        </h2>
        {oders?.length > 0 &&
          oders.map((oder) => (
            <div className="flex w-full">
              <div className=" flex m-2 bg-gray-200m border-2  rounded shadow-md h-40 w-full overflow-hidden">
                <div className="w-48 h-full">
                  <ProductImg product={oder.product}></ProductImg>
                </div>
                <div className="ml-2 my-auto">
                  <div className=" lg:text-lg text-sx">
                    {oder.quantity} sản phẩm
                  </div>
                  <Link to={`/account/oder/${oder._id}`}>
                    <div className=" lg:text-lg hover:italic hover:font-semibold">
                      {oder.product.name}
                    </div>
                  </Link>
                  <Link to={`/account/oder/${oder._id}`}>
                    <div className=" lg:text-lg text-sm mt-1 text-red-500 hover:text-red-300 italic">
                      {formatPrice(oder.quantity * oder.product.price)}
                    </div>
                  </Link>
                  <button
                    onClick={() => handleReceived(oder)}
                    className=" px-6 py-2 rounded-lg mt-1 bg-primary text-white "
                  >
                    Đã nhận
                  </button>
                </div>
              </div>
            </div>
          ))}
        <p className=" text-md mt-4">
          Xem chi tiết các đơn hàng đã mua tại - Quản Lý/Đã mua
        </p>
        <p className=" text-md mt-2">
          Bạn có thể phản hồi về sản phẩm đã nhận nhưng gặp phải lỗi, phai màu,
          hư vỡ.. tại - Quản Lý/Phản hồi
        </p>
        <p className=" text-md mt-2">
          Liên hệ ngay message nếu quá 7 ngày chưa nhận được hàng
        </p>
      </div>
    </div>
  );
};

export default OrderPage;
