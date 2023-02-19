import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./componets/Navbar/Navbar"
import TodosPage from "./pages/TodosPage/TodosPage"
import Autenticate from "./pages/Authenticate/AuthenticatePage"

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={ <Autenticate/> }
        />
        <Route
          path="/todos"
          element={ <TodosPage/> }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
