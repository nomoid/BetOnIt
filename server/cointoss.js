

module.exports = {
    game: {
        supportsPlayers: function(num){
            return num == 2;
        },
        run: function(args){
            let playerOne = args.players[0];
            let playerTwo = args.players[1];
            let distribution = [0, 0];
            let reward = args.payments[playerOne] + args.payments[playerTwo];
            let messages = {};
            if(Math.random() < 0.5){
                distribution[0] = reward;
                messages[playerOne] = {
                    status: 'winner'
                };
            }
            else{
                distribution[1] = reward;
                messages[playerTwo] = {
                    status: 'loser'
                };
            }
            return {
                distribution: distribution,
                messages: messages
            };
        }
    }
}