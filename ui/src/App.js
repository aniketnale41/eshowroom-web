import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Shop } from "./Pages/Shop";
import Product from "./Pages/Product";
import { LoginSignup } from "./Pages/LoginSignup";
import { Cart } from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import AddProductForm from "./Pages/AddProductForm";
import Dashoboard from "./Pages/Dashboard";
import CategoryPage from "./Pages/CategoryPage";
import { UseAuthProvider } from "./Context/AuthContext";
import EditProductForm from "./Pages/EditProductForm";

function App() {
	return (
		<div>
			<HashRouter>
				<UseAuthProvider protectedPaths={[
					"/cart",
					"/productId",
					"/dashboard",
					"/product",
					"/product/:productId",
					"/product/add",
					"/category/:category",
					"/product/edit/:id",
				]}>
					<Navbar />
					<Routes>
						<Route path="/" element={<Shop />} />
						<Route path="category/:category" element={<CategoryPage />} />
						{/* <Route
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
						/> */}
						<Route path="/product" element={<Product />}>
							<Route path=":productId" element={<Product />} />
						</Route>
						<Route path="/product/add" element={<AddProductForm />} />
						<Route path="/product/edit/:id" element={<EditProductForm />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/login" element={<LoginSignup />} />
						<Route path="/dashboard" element={<Dashoboard />} />
					</Routes>
				</UseAuthProvider>
				<Footer />
			</HashRouter>
		</div>
	);
}

export default App;
