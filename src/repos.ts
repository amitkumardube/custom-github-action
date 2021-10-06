// this file will fetch repos from an org and run the code for each repo
// function is being called from main.ts

import parse from 'parse-link-header';

// To minimize the API calls , this function calls 100 records ( max allowed ) per API call.
// this returns the promise of array of API response containing all repos

export const get_all_repos = async (octokit: any , org : string , page : number) : Promise<any[]> => {
    const all_repos: any[] = [];
    console.log(all_repos);
    const result = await octokit.rest.repos.listForOrg({
        org: org,
        per_page: 100,
        page: page
    });
    
    all_repos.push(...result.data)
    console.log(all_repos);

    const pagination = parse(result.headers.link)!;
    console.log(pagination);

    if (pagination && pagination.next) {
        const response = await get_all_repos(octokit, org, parseInt(pagination.next.page));
        all_repos.push(...response);
    }
    return all_repos;
}
