import React, { Component } from "react";
import {fetchAllApps} from "../services/app";
import appIconPlaceholder from "../app-icon-placeholder.svg";
import { Link } from "react-router-dom";

// fetch all apps, and filter to wishUser_id includes props user id
class WishList extends Component {
    state = {
        appList:[]
    };

    componentDidMount() {
        fetchAllApps()
        .then((apps) => {
            this.setState({
                appList: apps,
            });
        })
        .catch((error) => {
            alert(error.message);
        });
    }
    render() {
        const filteredApps = this.state.appList
        .filter((app) => app.wishUser.includes(this.props.user._id))
        .map(app => {
          return (
            <div key={app._id} className="appCard_wish">
             <Link to={`/apps/${app._id}`}>
                <img src={app.logo||appIconPlaceholder} alt="" style={{width:"50px"}}/>
                <h3>{app.name}</h3>
                <h5>{app.category.name}</h5>
              </Link>
            </div>
          )
        })
        return (
            <div>
            <h1>My wish list</h1>
            <section id="listContainer">
                {filteredApps}
            </section>
            </div>
        );
    }
}

export default WishList;