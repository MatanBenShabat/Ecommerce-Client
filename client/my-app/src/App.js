import { Route, Routes } from "react-router";
import ContactUs from "./Core-Components/Contact-Us/ContactUs";
import HomePage from "./Core-Components/Home-page/HomePage";
import LoginForm from "./Core-Components/Login/LoginForm";
import NavBar from "./Core-Components/Nav-Bar/NavBar";
import Products from "./Core-Components/Products/Products";
import Register from "./Core-Components/Register/Register";
import { QueryClient, QueryClientProvider } from "react-query";
// import useLocalStorage from "./Hooks/useLocalStorage";

const queryClient = new QueryClient();

function App() {
  // useLocalStorage();
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar></NavBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
