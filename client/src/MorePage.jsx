import React from "react";
import { Link } from "react-router-dom";
import Sider from "./Sider";

const MorePage = () => {
  return (
    <div>
      <div className=" flex">
        <div className="px-20">
          <img
            className=""
            src="https://cdn.vuahanghieu.com/unsafe/0x0/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload//home-banner/09-12-2023/1306226353_landing-trang-suc-2400x220.jpg"
            alt=""
          />
        </div>
      </div>

      <Sider></Sider>
      <div className="flex justify-around p-2 border-b-2 mt-4 lg:mb-10">
        <Link
          to={"/nuochoa"}
          className=" lg:text-xl md:text-base text-sm hover:font-bold"
        >
          Nước hoa
        </Link>
        <Link
          to={"/tuixach"}
          className=" lg:text-xl md:text-base text-sm hover:font-bold"
        >
          Túi xách
        </Link>
        <Link
          to={"/munon"}
          className=" lg:text-xl md:text-base text-sm hover:font-bold"
        >
          Mũ nón
        </Link>
        <Link
          to={"/mypham"}
          className=" lg:text-xl md:text-base text-sm hover:font-bold"
        >
          Mỹ phẩm
        </Link>
        <Link
          to={"/phukien"}
          className=" lg:text-xl md:text-base text-sm hover:font-bold"
        >
          Phụ kiện
        </Link>
        <Link
          to={"/phukien"}
          className=" lg:text-xl md:text-base text-sm hover:font-bold"
        >
          Mắt kính
        </Link>
      </div>
    </div>
  );
};

export default MorePage;
