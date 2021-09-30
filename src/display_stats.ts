// supplying an export statement

export {createMessage};

// create the markdown message from the json files

let createMessage = (data: any): string => {
    let open, closed, total: number = 0;
    total = data.count;
    let msg = "## Scanning Alerts Statistics \n";

    // title
    msg += "| Open | Closed | Total |\n";

    // table column definitions
    msg += "| :--- | :---: | :---: |\n";

    for (let i = 0; i < data.length; i++) {
        let state = data[i].state;

        if (state.toUpperCase() === 'OPEN') {
            open = open + 1;
        } else {
            closed = closed + 1;
        }
    }
        // second column. value with 2 digits
    msg += `|${open}`;
    msg += `|${closed}`;
    msg += `|${total}`;
    msg += "| \n";

    return msg;
}