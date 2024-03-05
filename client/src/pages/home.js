import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from "axios";

export default function Home() {
  //states
  const [pageData, setPageData] = useState([
    {
      country: "FR",
      end_date: null,
      id: 49269,
      image_thumbnail_path:
        "https://static.episodate.com/images/tv-show/thumbnail/49269.jpg",
      name: "Miraculous: Les aventures de Ladybug et Chat Noir",
      network: "TF1",
      permalink: "miraculous-ladybug",
      start_date: "2015-10-19",
      status: "Running",
    },
    {
      country: "FR",
      end_date: null,
      id: 49269,
      image_thumbnail_path:
        "https://static.episodate.com/images/tv-show/thumbnail/49269.jpg",
      name: "Miraculous: Les aventures de Ladybug et Chat Noir",
      network: "TF1",
      permalink: "miraculous-ladybug",
      start_date: "2015-10-19",
      status: "Running",
    },
    {
      country: "FR",
      end_date: null,
      id: 49269,
      image_thumbnail_path:
        "https://static.episodate.com/images/tv-show/thumbnail/49269.jpg",
      name: "Miraculous: Les aventures de Ladybug et Chat Noir",
      network: "TF1",
      permalink: "miraculous-ladybug",
      start_date: "2015-10-19",
      status: "Running",
    },
  ]);
  const [latestPageData, setLatestPageData] = useState([
    {
      country: "FR",
      end_date: null,
      id: 49269,
      image_thumbnail_path:
        "https://static.episodate.com/images/tv-show/thumbnail/49269.jpg",
      name: "Miraculous: Les aventures de Ladybug et Chat Noir",
      network: "TF1",
      permalink: "miraculous-ladybug",
      start_date: "2015-10-19",
      status: "Running",
    },
    {
      country: "FR",
      end_date: null,
      id: 49269,
      image_thumbnail_path:
        "https://static.episodate.com/images/tv-show/thumbnail/49269.jpg",
      name: "Miraculous: Les aventures de Ladybug et Chat Noir",
      network: "TF1",
      permalink: "miraculous-ladybug",
      start_date: "2015-10-19",
      status: "Running",
    },
  ]);
  const [currentPageValue, setCurrentPageValue] = useState(1);
  const [latestPageValue, setLatestPageValue] = useState(10);

  //name of the page
  const pageName = process.env.REACT_APP_SERVER_URL;

  const handleNextPage = () => {
    setCurrentPageValue(currentPageValue + 1);
    setLatestPageValue(latestPageValue + 4);
  };
  const handlePrevPage = () => {
    if (currentPageValue <= 0) {
      setCurrentPageValue(0);
    } else {
      setCurrentPageValue(currentPageValue - 1);
    }
    if (latestPageValue <= 10) {
      setLatestPageValue(10);
    } else {
      setLatestPageValue(latestPageValue - 4);
    }
  };

  useEffect(
    () => {
      const fetchMovies = async () => {
        await axios
          .get(
            `https://www.episodate.com/api/most-popular?page=${currentPageValue}`
          )
          .then((response) => setPageData(response.data.tv_shows))
          .catch((error) => console.error("Error fetching data:", error));
      };
      fetchMovies();
    },
    [handleNextPage],
    [handlePrevPage]
  );

  useEffect(
    () => {
      const fetchTrendingMovies = async () => {
        await axios
          .get(
            `https://www.episodate.com/api/most-popular?page=${latestPageValue}`
          )
          .then((response) => setLatestPageData(response.data.tv_shows))
          .catch((error) => console.error("Error fetching data:", error));
      };
      fetchTrendingMovies();
    },
    [handleNextPage],
    [handlePrevPage]
  );

  const latestItems = latestPageData.slice(14, 16).map((movieItem, index) => (
    <Link className="singleItems" to={`/detail/${movieItem.id}`} key={index}>
      <img src={movieItem.image_thumbnail_path} />
      <div className="span">
        <h2>{movieItem.name}</h2>
        <h4>{movieItem.country}</h4>
        <h3>{movieItem.start_date}</h3>
      </div>
    </Link>
  ));

  return (
    <div>
      <Navbar />
      <div className="homeContainer">
        <div className="links">
          <img src="https://i.imgur.com/5zQ2xbn.png" />
        </div>
        <div className="movieItems">
          <div className="firstItems">{latestItems}</div>
          <div className="secondItems">
            {pageData.map((movieItem, index) => (
              <Link
                className="singleItems"
                to={`/detail/${movieItem.id}`}
                key={index}
              >
                <img src={movieItem.image_thumbnail_path} />
                <div className="span">
                  <h2>{movieItem.name}</h2>
                  <h4>{movieItem.country}</h4>
                  <h3>{movieItem.start_date}</h3>
                </div>
              </Link>
            ))}
            <div className="singleItems">ADS</div>
          </div>
          <div className="functions">
            <i onClick={handlePrevPage} class="fa-solid fa-less-than"></i>
            <i onClick={handleNextPage} class="fa-solid fa-greater-than"></i>
          </div>
        </div>
      </div>

      {/*  */}
    </div>
  );
}
