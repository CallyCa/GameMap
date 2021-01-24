const express = require('express');
const fs = require('fs');
const router = express.Router();

// create array of players

const players = [];

// create function that set params id, username, lastPingTinme and ingame
// receive two args

function PeerStruct(id, username) {
    this.id = id;
    this.username = username;
    // gets the time and convert value in milliseconds
    this.lastPingTime = new Date().getTime();
    this.ingame = false;
}

// route get /api/list

router.get('/api/list', (req, res) => {
    const clientsNotInGame = [];

    for(let i = 0; i < players.length; i++) {
        if(players[i].ingame == false) {
            clientsNotInGame.push({
                id: players[i].id,
                username: players[i].username
            });
        }
    }
    res.send(JSON.stringify(clientsNotInGame));
});

// route get /api/register

router.get('/api/register', (req, res) => {
    let data = null;

    if(!req.query.id) {
        data = { error: "'id' missing from request query!"};
    }else if (!req.query.username) {
        data = { error: "'username' missing from request query!"};

    }else {
        for(let i = 0; i < players.length; i++) {
            if(players[i].id == req.query.id) {
                data = { error: "Peer with that id already exists!"};
                break;
            }
        }

        if(data == null) {
            players.push(new PeerStruct(req.query.id, req.query.username));
            data = {
                success: "Peer successfully added to server list!"
            };
        }
    }
    res.send(data);
});

// this should be passed two args, p1 and p2, each with the id of the players

router.get('/api/start', (req, res) => {
    let data = {};

    if(!req.query.p1) {
        data = { error: "'p1' missing from request query!"};
    }
    else if(!req.query.p2) {
        data = { error: "'p2' missing from request query!"};
    }    
    else if(!req.query.p1 == req.query.p2) {
        data = { error: "'p2' missing from request query!"};
    }

    else {
        let p1 = null, p2 = null;

        for(let i = 0; i < players.length; i++) {
            if(players[i].id == req.query.p1) {
                if(players[i].ingame) {
                    data = { error: "'p1' is already in game!"};
                }else {
                    p1 = players[i]
                }
                break;

            }else if(players[i].id == req.query.p2) {
                if(players[i].ingame) {
                    data = { error: "'p2' is already in game!"}
                }
                else {
                    p2 = players[i];
                }
                break;
            }
        }

        if(p1 == null) data = { error: "'p1' does not exists!"};
        else if(p2 == null) data = { error: "'p2' does not exists!"};

        // if data wasn't set to anything from an error above

        if(data == null) {
            data = {
                success: 'Peer successfully added  to server list!'
            };
        }
    }
    res.send(JSON.stringify(data));
});

// route /api/ping

router.get('/api/ping', (req, res) => {

});

// verifying if file exists

router.get('/api/fileExists', (req, res) => {
    if(!req.query.file) {
        res.send(JSON.stringify({error: "'file' missing from request query!"}));
    }
    else {
        // fs.stat get file status
        fs.stat(__dirname + '/public/' + req.query.file, (exists) => {
            res.send(JSON.stringify({exists: exists}));
        });
    }
})

module.exports = router;