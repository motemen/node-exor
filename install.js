var fs   = require('fs'),
    path = require('path');

var request  = require('request'),
    unzip    = require('unzip'),
    progress = require('progress-stream'),
    mkdirp   = require('mkdirp'),
    log      = require('single-line-log').stdout;

var version = 'pre-release';
var os      = process.platform;
var arch    = {
  x64:  'amd64',
  ia32: '386'
}[process.arch];

var filename = 'exor_' + os + '_' + arch + '.zip';
var url = 'https://github.com/motemen/exor/releases/download/' + version + '/' + filename;

var p = progress({});
p.on('progress', function (p) {
  log('Downloading ' + filename + ' ... ' + (Math.floor(p.percentage * 10) / 10) + '%');
});

mkdirp.sync(path.join(__dirname, 'lib'));

request
  .get(url)
  .on('response', function (response) {
    p.setLength(Number(response.headers['content-length']));
  })
  .on('end', function () {
    log.clear();
    console.log('');
  })
  .pipe(p)
  .pipe(unzip.Parse())
  .on('entry', function (entry) {
    entry.pipe(fs.createWriteStream(path.join(__dirname, 'lib', entry.path), { mode: 0755 }));
  })
