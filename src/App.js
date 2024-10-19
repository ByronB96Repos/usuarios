import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ListUsers from "./components/ListUsers";
import UserEdit from "./components/UserEdit";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/users" element={<ListUsers></ListUsers>}></Route>
        <Route path='/edit/:usuarioId' element={<UserEdit></UserEdit>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
