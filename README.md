# George CLI Documentation

A command-line interface for George, the static analysis tool used in SE212 at the University of Waterloo.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Using npx](#using-npx)
  - [Local Installation](#local-installation)
  - [Global Installation (Not Recommended)](#global-installation-not-recommended)
- [Usage](#usage)
  - [Analyzing Files](#analyzing-files)
  - [Copying Output to Clipboard](#copying-output-to-clipboard)
  - [Watching for File Changes](#watching-for-file-changes)
- [Recommended Workflow](#recommended-workflow)
- [Helpful Links](#helpful-links)

## Introduction

`george-cli` is a command-line interface that streamlines interaction with George, the static analysis tool used in SE212 at the University of Waterloo. It allows you to analyze George files (`.grg`) directly from your terminal, enhancing your development and testing workflow.

## Prerequisites

- **Node.js v18 or higher**: Ensure that you have Node.js version 18 or newer installed. You can download it from the [official Node.js website](https://nodejs.org/en/download/package-manager).

## Installation

### Using npx

The easiest way to use `george-cli` without installing it is by using `npx`:

```bash
npx george-cli <options> [files...]
```

This method ensures you're always using the latest version of `george-cli`.

### Local Installation

For a more integrated experience, you can install `george-cli` locally in your project:

```bash
npm install --save-dev george-cli
```

### Global Installation (Not Recommended)

Installing `george-cli` globally is not recommended due to potential version conflicts:

```bash
npm install --global george-cli
```

## Usage

### Analyzing Files

You can analyze one or multiple `.grg` files:

- **Single File**:

  ```bash
  npx george-cli myfile.grg
  ```

- **Multiple Files**:

  ```bash
  npx george-cli *.grg
  ```

### Copying Output to Clipboard

To copy the analysis results to your clipboard for easy sharing:

- **macOS**:

  ```bash
  npx george-cli *.grg | pbcopy
  ```

- **Linux**:

  ```bash
  npx george-cli *.grg | xclip -selection clipboard
  ```

_Note_: On Linux, consider creating an alias for the `xclip` command for convenience.

### Watching for File Changes

To automatically re-analyze files when changes are detected:

```bash
npx george-cli --watch *.grg
```

This provides immediate feedback as you edit your `.grg` files.

## Recommended Workflow

For your SE212 assignments, consider the following workflow:

1. **Set Up a Private Git Repository**: Use version control to manage your work securely.

2. **Initialize an npm Project**:

   ```bash
   npm init -y
   ```

3. **Add Your George Files**:

   ```bash
   touch a.grg b.grg c.grg  # Example files
   ```

4. **Install `george-cli` Locally**:

   ```bash
   npm install --save-dev george-cli
   ```

5. **Configure npm Scripts**:

   Edit your `package.json` file to include custom scripts:

   ```json
   "scripts": {
     "test": "george *.grg",
     "watch": "george --watch *.grg"
   },
   ```

   This allows you to run `george-cli` using `npm run`.

6. **Run the Scripts**:

   - **Test All Files Once**:

     ```bash
     npm run test
     ```

   - **Watch for File Changes**:

     ```bash
     npm run watch
     ```

By integrating `george-cli` into your npm scripts, you can streamline testing and receive real-time feedback within your development environment (e.g., VSCode).

## Helpful Links

- [SE212 Course Homepage](https://student.cs.uwaterloo.ca/~se212/)
- [George User Manual](https://student.cs.uwaterloo.ca/~se212/george/george-docs-1/index.html)
- [George Web IDE](https://student.cs.uwaterloo.ca/~se212/george/ask-george/)

---
