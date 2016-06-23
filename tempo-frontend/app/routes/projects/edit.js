import Ember from 'ember';
import AuthenticatedRoute from '../../mixins/authenticated-route';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRoute, {
  session: service(),
  model(params) {
    return this.store.findRecord('project', params.project_id);
  },
  actions: {
    updateProject(project) {
      project.save().then(() => {
        this.transitionTo('projects.edit', project);
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
    }
  }
});
