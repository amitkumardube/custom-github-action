import { code_scanning } from './code-scanning';

// we need two additional imports.
// These are created by github and are especially built
// for github actions.
// You can find more information here:
// https://github.com/actions/toolkit
const core = require("@actions/core");
const github = require("@actions/github");

// Main function of this action: read in the files and produce the comment.
// The async keyword makes the run function controlled via
// an event loop - which is beyond the scope of the blog.
// Just remember: we will use a library which has asynchronous
// functions, so we also need to call them asynchronously.
async function run() {
  // The github module has a member called "context",
  // which always includes information on the action workflow
  // we are currently running in.
  // For example, it let's us check the event that triggered the workflow.
/*  if (github.context.eventName !== "pull_request") {
    // The core module on the other hand let's you get
    // inputs or create outputs or control the action flow
    // e.g. by producing a fatal error
    core.info("This function Can only run on pull requests!");
    return;
  }*/

  // get the inputs of the action. The "token" input
  // is not defined so far - we will come to it later.
  const githubToken = core.getInput("token");
  let branch = core.getInput("branch");

  //const githubToken = "";
  
  // the context does for example also include information
  // in the pull request or repository we are issued from
  const context = github.context;

  // with the current context we can extract the name of owner and repo where action is running
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  // The Octokit is a helper, to interact with
  // the github REST interface.
  // You can look up the REST interface
  // here: https://octokit.github.io/rest.js/v18
  const octokit = github.getOctokit(githubToken);

  // if branch is default that implies that user didn't pass any branch as argument
  // In this case, we need to run this process for all the branches to get code scanning alerts 
  // for all of them
  if (branch === 'default') {
    branch = context.payload.repository.default_branch;
    try {
      let { all_branches } = await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: owner,
        repo: repo
      });      
      /*let { all_branches } = await octokit.rest.repos.listBranches({
        owner: owner,
        repo: repo
      });*/
      console.log(all_branches);
    } catch { (error) =>
      console.log(error);
    }
  }

  console.log(branch);

// calling the code_scanning function to trigger code_scanning
  
  code_scanning(octokit, owner, repo, branch).
    catch(error => core.setFailed("failed to access code scanning alerts" + error.message));

}

// Our main method: call the run() function and report any errors
run()
  .catch(error => core.setFailed("Workflow failed! " + error.message));

