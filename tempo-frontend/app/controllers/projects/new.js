import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    new() {
      let model = this.get('model');

      model.save().then(() => {
        this.transitionToRoute('projects.edit', model);
      }, (reason) => {
        console.log(reason);
      });
    }
  }
});
