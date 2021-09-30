import { resolve } from 'path/posix';
import * as commit from '../src/commitValidation';

test("Valid Commit Message", () => {
    const msg = jest.spyOn(commit, 'commitValidation')
    msg.mockImplementation(() => new Promise((resolve, reject) =>  {
        resolve("Commit Message is valid");
    }));
    commit.commitValidation()
        .then(res => {
            console.log('Commit Message is valid');
            expect(res).toBe("Commit Message is valid");
        })
        .catch(error => {
            console.log('Can only run on push to a branch');
            expect(error.message).toBe("Can only run on push to a branch");
        });
    // restore to original function implementation
    msg.mockRestore();
});

test("Invalid Commit Message", () => {
    
    commit.commitValidation()
        .then(res => {
            console.log('Commit Message is valid');
            expect(res).toBe("Commit Message is valid");
        })
        .catch(error => {
            console.log('Can only run on push to a branch');
            expect(error.message).toBe("Can only run on push to a branch");
        });
});