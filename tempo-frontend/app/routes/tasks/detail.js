import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  model(params) {
    return this.store.findRecord('task', params.task_id);
  }
});
