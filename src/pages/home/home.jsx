import React from 'react'
import HeroBanner from "./heroBanner/herobanner"
import "./home.scss"
import Popular from './popular/popular'
import TopRated from './topRated/TopRated'
import Trending from "./trending/Trending"
const Home = () => {
    return (
        <div className='homePage'>
            <HeroBanner />
            <Trending />
            <Popular />
            <TopRated />

        </div>
    )
}

export default Home