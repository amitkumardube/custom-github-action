import * as fs from 'fs';

import {createJsonFile} from './display_stats'

export const createFile = (data : any) :string => {
    fs.writeFileSync('stats.json', JSON.stringify(createJsonFile(data), null, 2));
    return data;
}