import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../UserContext1";

const Header = () => {
  const { users } = useContext(UserContext);

  return (
    <div>
      <header className=" lg:mx-20 lg:py-3 md:mx-4 md:my-4 py-3 px-2 flex justify-between">
        <div className="flex items-center gap-3">
          <Link
            to={users ? "/account" : "/login"}
            className="flex items-center border border-gray-300 rounded-full p-2 px-4 shadow-md hover:shadow-xl shadow-gray-300 text-gray-800 bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-person-lines-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
            </svg>
            {!!users && (
              <div className="hidden sm:block ml-2">{users.name}</div>
            )}
          </Link>

          <Link
            to={users ? "/account/product/gio-hang" : "/login"}
            className=" p-2 rounded-full hover:bg-gray-200 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-bag"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
            </svg>
          </Link>
        </div>
        <Link to={"/"} className="">
          <img
            className=" lg:w-36 md:w-26 w-20 m-auto"
            src="https://myperfumeslondon.com/wp-content/uploads/2022/01/MPL-Logo-01-1.png"
            alt=""
          />
          <span className="italic lg:text-3xl md:text-2xl text-xl text-yellow-500">
            PerfumeHaven
          </span>
        </Link>

        <div className="flex items-center">
          <div className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-chat-text w-6 lg:w-26 md:w-22"
              viewBox="0 0 16 16"
            >
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
              <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
            </svg>
          </div>
          <div>
            <p className="lg:text-sm md:text-sm text-xs ">
              Hotline: 0366025405
            </p>
            <p className="lg:text-sm md:text-sm text-xs ">
              Tổng đài: 1900 0091
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
