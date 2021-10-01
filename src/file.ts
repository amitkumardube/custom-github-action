import * as fs from 'fs';

import {createJsonFile} from './display_stats'
import { state } from './types';

export const createFile = (data: any , branch: string): state => {
    const json_data = createJsonFile(data , branch)
    fs.writeFileSync('stats.json', JSON.stringify(json_data, null, 2));
    return json_data;
}