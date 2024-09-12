# george-cli

A CLI for George, a static analysis tool for SE212 at the University of Waterloo.

Helpful links:
* [SE212 Homepage](https://student.cs.uwaterloo.ca/~se212/)
* [George User Manual](https://student.cs.uwaterloo.ca/~se212/george/george-docs-1/index.html)
* [George Web IDE](https://student.cs.uwaterloo.ca/~se212/george/ask-george/)

### Getting started

The easiest way try out the CLI is using `npx`:

```
$ npx george-cli george myfile.grg
```

The CLI supports multiple files, so you can check multiple files at once:

```
$ npx george-cli george *.grg
```

### Recommended Workflow

For your SE212 assignments I recommend you save your work in a private git repository. You can create an npm project and install the CLI locally and make `npm run test` test all your `.grg` files:

```
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
    "test": "npx george *.grg"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "george-cli": "^0.0.1"
  }
}
$ npm run test
```

Alternatively, you can install the CLI globally:

```
$ npm install --global george-cli
$ george myfile.grg
```