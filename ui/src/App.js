import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { ShopCategory } from "./Pages/ShopCategory";
import { Shop } from "./Pages/Shop";
import Product from "./Pages/Product";
import { LoginSignup } from "./Pages/LoginSignup";
import { Cart } from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import car_banner from "./Components/Assets/car_banner.png";
import motorcycles_banner from "./Components/Assets/motarcycle_banner.png";
import bicycle_banner from "./Components/Assets/bicycle_banner.png";
import AddProductForm from "./Pages/AddProductForm";
import Dashoboard from "./Pages/Dashboard";
import CategoryPage from "./Pages/CategoryPage";

function App() {
  return (
    <div>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="category/:category" element={<CategoryPage/>} />
          <Route
            path="/cars"
            element={<ShopCategory banner={car_banner} category="car" />}
          />
          <Route
            path="/motorcycles"
            element={
              <ShopCategory banner={motorcycles_banner} category="motorcycle" />
            }
          />
          <Route
            path="/bicycles"
            element={
              <ShopCategory banner={bicycle_banner} category="bicycle" />
            }
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/product/add" element={<AddProductForm/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Dashoboard />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
