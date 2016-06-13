import Ember from 'ember';

export function initialize() {
  Ember.$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    let token = Cookies.get('authToken');

    if ( token ) {
      jqXHR.setRequestHeader('X-CSRF-Token', token);
    }
  });
}

export default {
  name: 'ajax-prefilter',
  initialize: initialize
};
