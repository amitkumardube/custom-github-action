// supplying an export statement

export {createMessage};

// create the markdown message from the json files

let createMessage = (data: any): string => {
    let open = 0;
    let closed = 0;
    let total = 0;
    total = data.length;

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
    msg += "|"+open.toString();
    msg += "|"+closed.toString();
    msg += "|"+total.toString();
    msg += "| \n";

    return msg;
}