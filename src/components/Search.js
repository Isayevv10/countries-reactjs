import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";

const Search = ({ setUsers }) => {
  const param = useParams();
  const code = param.code.toLowerCase();

  const goBack = useNavigate();
  const [country, setCountry] = useState([]);

  const fetchCountry = async () => {
    const res = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
    setCountry(res.data);
  };

  const getAllData = async () => {
    const res = await axios.get("https://restcountries.com/v3.1/all");
    setUsers(res.data);
  };

  const getBack = () => {
    getAllData();
    goBack(-1);
  };

  useEffect(() => {
    fetchCountry();
  }, [param]);

  return (
    <div className='container mx-auto'>
      {country.map((each) => {
        return (
          <div key={uuidv4()}>
            <button
              className='backBtn cursor-pointer text-lg font-bold p-3 my-6 rounded-md'
              onClick={() => getBack()}
            >
              <BiArrowBack className='inline' /> BACK
            </button>
            <div className='flex flex-wrap'>
              <div className='md:basis-5/12 basis-full'>
                <img src={each.flags.png} alt='' className='w-full h-64' />
              </div>
              <div className='md:basis-7/12 basis-full'>
                <div className='font-bold text-2xl pl-5 md:mt-0 mt-5 mb-5'>
                  {each.name.common}
                </div>
                <div className='flex pl-5 flex-wrap'>
                  <div className='lg:basis-1/2 basis-full'>
                    <div className='flex mb-1'>
                      <div className='mr-1.5 text-base font-bold'>
                        Native Name :
                      </div>
                      <p>{each.name.official}</p>
                    </div>
                    <div className='flex mb-1'>
                      <div className='mr-1.5 text-base font-bold'>
                        Population :
                      </div>
                      <p>{each.population}</p>
                    </div>
                    <div className='flex mb-1'>
                      <div className='mr-1.5 text-base font-bold'>Region :</div>
                      <p>{each.region}</p>
                    </div>
                    <div className='flex mb-1'>
                      <div className='mr-1.5 text-base font-bold'>
                        Sub Region :
                      </div>
                      <p>{each.subregion ? each.subregion : "None"}</p>
                    </div>
                  </div>
                  <div className='lg:basis-1/2 basis-full md:mt-0 mt-3'>
                    <div className='flex mb-1'>
                      <div className='mr-1.5 text-base font-bold'>
                        Top Level Domain :
                      </div>
                      <p>{each.tld}</p>
                    </div>
                    <div className='flex mb-1'>
                      <div className='mr-1.5 text-base font-bold'>
                        Capital :
                      </div>
                      <p>{each?.capital ? each.capital : "None"}</p>
                    </div>
                    <div className='flex mb-1'>
                      <div className='mr-1.5 text-base font-bold'>
                        Currencies :
                      </div>
                      <p>
                        {each?.currencies
                          ? Object.values(each.currencies).map(
                              (cur) => cur.name + ", "
                            )
                          : "None"}
                      </p>
                    </div>
                    <div className='flex mb-1'>
                      <div className='mr-1.5 text-base font-bold'>
                        Languages :
                      </div>
                      <p>
                        {each?.languages
                          ? Object.values(each.languages).map(
                              (lan) => lan + ","
                            )
                          : "None"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='pl-5 mt-6 flex flex-wrap'>
                  <span className='mr-1.5 text-base font-bold'>
                    Border Countries :
                  </span>
                  <div>
                    {each.borders
                      ? each?.borders?.map((border, index) => {
                          return (
                            <Link
                              to={`/country/${border}`}
                              key={index}
                              className='border border-black p-0.5 rounded-lg mr-1 md:text-base text-sm font-semibold'
                            >
                              {border}
                            </Link>
                          );
                        })
                      : "None"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Search;
