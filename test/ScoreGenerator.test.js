const assert = require('assert');
const ScoreGenerator = require("../src/ScoreGenerator");
const User = require("../src/User");

describe('Score Generator', () => {
    it('Gender: Opposite ', () => {
        let user1 = new User({name: "UserA", gender: "Female", age: 25, interests: "Cricket"});
        let user2 = new User({name: "UserB", gender: "Male", age: 27, interests: "Cricket, Football, Movies"});

        let {genderScore} = ScoreGenerator.getScores(user1, user2);
        assert.equal(genderScore, 1);
    });

    it('Gender: Same', () => {
        let user1 = new User({name: "UserA", gender: "Male", age: 25, interests: "Cricket"});
        let user2 = new User({name: "UserB", gender: "Male", age: 27, interests: "Cricket, Football, Movies"});

        let {genderScore} = ScoreGenerator.getScores(user1, user2);
        assert.equal(genderScore, 0);
    });

    it('Interests score: all matching', () => {
        let user1 = new User({name: "UserA", gender: "Male", age: 25, interests: "Cricket"});
        let user2 = new User({name: "UserB", gender: "Male", age: 27, interests: "Cricket, Football, Movies"});

        let {interestsScore} = ScoreGenerator.getScores(user1, user2);
        assert.equal(interestsScore, 1);
    });

    it('Interests score: no common', () => {
        let user1 = new User({name: "UserA", gender: "Male", age: 25, interests: "Tennis"});
        let user2 = new User({name: "UserB", gender: "Male", age: 27, interests: "Cricket, Football, Movies"});

        let {interestsScore} = ScoreGenerator.getScores(user1, user2);
        assert.equal(interestsScore, 0);
    });
});