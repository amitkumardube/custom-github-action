// supplying an export statement

export {createMessage};

// create the markdown message from the json files

let createMessage = (benchmark , compbenchmark) : string => {
    let msg = "## Result of benchmark test \n";

    // title
    msg += "| Key | Current PR | Default Branch |\n";

    // table column definitions
    msg += "| :--- | :---: | :---: |\n";

    for (const key in benchmark) {
        msg += `|${key}`;
        // second column. value with 2 digits
        const value = benchmark[key];
        msg += `|${value.toFixed(2)}`;

        try {
            const oldValue = compbenchmark[key];
            msg += `| ${oldValue.toFixed(2)}`;
        }catch(error){
            console.log(`can't read ${key} from the comparision file`);
            msg += "| ";
        }
        msg += "| \n";
    }
    return msg;
}