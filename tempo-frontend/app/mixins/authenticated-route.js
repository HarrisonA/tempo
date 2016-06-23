import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Mixin.create({
  session: service(),

  beforeModel(transition) {
    if ( !this.get('session.currentUser') ) {
      this.set('session.previousTransition', transition);
      this.transitionTo('login');
    }
  }
});
