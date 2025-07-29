import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import { LoginPage } from "./component/authComponent/loginPage";
import { RegisterPage } from "./component/authComponent/registerPage";
import { DashBoard } from "./component/dashboard";
import  CustomerDashboart  from "./component/dashBoard/customerDashBoard";
import { AuthProvider, useAuth } from "./provider/AuthProvider";
import { Categories_cus } from "./component/customerComponent/categories"; 
import { Cartpage_cus } from "./component/customerComponent/customer_Cart"; 
import OrderDetails from "./pages/AdminPage/OrderDetails";
import TrackShipment from "./pages/AdminPage/TrackShipment";
import ConfirmShipment from "./pages/AdminPage/ConfirmShipment";
import RemoveProduct from "./pages/AdminPage/RemoveProduct";
import AddProduct from "./pages/AdminPage/AddProduct";
import AdminProfile from "./pages/AdminPage/AdminProfile";
import ShipmentDetails from "./pages/AdminPage/ShipmentDetails";
import Profile from "./pages/AdminPage/Profile";
import Product from "./pages/AdminPage/Product";
import AllProducts from "./pages/AdminPage/AllProducts";
import UserDashboard from "./component/UserPage/UserDashboard";
import CancelOrder from "./component/UserPage/CancelOrder";
import UserProfile from "./component/UserPage/UserProfile";
import OrderProgressBar from "./pages/AdminPage/OrderProgressBar";
import TrackShipmentDetails from "./pages/AdminPage/TrackShipmentDetails";
import UpAndPreviousOrder from "./pages/AdminPage/UpAndPreviousOrder";
import YourCart from "./component/UserPage/YourCart";
import Payment from "./component/UserPage/Payment";
import PaymentDetails from "./component/UserPage/PaymentDetails";
import PlaceOrder from "./component/UserPage/PlaceOrder";
import OrderHistory from "./component/UserPage/OrderHistory";
import TrackOrder from "./component/UserPage/TrackOrder";
import ProductDetails from "./component/UserPage/ProductDetails";
import SaveInstruction from "./component/UserPage/SaveInstruction";
import CustomerItemview from './component/Itemviewing/customerViewing';
import ChatBox from "./component/chatbot";



function AppRoutes() {
  const { user, role } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      {/* <Route
        path="/"
        element={user ? (role === "admin" ? <AdminHome /> : <UserHome />) : <Navigate to="/login" />}
      /> */}
      <Route path="/login" element={!user ?  <LoginPage /> :<LoginPage /> } />
      <Route path="/register" element={ <RegisterPage />} />
      <Route path="/customer" element={<CustomerDashboart />} />
      <Route path="/categories" element={<Categories_cus />} />
      <Route path="/cart" element={<Cartpage_cus />} />
      {/* <Route path="*" element={<Navigate to={user ? "/customer" : "/login"} />}
      /> */}

      <Route path="/OrderDetails/:id" element={<OrderDetails />} />
      <Route path="/TrackShipment" element={<TrackShipment />} />
      <Route path="/ConfirmShipment" element={<ConfirmShipment />} />
      <Route path="/RemoveProduct/:status" element={<RemoveProduct />} />
      <Route path="/AddProduct" element={<AddProduct />} />
      <Route path="/AdminProfile" element={<AdminProfile />} />
      <Route path="/ShipmentDetails/:address/:id" element={<ShipmentDetails />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/AllProducts" element={<AllProducts />} />
      <Route path="/UserDashboard" element={<UserDashboard />} />
      <Route path="/CancelOrder/:id" element={<CancelOrder />} />
      <Route path="/UserProfile" element={<UserProfile />} />
      <Route path="/OrderProgressBar" element={ <OrderProgressBar /> } />
      <Route path="/TrackShipmentDetails" element={<TrackShipmentDetails />} />
      <Route path="/UpAndPreviousOrder" element={<UpAndPreviousOrder />} />
      <Route path="/YourCart" element={<YourCart />} />
      <Route path="/Payment/:id" element={<Payment />} />
      <Route path="/PaymentDetails/:id/:quantity" element={<PaymentDetails />} />
      <Route path="/PlaceOrder/:id/:quantity" element={<PlaceOrder />} />
      <Route path="/OrderHistory" element={<OrderHistory />} />
      <Route path="/TrackOrder/:id" element={<TrackOrder />} />
      <Route path="/ProductDetails/:skuid" element={<ProductDetails />} />
      <Route path="/SaveInstruction" element={<SaveInstruction />} />
      <Route path="/customerItemview/:item" element={<CustomerItemview />} />
      <Route path="/chat" element={<ChatBox/>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
