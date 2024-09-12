# george-cli

A CLI for George, a static analysis tool for SE212 at the University of Waterloo.

Helpful links:
* [SE212 Homepage](https://student.cs.uwaterloo.ca/~se212/)
* [George User Manual](https://student.cs.uwaterloo.ca/~se212/george/george-docs-1/index.html)
* [George Web IDE](https://student.cs.uwaterloo.ca/~se212/george/ask-george/)

## Getting started

Make sure you have [Node v18+](https://nodejs.org/en/download/package-manager) installed.

The easiest way try out the CLI is using `npx`:

```bash
$ npx george-cli myfile.grg
```

The CLI can check multiple files at once:

```bash
$ npx george-cli *.grg
```

When used in combination with a clipboard tool like `pbcopy` or `xclip`, it becomes really easy to share the analysis of **all** your `.grg` files with your classmates:

```bash
$ npx george-cli *.grg | pbcopy # Copy to clipboard on Mac
$ npx george-cli *.grg | xclip -selection clipboard # Copy to clipboard on Linux, I'd recommend creating an alias
```

You can also watch for file changes to get feedback from George as you edit the file:

```bash
$ npx george-cli --watch *.grg
```

## Recommended Workflow

For your SE212 assignments I recommend you save your work in a **private** git repository.
You can create an npm project and install the CLI locally and make `npm run test` test all your `.grg` files.
When editing files in an editor (e.g. VSCode), you make `npm run watch` script and run that in your editor's terminal while you edit your files.

```bash
$ npm init -y
$ touch a.grg, b.grg, c.grg # example 
$ npm install --save-dev george-cli
$ vim package.json # change the "test" script command to run george-cli
$ cat package.json
{
  "name": "foo",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "npx george *.grg",
    "watch": "npx george --watch *.grg"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "george-cli": "^0.0.1"
  }
}
$ npm run watch
```

## Global Installation

While not recommended for versioning reasons, you can install `george-cli` globally:

```bash
$ npm install --global george-cli
$ george myfile.grg
```
