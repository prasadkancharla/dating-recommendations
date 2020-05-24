const Solution = require("./src/Solution");

try {
    const solution = new Solution();

    // Add users to the system 
    solution.addUser({name: "UserA", gender: "Female", age: 25, interests: "Cricket"});
    solution.addUser({name: "UserB", gender: "Male", age: 27, interests: "Cricket, Football, Movies"});
    solution.addUser({name: "UserC", gender: "Male", age: 26, interests: "Movies, Tennis, Football, Cricket"});
    solution.addUser({name: "UserD", gender: "Female", age: 24, interests: "Tennis, Football, Badminton"});
    solution.addUser({name: "UserE", gender: "Female", age: 32, interests: "Cricket, Football, Movies, Badminton"});

    console.log(solution.getMatches("UserB", 2));
} catch (e) {
    console.log(e.message);
}