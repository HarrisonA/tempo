import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRoute, {
  session: service(),
  model() {
    return this.store.createRecord('project');
  },
  actions: {
    willTransition() {
      let project = this.controller.get('model');
      project.rollbackAttributes();
    },

    createProject(model) {
      model.save().then(() => {
        this.transitionTo('projects.edit', model);
      }).catch((reason) => {
        alert(`We could not save the new user. Here's why: ${reason}`);
      });
    },

    cancel() {
      this.transitionTo('projects.index');
    }
  }
});
