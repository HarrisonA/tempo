import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Mixin.create({
  session: service(),
  beforeModel() {
    if ( this.get('session.currentUser') ) {
      return this.transitionTo('index');
    } else {
      return this._super(...arguments);
    }
  }
});
