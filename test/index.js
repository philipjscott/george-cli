const assert = require('assert')
const {
  askGeorge,
  trimGeorge,
  formatGeorge
} = require('../lib')

// for testAskGeorge, we want to ignore differences in George version
function stripGeorgeVersion(text) {
  return text.split('\n').filter(line => !line.startsWith('+-+-+ George Version')).join('\n')
}

// Table driven tests: https://dave.cheney.net/2019/05/07/prefer-table-driven-tests
async function testAskGeorge() {
  const tests = [
    {
      input: `#u name
#a 01

#q 01

#check PROP

a ;=> b`,
      want: `
+-+-+ George Version 2024-08-31
Input file had syntax errors and may not have been parsed correctly or completely
line 8:3 extraneous input '=>' expecting {'exists', 'forall', '!', 'pow', '(', '{', NUMBER, PATIDENT, IDENT}
`
    },
    {
      input: `#u name
#a 01

#q 01

#check PROP

a => b`,
      want: `
+-+-+ George Version 2024-08-31

#q 01, part 1, #check PROP
++ Comment: Formula is in propositional logic
++ Comment: Typechecking passed
++ Comment: Syntax checked

`
    },
    {
      input: `#u name
#a 01

#q 01

#check PROP

a => b

#q 02`,
      want: `
+-+-+ George Version 2024-08-31

#q 01, part 1, #check PROP
++ Comment: Formula is in propositional logic
++ Comment: Typechecking passed
++ Comment: Syntax checked

#q 02
++ Comment: No checks done

`
    }
  ]
  for (const test of tests) {
    let out
    try {
      out = await askGeorge(test.input)
    } catch (e) {
      assert.fail('askGeorge promise rejected: ' + e.message)
    }
    assert.strictEqual(stripGeorgeVersion(out), stripGeorgeVersion(test.want))
  }
  console.log('testAskGeorge passed')
}

function testTrimGeorge() {
  const tests = [
    {
      input: `
+-+-+ George Version 2024-08-31
Input file had syntax errors and may not have been parsed correctly or completely
line 8:3 extraneous input '=>' expecting {'exists', 'forall', '!', 'pow', '(', '{', NUMBER, PATIDENT, IDENT}
`,
      want: `Input file had syntax errors and may not have been parsed correctly or completely
line 8:3 extraneous input '=>' expecting {'exists', 'forall', '!', 'pow', '(', '{', NUMBER, PATIDENT, IDENT}`
    },
    {
      input: `
+-+-+ George Version 2024-08-31

#q 01, part 1, #check PROP
++ Comment: Formula is in propositional logic
++ Comment: Typechecking passed
++ Comment: Syntax checked

`,
      want: `#q 01, part 1, #check PROP
++ Comment: Formula is in propositional logic
++ Comment: Typechecking passed
++ Comment: Syntax checked`
    },
    {
      input: `
+-+-+ George Version 2024-08-31

#q 01, part 1, #check PROP
++ Comment: Formula is in propositional logic
++ Comment: Typechecking passed
++ Comment: Syntax checked

#q 02
++ Comment: No checks done

`,
      want: `#q 01, part 1, #check PROP
++ Comment: Formula is in propositional logic
++ Comment: Typechecking passed
++ Comment: Syntax checked

#q 02
++ Comment: No checks done`
    }
  ]
  for (const test of tests) {
    assert.strictEqual(trimGeorge(test.input), test.want)
  }
  console.log('testTrimGeorge passed')
}

function testFormatGeorge() {
  const tests = [
    {
      input: [
        [
          "george1.grg",
          `
+-+-+ George Version 2024-08-31
Input file had syntax errors and may not have been parsed correctly or completely
line 8:3 extraneous input '=>' expecting {'exists', 'forall', '!', 'pow', '(', '{', NUMBER, PATIDENT, IDENT}
`
        ],
        [
          "george2.grg",
          `
+-+-+ George Version 2024-08-31

#q 01, part 1, #check PROP
++ Comment: Formula is in propositional logic
++ Comment: Typechecking passed
++ Comment: Syntax checked

`
        ]
      ],
      want: `+-+-+ George Version 2024-08-31

=== george1.grg
Input file had syntax errors and may not have been parsed correctly or completely
line 8:3 extraneous input '=>' expecting {'exists', 'forall', '!', 'pow', '(', '{', NUMBER, PATIDENT, IDENT}

=== george2.grg
#q 01, part 1, #check PROP
++ Comment: Formula is in propositional logic
++ Comment: Typechecking passed
++ Comment: Syntax checked`
    }
  ]
  for (const test of tests) {
    assert.strictEqual(formatGeorge(test.input), test.want)
  }
  console.log('testFormatGeorge passed')
}

// node:test is still experimental at the moment, so we'll keep things simple
async function main() {
  testTrimGeorge()
  testFormatGeorge()
  await testAskGeorge()
  console.log('\nAll tests passed!')
}

main()
