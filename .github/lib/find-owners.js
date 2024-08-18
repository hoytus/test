const globToRegexp = require('./glob-to-regexp')

module.exports = function findOwners(filePath, patterns) {
  let owners = []

  patterns.forEach(({ pattern, owners: currentOwners }) => {
    const regexPattern = globToRegexp(pattern)

    if (regexPattern.test(`${filePath}`)) {
      owners = currentOwners
    }
  })

  return owners
}
