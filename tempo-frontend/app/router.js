import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('profile', function() {
    this.route('index', {path: '/:user_id'});
    this.route('edit', {path: '/:user_id/edit'});
  });
  this.route('dashboard');
  this.route('projects', function() {
    this.route('new');
    this.route('detail', {path: '/:project_id'});
    this.route('edit', {path: '/:project_id/edit'});
  });
  this.route('tasks', function() {
    this.route('new');
    this.route('detail', {path: '/:task_id'});
    this.route('edit', {path: '/:task_id/edit'});
  });
});

export default Router;
