import React from "react";
import { Link } from "react-router-dom";

const TopBrand = () => {
  return (
    <div className="ml-20 my-5">
      <div className="flex justify-start mt-5 items-center ">
        <li className=" lg:text-3xl  md:text-2xl text-xl list-none w-fit px-3 uppercase border-r-2">
          Thương hiệu nổi bật
        </li>
        <img
          src="https://opp.vn/wp-content/uploads/2019/12/icon-brand.png"
          className="w-10 h-10 ml-1"
          alt=""
        />
      </div>
      <div className="flex justify-around my-3 gap-2">
        <Link
          className="inline-block transform-gpu transition duration-300 ease-in-out hover:scale-110"
          to={"/dior"}
        >
          <img
            className="lg:w-24 lg:h-20 w-14 h-14"
            src="https://cdn.iconscout.com/icon/free/png-256/free-dior-3422108-2854315.png"
            alt=""
          />
        </Link>

        <Link
          className="inline-block transform-gpu transition duration-300 ease-in-out hover:scale-110"
          to={"/gucci"}
        >
          <img
            className=" lg:w-24 lg:h-20 w-14 h-14"
            src="https://www.vectorkhazana.com/assets/images/products/Gucci_logo_svg.png"
            alt=""
          />
        </Link>
        <Link
          className="inline-block transform-gpu transition duration-300 ease-in-out hover:scale-110"
          to={"/chanel"}
        >
          <img
            className=" lg:w-24 lg:h-20 w-14 h-14"
            src="https://icons.iconarchive.com/icons/r34n1m4ted/chanel/512/CHANEL-LOGO-icon.png"
            alt=""
          />
        </Link>
        <Link
          className="inline-block transform-gpu transition duration-300 ease-in-out hover:scale-110"
          to={"/versace"}
        >
          <img
            className=" lg:w-24 lg:h-20 w-14 h-14"
            src="https://sixtysixmag.com/wp-content/uploads/Versace_logo.png"
            alt=""
          />
        </Link>
        <Link
          className="inline-block transform-gpu transition duration-300 ease-in-out hover:scale-110"
          to={"mbl"}
        >
          <img
            className=" lg:w-24 lg:h-20 w-14 h-14"
            src="https://builds.mlbstatic.com/mlb.com/builds/site-core/1606751303311/dist/images/favicon.png"
            alt=""
          />
        </Link>
        <Link
          to={"/nike"}
          className="inline-block transform-gpu transition duration-300 ease-in-out hover:scale-110"
        >
          <img
            className=" lg:w-24 lg:h-20 w-14 h-14"
            src="https://cdn4.iconfinder.com/data/icons/social-media-2231/512/63-nike_social-512.png"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBrand;
