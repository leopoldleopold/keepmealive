// dependencies
var inquirer = require("inquirer");
function game() {
    // game variables
    var battleCount = 0;
    var player;
    // game enemies
    var enemies = [];


    // game items
    function PowerUp(name, point) {
        this.name = name;
        this.point = point;
    };

    // function Hero(name, age, hp, attack) {
    //     this.name;
    //     this.age = 0;
    //     this.hp = 100;
    //     this.attack = 1;
    // };

    var items = [];
    var berry = new PowerUp("Berry", 2);
    // function to add berry
    function useBerry(berry) {
        player.hp += berry;
    };

    var flatulence = new PowerUp("Flatulence", 5);
    // function to add flatulence
    function useFlatulence(flatulence) {
        player.attack += flatulence;
    };

    var waterGun = new PowerUp("Water Gun", 3);
    // function to use waterGun
    function useWaterGun(waterGun) {
        player.attack += waterGun;
    };

    var selfDestruct = new PowerUp("Self Destruct", 3);
    // function for ability to end game
    function useSelfDestruct(selfDestruct) {
        player.hp += selfDestruct;
    };

    // create function to START 
    function start() {
        console.log("Welcome to Keep Me Alive!" +
            " A survival RPG! Please take this newborn" +
            " and lead them to world domination!"
        );
        setTimeout(function () { playerInfo(); }, 3000);

        // function to obtain player info 
        function playerInfo() {

            // get player name
            function playerName() {
                inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Please name your newborn."
                    }
                ])
                    .then(function (answer) {
                        player = new Hero(answer.name, 0, 100, 1);
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
                        setTimeout(function () { beginGame(); }, 3000);
                    });

                // function to begin game
                function beginGame() {
                    console.log("YES");
                    // function to randomize values
                    randomizer();
                    function randomizer() {
                        var randNum = Math.floor(Math.random() * 2);
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
                            if (altRandNum > 7) {
                                generateEnemy(3);
                            }
                            else if (altRandNum < 2) {
                                generateEnemy(2);
                            }
                            else {
                                generateEnemy(1);
                            }
                            setTimeout(function () { battle(); }, 1500);
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
                                setTimeout(function () { battle(); }, 1500);
                            };
                        }
                    }
                    // function for battle
                    function battle() {
                        battleCount++;
                        var a = enemies.length;
                        if (a === 0) {
                            console.log("Oh no! You've been ambushed by a warrior! Prepare to fight!");
                        }
                        else {
                            console.log("Oh no! You've been ambused by " + a + " warriors! Prepare to fight!");
                        }
                        setTimeout(function () { battleStart(); }, 1500);

                        // function to start fight
                        function battleStart() {
                            var userTurn = true;
                            console.log(player.hp);
                            // if player has fallen
                            if (0 >= player.hp) {
                                gameOver();
                            }
                            console.log("YADA");
                                for (var i = 0; i < enemies.length; i++) {
                                    console.log(
                                        "Name: " + enemies[i].name + "\n" +
                                        "Age: " + enemies[i].age + "\n" +
                                        "HP: " + enemies[i].hp + "\n" +
                                        "Attack: " + enemies[i].attack + "\n"
                                    );

                                    // PLACE ELSEWHERE
                                    var defend = false;

                                    inquirer
                                        .prompt[(
                                            {
                                                name: "fight",
                                                type: "list",
                                                message: "Select an ACTION!",
                                                choices: ["Attack", "Defend", "Use Item", "RUN"]
                                            }
                                        )]
                                        .then(answer => {
                                            switch (answer.fight) {
                                                case "Attack":        
                                                    if (userTurn) {
                                                        attack(player.name, enemies[i].hp, player.attack);
                                                        userTurn = false;
                                                    }                                          
                                                    else {
                                                        attack(enemies[i].name, player.hp, enemies[i].attack);
                                                        userTurn = true;
                                                    }
                                                   
                                                    // attack function
                                                        function attack(x, y, z) {
                                                            let weapons = ["Bat", "Moss", "Toilet Paper",
                                                            "Good Looks", "Charisma", "Genuine Feelings"];
                                                            let weapon = weapons[Math.floor(Math.random () * weapons.length)]; 
                                                            console.log(x + " used " + weapon + "!");
                                                            if (defend) {
                                                                console.log(x + "defended!")
                                                                defend = false;
                                                            }   
                                                            else {
                                                                // function to potentially miss attack
                                                                function hitOrMiss(attacker, attack, health) {
                                                                    let a = Math.floor(Math.random() * 4);
                                                                    if (a < 2) {
                                                                        console.log(attacker + " missed their attack!");
                                                                    }
                                                                    else {
                                                                        let damage = health - attack;
                                                                        console.log(attacker + " did " + damage + " damage!");
                                                                    }
                                                                }
                                                                if (weapon === "Bat") {
                                                                    let damage = y - z++;
                                                                    console.log(x + " did " + damage + " damage!");
                                                                }
                                                                else if (weapon === "Moss") {
                                                                    let damage = y - z + 2;
                                                                    console.log(x+ " did " + damage + " damage!");
                                                                }
                                                                else if (weapon === "Toilet Paper") {
                                                                    hitOrMiss(x, z, y);
                                                                }
                                                                else if (weapon === "Good Looks") {
                                                                    hitOrMiss(x, z, y);
                                                                }
                                                                else if (weapon === "Charisma") {
                                                                    hitOrMiss(x, z, y); 
                                                                }
                                                                else if (weapon === "Genuine Feelings") {
                                                                    hitOrMiss(x, z, y);
                                                                }
                                                            } 
                                                    break;
                                                };
                                               case "Defend":
                                                    let a = Math.floor(Math.random() * 2);
                                                    if (a === 0) {
                                                        console.log("Defense attempt failed!");
                                                    }
                                                    else {
                                                        defend = true;
                                                    }
                                                    break;

                                                case "Use Item": {

                                                }
                                            }
                                        });
                                    
                                    // function for attacking
                                    
                                };


                        }


                    };
                };
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
            console.log("Sadly, your warrior has fallen. May another grow soon.");
            start();
        };
    }
game();
