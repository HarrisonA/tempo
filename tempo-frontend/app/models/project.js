import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr(),
  description: attr(),
  desc: Ember.computed.alias('description'),
  users: hasMany('user'),
  tasks: hasMany('task')
});
