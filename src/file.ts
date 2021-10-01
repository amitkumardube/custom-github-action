import * as fs from 'fs';

import {createJsonFile} from './display_stats'
import { state } from './types';

export const createFile = (data: any , branch: string): state => {
    const json_data = createJsonFile(data, branch);
    
    append_to_file(json_data);
    return json_data;
}

export const append_to_file = (json_data : state) => {
    // this is synchronous operation.
    fs.appendFileSync('stats.json', JSON.stringify(json_data, null, 2));
}