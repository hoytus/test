module.exports = function parseCodeowners(codeownersContent) {
  const lines = codeownersContent.split('\n')
  const patterns = []

  lines.forEach(line => {
    const trimmedLine = line.trim()

    if (trimmedLine === '' || trimmedLine.startsWith('#')) {
      return
    }

    const parts = trimmedLine.split(/\s+/)
    const pattern = parts[0]
    const owners = parts.slice(1)

    patterns.push({ pattern, owners })
  })

  return patterns
}
