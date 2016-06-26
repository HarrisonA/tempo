import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  model() {
    return this.store.createRecord('task');
  },
  actions: {
    willTransition() {
      let task = this.controller.get('model');
      task.rollbackAttributes();
    },

    createTask(model) {
      model.save().then(() => {
        this.transitionTo('tasks.edit', model);
      }).catch((reason) => {
        alert(`We could not save the new task. Here's why: ${reason}`);
      });
    },

    cancel() {
      let task = this.controller.get('model');
      this.transitionTo('tasks.index');
    }
  }
});
