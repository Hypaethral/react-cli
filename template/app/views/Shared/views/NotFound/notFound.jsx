import React from 'react';
import { Link } from 'react-router';
import RouteStrings from '../../../../routeStrings.js';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <p>You Are Lost!</p>
          <Link to={RouteStrings.home.path}>
            Get Found!
          </Link>
        </div>
    );
  }
}

export default NotFound;