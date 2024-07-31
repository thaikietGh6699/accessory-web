import React from "react";

const ProductImg = ({ product, index = 0, className = null }) => {
  if (!product || !product.photo || !product.photo.length) {
    return null; // Hoặc có thể trả về một hình ảnh mặc định hoặc thông báo lỗi
  }

  if (!className) {
    className = "object-cover overflow-hidden";
  }

  return (
    <div>
      <img
        className={className}
        src={"http://localhost:4000/uploads/" + product.photo[index]}
        alt=""
      />
    </div>
  );
};

export default ProductImg;
