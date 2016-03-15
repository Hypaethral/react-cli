import Reflux from 'reflux';
import _ from 'lodash';
import cuid from 'cuid';
//import Utils from $utilsPath; ? //'../../../../../utils.js';
import ExampleActions from '../actions/ExampleActions.js';

const ExampleStore = Reflux.createStore({
  init: function() {
    this.listenToMany(ExampleActions);
  },

  getExample() {
    return;
  }
});

export default ExampleStore;