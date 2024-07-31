import React, { useState } from "react";

const PlaceGallery = ({ product }) => {
  const [showAllPhoto, setShowAllPhoto] = useState(false);

  if (showAllPhoto) {
    return (
      <div className=" absolute inset-0 bg-black text-white min-h-screen">
        <div className=" bg-black p-8 grid gap-4">
          <div>
            <h2 className=" text-3xl ml-36">Ảnh của {product.title}</h2>
            <button
              onClick={() => setShowAllPhoto(false)}
              className=" fixed left-12 opacity-70 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
              Đóng
            </button>
          </div>
          {product?.photo?.length > 0 &&
            product.photo.map((photo) => (
              <div>
                <img
                  onClick={() => setShowAllPhoto(true)}
                  src={"http://localhost:4000/uploads/" + photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <button
        onClick={() => setShowAllPhoto(true)}
        className=" absolute flex gap-1 items-center bg-white border
           border-black py-2 px-4 rounded-md shadow shadow-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-image"
          viewBox="0 0 16 16"
        >
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
        </svg>
        Xem thêm ảnh..
      </button>
      <div className=" w-2/3 grid gap-2 grid-cols-custom mt-4 rounded-3xl overflow-hidden ">
        <div>
          {product.photo?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhoto(true)}
                className="object-cover aspect-square cursor-pointer w-full "
                src={"http://localhost:4000/uploads/" + product.photo[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className=" grid ">
          <div>
            {product.photo?.[1] && (
              <img
                onClick={() => setShowAllPhoto(true)}
                className="object-cover aspect-square cursor-pointer w-full "
                src={"http://localhost:4000/uploads/" + product.photo[1]}
                alt=""
              />
            )}
          </div>
          <div className=" overflow-hidden ">
            {product.photo?.[2] && (
              <img
                onClick={() => setShowAllPhoto(true)}
                className="object-cover aspect-square cursor-pointer w-full  relative"
                src={"http://localhost:4000/uploads/" + product.photo[2]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceGallery;
