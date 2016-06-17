import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

const { service } = Ember.inject;

export default Ember.Route.extend({
  session: service(),
  model(params) {
    return this.store.findRecord('project', params.project_id);
  }
});
