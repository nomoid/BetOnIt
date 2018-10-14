import React from "react";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newGame = () => {
  const UsernameGenerator = require('username-generator');
  const statusChance = Math.random();
  return {
    userName: UsernameGenerator.generateUsername(),
    game:
      statusChance > 0.66
        ? "weather"
        : statusChance > 0.33 ? "coin flip" : "personal",
    status:
      statusChance > 0.5 ? "win" : "lose",
    winrate: Math.floor(Math.random() * 100) + '%'
  };
};

export function makeData(len = 666) {
  return range(len).map(d => {
    return {
      ...newGame(),
      children: range(10).map(newGame)
    };
  });
}
