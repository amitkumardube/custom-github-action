// supplying an export statement

export { createMessage };
    import {state} from './types'

// create the markdown message from the json files

let createMessage = (data: state) => {
    console.log(data);
}

export let createJsonFile = (data: any , branch : string) : state => {
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
            switch (dismis_reason.toLowerCase()) {
                case 'false positive': {
                    false_positive += 1;
                    break;
                }
                case 'used in tests': {
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
        branch: branch,
        open: open,
        dismissed: {
            total : closed,
            false_positive: false_positive,
            use_in_tests: used_in_tests,
            wont_fix : wont_fix
        }
    }

    return json_var;

}