import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  model(params) {
    return this.store.findRecord('project', params.project_id);
  }
});
