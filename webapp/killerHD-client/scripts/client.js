var DEFAULT_NUMBER_PLAYERS = 5;

var playersList = document.getElementById("players");

var addPlayerButton = document.getElementById("button-add-player");

var removePlayerButton = document.getElementById("button-remove-player");
removePlayerButton.disabled = true;

var numberPlayerInput = document.getElementById("number-player");
numberPlayerInput.onchange = function() {
    updateNumberPlayer(numberPlayerInput.value);
};

var port = parseInt(window.document.location.port)+1;
var socket = io.connect('http://127.0.0.1:'+port);

addPlayerButton.onclick = function () {
    addPlayer();
};

removePlayerButton.onclick = function () {
    removePlayer();
};

function addPlayer(){
    numberPlayerInput.value++; 
    playersList.appendChild(newPlayer());
    checkRemoveButtonState();
};

function removePlayer(){
    numberPlayerInput.value--; 
    playersList.removeChild(playersList.children[playersList.children.length - 1]);
    checkRemoveButtonState();
};

function newPlayer(){
    var newPlayer = document.createElement('li');
    newPlayer.setAttribute('class', 'center player');
    var playerNumber = document.createElement('span');
    playerNumber.setAttribute('class', 'player-number');
    playerNumber.innerHTML = (playersList.children.length + 1) + '.';
    var playerNameLabel = document.createElement('span');
    playerNameLabel.setAttribute('class', 'input-label');
    playerNameLabel.innerHTML = 'Nom du joueur';
    var playerName = document.createElement('input');
    playerName.setAttribute('type', 'text');
    playerName.setAttribute('class', 'name-input');
    var playerMailLabel = document.createElement('span');
    playerMailLabel.setAttribute('class', 'input-label');
    playerMailLabel.innerHTML = 'Mail';
    var playerMail = document.createElement('input');
    playerMail.setAttribute('class', 'mail-input');
    playerMail.setAttribute('type', 'text');

    newPlayer.appendChild(playerNumber);
    newPlayer.appendChild(playerNameLabel);
    newPlayer.appendChild(playerName);
    newPlayer.appendChild(playerMailLabel);
    newPlayer.appendChild(playerMail);

    return newPlayer;
};

function checkRemoveButtonState(){
    var numberPlayers = playersList.children.length;
    if(numberPlayers > 2){
        removePlayerButton.disabled = false;
    } else {
        removePlayerButton.disabled = true;
    }
}

function updateNumberPlayer(numberPlayer){
    var oldNumberPlayer = playersList.children.length;

    if(numberPlayer < 2){
        numberPlayer = 2;
    }

    if(numberPlayer > oldNumberPlayer){
        for (var i = 0; i < numberPlayer - oldNumberPlayer; i++){
            addPlayer();
        }
    }else{
        for (var i = 0; i < oldNumberPlayer - numberPlayer; i++){
            removePlayer();
        }
    }
    
    numberPlayerInput.value = numberPlayer;
}

var saveButton = document.getElementById('save-button');
saveButton.onclick = function(){
    var obj = {
        startDate: "10/01/2010",
        players: getPlayersSets()
    };
    socket.emit('new_game', obj);
};

function getPlayersSets() {
    var sets = [];
    for (var i = 0; i < playersList.children.length; i++) {
        var name = document.getElementsByClassName('name-input')[i].value;
        var mail = document.getElementsByClassName('mail-input')[i].value;
        var set = {
            game_id: 0,
            name: name,
            mail: mail
        }
        sets[i] = set;
    }
    return sets;
}

window.onload = function(){
    for (var i=0; i < DEFAULT_NUMBER_PLAYERS; i++){
        addPlayer();
    }
    numberPlayerInput.value = DEFAULT_NUMBER_PLAYERS;
}