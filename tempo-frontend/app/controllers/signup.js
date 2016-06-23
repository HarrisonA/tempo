import Ember from 'ember';
import EmberValidations from 'ember-validations';

const { service } = Ember.inject;

export default Ember.Controller.extend(EmberValidations, {
  session: service(),
  showErrors: false,
  validations: {
    'userFirstName': {
      presence: true
    },
    'userEmail': {
      presence: true
    },
    'userPassword': {
      presence: true,
      length: {
        minimum: 6
      }
    },
    'userPasswordConfirmation': {
      presence: true,
      length: {
        minimum: 6
      }
    }
  },
  actions: {
    signup() {
      let { userFirstName, userLastName, userEmail, userPassword, userPasswordConfirmation } = this.getProperties('userFirstName', 'userLastName', 'userEmail', 'userPassword', 'userPasswordConfirmation');

      this.validate().then(() => {
        return this.get('session').signup(userFirstName, userLastName, userEmail, userPassword, userPasswordConfirmation);
      }).then(() => {
        // Clear the form
        this.set('userFirstName', '');
        this.set('userLastName', '');
        this.set('userEmail', '');
        this.set('userPassword', '');
        this.set('userPasswordConfirmation', '');

        this.get('flashMessages').success('You have signed in successfully');
        this.transitionToPreviousRoute();
      }).catch((reason) => {
        this.set('showErrors', true);
        if ( typeof reason === 'string') {
          this.get('flashMessages').danger(reason, {sticky: true});
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
      this.transitionToRoute('index');
    }
  }
});
