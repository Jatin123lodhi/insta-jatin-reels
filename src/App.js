import logo from "./logo.svg";
import "./App.css";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Feed } from "./components/Feed";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { ForgotPassword } from "./components/ForgotPassword";
import { Profile } from "./components/Profile";
import { UserProvider } from "./context/UserContext";
import { Ioa } from "./components/Ioa";
import { PostProvider } from "./context/PostContext";
import { Explore } from "./components/Explore";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
        {/* <PostProvider> */}
            <Routes>
              <Route path="/" element={<PrivateRoute><Feed /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/password-reset" element={<ForgotPassword />} />
              <Route path="/profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />      
              <Route path="/explore" element={<PrivateRoute><Explore /></PrivateRoute>} />      
            </Routes>
          {/* </PostProvider> */}
        </UserProvider>  
      </AuthProvider>
    </BrowserRouter>
    
  );
}

export default App;
