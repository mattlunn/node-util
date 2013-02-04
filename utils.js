var fs = require('fs');

/**
 * Extends the object provided in the first parameter, with the properties
 * of all successive objects.
 *
 * Object n + 1's properties will overwrite object n's.
 */
module.exports.extend = (function (/* args, */) {
  function ok(obj) {
    return typeof obj === "object" && obj !== null;
  }

  return function (/* objects */) {
    var target = arguments[0];

    if (ok(target)) {
      for (var i=1;i<arguments.length;i++) {
        var obj = arguments[i];

        if (ok(obj)) {
          Object.keys(obj).forEach(function (key) {
            target[key] = obj[key];
          });
        }
      }
    }

    return target;
  }
}());

/**
 * Returns a function which will generate strings of  "length" characters long 
 * using only characters in "alphabet"
 *
 * @param alphabet: Either an array of substrings, or a string which will be 
 *        split into individual characters
 * @param length: The length of the strings generated. If alphabet is an array
 *        and each element is a single character, or a string is provided as the
 *        alphabet, the generated string will be exactly this length. If array
 *        elements contain more than 1 character, the string will be at least
 *        this length.
 * @return A function which accepts no arguments, and returns a generated 
 *         string each time it is called.
 */
module.exports.generator = function (alphabet, length) {
  return function () {
    var str = '';

    for (var i=0;i<length;i++) {
      str += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    return str;
  }
}

/**
 * Reads in the contents of the file at the specified path, and parses it as
 * JSON.
 *
 * @param path: The filepath of the JSON file
 * @return: The JSON representation of the file contents.
 */
module.exports.readJsonFileSync = function (path) {
  var ext = '.json';

  if (path.slice(0 - ext.length) !== ext) {
    path += ext;
  }

  return JSON.parse(fs.readFileSync(path));
}

/**
 * Creates a new object whose only properties are the "keys" properties in "obj"
 *
 * @param obj: The object which we want to copy some properties from
 * @param keys: An array of the properties we want copied into our new object
 * @return A new object who's properties are the "keys" properties of "obj".
 */
module.exports.extract = function (obj, keys) {
  var ret = {};

  keys.forEach(function (key) {
    ret[key] = obj[key];
  });

  return ret;
}