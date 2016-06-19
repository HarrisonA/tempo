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
  },

  actions: {
    updateUser(user) {
      user.save().then(() => {
        this.transitionTo('profile.index', user);
      }).catch((reason) => {
        alert(`We could not update the user. Here's why: ${reason}`);
      });
    },

    destroyUser(user) {
      let confirmed = confirm('Are you sure you want to delete your account?');

      if ( confirmed ) {
        user.destroyRecord().then(() => {
          this.get('session').logout();
        }).catch((reason) => {
          alert(`Unable to delete user. Here's why: ${reason}`);
        });
      }
    }
  }
});
