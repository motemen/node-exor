#!/usr/bin/env node

var path  = require('path'),
    spawn = require('child_process').spawn;

var binPath = path.join(__dirname, '..', 'lib', 'exor');
var args    = process.argv.slice(2);

var p = spawn(binPath, args, { stdio: 'inherit' });

p.on('exit', function (code) {
  process.exit(code);
});

process.on('SIGTERM', function () {
  p.kill('SIGTERM');
});
