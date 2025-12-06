import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../AuthProvider';

const MyAds = () => {

    const [myAds, setMyAds] = useState([]);
    const { user } = useContext(Authcontext);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/myads?email=${user.email}`)
            .then(res => res.json())
            .then(data => setMyAds(data))
            .catch(err => console.log(err));

    }, [user?.email]);

    return (
        <div>
            My Ads {myAds.length}
        </div>
    );
};

export default MyAds;
