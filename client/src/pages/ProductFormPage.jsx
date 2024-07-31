import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import PhotoUploader from "../PhotoUploader";
import AccountNav from "../AccountNavi";

const ProductFormPage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [addPhotos, setAddphotos] = useState([]);
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [born, setBorn] = useState("");
  const [from, setFrom] = useState("");
  const [price, setPrice] = useState(100);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("product/" + id).then((res) => {
      const { data } = res;
      setName(data.name);
      setTitle(data.title);
      setAddphotos(data.photo);
      setDescription(data.description);
      setPrice(data.price);
      setGender(data.gender);
      setType(data.type);
      setBorn(data.born);
      setFrom(data.from);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className=" text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className=" text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();
    const productData = {
      name,
      title,
      addPhotos,
      description,
      price,
      gender,
      type,
      born,
      from,
    };
    if (id) {
      await axios.put("/product", {
        id,
        ...productData,
      });
      setRedirect(true);
    } else {
      await axios.post("/product", productData);
      alert("Bạn đã thêm 1 sản phẩm vào cửa hàng");
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/product"} />;
  }

  return (
    <div className=" sm:mx-16 lg:mx-40 bg-gray-100 p-4 rounded border-2 border-black">
      <AccountNav></AccountNav>
      <div className="text-3xl flex justify-center mt-5 text-blue-600">
        <li className=" list-none w-fit p-3 border-b-2">Thêm sản phẩm</li>
      </div>
      <form action="" onSubmit={savePlace}>
        {preInput("Sản Phẩm Thuộc Danh Mục")}
        <div className="grid mt-2 mb-9 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <div className="m-2">
            <input
              className="hidden"
              type="radio"
              id="nuochoa"
              name="type"
              value="nuochoa"
              checked={type === "nuochoa"}
              onChange={() => setType("nuochoa")}
            />
            <label
              htmlFor="nuochoa"
              className={`inline-block cursor-pointer px-4 py-2 transition duration-300 ease-in-out w-full ${
                type === "nuochoa"
                  ? "bg-blue-500 text-white rounded-md"
                  : "bg-gray-200 text-black rounded-md"
              }`}
            >
              Nước Hoa
            </label>
          </div>
          <div className="m-2">
            <input
              className="hidden"
              type="radio"
              id="tuixach"
              name="type"
              value="tuixach"
              checked={type === "tuixach"}
              onChange={() => setType("tuixach")}
            />
            <label
              htmlFor="tuixach"
              className={`inline-block cursor-pointer px-4 py-2 transition duration-300 ease-in-out w-full ${
                type === "tuixach"
                  ? "bg-blue-500 text-white rounded-md"
                  : "bg-gray-200 text-black rounded-md"
              }`}
            >
              Túi Xách
            </label>
          </div>
          <div className="m-2">
            <input
              className="hidden"
              type="radio"
              id="mypham"
              name="type"
              value="mypham"
              checked={type === "mypham"}
              onChange={() => setType("mypham")}
            />
            <label
              htmlFor="mypham"
              className={`inline-block cursor-pointer px-4 py-2 transition duration-300 ease-in-out w-full ${
                type === "mypham"
                  ? "bg-blue-500 text-white rounded-md"
                  : "bg-gray-200 text-black rounded-md"
              }`}
            >
              Mỹ phẩm
            </label>
          </div>
          <div className="m-2">
            <input
              className="hidden"
              type="radio"
              id="cap"
              name="type"
              value="cap"
              checked={type === "cap"}
              onChange={() => setType("cap")}
            />
            <label
              htmlFor="cap"
              className={`inline-block cursor-pointer px-4 py-2 transition duration-300 ease-in-out w-full ${
                type === "cap"
                  ? "bg-blue-500 text-white rounded-md"
                  : "bg-gray-200 text-black rounded-md"
              }`}
            >
              Mũ nón
            </label>
          </div>
          <div className="m-2">
            <input
              className="hidden"
              type="radio"
              id="phukien"
              name="type"
              value="phukien"
              checked={type === "phukien"}
              onChange={() => setType("phukien")}
            />
            <label
              htmlFor="phukien"
              className={`inline-block cursor-pointer px-4 py-2 transition duration-300 ease-in-out w-full ${
                type === "phukien"
                  ? "bg-blue-500 text-white rounded-md"
                  : "bg-gray-200 text-black rounded-md"
              }`}
            >
              Phụ kiện
            </label>
          </div>
          <div className="m-2">
            <input
              className="hidden"
              type="radio"
              id="matkinh"
              name="type"
              value="matkinh"
              checked={type === "matkinh"}
              onChange={() => setType("matkinh")}
            />
            <label
              htmlFor="matkinh"
              className={`inline-block cursor-pointer px-4 py-2 transition duration-300 ease-in-out w-full ${
                type === "matkinh"
                  ? "bg-blue-500 text-white rounded-md"
                  : "bg-gray-200 text-black rounded-md"
              }`}
            >
              Mắt kính
            </label>
          </div>
        </div>

        {preInput("Tên thương hiệu")}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="DIOR"
        />
        {preInput("Tên chi tiết của sản phẩm")}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nước Hoa Nam Giorgio Armani Acqua Di Gio Pour Homme EDT 100ml"
        />
        {preInput("Hình ảnh của sản phẩm")}
        <PhotoUploader
          addPhotos={addPhotos}
          onChange={setAddphotos}
        ></PhotoUploader>

        {preInput("Phong Cách")}
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {preInput("Giới tính")}
        <div className="grid mt-2 mb-9 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <div className="m-2">
            <input
              className="hidden"
              type="radio"
              id="nam"
              name="type"
              value="nam"
              checked={gender === "nam"}
              onChange={() => setGender("nam")}
            />
            <label
              htmlFor="nam"
              className={`inline-block cursor-pointer px-4 py-2 transition duration-300 ease-in-out w-full ${
                gender === "nam"
                  ? "bg-blue-500 text-white rounded-md"
                  : "bg-gray-200 text-black rounded-md"
              }`}
            >
              Nam
            </label>
          </div>
          <div className="m-2">
            <input
              className="hidden"
              type="radio"
              id="nu"
              name="type"
              value="nu"
              checked={gender === "Nữ"}
              onChange={() => setGender("Nữ")}
            />
            <label
              htmlFor="nu"
              className={`inline-block cursor-pointer px-4 py-2 transition duration-300 ease-in-out w-full ${
                gender === "Nữ"
                  ? "bg-pink-400 text-white rounded-md"
                  : "bg-gray-200 text-black rounded-md"
              }`}
            >
              Nữ
            </label>
          </div>
          <div className="m-2">
            <input
              className="hidden"
              type="radio"
              id="unisex"
              name="type"
              value="unisex"
              checked={gender === "Unisex"}
              onChange={() => setGender("Unisex")}
            />
            <label
              htmlFor="unisex"
              className={`inline-block cursor-pointer px-4 py-2 transition duration-300 ease-in-out w-full ${
                gender === "Unisex"
                  ? "bg-teal-500 text-white rounded-md"
                  : "bg-gray-200 text-black rounded-md"
              }`}
            >
              Unisex
            </label>
          </div>
        </div>

        <div className=" grid gap-4 sm:grid-cols-3 mt-4">
          <div>
            <h2 className=" mt2 mb-1 text-xl">Xuất Xứ</h2>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <h2 className=" mt2 mb-1 text-xl">Năm Phát Hành</h2>
            <input
              type="number"
              value={born}
              onChange={(e) => setBorn(e.target.value)}
            />
          </div>
          <div>
            <h2 className=" mt2 mb-1 text-xl">Giá cho 1 sản phẩm</h2>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="lg:w-1/2 p-2 rounded-lg bg-primary text-white my-4">
            Đăng Sản Phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;
