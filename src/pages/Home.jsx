import React from 'react';
import Slider from '../components/Slider';
import Populer from '../components/Populer';
import Extra from '../components/Extra';

const Home = () => {
    return (
        <div className='bg-gray-200'>
            <Slider/>
            <Populer/>
            <Extra/>
        </div>
    );
};

export default Home;