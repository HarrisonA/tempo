import Ember from 'ember';
import EmberValidations from 'ember-validations';

const { service } = Ember.inject;

export default Ember.Controller.extend(EmberValidations, {
  session: service(),
  showErrors: false,
  validations: {
    'userEmail': {
      presence: true
    },
    'userPassword': {
      presence: true
    }
  },
  actions: {
    login() {
      let { userEmail, userPassword } = this.getProperties('userEmail', 'userPassword');

      this.get('session').login(userEmail, userPassword).then(() => {
        // Clear the form
        this.set('userEmail', '');
        this.set('userPassword', '');

        this.get('flashMessages').success('You have signed in successfully');
        this.transitionToPreviousRoute();
      }).catch((reason) => {
        this.set('showErrors', true);
        if ( typeof reason === 'string') {
          this.get('flashMessages').danger(reason, {sticky: true})
        }
      });
    }
  },
  transitionToPreviousRoute(){
    var previousTransition = this.get('previousTransition');
    if (previousTransition) {
      this.set('previousTransition', null);
      previousTransition.retry();
    } else {
      // Default back to homepage
      this.transitionToRoute('application');
    }
  }
});
