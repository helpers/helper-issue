'use strict';

var verb = require('verb');
var issue = require('./');

verb.include('./docs/*.md');
verb.helper('issue', issue);

verb.task('default', function () {
  return verb.src('.verb.md')
    .pipe(verb.dest('.'));
});
