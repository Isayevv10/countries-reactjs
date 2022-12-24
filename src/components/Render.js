import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsSearch } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

const Render = ({ users, setUsers, currentPosts, theme }) => {
  const [inputVal, setInputVal] = useState("");
  const debounceInput = useDebounce(inputVal, 800);

  // filter by input
  const filterInput = async (debounceInput) => {
    if (debounceInput.length === 0) {
      const data = await axios.get("https://restcountries.com/v3.1/all");
      setUsers(data.data);
    } else {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${debounceInput}`
      );
      setUsers(res.data);
    }
  };

  useEffect(() => {
    filterInput(debounceInput);
  }, [debounceInput]);

  // filter by region
  const filterRegion = async (region) => {
    if (region === "") {
      const res = await axios.get("https://restcountries.com/v3.1/all");
      setUsers(res.data);
    } else {
      const res = await axios.get(
        `https://restcountries.com/v3.1/region/${region}`
      );
      setUsers(res.data);
    }
  };

  return (
    <div>
      {/* input search */}

      <div className='container mx-auto flex justify-between flex-wrap md:flex-1 gap-4'>
        <div className={`border shadow-xl rounded-md px-2 input-${theme}`}>
          <BsSearch className='inline' />
          <input
            type='search'
            value={inputVal}
            placeholder='Search for a country...'
            onChange={(e) => setInputVal(e.target.value)}
            className={`w-80 h-9 ml-2 indent-1.5 outline-none input-${theme} `}
          />
        </div>
        <div>
          <select
            onChange={(e) => filterRegion(e.target.value)}
            className={`cursor:pointer shadow-xl h-9 p-1 rounded-md outline-none input-${theme}`}
          >
            <option value=''>Filter by Region</option>
            <option value='africa'>Africa</option>
            <option value='america'>Amerika</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='oceania'>Oceania</option>
            <option value='antarctic'>Antarctic</option>
          </select>
        </div>
      </div>

      {/* countries map */}

      <div className='container mx-auto grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-7'>
        {currentPosts.map((item) => {
          return (
            <Link
              to={`/country/${item.ccn3}`}
              className='text-decoration-line: none'
              key={uuidv4()}
            >
              <div className='rounded overflow-hidden shadow-xl'>
                <div className='h-44'>
                  <img
                    className='w-full h-full object-fit'
                    src={item.flags.png}
                    alt='country'
                  />
                </div>

                <div className='pl-4 font-bold text-2xl my-4'>
                  <div>{item.name.common}</div>
                </div>

                <div>
                  <p className='pl-4'>
                    <span className='font-semibold'>Population</span> :
                    {item.population}
                  </p>
                  <p className='pl-4'>
                    <span className='font-semibold'>Region</span> :{item.region}
                  </p>
                  <p className='pl-4 mb-3.5'>
                    <span className='font-semibold'>Capital</span> :
                    {item.capital}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};

export default Render;
