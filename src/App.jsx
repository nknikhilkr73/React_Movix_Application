import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import PageNotFound from "./pages/404/pageNotFound";
import Details from "./pages/details/details";
import Explore from "./pages/explore/explore";
import Home from "./pages/home/home";
import SearchResult from "./pages/searchResult/searchResult";
import { getApiConfiguration, getGeneres } from "./store/homeSlice.js";
import { fetchDataFromApi } from "./utils/api";

function App() {
  const dispatch = useDispatch()
  const { url } = useSelector(state => state.home)

  //This useEffect is from line 20 to line 61 with two functions
  useEffect(() => {

    //dispatch(getApiConfiguration())
    const fetchApiConfig = () => {
      fetchDataFromApi("/configuration").then((res) => {

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }

        dispatch(getApiConfiguration(url));
      })
    }

    //dispatch(getGeneres());
    const generesCall = async () => {
      let promises = []
      let endPoint = ["tv", "movie"]
      let allGenres = {}

      endPoint.forEach((url) => {
        return promises.push(fetchDataFromApi(`/genre/${url}/list`))
      })

      const data = await Promise.all(promises);

      data.map(({ genres }) => {
        return genres.map((item) => (allGenres[item.id] = item))
      })

      dispatch(getGeneres(allGenres))
    }

    // fetchApiConfig function call
    fetchApiConfig()

    // getGeneres function call
    generesCall()

  }, [dispatch]);



  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
