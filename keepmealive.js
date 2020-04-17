// dependencies
var inquirer = require("inquirer");
function game() {
    // game variables
    var randDifficulty = false;
    var battleCount = 0;
    // game enemies
    var enemies = [];

    // game items
    function PowerUp(name, point) {
        this.name = name;
        this.point = point;
    };

    function Hero(name, age, hp, attack) {
        this.name;
        this.age = 0;
        this.hp = 100;
        this.attack = 1;
    };

    var items = [];
    var berry = new PowerUp("Berry", 2);
    var flatulence = new PowerUp("Flatulence", 5);
    var waterGun = new PowerUp("Water Gun", 3);
    var selfDestruct = new PowerUp("Self Destruct", 3);

    console.log(berry.point, flatulence, waterGun, selfDestruct);

    // create function to START 
    function start() {
        console.log("Welcome to Keep Me Alive!" +
            " A survival RPG! Please take this newborn" +
            " and lead them to world domination!"
        );
        setTimeout(function () { playerInfo(); }, 3000);
        // function to obtain player info 
        function playerInfo() {
            // player name
            function playerName() {
                inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Please name your newborn."
                    }
                ])
                    .then(function (answer) {
                        // console.log(answer.name);
                        // console.log(typeof answer.name);
                        var player = new Hero(answer.name, 0, 100, 1);
                        console.log(player);
                        itemChoice();
                    });
            };
            playerName();
            // initial items
            function itemChoice() {
                inquirer.prompt([
                    {
                        name: "item",
                        type: "list",
                        message: "Please select a birth gift.",
                        choices: ["Berry, recovers 10hp!",
                            "Flatulence, adds 5 to current attack stat",
                            "Water Gun, adds 3 to current attack stat",
                            "Self Destruct, quit the game with this depressing feature."]
                    }
                ])
                    .then(answer => {
                        switch (answer.item.charAt(0)) {
                            case "B":
                                items.push(berry);
                                break;
                            case "F":
                                items.push(flatulence);
                                break;
                            case "W":
                                items.push(waterGun);
                                break;
                            case "S":
                                items.push(selfDestruct);
                                break;
                        }
                        console.log(items[0].name);
                        console.log("Ah, the " + items[0].name + " is a wise choice" +
                            " You are now ready to begin your adventure!" +
                            " May fate be with you!");
                        setTimeout(function () { beginGame(); }, 2000);
                    });
                        // function to begin game
                        function beginGame() {
                            // function to randomize 
                            randomizer();
                            function randomizer() {
                                var randNum = Math.floor(Math.random() * 1);
                                var altRandNum = Math.floor(Math.random() * 10 + 1);
                                // function to generate enemies
                                function generateEnemy(x) {
                                    var enemyAttack = Math.floor(Math.random() * 10);
                                    var enemyAge = Math.floor(Math.random() * 6);
                                    for (var i = 0; i < x; i++) {
                                        var enemyName = "Warrior" + i.toString();
                                        var warrior = new Enemy(enemyName, enemyAge, 100, enemyAttack);
                                        enemies.push(warrior);
                                    }
                                }
                                // if randNum === 1
                                if (randNum) {
                                    randDifficulty = true;   
                                    if (altRandNum > 7) {
                                        generateEnemy(2);
                                    }
                                    else if (altRandNum < 2) {
                                        generateEnemy(1);
                                    }
                                    else {
                                        generateEnemy(0);
                                    }
                                }
                                else {
                                    switch (altRandNum) {
                                        case "> 7":
                                            randItem(waterGun);
                                            break;
                                        case "< 2":
                                            randItem(flatulence);
                                            break;
                                        default:
                                            randItem(berry);
                                            break;
                                    }
                                    // function to gift items
                                    function randItem(e) {
                                        items.push(e);
                                        console.log("You've been blessed with " + e.name + "!");
                                        setTimeout(function() {battle();}, 1500);
                                    };
                                }
                            }
                            // function for battle
                            function battle() {
                                battleCount++;
                                var a = enemies.length + 1;
                                if (a === 1) {
                                    console.log("Oh no! You've been ambushed by a warrior! Prepare to fight!"); 
                                }
                                else {
                                    console.log("Oh no! You've been ambused by " + a + " warriors! Prepare to fight!");
                                }
                                setTimeout(function() {battleStart();}, 1500);
                                // function to start fight
                                function battleStart() {
                                    if(player.hp <= 0) {
                                        gameOver();
                                    };
                                    for (var i = 0; i < enemies.length; i++) {
                                        console.log(
                                            "Name: " + enemies[i].name + "\n" +
                                            "Age: " + enemies[i].age + "\n" +
                                            "HP: " + enemies[i].hp + "\n" +
                                            "Attack: " + enemies[i].attack
                                        );
                                    }
                                    var attackDefend = Math.floor(Math.random() * 1);
                                    inquirer
                                    .prompt[(
                                        {
                                            name:"fight",
                                            type: "list",
                                            message: "Select an ACTION!",
                                            choices: ["Attack", "Defend", "USE ITEM", "RUN"]
                                        }
                                    )]
                                    .then(answer => {
                                        switch(answer.fight) {
                                            case "Attack":
                                                

                                        }
                                    });
                                }
                            };
                        };
                beginGame();
            }
        }
    }
    // run "start" function
    start();
    // character constructor
    function Hero(name, age, hp, attack) {
        this.name = name;
        this.age = age;
        this.hp = hp;
        this.attack = attack;
    };
    // enemy constructor
    function Enemy(name, age, hp, attack) {
        this.name = name;
        this.age = age;
        this.hp = hp;
        this.attack = attack;
    }
    //game over function 
    function gameOver() {

    };

};
game();
