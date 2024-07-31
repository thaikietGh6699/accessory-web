import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext1";

const UpdatePasswordPage = () => {
  const { users } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Mật khẩu mới và mật khẩu xác nhận không trùng khớp.");
      return;
    }

    try {
      await axios.put("/update-password", {
        userId: users._id,
        currentPassword,
        newPassword,
      });
      alert("Mật khẩu đã được cập nhật thành công.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
      alert("Có lỗi xảy ra khi cập nhật mật khẩu.");
    }
  };

  return (
    <div className="p-4 lg:w-1/2 w-full mx-auto">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-2xl font-bold mr-3">Thay đổi mật khẩu</h2>
        <button type="button" className="" onClick={togglePasswordVisibility}>
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
            >
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
          )}
        </button>
      </div>
      <form className="space-y-4" onSubmit={handleUpdatePassword}>
        <div>
          <label className="block ">
            <span className="text-gray-700">Mật khẩu hiện tại:</span>
            <input
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              className="block w-full border-gray-300 rounded-md mt-1 focus:ring-blue-500 focus:border-blue-500 p-2 pr-10"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="text-gray-700">Mật khẩu mới:</span>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              className="block w-full border-gray-300 rounded-md mt-1 focus:ring-blue-500 focus:border-blue-500 p-2"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span className="text-gray-700">Xác nhận mật khẩu mới:</span>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmNewPassword}
              className="block w-full border-gray-300 rounded-md mt-1 focus:ring-blue-500 focus:border-blue-500 p-2"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors"
        >
          Cập nhật mật khẩu
        </button>
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
