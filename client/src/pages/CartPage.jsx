import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext1";

const CartPage = () => {
  const { users } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState(users ? users.address : "");
  const [phone, setPhone] = useState(users ? users.phone : "");
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/get-cart-items");
        const filteredOrders = response.data.filter((item) => !item.revenued);
        setCartItems(filteredOrders);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchData();
  }, []);

  const handleOrder = (item) => {
    if (showCheckoutForm && selectedProduct === item) {
      setShowCheckoutForm(false);
      setSelectedProduct(null);
    } else {
      setSelectedProduct(item);
      setShowCheckoutForm(true);
    }
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    const orderDate = new Date();
    const formattedOrderDate = orderDate.toISOString();
    try {
      if (selectedProduct) {
        const { product } = selectedProduct;
        const orderData = {
          quantity,
          product: product._id,
          price: quantity * product.price,
          name,
          note,
          address,
          phone,
          orderDate: formattedOrderDate,
        };

        const responseOrder = await axios.post("/oder", orderData);

        if (responseOrder.data._id) {
          const updatedSales = product.sales + parseInt(quantity);
          await axios.patch(`/product/${product._id}`, { sales: updatedSales });
          alert("Đặt hàng thành công!");

          const responseRevenued = await axios.post(
            `/update-revenued/${selectedProduct._id}`
          );

          if (
            responseRevenued.data.message === "Cập nhật revenued thành công"
          ) {
            console.log("Đã cập nhật revenued thành công cho sản phẩm");
          }
          const updatedCartItems = cartItems.filter(
            (item) => item.product._id !== selectedProduct.product._id
          );

          setCartItems(updatedCartItems);
          setShowCheckoutForm(false);
        } else {
          alert("Đặt hàng thất bại!");
        }
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      if (error.response) {
        console.error("Server error response:", error.response.data);
      }
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      const response = await axios.delete(`/remove-from-cart/${productId}`);

      if (response.data.message) {
        const updatedCartItems = cartItems.filter(
          (item) => item.product._id !== productId
        );
        setCartItems(updatedCartItems);
      } else {
        alert("Xóa sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return (
    <div className=" bg-gradient-to-r from-blue-100 to-blue-300 px-20 py-10">
      <h2 className="text-2xl mb-4">GIỎ HÀNG</h2>
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="bg-white p-4 mb-4 shadow-md flex items-center rounded"
        >
          <img
            src={`http://localhost:4000/uploads/${item.product.photo?.[0]}`}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="ml-4">
            <p className="lg:text-xl text-xs  font-semibold">
              {item.product.name}
            </p>
            <p className="text-red-500">
              Giá:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.product.price * 1000)}
            </p>
          </div>
          <div className="flex">
            <button
              onClick={() => handleOrder(item)}
              className="p-2 h-12 ml-6 text-xs lg:text-base  rounded bg-gradient-to-l from-blue-100 to-blue-300 hover:bg-gradient-to-r hover:from-blue-200 text-black"
            >
              Thanh Toán
            </button>

            <button
              onClick={() => removeItemFromCart(item.product._id)}
              className="py-2 px-4 ml-2 h-12 rounded bg-white text-black border-2"
            >
              Xóa
            </button>
          </div>
        </div>
      ))}
      {showCheckoutForm && selectedProduct && selectedProduct.product && (
        <div className="bg-white p-4 mb-4 shadow-md">
          <h2 className="text-xl font-bold mb-3">
            {selectedProduct.product.title}
          </h2>
          <p className="text-red-500">
            Giá:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(selectedProduct.product.price * 1000)}
          </p>
          <form onSubmit={submitOrder}>
            <label>Số lượng</label>
            <input
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <label>Tên</label>
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Ghi chú</label>
            <input
              value={note}
              type="text"
              onChange={(e) => setNote(e.target.value)}
            />
            <label>SĐT</label>
            <input
              value={phone}
              type="text"
              onChange={(e) => setPhone(e.target.value)}
            />
            <label>Số lượng</label>
            <input
              value={address}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              type="submit"
              className="p-2 h-12 mt-3 rounded bg-primary text-white"
            >
              Xác nhận đặt hàng
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CartPage;
