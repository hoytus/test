// Adapted from https://github.com/fitzgen/glob-to-regexp/blob/master/index.js
module.exports = function codeownersGlobToRegexp(glob) {
  if (typeof glob !== 'string') {
    throw new TypeError('Expected a string')
  }

  var str = String(glob).trim()

  // The regexp we are building, as a string.
  var reStr = ""

  // If the pattern starts with '/', anchor it to the start of the string
  if (str.startsWith('/')) {
    reStr = "^"
    str = str.slice(1) // Remove leading '/' for further processing
  }

  // Special handling for patterns that end with '/'
  var endsWithSlash = str.endsWith('/')
  if (endsWithSlash) {
    str = str.slice(0, -1) // Remove trailing '/' for further processing
  }

  var c
  for (var i = 0, len = str.length; i < len; i++) {
    c = str[i]

    switch (c) {
      case "/":
      case "$":
      case "^":
      case "+":
      case ".":
      case "(":
      case ")":
      case "=":
      case "!":
      case "|":
        reStr += "\\" + c
        break

      case "*":
        // Move over all consecutive "*"'s.
        var starCount = 1
        while (str[i + 1] === "*") {
          starCount++
          i++
        }

        if (starCount === 1) {
          // Single "*" matches anything except "/"
          reStr += "[^/]*"
        } else if (starCount === 2) {
          // "**" matches any number of directories or files
          reStr += ".*"
        }
        break

      default:
        reStr += c
    }
  }

  // If the pattern originally ended with '/', ensure it only matches directories
  if (endsWithSlash) {
    reStr += "(?:\/.*)?$" // Match directory or anything under it
  } else {
    reStr = "^" + reStr + "$" // Match the whole path
  }

  return new RegExp(reStr)
}
