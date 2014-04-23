/*
 * grunt-init-node
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a Node.js module, including Coffeescript development and Jasmine unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain "node" or "js" and should ' +
  'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'node'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('node_version', '>= 0.10.0'),
    init.prompt('main'),
    init.prompt('npm_test', 'grunt coverage'),
    {
      name: 'travis',
      message: 'Will this project be tested with Travis CI?',
      default: 'Y/n',
      warning: 'If selected, you must enable Travis support for this project in https://travis-ci.org/profile'
    },
    {
      name: 'coveralls',
      message: 'Will this project show test coverage history and statistics with Coveralls.io?',
      default: 'Y/n',
      warning: 'If selected, you must enable Coveralls.io support for this project in https://coveralls.io/repos'
    }
  ], function(err, props) {
    props.keywords = [];
    props.dependencies = {
      "optimist": "0.6.1",
      "underscore": "~1.6.0",
      "underscore.string": "2.3.3",
      "q": "~1.0.0"
    };
    props.devDependencies = {
      "coveralls": "~2.10.0",
      "grunt": "~0.4.4",
      "grunt-bump": "~0.0.13",
      "grunt-cli": "~0.1.13",
      "grunt-coffeelint": "~0.0.8",
      "grunt-contrib-clean": "~0.5.0",
      "grunt-contrib-coffee": "~0.10.0",
      "grunt-contrib-concat": "~0.4.0",
      "grunt-contrib-watch": "~0.6.1",
      "grunt-shell": "~0.6.4",
      "istanbul": "~0.2.4",
      "jasmine-node": "~2.0.0-beta4",
      "sphere-coffeelint": "git://github.com/sphereio/sphere-coffeelint.git#master"
    };
    props.travis = /y/i.test(props.travis);

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    if (!props.travis) { delete files['.travis.yml']; }

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
