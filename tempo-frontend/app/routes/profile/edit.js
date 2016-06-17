import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRoute, {
  session: service(),

  beforeModel(params) {
    let currentUserId = this.get('session.currentUser.id');
    let userId = params.user_id || parseInt(params.params['profile.edit'].user_id);

    if ( userId !== currentUserId ) {
      this.transitionTo('profile', userId);
    }
  },

  model(params) {
    return this.store.findRecord('user', params.user_id);
  }
});
