import Ember from 'ember';
import EmberValidations from 'ember-validations';

const { service } = Ember.inject;

export default Ember.Component.extend(EmberValidations, {
  session: service(),
  routing: service('-routing'),
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
    tryLogin() {
      let email = this.get('userEmail');
      let password = this.get('userPassword');
      let previousTransition = this.get('session.previousTransition');

      this.get('session').login(email, password)
        .then(() => {
          this.get('flashMessages').success('You have signed in!');
          this.get('session').transitionToPreviousRoute();
        })
        .catch((reason) => {
          this.set('showErrors', true);

          if ( typeof reason === 'string' ) {
            this.get('flashMessages').danger(reason, { sticky: true });
          }
        });
    }
  }
});
