import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext1.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Đăng nhập thành công");
      setTimeout(() => {
        setLoading(false);
        setRedirect(true);
      }, 1000);
    } catch (e) {
      alert("Sai tên tài khoản hoặc mật khẩu!");
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around bg-gradient-to-r from-blue-100 to-blue-300 py-20 mb-20">
      <div className=" bg-gray-100 py-20 px-5 rounded">
        <h1 className="text-4xl text-center mb-4">Đăng Nhập</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="kiet@gmail.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          <button
            className="primary bg-gradient-to-l from-blue-100 to-blue-300 hover:bg-gradient-to-r hover:from-blue-200 text-black"
            disabled={loading}
          >
            {loading ? "Đang Đăng Nhập..." : "Đăng Nhập"}
          </button>

          <div className="text-center py-2 text-gray-500">
            Bạn chưa có tài khoản?{" "}
            <Link className="underline text-black" to={"/register"}>
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
