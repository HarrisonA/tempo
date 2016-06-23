import Ember from 'ember';
import EmberValidations from 'ember-validations';

const { service } = Ember.inject;

export default Ember.Component.extend(EmberValidations, {
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
    trySignup() {
      let { userFirstName, userLastName, userEmail, userPassword, userPasswordConfirmation } = this.getProperties('userFirstName', 'userLastName', 'userEmail', 'userPassword', 'userPasswordConfirmation');

      this.validate().then(() => {
        return this.get('session').signup(
          userFirstName,
          userLastName,
          userEmail,
          userPassword,
          userPasswordConfirmation
        );
      }).then(() => {
        this.get('flashMessages').success('You have signed in!');
        this.get('session').transitionToPreviousRoute();
      }).catch((reason) => {
        this.set('showErrors', true);

        if ( typeof reason === 'string' ) {
          this.get('flashMessages').danger(reason, { sticky: true });
        }
      })
    }
  }
});
