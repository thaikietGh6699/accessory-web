import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PlaceGallery from "../PlaceGallery";
import { UserContext } from "../UserContext1";
import RelatedProducts from "./RelatedProductPage";

const ProductSinglePage = () => {
  const { id } = useParams();
  const { users } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState(users ? users.name : "");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState(users ? users.address : "");
  const [phone, setPhone] = useState(users ? users.phone : "");
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/product/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) {
    return "";
  }

  async function oderProduct() {
    if (users) {
      const orderDate = new Date();
      const formattedOrderDate = orderDate.toISOString();
      const dataToSend = {
        quantity,
        name,
        note,
        phone,
        address,
        product: product._id,
        price: quantity * product.price,
        orderDate: formattedOrderDate,
        email: users.email,
      };

      try {
        const response = await axios.post("/oder", dataToSend);
        const orderID = response.data._id;
        const updatedSales = product.sales + parseInt(quantity);
        await axios.patch(`/product/${product._id}`, { sales: updatedSales });

        alert("Đặt hàng thành công");
        navigate(`/account/oder/${orderID}`);
      } catch (error) {
        console.error("Error placing order:", error);
      }
    } else {
      window.location.href = "/login";
    }
  }

  const addToCart = async () => {
    try {
      const response = await axios.post("/add-to-cart", {
        productID: product._id,
      });
      if (response.data.success) {
        const cartItem = response.data.cartItem;
        alert(`Bạn đã thêm ${cartItem.product.name} vào giỏ hàng`);
      } else {
        console.error(
          "Failed to add item to cart. Server response:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const submitReview = async () => {
    try {
      if (!users) {
        alert("Bạn cần đăng nhập để đánh giá sản phẩm.");
        setReview("");
        return;
      }
      const { email, name } = users;
      const orderDate = new Date();
      const formattedOrderDate = orderDate.toISOString();
      const response = await axios.post(`/product/${product._id}/reviews`, {
        review,
        userId: users._id,
        email,
        name,
        orderDate: formattedOrderDate,
      });

      if (response.data.success) {
        alert("Cảm ơn bạn đã đánh giá sản phẩm!");

        const newReview = {
          review,
          email,
          name,
          orderDate,
        };
        setProduct((prevProduct) => ({
          ...prevProduct,
          reviews: [...prevProduct.reviews, newReview],
        }));
        setReview("");
      } else {
        console.error(
          "Failed to submit review. Server response:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  function convertPriceToMillions(price) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price * 1000);
  }

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value);
    if (value < 1) {
      value = 1;
    } else if (value > 10) {
      value = 10;
    }

    setQuantity(value);
  };

  return (
    <div className="mt-4 mx-8 px-8 pt-8 border-2 border-gray rounded-lg">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <h1 className="text-xl mb-10">{product.title}</h1>

      <div className="lg:flex md:grid">
        <div className="w-1/2">
          <PlaceGallery product={product}></PlaceGallery>
          <div>
            <div className="my-4 px-3">
              <div className="flex w-full text-xl">
                <p className=" w-1/3 font-semibold">Phong cách, kiểu dáng:</p>
                <div>{product.description}</div>
              </div>
              <div className="flex w-full text-xl">
                <p className=" w-1/3 font-semibold">Năm phát hành:</p>
                <div>{product.born}</div>
              </div>
              <div className="flex w-full text-xl">
                <p className=" w-1/3 font-semibold">Xuất xứ:</p>
                <div>{product.from}</div>
              </div>
              <div className="flex w-full text-xl">
                <p className=" w-1/3 font-semibold">Dành cho:</p>
                <div>{product.gender}</div>
              </div>
              <div className="flex w-full text-xl">
                <p className=" w-1/3 font-semibold">Vận chuyển:</p>
                <div>Freeship Cần Thơ & HCM</div>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-1/2 flex">
          <div className="w-2/5 border-2 mr-1 h-fit py-4 px-3">
            <div className="flex justify-center gap-1 mb-1">
              <img
                src="https://asset.vuahanghieu.com/assets/images/shop.svg"
                alt=""
              />
              HAVENSHOP
            </div>
            <div className="flex justify-center gap-1 mb-1">
              <img
                src="	https://asset.vuahanghieu.com/assets/images/verify.svg"
                alt=""
              />
              Gian hàng chính hãng
            </div>
            <div className="flex mb-1">
              <img
                src="https://asset.vuahanghieu.com/assets/images/checkbox.svg"
                alt=""
                className=" w-3 mr-1"
              />
              <p className=" text-xs"> Miễn phí đổi trả trong 7 ngày</p>
            </div>{" "}
            <div className="flex mb-1">
              <img
                src="https://asset.vuahanghieu.com/assets/images/checkbox.svg"
                alt=""
                className=" w-3 mr-1"
              />
              <p className=" text-xs"> Kiểm tra trước khi nhận</p>
            </div>{" "}
            <div className="flex mb-1">
              <img
                src="https://asset.vuahanghieu.com/assets/images/checkbox.svg"
                alt=""
                className=" w-3 mr-1"
              />
              <p className=" text-xs">Hoàn tiền nếu phát hiện giả</p>
            </div>
            <div className="flex mb-1">
              <img
                src="https://asset.vuahanghieu.com/assets/images/checkbox.svg"
                alt=""
                className=" w-3 mr-1"
              />
              <p className=" text-xs">Luôn đủ hàng cho bạn</p>
            </div>
            <Link
              to={"/"}
              className="w-full flex justify-center mt-3 border-2 py-2"
            >
              XEM SHOP
            </Link>
          </div>
          <div className="w-4/5 ">
            <div className=" bg-gradient-to-r from-blue-100 to-blue-300 p-4 rounded-2xl">
              <div className=" text-3xl text-center font-bold text-black italic">
                - {convertPriceToMillions(product.price)} -
              </div>
              <div className=" rounded-2xl mt-4">
                <div className=" p-3">
                  <label>Số lượng</label>
                  <input
                    type="number"
                    value={quantity}
                    min={1}
                    max={10}
                    onChange={handleQuantityChange}
                  />

                  <label>Tên người nhận</label>
                  <input
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Ghi Chú</label>
                  <input
                    value={note}
                    type="text"
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <label>Số điện thoại khi nhận hàng</label>
                  <input
                    value={phone}
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label>Địa chỉ nhận hàng</label>
                  <input
                    value={address}
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full ">
                <button
                  onClick={oderProduct}
                  className="bg-gradient-to-l from-blue-200 to-blue-500 w-1/2 text-white p-2 rounded-md mt-2 mr-1"
                >
                  Mua ngay
                </button>
                <button
                  onClick={addToCart}
                  className=" bg-white text-black w-1/2 border p-2 rounded-md mt-2"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex mt-10">
        <div className="w-1/2">
          <h2 className=" text-2xl">Đánh giá của khách hàng</h2>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="mt-2 w-fit p-2 bg-gray-200 rounded">
                <div className="flex items-center ">
                  <p className=" font-bold text-lg mr-2">{review.name}:</p>
                  <p>{review.review}</p>
                </div>
                <p className=" text-sm">
                  {new Date(review.orderDate).toLocaleDateString("en-GB")}
                </p>
              </div>
            ))
          ) : (
            <p className=" text-lg my-2">Chưa có đánh giá nào</p>
          )}
        </div>

        <div className="w-1/2">
          <h2 className="text-2xl">Viết đánh giá của bạn</h2>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="w-2/3 h-20 p-2 border rounded-md mt-2"
            placeholder="Nhập đánh giá của bạn về sản phẩm..."
          ></textarea>
          <button
            onClick={submitReview}
            className="bg-gradient-to-l from-blue-200 to-blue-500 border-2 border-gray  text-black w-2/3 p-2 rounded-md mt-2"
          >
            Gửi đánh giá
          </button>
        </div>
      </div>

      <RelatedProducts currentProductId={product._id} />
    </div>
  );
};

export default ProductSinglePage;
