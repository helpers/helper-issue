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
  it('should return a formatted url given an owner and repo', function () {
    var actual = issue({
      owner: 'helper',
      repo: 'helper-issue',
      title: 'Error using helper-issue',
      body: 'Helper:\nError:\nCode Snippet:\n```js\n// Put code here\n```'
    });
    actual.should.equal('https://github.com/helper/helper-issue/issues/new?title=Error%20using%20helper-issue&body=Helper%3A%0AError%3A%0ACode%20Snippet%3A%0A%60%60%60js%0A%2F%2F%20Put%20code%20here%0A%60%60%60');
  });

  it('should return a formatted url given a repo', function () {
    var actual = issue({
      repo: 'helper/helper-issue',
      title: 'Error using helper-issue',
      body: 'Helper:\nError:\nCode Snippet:\n```js\n// Put code here\n```'
    });
    actual.should.equal('https://github.com/helper/helper-issue/issues/new?title=Error%20using%20helper-issue&body=Helper%3A%0AError%3A%0ACode%20Snippet%3A%0A%60%60%60js%0A%2F%2F%20Put%20code%20here%0A%60%60%60');
  });

  it('should return a formatted url given an owner and repo on the hash', function () {
    var actual = issue({
      hash: {
        owner: 'helper',
        repo: 'helper-issue',
        title: 'Error using helper-issue',
        body: 'Helper:\nError:\nCode Snippet:\n```js\n// Put code here\n```'
      }
    });
    actual.should.equal('https://github.com/helper/helper-issue/issues/new?title=Error%20using%20helper-issue&body=Helper%3A%0AError%3A%0ACode%20Snippet%3A%0A%60%60%60js%0A%2F%2F%20Put%20code%20here%0A%60%60%60');
  });

  it('should return a formatted url given a repo on the hash', function () {
    var actual = issue({
      hash: {
        repo: 'helper/helper-issue',
        title: 'Error using helper-issue',
        body: 'Helper:\nError:\nCode Snippet:\n```js\n// Put code here\n```'
      }
    });
    actual.should.equal('https://github.com/helper/helper-issue/issues/new?title=Error%20using%20helper-issue&body=Helper%3A%0AError%3A%0ACode%20Snippet%3A%0A%60%60%60js%0A%2F%2F%20Put%20code%20here%0A%60%60%60');
  });

  it('should return a formatted url when used in engine(lodash) as a ctx object', function () {
    var tmpl = '<%= issue(ctx) %>';
    var data = {
      ctx: {
        owner: 'helper',
        repo: 'helper-issue',
        title: 'Error using helper-issue',
        body: 'Helper:\nError:\nCode Snippet:\n```js\n// Put code here\n```'
      }
    };
    engine.helper('issue', issue);
    var actual = engine.render(tmpl, data);
    actual.should.equal('https://github.com/helper/helper-issue/issues/new?title=Error%20using%20helper-issue&body=Helper%3A%0AError%3A%0ACode%20Snippet%3A%0A%60%60%60js%0A%2F%2F%20Put%20code%20here%0A%60%60%60');
  });
});
