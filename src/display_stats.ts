// supplying an export statement

export let open_all: number = 0;
export let dismiss_total_all: number = 0;
export let false_positive_all: number = 0;
export let use_in_tests_all: number = 0;
export let wont_fix_all: number = 0;


export { createMessage , createSecretMessage };
    import {secret_state, state} from './types'

// create the markdown message from the json files

let createMessage = (data: state) => {
    console.log(data);
}
let createSecretMessage = (data: secret_state) => {
    console.log(data);
}

export let createCodeJsonFile = (data: any , branch : string) : state => {
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
    // calling the all_stats function to keep the findings count.
    all_stats(open , closed, false_positive , used_in_tests , wont_fix)
    return json_var;

}

export let createSecretJsonFile = (data: any , branch : string) : secret_state => {
    let open = 0;
    let closed = 0;
    let total = 0;
    let false_positive = 0;
    let used_in_tests = 0;
    let wont_fix = 0;
    let revoked = 0;
    total = data.length;
    let json_var: secret_state ;
    for (let i = 0; i < data.length; i++) {
        let state = data[i].state;
        let resolution = data[i].resolution;

        if (state.toUpperCase() === 'OPEN') {
            open = open + 1;
        } else {
            switch (resolution.toLowerCase()) {
                case 'false_positive': {
                    false_positive += 1;
                    break;
                }
                case 'used_in_tests': {
                    used_in_tests += 1;
                    break;
                }
                case 'revoked': {
                    revoked += 1;
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
        resolved: {
            total : closed,
            false_positive: false_positive,
            use_in_tests: used_in_tests,
            wont_fix: wont_fix,
            revoked : revoked
        }
    }

    return json_var;

}

const all_stats = (open: number, dismiss_total: number, false_positive: number, use_in_tests: number, wont_fix: number) => {
    open_all = open_all + open;
    dismiss_total_all = dismiss_total_all + dismiss_total;
    false_positive_all = false_positive_all + false_positive;
    use_in_tests_all = use_in_tests_all + use_in_tests;
    wont_fix_all = wont_fix_all + wont_fix; 
}