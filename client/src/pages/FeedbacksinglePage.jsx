import axios from "axios";
import React, { useEffect, useState } from "react";

const FeedbacksinglePage = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/feedback");
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchData();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`/feedback/${id}`);
      setFeedback((prevFeedback) =>
        prevFeedback.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  }

  return (
    <div className=" mb-4">
      <div className="flex justify-center">
        <h2 className="text-2xl font-semibold mb-3">
          Phản hồi sản phẩm lỗi bạn đã gửi
        </h2>
      </div>
      {feedback.map((feedbackItem, index) => (
        <div className="w-1/2 mx-auto" key={index}>
          <div className="w-40 h-28 my-2 bg-gray-300">
            <img
              className="w-40 h-28 object-cover"
              src={`http://localhost:4000/uploads/${feedbackItem.images[0]}`}
              alt={feedbackItem.name}
            />
          </div>
          <p>Nội dung: {feedbackItem.note}</p>
          <p>Thời gian: {formatDate(feedbackItem.date)}</p>
          <hr />
          <button
            className="px-4 py-2 mt-2 bg-gray-300 hover:bg-blue-300 rounded"
            onClick={() => deleteFeedback(feedbackItem._id)}
          >
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeedbacksinglePage;
