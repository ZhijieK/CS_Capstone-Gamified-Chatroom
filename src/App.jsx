import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShopPage from "./pages/ShopPage";
import Profile from "./pages/Profile_Page";
import "./style.scss";

import { Link, useRoutes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {

  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to='/login'/>;
    }
    return children;
  }

  let linkElements = useRoutes([
    {path: "/", element: <ProtectedRoute><Home /></ProtectedRoute>, index: true},
    {path: "login/", element: <Login />},
    {path: "register/", element: <Register />},
    {path: "chat/*", element: <Home />},
    {path: "shop_page/*", element: <ShopPage />},
    {path: "profile/*", element: <Profile />},
  ])
  

  return (
    <div>
      <Link to="/login"> Login </Link> 
      <br></br>
      <Link to="/register"> Register </Link>
      <br></br>
      <Link to="/chat"> Chat </Link>
      <br></br>
      <Link to="/shop_page"> Shop Page </Link>
      <br></br>
      <Link to="/profile"> Profile </Link>
      {linkElements}
    </div>
  );
}

export default App;
