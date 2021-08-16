export {commitValidation}

// need github library to access information about github context

// javascript style
const github = require("@actions/github");
// typescript style
import * as core from '@actions/core';

// checking for commit message in the git commit history
// for the moment we are only checking the head commit.

async function commitValidation(): Promise<string> {
  if (github.context.eventName === 'push') {
  
    // get the commit message as per the last commit which was pushed
      let commitmsg: string = github.context.payload.head_commit.message;
      console.log(commitmsg);
    
      // getting  the length of commit message
      let commitmsg_length: number = commitmsg.length;

      // initiating the regular expression constructor
      let commitmsgpattern: RegExp = new RegExp('^\[[a-z]+-[0-9]+\]', 'i');
      
      if (commitmsgpattern.test(commitmsg) && commitmsg_length >= 20 ) {
        core.info("Commit Message is valid");
        return "Commit message is valid"
      } else {
          core.setFailed("Commit Message should always start with Reference number in the format as [WWN-1234] and commit message should be >= 20 characters");
          return "Commit Message should always start with Reference number in the format as [WWN-1234] and commit message should be >= 20 characters";          
      }

  } else {
    core.info("Can only run on push to a branch");
    return "Can only run on push to a branch";
  }
}