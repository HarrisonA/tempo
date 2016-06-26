import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('default-page', 'Integration | Component | default page', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{default-page}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#default-page}}
      template block text
    {{/default-page}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
