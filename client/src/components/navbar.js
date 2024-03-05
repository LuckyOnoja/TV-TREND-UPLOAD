import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [iValue, setiValue] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [searchData, setSearchData] = useState([]);
  const pageName = "http://localhost:3000"

  //useEffects
  useEffect(() => {
    const fetchMovies = async () => {
      await axios
        .get(`https://www.episodate.com/api/search?q=${searchValue}`)
        .then((response) => setSearchData(response.data.tv_shows))
        .catch((error) => console.error("Error fetching data:", error));
    };
    fetchMovies();
    console.log(searchData);
  }, [searchValue]);

  const changeiValue = () => {
    setiValue(!iValue);
    setSearchValue();
  };

  const windowReload = () => {
    window.location.reload();
  };

  return (
    <div className="navContainer">
      {!iValue && <i onClick={changeiValue} className="fa-solid fa-search"></i>}
      {iValue && (
        <span>
          <i onClick={changeiValue} className="fa-solid fa-search">
            {" "}
          </i>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="search for a movie"
          ></input>
          <div className="searchContainer">
            {searchData.map((movieItem, index) => (
              <Link
                className="searchItems"
                to={`/detail/${movieItem.id}`}
                key={index}
                onDoubleClick={windowReload}
              >
                <img src={movieItem.image_thumbnail_path} />
                <div className="houseItems">
                  <h2>{movieItem.name}</h2>
                  <span>
                    <h4>{movieItem.country}</h4>
                    <h4>{movieItem.start_date}</h4>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </span>
      )}
      <h2 className="htwo">TV TREND</h2>
      <a href={pageName} className="navLogo">
        <img src="https://i.imgur.com/5zQ2xbn.png"></img>
      </a>
    </div>
  );
}
