/*!
 * helper-issue <https://github.com/helpers/helper-issue>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var helperIssue = require('./');

describe('helperIssue', function () {
  it('should:', function () {
    helperIssue('a').should.eql({a: 'b'});
    helperIssue('a').should.equal('a');
  });

  it('should throw an error:', function () {
    (function () {
      helperIssue();
    }).should.throw('helperIssue expects valid arguments');
  });
});
