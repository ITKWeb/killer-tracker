'use strict';

var Mail = require("./mail"),
db = require("./db");

var mailMissions = function mailMissions(missions){
    missions.forEach(function(mission){
        
        db.getPlayer(mission.killer).then(function(cursor){
            cursor.toArray(function(err, killers){
                if(err) throw err;
                var killer = killers[0];
                db.getPlayer(mission.player).then(function(cursor){
                     cursor.toArray(function(err, targets){
                        var target = targets[0];
                         db.getForfeit(mission.forfeit).then(function(cursor){
                            cursor.toArray(function(err, forfeits){
                                var forfeit = forfeits[0];
                                console.log("[INFO] Sending mission mail");
                                var missionText = "Salut " + killer.name + "! Tu dois tuer " + target.name + "!   Ton mode opératoire est le suivant: " + forfeit.description; 
                                var mail = new Mail({to:killer.email, subject:'Ta mission pour la semaine: '+ forfeit.title, 
                                                     text: missionText});
                                mail.send();
                            });
                         });
                    });
                });
            });
        });
    }); 
}

var mailValidDeath = function mailValidDeath(email){
    var missionText = "Désolé, tu as perdu ! Tu ne recevras plus de mail de mission. A bientôt pour une prochaine partie !"; 
    var mail = new Mail({to:email, subject:'Tu es mort !', 
         text: missionText});
    mail.send();
}

var firstMail = function firstMail(player){
    var missionText = "Salut " + player.nickname + "! Tu as rejoins une partie de killer. Voici ton mot de passe: " + player.password + ". Garde le précieusement, il te permettra de valider ta mort (car y'a de bonnes chances que tu y restes, soyons francs). Bon jeu à toi !"; 
    var mail = new Mail({to:player.email, subject:'Bienvenue au killer !', 
         text: missionText});
    mail.send();
}

module.exports = {
    mailMissions: mailMissions,
    mailValidDeath: mailValidDeath,
    firstMail: firstMail
}