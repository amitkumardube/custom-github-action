export {commitMsg}

// need github library to access information about github context

// javascript style
const github = require("@actions/github");
// typescript style
import * as core from '@actions/core';

// checking for commit message in the git commit history
// for the moment we are only checking the head commit.

async function commitMsg() {
  if (github.context.eventName === 'push') {
    // get the commit message as per the last commit which was pushed
    console.log(github.context.payload.head_commit.message);

  } else {
    core.info("Can only run on push to a branch");
    return;
  }
}

