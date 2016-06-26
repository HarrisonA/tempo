import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRoute, {
  model(params) {
    return this.store.findRecord('task', params.task_id);
  },
  actions: {
    willTransition() {
      let task = this.controller.get('model');
      task.rollbackAttributes();
    },

    updateTask(task) {
      task.save().then(() => {
        this.get('flashMessages').success('Task has been updated!');
        this.transitionTo('tasks.detail', task.id);
      }).catch((reason) => {
        alert(`We could not update the task. Here's why: ${reason}`);
      });
    },

    destroyTask(task) {
      let confirmed = confirm('Are you sure you want to delete this task?');

      if ( confirmed ) {
        task.destroyRecord().then(() => {
          this.get('flashMessages').success('Task has been deleted');
          this.transitionTo('tasks.index');
        }).catch((reason) => {
          alert(`Unable to delete task. Here's why: ${reason}`);
        });
      }
    },

    cancel() {
      let task = this.controller.get('model');
      this.transitionTo('tasks.detail', task.id);
    }
  }
});
