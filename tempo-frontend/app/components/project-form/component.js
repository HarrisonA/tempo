import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  store: service(),
  users: Ember.computed(function() {
    return this.get('store').findAll('user');
  }),
  actions: {
    onSubmit() {
      this.get('componentSubmit')();
    },

    onCancel() {
      this.get('componentCancel')();
    }
  }
});
