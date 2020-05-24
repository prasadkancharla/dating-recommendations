const _ = require("lodash");
const User = require("./User");
const ScoreGenerator = require("./ScoreGenerator");

class Solution
{
    constructor() {
        this.usersMap = {};
        this.sortingPreferences = ['gender', 'age', 'interest'];
    }

    addUser(userParams) {
        const user = new User(userParams);
        if (this.usersMap.hasOwnProperty(user.getKey())) {
            throw new Error("User already exists ");
        }
        this.usersMap[user.getKey()] = user;
        this._updateMatchesForNewUser(user.getKey()); //TODO: This can be done in a scheduled/background job
    }

    updateInterests(userKey, newInterests) {
        // TODO: This can change the scoring for potential matches
    }

    getMatches(userKey, take = 2) {
        const user = this._findUser(userKey);

        const topMatches = _.take(
            _.orderBy(user.potentialMatches, this.sortingPreferences.map((str) => str + "Score"), ['desc', 'desc', 'desc']),
            take
        );
        
        return topMatches.map(match => match.user);
    }

    _updateMatchesForNewUser(newUserKey) {
        let newUser = this._findUser(newUserKey);

        // find potential matches
        newUser.potentialMatches = this._findPotentialMatches(newUser);

        // add new user match with score to every other user
        for (let matchingUserKey in this.usersMap) {
            if (this.usersMap.hasOwnProperty(matchingUserKey) && newUserKey != matchingUserKey) {
                const matchingUser = this.usersMap[matchingUserKey];
                matchingUser.potentialMatches.push({user: newUser.getKey(), ...ScoreGenerator.getScores(matchingUser, newUser)})
            }
        }
    }

    // Potential Matches can be found
    _findPotentialMatches(user) {
        let matches = [];
        for (let matchingUserKey in this.usersMap) {
            if (this.usersMap.hasOwnProperty(matchingUserKey) && user.getKey() != matchingUserKey) {
                const matchingUser = this.usersMap[matchingUserKey];
                matches.push({user: matchingUser.getKey(), ...ScoreGenerator.getScores(user, matchingUser)})
            }
        }

        return matches;
    }

    _findUser(userKey) {
        if (this.usersMap.hasOwnProperty(userKey)) {
            return this.usersMap[userKey];
        }
       
        throw new Error("No user found for key " + userKey);
    }
}

module.exports = Solution;