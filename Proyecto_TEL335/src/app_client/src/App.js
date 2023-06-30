import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// pages & components
import Home from './pages/Home'
import Navbar from "./components/navbar.component";
import LoginRegister from "./pages/login-register"
function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ?  <Home /> : <Navigate to="/login-register" />} 
            />
            <Route 
              path="/login-register" 
              element={!user ? <LoginRegister /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;