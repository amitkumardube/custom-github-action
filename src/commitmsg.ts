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
      let commitmsg: string = github.context.payload.head_commit.message;
      console.log(commitmsg);

      // initiating the regular expression constructor
      let commitmsgpattern: RegExp = new RegExp('^[a-z]+-[0-9]+', 'i');
      
      if (commitmsgpattern.test(commitmsg)) {
          core.info("Commit Message is valid");
      } else {
          core.setFailed("Commit Message should always start with Jira number  in the format as JIRA-1234");
          return;          
      }

  } else {
    core.info("Can only run on push to a branch");
    return;
  }
}