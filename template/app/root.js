import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { DragDropContext } from 'react-dnd';

import RouteStrings from './routeStrings';

import Home from './views/SignedIn/views/Home/home.jsx';
import NotFound from './views/Shared/views/NotFound/notFound.jsx';


class Root extends React.Component {
  render() {
    return (
        <Router history={this.props.history}>
          <Route name={RouteStrings.home.name}
                 path={RouteStrings.home.path}
                 component={ Home }/>
          <Route path="*" component={ NotFound }/>
        </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(Root);