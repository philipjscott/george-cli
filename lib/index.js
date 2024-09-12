function askGeorge(grg) {
  const url = 'https://student.cs.uwaterloo.ca/~se212/george/ask-george/cgi-bin/george.cgi/check'
  
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: grg
  }).then(resp => resp.text())
}

function trimGeorge(text) {
  return text
    .split('\n')
    .filter(line => !line.startsWith('+-+-+ George Version'))
    .join('\n')
    .trim()
}

// Given a list of tuples, [[file path, george output], ...]
// Produce a clean combined output, e.g.
//
// +-+-+ George Version 2024-08-31
//
// === george1.grg
// #q 01, part 1, #check PROP
// ++ Comment: Formula is in propositional logic
// ++ Comment: Typechecking passed
// ++ Comment: Syntax checked
//
// #q 02
// ++ Comment: No checks done
//
// === george2.grg
// Input file had syntax errors and may not have been parsed correctly or completely
// line 8:3 extraneous input '=>' expecting {'exists', 'forall', '!', 'pow', '(', '{', NUMBER, PATIDENT, IDENT}
function formatGeorge(pairs) {
  if (pairs.length === 0) {
    return ''
  }
  let out = ''
  const versionLines = pairs[0][1]
    .split('\n')
    .filter(line => line.startsWith('+-+-+ George Version'))
  out += versionLines.length > 0 ? versionLines[0] : '+-+-+ George Version ???'
  for (const pair of pairs) {
    out += `\n\n=== ${pair[0]}\n${trimGeorge(pair[1])}`
  }
  return out
}

module.exports = {
  askGeorge,
  trimGeorge,
  formatGeorge
}
