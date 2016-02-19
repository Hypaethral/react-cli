import _ from 'lodash';

var RouteStrings = {
  home: {
    name: 'home',
    path: '/home',
    title: 'Home'
  },

  notFound: {
    name: 'notFound',
    path: '/lost',
    title: '404'
  },
};

export function applyTitle(name, title) {
  RouteStrings[name].title = RouteStrings[name].titleTemplate.replace('%s', title);
}

export function applyPath(name, parameterMap) {
  var path = RouteStrings[name].path;
  if (_.indexOf(path, ':') > -1) {
    var colonString = path;
    var regex = new RegExp('(?::)[^\/]+', 'g');
    var matches = colonString.match(regex);
    var matchesWithoutColon = [];
    var i = 0;
    for (i; i < matches.length; i++) {
      matchesWithoutColon[i] = matches[i].substring(1);
    }

    _.forOwn(parameterMap, function(value, key, parMap) {
      i = 0;
      for (i; i < matchesWithoutColon.length; i++) {
        if (key === matchesWithoutColon[i]) {
          colonString = colonString.replace(matches[i], value);
        }
      }
    }, matches);

    return colonString;
  }
  return path;
}

export default RouteStrings;