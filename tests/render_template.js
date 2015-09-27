var fs = require('fs');

var args = process.argv;
var templates = {};

var dataFileName = args[args.length - 1];
var dataFileText = readFile(dataFileName);

try {
    var data = JSON.parse(dataFileText);
} catch (e) {
    throw new Error('Unable to parse data ' + dataFileText + ' from file ' + dataFileName);
}

for (var key in data) {
    if (data[key] === '<<< MAKE ME A FUNCTION >>>') {
        data[key] = function () { return 'hello'; };
    }
}

process.stdout.write(require(args[2])(data));

function readFile(name) {
    try {
        return fs.readFileSync(name, 'utf8');
    } catch (e) {
        throw new Error('Unable to read file ' + name);
    }
}
