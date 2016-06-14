import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service(),
  actions: {
    update() {
      let model = this.get('model');

      model.save().then(() => {
        this.transitionToRoute('account.index');
      }, (reason) => {
        console.log(reason);
      });
    },

    destroy() {
      let confirmed = confirm('Are you sure you want to delete your account?');

      if ( confirmed ) {
        let model = this.get('model');

        model.destroyRecord().then(() => {
          this.get('session').logout();
          this.transitionToRoute('application');
        }, (reason) => {
          console.log(reason);
        });
      }
    }
  }
});
