import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../AuthProvider';
import { Link } from 'react-router';
import axios from 'axios';
import { Result } from 'postcss';
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

    const handleDelete = (id)=>{
        axios.delete(`http://localhost:3000/delete/${id}`)
        .then(res=>{
            console.log(res);

            const filterData = myAds.filter(ads=> ads._id != id)
            setMyAds(filterData)
        })
    }

    return (
        <div>
            My Ads {myAds.length}

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {myAds.map((ads, index) =>
                            <tr key={index}>
                                <th>{index + 1}</th>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={ads?.image} alt="service" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{ads?.name}</div>
                                            
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    {ads?.description}
                                    <br />
                                </td>

                                <td>{ads?.price }</td>

                                <th className='flex gap-2 '>
                                    <Link to ={`/updatelisting/${ads?._id}`}><button className="btn font-bold btn-info btn-xs">Edit</button></Link>
                                    <button onClick={()=>handleDelete(ads?._id)} className="btn btn-error font-bold btn-xs">Delete</button>
                                </th>

                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAds;
