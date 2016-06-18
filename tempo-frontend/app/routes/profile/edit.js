import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRoute, {
  session: service(),

  model(params) {
    return this.store.findRecord('user', params.user_id);
  },

  afterModel(model, transition) {
    if ( model.id !== this.get('session.currentUser.id') ) {
      transition.abort();
      this.transitionTo('profile.index', model.id);
    }
  }
});
