import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext1";
import { useNavigate } from "react-router-dom";

const FeedbackPage = () => {
  const { users } = useContext(UserContext);
  const [name, setName] = useState(users ? users.name : "");
  const [email, setEmail] = useState(users ? users.email : "");
  const [phone, setPhone] = useState(users ? users.phone : "");
  const [note, setNote] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const handleFeedback = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("note", note);
      formData.append("phone", phone);

      // Thêm từng ảnh từ mảng images vào formData
      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }

      // Gửi request để lưu trữ phản hồi với các ảnh đã chọn
      const response = await axios.post("/feedback", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        alert(`Bạn đã phản hồi thành công!`);
        navigate(`/account/product`);
      } else {
        console.error("lỗi", response.data);
      }
    } catch (error) {
      console.error("Error adding:", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    setImages([...images, ...selectedImages]);
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="lg:p-10 p-6 mx-auto ">
      <h1 className=" lg:text-3xl my-3 text-xl">
        Phản hồi về sản phẩm gặp vấn đề phai màu, hư vỡ, không chính hãng..
      </h1>
      <div>
        <div className=" w-2/3">
          <label className="text-lg" htmlFor="name">
            Tên người phản hồi
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled
          />
        </div>
        <div className=" w-2/3">
          <label className=" text-lg" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </div>
        <div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className=" p-2 border rounded-md mt-2"
            placeholder="Nhập nội dung phản hồi, không chính hãng, vỡ, rách..."
          ></textarea>
        </div>
        <label className="px-10 py-7 my-3 border-2 rounded-md w-32">
          Tải ảnh
          <input
            className="hidden"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28 "
            fill="currentColor"
            class="bi bi-cloud-arrow-up"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
            />
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
          </svg>
        </label>
        <div className="flex gap-2 w-fit">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(img)}
                alt="Selected"
                className="py-4"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
              <button
                className="px-4 p-2 rounded hover:bg-red-300 absolute bottom-3 left-7"
                onClick={() => handleImageRemove(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        className=" px-8 py-3 mt-3 rounded bg-primary text-white"
        onClick={handleFeedback}
      >
        Gửi phản hồi
      </button>
    </div>
  );
};

export default FeedbackPage;
