import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service(),
  actions: {
    logout() {
      this.get('session').logout();
      this.transitionToRoute('users');
    }
  }
});
