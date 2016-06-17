import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    update() {
      let model = this.get('model');

      model.save().then(() => {
        this.transitionToRoute('projects.detail', model);
      }, (reason) => {
        console.log(reason)
      });
    }
  }
});
