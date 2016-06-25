import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRoute, {
  session: service(),
  model(params) {
    return this.store.findRecord('project', params.project_id)
  },
  actions: {
    willTransition() {
      let project = this.controller.get('model');
      project.rollbackAttributes;
    },

    updateProject(project) {
      project.save().then(() => {
        this.get('flashMessages').success('Project has been updated!');
        this.transitionTo('projects.detail', project.id);
      }).catch((reason) => {
        alert(`We could not update the project. Here's why: ${reason}`);
      });
    },

    destroyProject(project) {
      let confirmed = confirm('Are you sure you want to delete this project?');

      if ( confirmed ) {
        project.destroyRecord().then(() => {
          this.transitionTo('projects.index');
        }).catch((reason) => {
          alert(`Unable to delete project. Here's why: ${reason}`);
        });
      }
    },

    cancel() {
      let project = this.controller.get('model');

      this.transitionTo('projects.detail', project.id);
    }
  }
});
