import axios from "axios";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layouts";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext1";
import ProfilePage from "./pages/ProfilePage";
import AdminAccountPage from "./pages/AdminAccountPage";
import SoldOrdersPage from "./pages/SoldOrdersPage";
import ReceivedPage from "./pages/ReceivedPage";
import ProductPage from "./pages/ProductPage";
import ProductFormPage from "./pages/ProductFormPage";
import ProductSinglePage from "./pages/ProductSinglePage";
import OrderSinglePage from "./pages/OrderSinglePage";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage";
import RevenuePage from "./pages/RevenuePage ";
import PerfumePage from "./products/PerfumePage";
import HandbagPage from "./products/HandbagPage";
import CosmeticsPage from "./products/CosmeticsPage";
import AccessoryPage from "./products/AccessoryPage";
import HatPage from "./products/HatPage";
import GlassesPage from "./products/GlassesPage";
import UpdateAccountPage from "./update/UpdateAccountPage";
import UpdatePasswordPage from "./update/UpdatePasswordPage";
import DiorPage from "./band/DiorPage";
import MblPage from "./band/MblPage";
import ChanelPage from "./band/ChanelPage";
import VersacePage from "./band/VersacePage";
import GucciPgae from "./band/GucciPgae";
import FeedbackPage from "./pages/FeedbackPage";
import FeedbackAdminPage from "./pages/FeedbackAdminPage";
import Nikepage from "./band/Nikepage";
import BrandPage from "./pages/BrandPage";
import TypePage from "./pages/TypePage";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<ProfilePage />} />
          <Route path="/account/update" element={<UpdateAccountPage />} />
          <Route path="/account/update-pass" element={<UpdatePasswordPage />} />
          <Route path="/account/product" element={<ProductPage />} />
          <Route path="/account/product/new" element={<ProductFormPage />} />
          <Route path="/account/phanhoi" element={<FeedbackPage />} />
          <Route
            path="/account/product/quan-ly"
            element={<AdminAccountPage />}
          />
          <Route path="/account/product/da-ban" element={<SoldOrdersPage />} />
          <Route path="/account/product/da-mua" element={<ReceivedPage />} />
          <Route path="/account/product/gio-hang" element={<CartPage />} />
          <Route path="/account/product/doanh-thu" element={<RevenuePage />} />
          <Route path="/account/product/:id" element={<ProductFormPage />} />
          <Route path="/product/:id" element={<ProductSinglePage />} />
          <Route path="/account/oder" element={<OrderPage />} />
          <Route path="/account/phanhoiAdmin" element={<FeedbackAdminPage />} />
          <Route path="/account/oder/:id" element={<OrderSinglePage />} />
          <Route path="/nuochoa" element={<PerfumePage />} />
          <Route path="/tuixach" element={<HandbagPage />} />
          <Route path="/mypham" element={<CosmeticsPage />} />
          <Route path="/munon" element={<HatPage />} />
          <Route path="/munon" element={<HatPage />} />
          <Route path="/phukien" element={<AccessoryPage />} />
          <Route path="/matkinh" element={<GlassesPage />} />
          <Route path="/dior" element={<DiorPage />} />
          <Route path="/chanel" element={<ChanelPage />} />
          <Route path="/versace" element={<VersacePage />} />
          <Route path="/gucci" element={<GucciPgae />} />
          <Route path="/mbl" element={<MblPage />} />
          <Route path="/nike" element={<Nikepage />} />
          <Route path="/brand" element={<BrandPage />} />
          <Route path="/type" element={<TypePage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
