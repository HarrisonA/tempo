import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Mixin.create({
  session: service(),

  beforeModel(transition) {
    if ( !this.get('session.currentUser') ) {
      var loginController = this.controllerFor('login');

      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
  }
});
