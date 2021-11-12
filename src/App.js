// import requirements
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import Manager from "./components/pages/Manager";
import Normal from "./components/pages/Normal";

// app function
function App() {
  return (
    // user browser router, switch adn route
    // to direct user to correct component
    // when the url changes
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/admin" element={<Admin />}></Route>
        <Route exact path="/manager" element={<Manager />}></Route>
        <Route exact path="/normal" element={<Normal />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

// export default element
export default App;
