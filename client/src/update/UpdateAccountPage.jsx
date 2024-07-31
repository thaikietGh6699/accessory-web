import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext1";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateAccountPage = () => {
  const { users, setUser } = useContext(UserContext);
  const [name, setName] = useState(users.name);
  const [email, setEmail] = useState(users.email);
  const [address, setAddress] = useState(users.address);
  const [phone, setPhone] = useState(users.phone);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedUserInfo = {
      name: name,
      address: address,
      phone: phone,
      email: email,
    };

    try {
      const response = await axios.put("/update-account", updatedUserInfo);
      if (response.status === 200) {
        setUser(updatedUserInfo);
        setUpdateSuccess(true);
        alert("Thông tin tài khoản đã được cập nhật!");
        navigate("/account");
      } else {
        alert("Cập nhật thông tin không thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Có lỗi xảy ra khi gửi yêu cầu cập nhật!");
    }
  };

  useEffect(() => {
    setName(users.name);
    setAddress(users.address);
    setPhone(users.phone);
    setUpdateSuccess(false);
  }, [users]);

  return (
    <div className="p-4">
      <h2 className="text-2xl flex justify-center font-bold mb-4">
        Thông tin tài khoản
      </h2>

      {updateSuccess && (
        <p className="text-green-600 font-semibold mb-2">
          Thông tin tài khoản đã được cập nhật thành công!
        </p>
      )}

      <div className="px-4 w-1/2 mx-auto">
        <div>
          <label className="block">
            <span className="text-gray-700">Email:</span>
            <input
              type="text"
              name="username"
              value={users.email}
              className="block w-full border-gray-300 text-gray-400 rounded-md mt-1 focus:ring-blue-500 focus:border-blue-500 p-2"
              onChange={(e) => setName(e.target.value)}
              disabled
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Tên người dùng</span>
            <input
              type="text"
              name="username"
              value={name}
              className="block w-full border-gray-300 rounded-md mt-1 focus:ring-blue-500 focus:border-blue-500 p-2"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="text-gray-700">Số điện thoại</span>
            <input
              type="text"
              name="username"
              value={phone}
              className="block w-full border-gray-300 rounded-md mt-1 focus:ring-blue-500 focus:border-blue-500 p-2"
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>{" "}
        <div>
          <label className="block">
            <span className="text-gray-700">Địa chỉ</span>
            <input
              type="text"
              name="username"
              value={address}
              className="block w-full border-gray-300 rounded-md mt-1 focus:ring-blue-500 focus:border-blue-500 p-2"
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 mt-2 text-white rounded-md px-3 py-2 cursor"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default UpdateAccountPage;
