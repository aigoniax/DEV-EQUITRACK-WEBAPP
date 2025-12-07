import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Budget from "./pages/Budget";

const App = () => {
  return(
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/wallets" element={<Wallet />} />
            <Route path="/budgets" element={<Budget />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/category" element={<Category />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;