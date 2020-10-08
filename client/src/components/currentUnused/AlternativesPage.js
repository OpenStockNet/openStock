import React, { Component } from 'react';
import Categories from './Categories';
import Alternatives from './Alternatives';
/* import List from "./List"; */

class AlternativesPage extends Component {
  render() {
    return (
      <div>
        <h2>Find the alternative to the mainstream app for you</h2>
        <Alternatives />

        {/* {this.props.alternatives.length === 0 && <h4>No alternatives here</h4>} */}

        {/* <List alternatives={this.props.alternatives} /> */}
      </div>
    );
  }
}

export default AlternativesPage;
