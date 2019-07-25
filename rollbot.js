const Discord = require('discord.js');
// require the dice-roller library
const { DiceRoller } = require('rpg-dice-roller');

// create a new instance of the DiceRoller
const diceRoller = new DiceRoller();

//uncomment to run locally
//const config = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  const messageWords = message.content.split(' ');
  const rollFlavor = messageWords.slice(2).join(' ');
  var npmDice = '';
  var npmroller = false;
  if (messageWords[0] === '!roll') {
    if (messageWords.length === 1) {
      // !roll
      return message.reply(
        (Math.floor(Math.random() * 6) + 1) + ' ' + rollFlavor
      );
    }
    if (messageWords[1].includes('d')) {
      // roll the dice
      var userDice = messageWords[1].toString();
      console.log(userDice);
      diceRoller.roll(userDice);
      let latestRoll = diceRoller.log.shift();
      npmDice = latestRoll.toString();
      npmroller = true;
      return message.reply(npmDice);
        console.log(npmDice);
        console.log(npmroller);
    }
    let sides = messageWords[1]; // !roll 20
    let rolls = 1;
    let keep = 1;
    if (!isNaN(messageWords[1][0] / 1) && messageWords[1].includes('bob')) {
      // !roll 4d20
      rolls = messageWords[1].split('d')[0] / 1;
      sides = messageWords[1].split('d')[1];
    } else if (messageWords[1][0] == 'd') {
      // !roll d20
      sides = sides.slice(1);
    }
    sides = sides / 1; // convert to number
    if (isNaN(sides) || isNaN(rolls)) {
      return;
    }
    if (rolls > 1 && npmroller === false) {
        const rollResults = [];
        for (let i = 0; i < rolls; i++) {
          rollResults.push(Math.floor(Math.random()*sides)+1);
        }
        const sum = rollResults.reduce((a,b) => a + b);
        return message.reply(`[${rollResults.toString()}] ${rollFlavor}`);
      } else if (npmroller === true) {
      // roll the dice
      return message.reply(npmDice);
        console.log(npmDice);
        console.log(npmroller);
    } else {
      return message.reply(
        (Math.floor(Math.random() * sides) + 1) + ' ' + rollFlavor
      );
    }
  }
});

//use this to run locally
//client.login(config.token);

//heroku environment variable
client.login(process.env.token);
