import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountNav from "../AccountNavi";

const FeedbackAdminPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("/feedback-all");
        setFeedbackList(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`/feedback/${id}`);
      setFeedbackList((prevFeedback) =>
        prevFeedback.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className=" min-h-screen">
      <AccountNav></AccountNav>
      <div className="flex justify-center">
        <h1 className=" text-2xl">
          Danh sách phản hồi của khách về sản phẩm lỗi
        </h1>
      </div>
      <div className="">
        {feedbackList.map((feedback, index) => (
          <div className=" p-7 border w-1/2 rounded my-2" key={index}>
            <p>Emai: {feedback.email}</p>
            <p>Tên người gửi: {feedback.name}</p>
            <p>Số đt: {feedback.phone}</p>
            <p className=" text-2xl">Nội dung: {feedback.note}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {feedback.images.map((image, idx) => (
                <div
                  className="w-40 h-28 bg-gray-300"
                  key={idx}
                  onClick={() => openImageModal(image)}
                >
                  <img
                    className="w-full h-full object-cover cursor-pointer"
                    src={`http://localhost:4000/uploads/${image}`}
                    alt={feedback.name}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => deleteFeedback(feedback._id)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-blue-300 mt-2"
            >
              Đã xử lý
            </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
          <div className="max-w-3/4 max-h-3/4">
            <img
              className="w-full h-auto"
              src={`http://localhost:4000/uploads/${selectedImage}`}
              alt="Selected"
            />
            <button
              onClick={closeImageModal}
              className="absolute top-3 right-4 text-white bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                fill="currentColor"
                class="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackAdminPage;
