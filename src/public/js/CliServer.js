function server() {
    const coordUpdate = new Event('coordUpdate');
    const camperInit = new Event('camperInit');

    // Server with no client
    this.peer = new Peer({key: '55sj0os1x512a9k9'});

    // Currently connected campers and their positions and usernames
    const campers = [];
    // Array with all chat message objects
    const chatData = [];

    const chatMembers = ["SERVER"];

    // Instanciate a camper
    const camper = function(name, peer_id, startX, startY) {
        this.name = name;
        this.peer_id = peer_id;
        this.x = startX;
        this.y = startY;
        chatMembers.push(this.name);

        function updateCoords(x, y) {
            if(x === null) {
                this.x = this.x;
            }else {
                this.x = x;
            }
            if(y === null) {
                this.y = this.y;
            }else {
                this.y = y;
            }
            document.dispatchEvent(coordUpdate);
        }
        document.dispatchEvent(camperInit);
    }

    function camperByPeerID(peer_id) {
        campers.forEach((i, e) => {
            if(e.peer_id === peer_id) return e;
        });
    }

    const chat = {
        renderChat: () => {
            // show and update chatDat
        },
        chatMessage: (username, message, hex_color) => {
            // Add new message to the chat array
            if(chatMembers.indexOf(username) > -1){
                chat.push({username: username, color: hex_color, message: message})
            }
        }
    };

    // User connect handler
    this.peer.on('connection', (connection) =>{
        campers.push(new camper("A_NAME", connection.peer, 200, 200));
        chat.chatMessage("SERVER", "A_NAME has connected!", "#FF0000");
        document.addEventListener('camperInit', (e) => {
        }, false);
        document.addEventListener('coordUpdate', (e) => {
        },false);
        this.peer.on('data', () => {
            console.log(arguments);
        });
    });
}

const client = function client(peerID) {
    // Just a client

    this.peer = new Peer({key: '55sj0os1x512a9k9'});
    this.conn = peer.connect(peerID);
    this.conn.on('open', () => {
        this.conn.send('Hello Server!');
    });
}

function cliServer() {
    // normal client hosting itself

    server();
    client(server.peerID);
}

