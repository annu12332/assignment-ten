import React from 'react';
import Slider from '../components/Slider';
import Populer from '../components/Populer';
import Extra from '../components/Extra';
import Tagline from '../components/Tagline';

const Home = () => {
    return (
        <div className='bg-gray-200'>
            <Slider/>
            <Tagline/>
            <Populer/>
            <Extra/>
        </div>
    );
};

export default Home;