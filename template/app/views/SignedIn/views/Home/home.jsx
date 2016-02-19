import React from 'react';
import { Link } from 'react-router';
import RouteStrings from '../../../../routeStrings.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <p>You Are Home!</p>
          <Link to={RouteStrings.notFound.path}>
            Get Lost!
          </Link>
        </div>
    );
  }
}

export default Home;