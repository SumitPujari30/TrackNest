import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import Home from "./pages/dashboard/Home";
import Income from "./pages/dashboard/Income";
import Expense from "./pages/dashboard/Expense";
import UserProvider from "./context/userContext";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/expense" exact element={<Expense />} />
            <Route path="/income" exact element={<Income />} />
          </Routes>
        </Router>
      </div>

      <Toaster 
        toastOptions={{
          className:"",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
}

export default App;

const Root = () => {
  //check user exixt or not
  const isAuthenticated = !!localStorage.getItem("token");

  //if user is authenticated then redirect to dashboard
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
