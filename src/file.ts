import * as fs from 'fs';

import {createCodeJsonFile, createSecretJsonFile} from './display_stats'
import { secret_state, state } from './types';

export const createCodeScanningFile = (data: any , branch: string): state => {
    const json_data = createCodeJsonFile(data, branch);
    
    append_to_file(json_data , 'code_scanning_alerts.json');
    return json_data;
}

export const createSecretScanningFile = (data: any , branch: string): secret_state => {
    const json_data = createSecretJsonFile(data, branch);
    
    write_to_file(json_data , 'secret_scanning_alerts.json');
    return json_data;
}

export const append_to_file = (json_data : state , filename : string) => {
    // this is synchronous operation.
    fs.appendFileSync(filename, JSON.stringify(json_data, null, 2));
}

const write_to_file = (json_data : secret_state , filename : string) => {
    // this is synchronous operation.
    fs.writeFileSync(filename, JSON.stringify(json_data, null, 2));
}