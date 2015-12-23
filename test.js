/*!
 * helper-issue <https://github.com/helpers/helper-issue>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var engine = require('engine')();
var assert = require('assert');
var should = require('should');
var issue = require('./');

describe('helper-issue', function () {
  it('should throw an error if no arguments are defined', function(done) {
    try {
      var actual = issue();
      done(new Error('Expected an error.'));
    } catch (err) {
      assert.equal(err.message, 'expected a `repository` string or object.');
      done();
    }
  });

  it('should return a formatted url given a repository string as user/repo', function () {
    var actual = issue('helper/helper-issue', {
      title: 'Error using helper-issue',
      body: 'Helper:\nError:\nCode Snippet:\n```js\n// Put code here\n```'
    });
    actual.should.equal('https://github.com/helper/helper-issue/issues/new?title=Error%20using%20helper-issue&body=Helper%3A%0AError%3A%0ACode%20Snippet%3A%0A%60%60%60js%0A%2F%2F%20Put%20code%20here%0A%60%60%60');
  });

  it('should return a formatted url given a repository string as a full url', function () {
    var actual = issue('https://github.com/helper/helper-issue', {
      title: 'Error using helper-issue',
      body: 'Helper:\nError:\nCode Snippet:\n```js\n// Put code here\n```'
    });
    actual.should.equal('https://github.com/helper/helper-issue/issues/new?title=Error%20using%20helper-issue&body=Helper%3A%0AError%3A%0ACode%20Snippet%3A%0A%60%60%60js%0A%2F%2F%20Put%20code%20here%0A%60%60%60');
  });

  it('should return a formatted url given a repository object', function () {
    var actual = issue({url: 'https://github.com/helper/helper-issue'}, {
      title: 'Error using helper-issue',
      body: 'Helper:\nError:\nCode Snippet:\n```js\n// Put code here\n```'
    });
    actual.should.equal('https://github.com/helper/helper-issue/issues/new?title=Error%20using%20helper-issue&body=Helper%3A%0AError%3A%0ACode%20Snippet%3A%0A%60%60%60js%0A%2F%2F%20Put%20code%20here%0A%60%60%60');
  });

  it('should return a formatted url when used in engine(lodash) as a ctx object', function () {
    var tmpl = '<%= issue(repository, ctx) %>';
    var data = {
      repository: 'helper/helper-issue',
      ctx: {
        title: 'Error using helper-issue',
        body: 'Helper:\nError:\nCode Snippet:\n```js\n// Put code here\n```'
      }
    };
    engine.helper('issue', issue);
    var actual = engine.render(tmpl, data);
    actual.should.equal('https://github.com/helper/helper-issue/issues/new?title=Error%20using%20helper-issue&body=Helper%3A%0AError%3A%0ACode%20Snippet%3A%0A%60%60%60js%0A%2F%2F%20Put%20code%20here%0A%60%60%60');
  });
});
