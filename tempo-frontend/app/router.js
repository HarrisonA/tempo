import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('users');
  this.route('login');
  this.route('signup');
  this.route('account', function() {
    this.route('edit');
  });
  this.route('dashboard');
});

export default Router;
