/*!
 * helper-issue <https://github.com/doowb/helper-issue>
 *
 * Copyright (c) 2015, Brian Woodward.
 * Licensed under the MIT License.
 */

'use strict';

var url = require('url');
var parse = require('parse-github-url');

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
 * @param  {String|Object} `repository` Repository string or object.
 * @param  {Object} `data` Data object to add as query parameters to the generated URL.
 * @param  {String} `data.title` Short string to populate the github issue title field.
 * @param  {String} `data.body` Markdown string to populate the github issue body field.
 * @return {String} URL that can be used in an anchor tag.
 * @api public
 */

function issue(repository, data) {
  if (typeof repository === 'undefined') {
    throw new TypeError('expected a `repository` string or object.');
  }

  data = data || {};
  if (typeof repository === 'string') {
    repository = parse(repository);
  } else if (typeof repository.url === 'string') {
    repository = parse(repository.url);
  }

  var res = url.format({
    protocol: 'https',
    host: 'github.com',
    pathname: repository.repopath + '/issues/new',
    query: data
  });
  return res;
}

/**
 * Expose issue
 */

module.exports = issue;
