import { commitValidation } from '../src';
// importing the module that is making the API call
const { github } = require("@actions/github");

jest.createMockFromModule("@actions/github");

test("commit_msg_validation", async () => {
    const object = await commitValidation();
    expect(object).toMatch("Can only run on push to a branch");
});