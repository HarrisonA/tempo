import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service(),
  isCurrentUser: Ember.computed('model', 'session.currentUser', function() {
    return this.get('model.id') === this.get('session.currentUser.id');
  })
});
