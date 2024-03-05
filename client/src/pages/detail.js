import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  // states
  const [detailData, setDetailData] = useState([
    {
      countdown: {
        season: 2,
        episode: 5,
        name: "Aleria",
        air_date: "2024-02-29 12:00:00",
      },
      country: "US",
      description:
        "Dramatizing an epic 26th-century conflict between humanity and an alien threat known as the Covenant, <b>Halo</b> weaves deeply drawn personal stories with action, adventure and a richly imagined vision of the future.",
      description_source: null,
      end_date: null,
      episodes: 17,
      genres: (2)[("Action", "Science-Fiction")],
      id: 62518,
      image_path: "https://static.episodate.com/images/tv-show/full/62518.jpg",
      image_thumbnail_path:
        "https://static.episodate.com/images/tv-show/thumbnail/62518.jpg",
      name: "Halo",
      network: "Paramount+",
      permalink: "halo-showtime",
      pictures: (7)[
        ("https://static.episodate.com/images/episode/62518-576.jpg",
        "https://static.episodate.com/images/episode/62518-486.jpg",
        "https://static.episodate.com/images/episode/62518-643.jpg",
        "https://static.episodate.com/images/episode/62518-865.jpg",
        "https://static.episodate.com/images/episode/62518-402.jpg",
        "https://static.episodate.com/images/episode/62518-947.jpg",
        "https://static.episodate.com/images/episode/62518-958.jpg")
      ],
      rating: "9.0000",
      rating_count: "29",
      runtime: 10,
      start_date: "2022-03-24",
      status: "Running",
      url: "https://www.episodate.com/tv-show/halo-showtime",
      youtube_link: null,
    },
  ]);
  const [redValue, setRedValue] = useState(() => {
    const storedValue = localStorage.getItem("redValue");
    return storedValue === "true";
  });
  const [blueValue, setBlueValue] = useState(() => {
    const storedValue = localStorage.getItem("blueValue");
    return storedValue === "true";
  });
  const [grayValue, setGrayValue] = useState(() => {
    const storedValue = localStorage.getItem("grayValue");
    return storedValue === "true";
  });
  const [gestureLove, setGestureLove] = useState(0);
  const [gestureLike, setGestureLike] = useState(0);
  const [gestureDislike, setGestureDislike] = useState(0);
  const [generalData, setGeneralData] = useState([]);
  const [generalDataValue, setGeneralDataValue] = useState(0);
  const [moreLikeVideoData, setMoreLikeVideoData] = useState([]);
  const [loading, setLoading] = useState(true);

  //name of the page
  const pageName = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    localStorage.setItem("redValue", redValue);
  }, [redValue]);
  useEffect(() => {
    localStorage.setItem("blueValue", blueValue);
  }, [blueValue]);
  useEffect(() => {
    localStorage.setItem("grayValue", grayValue);
  }, [grayValue]);

  //useEffects
  useEffect(() => {
    const fetchMovieDetail = async () => {
      await axios
        .get(`https://www.episodate.com/api/show-details?q=${id}`)
        .then((response) => setDetailData(response.data.tvShow))
        .catch((error) => console.error("Error fetching data:", error));
    };

    fetchMovieDetail();
  }, []);
  useEffect(() => {
    const fetchGestures = async () => {
      try {
        const response = await axios.get(`${pageName}getGestures?id=${id}`);
        if (response === null) {
          setLoading(true);
        } else {
          setGestureLove((prev) => prev + response.data.love);
          setGestureLike((prev) => prev + response.data.like);
          setGestureDislike((prev) => prev + response.data.dislike);
          setLoading(false);
          if (detailData.rating >= 9) {
            setGestureLike((prev) => prev + 500);
          }
          if (detailData.rating >= 9.4) {
            setGestureLove((prev) => prev + 1000);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGestures();
  }, [detailData]);
  useEffect(() => {
    fetchGeneralData();
  }, [generalDataValue]);

  //script for gestures
  const handleGestureLove = () => {
    setGestureLove((prev) => prev + 1);
    axios
      .post(`${pageName}gestures?id=${id}`, {
        _id: detailData.id,
        love: gestureLove,
        like: gestureLike,
        dislike: gestureDislike,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setRedValue(true);
    setBlueValue(false);
    setGrayValue(false);
  };

  const handleGestureLike = () => {
    setGestureLike((prev) => prev + 1);

    axios
      .post(`${pageName}gestures?id=${id}`, {
        _id: detailData.id,
        love: gestureLove,
        like: gestureLike,
        dislike: gestureDislike,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setRedValue(false);
    setBlueValue(true);
    setGrayValue(false);
  };
  const handleGestureDislike = () => {
    setGestureDislike((prev) => prev + 1);
    axios
      .post(`${pageName}gestures?id=${id}`, {
        _id: detailData.id,
        love: gestureLove,
        like: gestureLike,
        dislike: gestureDislike,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setRedValue(false);
    setBlueValue(false);
    setGrayValue(true);
  };

  //fetch data for more videos like this
  const fetchGeneralData = async () => {
    try {
      const response = await fetch(
        `https://www.episodate.com/api/most-popular?page=${generalDataValue}`
      );
      const data = await response.json();
      setGeneralData((prevData) => [...prevData, ...data.tv_shows]);
      if (generalDataValue < 100) {
        setGeneralDataValue((prevValue) => prevValue + 1);
      }
      setMoreLikeVideoData(
        generalData.filter((item) => item.network === detailData.network)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const windowReload = () => {
    window.location.reload();
  };

  return (
    <div>
      <Navbar />
      <div className="detailContainer">
        <div className="backgroundImg">
          {detailData.image_path == "" ? (
            <img src={detailData.image_path}></img>
          ) : (
            <img src={detailData.image_thumbnail_path}></img>
          )}
          <h1>{detailData.name} </h1>
          <span>
            <h3>{detailData.country}</h3>
            <h3>{detailData.genres}</h3>
            <h3>{detailData.rating}/10</h3>
            {detailData.end_date ? (
              <h3>
                {detailData.start_date} - {detailData.end_date}
              </h3>
            ) : (
              <h3>{detailData.start_date} - ongoing</h3>
            )}
            <h3>Status : {detailData.status}</h3>
          </span>
          <div className="smallImg">
            <img src={detailData.image_thumbnail_path}></img>
          </div>
        </div>
        <div className="otherDetails">
          <h2>{detailData.description}</h2>
          <div className="icons">
            {redValue ? (
              <i
                onClick={handleGestureLove}
                class="fa fa-heart red"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={handleGestureLove}
                class="fa fa-heart"
                aria-hidden="true"
              ></i>
            )}
            {blueValue ? (
              <i
                onClick={handleGestureLike}
                class="fa fa-thumbs-up blue"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={handleGestureLike}
                class="fa fa-thumbs-up"
                aria-hidden="true"
              ></i>
            )}
            {grayValue ? (
              <i
                onClick={handleGestureDislike}
                class="fa fa-thumbs-down gray"
                aria-hidden="true"
              ></i>
            ) : (
              <i
                onClick={handleGestureDislike}
                class="fa fa-thumbs-down"
                aria-hidden="true"
              ></i>
            )}
          </div>
          <div className="gestureInfo">
            {loading ? (
              <h2>No gesture on this movie yet. add one</h2>
            ) : (
              <span>
                <h4>{gestureLove}</h4>
                <h4>{gestureLike}</h4>
                <h4>{gestureDislike}</h4>
              </span>
            )}
          </div>
        </div>
              <div> 
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2067095235090192"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
 style={{ display: 'block', textAlign: "center" }}
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-2067095235090192"
     data-ad-slot="6238892051"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
              </div>
        <div className="icons two">MORE LIKE THIS</div>
        <div className="moreLike">
          {moreLikeVideoData.map((movieItem, index) => (
            <Link
              className="singleItems"
              to={`/detail/${movieItem.id}`}
              key={index}
              onDoubleClick={windowReload}
            >
              <img src={movieItem.image_thumbnail_path} />
              <div className="span">
                <h2>{movieItem.name}</h2>
                <h4>{movieItem.country}</h4>
                <h3>{movieItem.start_date}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
