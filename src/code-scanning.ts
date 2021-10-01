import { createFile } from "./file";
import { createMessage } from "./display_stats";

export const code_scanning = async (octokit , owner , repo , branch) : Promise<any> => {
    const { data } = await octokit.rest.codeScanning.listAlertsForRepo({
        owner: owner,
        repo: repo,
        ref: branch
    });

    // this will crate the json file and retrun it  as string as well
    const msg = createFile(data);

    // using the above string to display a message in console
    createMessage(msg);
}