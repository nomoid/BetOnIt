# Bet On It
HackUMass October 14 2018

We lay the foundation for a betting app where one can invite other users to place bets on certain outcomes.
Our application supports user-creation, user-login, profile, creating game rooms, joining game rooms, and some games for proof of concept. This platform was created such that it will be easily expandable and we will be able to add games to our website platform as more are designed. The idea for a social betting website came from Nudge, a book written by nobel laureate Richard Thaler. He discovered that however marginal, the possibility of losing money motivates people to adhere to their promises. 

## Demo
Try out our demo here!
http://bet-on-it-hack.herokuapp.com/

## Features
1. **Homepage**: registration for a new user profile and login 
2. **Dashboard**: a scrollable that contains information about ability to create new bets, current credit on hand, and all the active bets
3. **Create New Game**: creates a coin flip game with a unique room code that gets added to the dashboard, open to public viewing for all other users
4. **Join Existing Game**: browse through the list of currently ongoing games, listed by their room codes and current bets

## Getting Started

```
git clone https://github.com/assisstion/Bet.git
```

### Prerequisites

Install all of the dependencies that this app will need to run

```
npm install
```
in Bet root, then once in my-app

### Running

To run on a local host:
```
npm run dev
```
in Bet root, then
```
npm start
```
in my-app. The application should now be accessible at localhost:3000/.

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* React.js - frontend
* Node.js - backend
* Firebase - authentication
* Socket.io - server

## Authors
* Markus Feng - [assisstion](https://github.com/assisstion)
* Alex Han - [ahan98](https://github.com/ahan98)
* Jian Lu - [jian13579](https://github.com/jian13579) 
* Tongyu Zhou - [eutopi](https://github.com/eutopi)

