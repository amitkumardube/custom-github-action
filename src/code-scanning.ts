import { createCodeScanningFile } from "./file";
import { createMessage } from "./display_stats";
import parse from 'parse-link-header'

export const code_scanning = async (octokit , owner , repo , branch) : Promise<any> => {

    const data = await get_all_pages(octokit, owner, repo, branch, 1);
    
    // this will crate the json file and retrun it  as string as well
    const msg = createCodeScanningFile(data , branch);

    // using the above string to display a message in console
    createMessage(msg);
}


const get_all_pages = async (octokit, owner, repo, branch, page: number) => {
    const all_pages : any[] = [];
    const result = await octokit.rest.codeScanning.listAlertsForRepo({
        owner: owner,
        repo: repo,
        ref: branch,
        per_page: 100,
        page: page
    });

    all_pages.push(...result.data)

    const pagination = parse(result.headers.link)!;
    //console.log(pagination);

    if (pagination && pagination.next) {
        const response = await get_all_pages(octokit, owner, repo, branch, parseInt(pagination.next.page));
        all_pages.push(...response);
    }
    return all_pages;
}
