// supplying an export statement

export { createMessage };
    import {state} from './types'

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

export let createJsonFile = (data: any) : state => {
    let open = 0;
    let closed = 0;
    let total = 0;
    let false_positive = 0;
    let used_in_tests = 0;
    let wont_fix = 0;
    total = data.length;
    let json_var: state ;
    for (let i = 0; i < data.length; i++) {
        let state = data[i].state;
        let dismis_reason = data[i].dismissed_reason;

        if (state.toUpperCase() === 'OPEN') {
            open = open + 1;
        } else {
            switch (dismis_reason) {
                case dismis_reason.toUpperCase() === "FALSE POSITIVE": {
                    false_positive += 1;
                    break;
                }
                case dismis_reason.toUpperCase() === "USED IN TESTS": {
                    used_in_tests += 1;
                    break;
                }
                default: {
                    wont_fix += 1;
                    break;
                }
                    
            }
            closed = closed + 1;
        }
    }
    
    json_var = {
        open: open,
        dismissed: {
            false_positive: false_positive,
            use_in_tests: used_in_tests,
            wont_fix : wont_fix
        }
    }

    return json_var;

}