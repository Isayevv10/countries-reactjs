import "./App.css";
import "./css/darkMode.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Render from "./components/Render";
import Search from "./components/Search";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Pagination from "./components/Pagination";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(50);
  const [theme, setTheme] = useState("light");

  const fecthData = async () => {
    const res = await axios.get("https://restcountries.com/v3.1/all");
    setUsers(res.data);
  };

  useEffect(() => {
    fecthData();
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const currentPosts = users.slice(firstIndex, lastIndex);

  return (
    <div className='App'>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route
          path='/countries-reactjs'
          element={
            <Render
              users={users}
              setUsers={setUsers}
              currentPosts={currentPosts}
              theme={theme}
            />
          }
        >
          <Route
            path='/countries-reactjs'
            element={
              <Pagination
                setCurrentPage={setCurrentPage}
                totalPosts={users.length}
                postPerPage={postPerPage}
              />
            }
          />
        </Route>
        <Route path='country/:code' element={<Search setUsers={setUsers} />} />
      </Routes>
    </div>
  );
}

export default App;
