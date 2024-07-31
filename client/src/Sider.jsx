import React, { useState } from "react";
import Slider from "react-slick";

const Sider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500, // Thời gian chuyển đổi giữa các slide
    slidesToShow: 3, // Hiển thị 2 slide mỗi lần
    slidesToScroll: 1, // Chuyển đến 1 slide khi nhấn nút next/prev
    autoplay: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };
  return (
    <div>
      <Slider className=" lg:px-20 lg:mt-14 mt-3 sm:px-2 " {...sliderSettings}>
        <div className="">
          <img
            className="rounded-md object-cover"
            src="https://cdn.vuahanghieu.com/unsafe/730x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload//home-banner/20-03-2023/1196699288_banner-slider-09.jpg"
            alt="Ad 1"
          />
        </div>
        <div className="">
          <img
            className="rounded-md object-cover"
            src="https://cdn.vuahanghieu.com/unsafe/730x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload//home-banner/01-03-2023/1238778525_armaf-730x278.jpg"
            alt="Ad 2"
          />
        </div>
        <div className="">
          <img
            className="rounded-md object-cover"
            src="https://cdn.vuahanghieu.com/unsafe/730x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload//home-banner/20-03-2023/616981471_banner-slider-10.jpg"
            alt="Ad 3"
          />
        </div>
        <div className="">
          <img
            className="rounded-md object-cover"
            src="https://cdn.vuahanghieu.com/unsafe/730x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload//home-banner/20-03-2023/1790487240_banner-slider-03.jpg"
            alt="Ad 4"
          />
        </div>
        <div className="">
          <img
            className="rounded-md object-cover"
            src="https://cdn.vuahanghieu.com/unsafe/730x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload//home-banner/20-03-2023/2077019706_banner-slider-06.jpg"
            alt="Ad 5"
          />
        </div>
        <div className="">
          <img
            className="rounded-md object-cover"
            src="https://cdn.vuahanghieu.com/unsafe/730x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload//home-banner/20-03-2023/1974297401_banner-slider-07.jpg"
            alt="Ad 6"
          />
        </div>
        {/* ... (Tương tự cho 6 hình ảnh quảng cáo khác) */}
      </Slider>
    </div>
  );
};

export default Sider;
