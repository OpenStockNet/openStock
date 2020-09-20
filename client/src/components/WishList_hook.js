import React, { useState, useEffect } from "react";
import {fetchAllApps} from "../services/app";
import appIconPlaceholder from "../app-icon-placeholder.svg";
import { Link } from "react-router-dom";

// fetch all apps, filter to wishUser_id includes props user id
function WishListHook(props){
    const [appList, setAppList] = useState([]);

    useEffect(() => {
        fetchAllApps()
        .then((apps) => {
            setAppList(apps)
        })
        .catch((error) => {
            alert(error.message);
        });
    }, [setAppList])

    return (
        <div>   
        <h1>My wish list</h1>
        <section  id="listContainer">
        {appList
        .filter((app) => app.wishUser.includes(props.user._id))
        .map(app => {
            return (
                <div  key={app._id} className="appCard">
                    <Link to={`/apps/${app._id}`}>
                        <img src={app.logo||appIconPlaceholder} alt="" /> 
                    </Link>
                    <div>
                    <Link to={`/apps/${app._id}`}>
                        <h3>{app.name}</h3>
                    </Link>
                    <h6>{app.category.name}</h6>
                    </div>
                </div>
            )
        })}
        </section>
        </div>
    )
    
}

export default WishListHook;