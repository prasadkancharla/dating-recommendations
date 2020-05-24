const assert = require('assert');
const User = require("../src/User");

describe('User', () => {
    it('should create an object with key as name ', () => {
        const user = new User({name: 'Test', age: 20, gender: 'Male'});

        assert.equal(user.getKey(), 'Test');
    });
});