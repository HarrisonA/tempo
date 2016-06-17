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
    },

    destroy() {
      let confirmed = confirm('Are you sure you want to delete this project?');

      if ( confirmed ) {
        let model = this.get('model');

        model.destroyRecord().then(() => {
          this.transitionToRoute('projects');
        }, (reason) => {
          console.log(reason);
        });
      }
    }
  }
});
