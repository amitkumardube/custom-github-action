import { code_scanning } from './code-scanning';
import { createMessage, dismiss_total_all, false_positive_all, open_all, use_in_tests_all, wont_fix_all } from './display_stats';
import { append_to_file } from './file';
import { secret_scanning } from './secret-scanning';
import { state } from './types';
import { get_all_repos } from './repos';

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

  // with the current context we can extract the name of owner
  const owner = context.repo.owner;

  // The Octokit is a helper, to interact with
  // the github REST interface.
  // You can look up the REST interface
  // here: https://octokit.github.io/rest.js/v18
  const octokit = github.getOctokit(githubToken);

  // with the latest requested change we don't want to focus only on current repo
  // rather we like to gather stats for all the repos
  // const repo = context.repo.repo;

  const repo_list = await get_all_repos(octokit, owner, 1)
  
  for (let i = 0; i < repo_list.length; i++) {
    const repo = repo_list[1];

    // if branch is default that implies that user didn't pass any branch as argument
    // In this case, we need to run this process for all the branches to get code scanning alerts 
    // for all of them
  
    console.log("## Displaying Code Scanning Statistics\n");

    if (branch === 'default') {
      //branch = context.payload.repository.default_branch;
      // get the list of all the branches in the repo
      let { data } = await octokit.rest.repos.listBranches({
        owner: owner,
        repo: repo
      });
      for (let i = 0; i < data.length; i++) {
        branch = data[i].name;
        // getting code scanning alerts
        await code_scanning(octokit, owner, repo, branch).
          catch(error => {
            if (error.message.toLowerCase() === 'no analysis found') {
              core.info("INFO - It seems that code analysis is not enabled and no code analysis found.")
            } else {
              core.setFailed("failed to access code scanning alerts - " + error.message)
            }
          }
          );
      }
    } else {
      // means we will only focus on the branch supplied by user as input
      await code_scanning(octokit, owner, repo, branch).
        catch(error => core.setFailed("failed to access code scanning alerts - " + error.message));
    }

    // calling the function to add final stats
    let all_stats = supply_total_stats();
    createMessage(all_stats);
    append_to_file(all_stats, 'code_scanning_alerts.json');
  
    console.log("## End of Displaying Code Scanning Statistics \n");

    console.log("## Displaying Secret Scanning Statistics \n");

    // getting secret scanning alerts
    await secret_scanning(octokit, owner, repo, "all").
      catch(error => core.setFailed("failed to access secret scanning alerts - " + error.message));
  
    console.log("## End of Displaying Secret Scanning Statistics \n");
  }

}

// Our main method: call the run() function and report any errors
run()
  .catch(error => core.setFailed("Workflow failed! " + error.message));

const supply_total_stats = () : state => {
      const json_var = {
        branch: 'all',
        open: open_all,
        dismissed: {
            total : dismiss_total_all,
            false_positive: false_positive_all,
            use_in_tests: use_in_tests_all,
            wont_fix : wont_fix_all
        }
  }
  
  return json_var;
}

