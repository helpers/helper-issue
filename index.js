/*!
 * helper-issue <https://github.com/doowb/helper-issue>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var clone = require('clone-deep');
var url = require('url');

/**
 * Helper to create a URL that will prepopulate a github issue.
 *
 * ```js
 * ```
 *
 * @param  {Object} `options` Options containing values to use or a hash (when used with Handlebars) with values to use.
 * @param  {String} `options.owner` Repository owner (either github user or org).
 * @param  {String} `options.repo` Repository name (if owner is omitted, provide full repository name).
 * @param  {String} `options.title` Short string to populate the github issue title field.
 * @param  {String} `options.body` Markdown string to populate the github issue body field.
 * @return {String} URL that can be used in an anchor tag.
 * @api public
 * @name  issue
 */

module.exports = function issue(options) {
  var options = options || {};
  var ctx = clone((typeof options.hash === 'object') ? options.hash : options);
  var repo = (typeof ctx.owner !== 'undefined') ? [ctx.owner, ctx.repo].join('/') : ctx.repo;
  delete ctx.owner;
  delete ctx.repo;

  if (typeof ctx.owner !== 'undefined') {
    ctx.repo = [ctx.owner, ctx.repo].join('/');
  }
  var res = url.format({
    protocol: 'https',
    host: 'github.com',
    pathname: repo + '/issues/new',
    query: ctx
  });
  return res;
};
