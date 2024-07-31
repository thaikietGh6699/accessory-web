import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [redirect, setRedirect] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function registerUser(ev) {
    ev.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp nhau");
      return;
    }

    try {
      const emailExists = await axios.get(`/check-email/${email}`);
      if (emailExists.data.exists) {
        alert("Email đã tồn tại");
        return;
      }

      await axios.post("/register", {
        name,
        email,
        password,
        address,
        phone,
      });

      alert("Đăng ký thành công");
      setRedirect("/login");
    } catch (e) {
      alert("Đăng ký thất bại");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around bg-gradient-to-r from-blue-100 to-blue-300 py-10">
      <div className=" mb-32 bg-gray-100 py-20 px-5 rounded">
        <h1 className=" text-4xl text-center mb-4">Đăng Ký</h1>
        <form className=" max-w-lg mx-auto" onSubmit={registerUser}>
          <span className="text-gray-700">Tên người dùng</span>

          <input
            type="text"
            name=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Thai Kiet"
          />
          <span className="text-gray-700">Email đăng ký</span>

          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="text-gray-700 flex gap-1">
            Mật khẩu
            <button
              type="button"
              className=""
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              )}
            </button>
          </span>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật Khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-gray-700">Nhập lại mật khẩu</span>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nhập lại Mật Khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="text-gray-700">Địa chỉ</span>

          <input
            type="text"
            placeholder="Địa Chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <span className="text-gray-700">Số điện thoại</span>

          <input
            type="number"
            placeholder="Số Điện Thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="primary bg-gradient-to-l from-blue-100 to-blue-300 hover:bg-gradient-to-r hover:from-blue-200 text-black">
            Đăng Ký
          </button>
          <div className=" text-center py-2 text-gray-500">
            Bạn đã có tài khoản?
            <Link className=" underline text-bn" to={"/login"}>
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
