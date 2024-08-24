import { Route, Routes } from "react-router-dom";
import "./App.css";
import PictureSearching from "./components/picturesearching";
import Main from "./components/main";
import Filedownload from "./components/filedownload.js"
import Login from "./components/Login.js"
import Signup from "./components/Signup.js"
import Mypage from "./components/mypage.js";

function App() {
  return (
    <Routes>
      <Route path="/Picturesearching" element={<PictureSearching />} />
      <Route path="/" element={<Main />} />
      <Route path="/file-download" element={<Filedownload />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
}

export default App;
