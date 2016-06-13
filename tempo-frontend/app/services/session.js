import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Service.extend({
  currentUser: null,
  store: service(),

  login(userEmail, userPassword) {
    return new Promise((resolve, reject) => {
      Ember.$.ajax({
        method: 'POST',
        url: '/sessions',
        data: {
          email: userEmail,
          password: userPassword
        }
      }).then((data) => {
        let token = data['auth_token'],
            userId = data['user_id'];

        Cookies.set('userId', userId);
        Cookies.set('authToken', token);
        this.initializeFromCookie();
        resolve();
      }, () => {
        reject('Email and password did not match');
      });
    });
  },

  logout() {
    this.set('currentUser', null);
    Cookies.remove('userId');
    Cookies.remove('authToken');
  },

  signup(userFirstName, userLastName, userEmail, userPassword, userPasswordConfirmation) {
    return new Promise((resolve, reject) => {
      Ember.$.ajax({
        method: 'POST',
        url: '/users',
        data: {
          user: {
            first_name: userFirstName,
            last_name: userLastName,
            email: userEmail,
            password: userPassword,
            password_confirmation: userPasswordConfirmation
          }
        }
      }).then((data) => {
        let token = data['auth_token'],
            userId = data['user_id'];

        Cookies.set('userId', userId);
        Cookies.set('authToken', token);
        this.initializeFromCookie();
        resolve();
      }, (reason) => {
        reject(`Server error: ${Ember.get(reason, 'responseJSON.error')}`);
      })
    })
  },

  initializeFromCookie: function() {
    let userId = Cookies.get('userId');

    if ( !!userId ) {
      let user = this.get('store').find('user', userId);
      this.set('currentUser', user);
    }
  }.on('init')
});