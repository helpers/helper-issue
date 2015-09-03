/*!
 * helper-issue <https://github.com/doowb/helper-issue>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var lazy = require('lazy-cache')(require);
lazy('clone-deep', 'clone');
lazy('handlebars');
lazy('url');

/**
 * Helper to create a URL that pre-populates a Github issue.
 *
 * ```js
 * var url = issue({
 *   owner: 'helper',
 *   repo: 'helper-issue',
 *   title: 'Issue Title',
 *   body: 'Issue body that may contain markdown'
 * });
 * //=> https://github.com/helper/helper-issue/issues/new?title=Issue%20Title&body=Issue%20body%20that%20may%20contain%20markdown
 * ```
 *
 * @param  {Object} `options` Options containing values to use or a hash (when used with Handlebars) with values to use.
 * @param  {String} `options.owner` Repository owner (either github user or org).
 * @param  {String} `options.repo` Repository name (if owner is omitted, provide full repository name).
 * @param  {String} `options.title` Short string to populate the github issue title field.
 * @param  {String} `options.body` Markdown string to populate the github issue body field.
 * @return {String} URL that can be used in an anchor tag.
 * @api public
 */

function issue(options) {
  options = options || {};
  var ctx = lazy.clone((typeof options.hash === 'object') ? options.hash : options);
  var repo = (typeof ctx.owner !== 'undefined') ? [ctx.owner, ctx.repo].join('/') : ctx.repo;
  delete ctx.owner;
  delete ctx.repo;

  if (typeof ctx.owner !== 'undefined') {
    ctx.repo = [ctx.owner, ctx.repo].join('/');
  }
  var url = lazy.url.format({
    protocol: 'https',
    host: 'github.com',
    pathname: repo + '/issues/new',
    query: ctx
  });
  return url;
}

/**
 * Wrap `issue` to allow using in handlebars (applies Handlebars.SafeString() to the url)
 *
 * ```js
 * var Handlebars = require('handlebars');
 * Handlebars.registerHelper('issue', issue.toHandlebars());
 * ```
 *
 * @return {Function} Function usable as a helper in Handlebars
 * @api public
 */

issue.toHandlebars = function toHandlebars() {
  return function () {
    var url = issue.apply(this, arguments);
    return new lazy.handlebars.SafeString(url);
  };
};

/**
 * Expose issue
 */

module.exports = issue;
