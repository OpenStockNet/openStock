import React, { Component } from 'react';
import appIconPlaceholder from '../app-icon-placeholder.svg';
import Loader from './Loader';
// import Loader from './Loader_copy';
import AppsList from './AppsList';

class List extends Component {
  componentDidUpdate(prevprops) {
    if (prevprops.query !== this.props.query) {
      this.getApp();
    }
  }

  getApp = () => {
    const filteredApp = this.props.appsList.filter((searchApp) => searchApp.name.toLowerCase().includes(this.props.query.toLowerCase()));
    this.props.setApps(filteredApp);
  };

  render() {
    // if (!this.props.appsFiltered) return <div />;
    // TODO: check if logics is correct
    if (!this.props.appsFiltered || this.props.appsList.length == 0 ) return <Loader />;

    const apps = this.props.appsFiltered.map((app) => (
      <AppsList 
        key={app._id}
        appId={app._id}
        src={app.logo || appIconPlaceholder}
        appName={app.name}
        appCategoryName={app.category.name}
      />
    ));
    return (
      <section id="listContainer" className="fadeIn">
        {this.props.appsFiltered.length === 0 && (
          <h4>Sorry, we haven't found any alternative app 😧. Try something different.</h4>
        )}
        {apps}
        {/* <Loader/> */}
      </section>
    );
  }
}

export default List;
