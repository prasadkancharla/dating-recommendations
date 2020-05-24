class User {
    constructor({name = "", gender = "", age = 0, interests = ""}) {
        this.key = name; // name is considered as key for the purpose of this assignment
        this.name = name; 
        this.age = age;
        this.gender = gender;
        this.interests = interests.split(",").map((interest) => interest.trim())
        this.potentialMatches = []; // stores the potential matches 

        this.isValid();
    }

    isValid() {
        if (this.name.trim == "") {
            throw new Error("Name can't be empty");
        }
        if (this.gender != "Male" && this.gender != "Female") {
            throw new Error("Gender should be Male/Female");
        }
        if (this.age < 18) {
            throw new Error("Age should be greater than 18");
        }
    }

    getKey() {
        return this.key;
    }
}

module.exports = User;