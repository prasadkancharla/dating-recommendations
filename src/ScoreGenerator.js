class ScoreGenerator
{
    static getScores(user1, user2) {
        // opposite gender
        let genderScore = ((user1.gender != user2.gender) ? 1: 0);

        // age
        let ageDiff = Math.abs(user1.age - user2.age);
        let ageScore = (ageDiff == 0? 1: (1/ageDiff));

        // interests
        let interestsScore = 0;
        if (user1.interests.length > 0) {
            let matchesCount = 0;
            for (let interest1 of user1.interests) {
                for (let interest2 of user2.interests) {
                    if (interest1.toLowerCase() == interest2.toLowerCase()) {
                        matchesCount++;
                    }
                }
            }
            interestsScore = (matchesCount / user1.interests.length);
        }
        
        return {genderScore, ageScore, interestsScore};
    }
}

module.exports = ScoreGenerator;