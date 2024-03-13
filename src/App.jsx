import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShopPage from "./pages/ShopPage";
import ProfilePage from './pages/Profile_Page.jsx';
import "./style.scss"

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
    {path: "shop_page/*", element: <ShopPage />},
    {path: "profile/", element: <ProfilePage />},
  ])
  

  return (
    <div>
      {linkElements}
    </div>
  );
}

export default App;