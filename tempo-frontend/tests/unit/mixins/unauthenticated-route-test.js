import Ember from 'ember';
import UnauthenticatedRouteMixin from 'tempo-frontend/mixins/unauthenticated-route';
import { module, test } from 'qunit';

module('Unit | Mixin | unauthenticated route');

// Replace this with your real tests.
test('it works', function(assert) {
  let UnauthenticatedRouteObject = Ember.Object.extend(UnauthenticatedRouteMixin);
  let subject = UnauthenticatedRouteObject.create();
  assert.ok(subject);
});
