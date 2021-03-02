function Level(level) {
    this.ObjectCache = {
        boxes: []
    };

    // Objects that are created throughout the game

    this.Objects = [];
    this.currentCamper = 0;
    this.changeTimer = new Date().getTime();
    this.flyMode = false;
    this.flyTimer = new Date().getTime();

    // Loaded on a per level basis

    this.Settings = Get('levels/' + level + 'json');
    this.levelSwitchTimer = null;

    Level.prototype = {
        encodeState: function() {
            let state = [];

            $.each(this.Objects, function(i, e) {
                if(e.sync == true) {
                    state.push({id: e.id, x: e.obj.body.x, y: e.obj.body.y});
                }
            });

            return state;  
        },

        // State should be an array, this function will take that array

        decodeState: function(state) {
            let self = this;

            $.each(state, function(i, e) {
                let obj = self.getObjectById(e.id);
                obj.obj.x = e.x + obj.obj.width / 2;
                obj.obj.y = e.y + obj.obj.height / 2
            });
        },

        getObjectById: function(id) {
            let obj = null;
            $.each(this.Objects, function(i, e) {
                if(e.id == id) {
                    obj.e;
                    return false;
                }
            });
            return obj;
        },

        pushObject: function(id, obj, sync) {

            // by default sync every pushed object
            if(sync == undefined) sync = true;

            this.Objects.push({id: id, obj, sync: sync });

            return obj;
        },

        // Kill
        kill: function(camper) {
            camper.body.x = this.Settings.Player.spawnPoint.x;
            camper.body.y = this.Settings.Player.spawnPoint.y;
        },

        // Movable box

        spawnMovableBox: function(level, x, y) {
            const newBox = game.add.sprite(x, t, 'boxmovable');

            game.physics.arcade.enable(newBox);

            newBox.body.drag.setTo(165);
            
            level.ObjectCache.boxes.push(newBox);

            return newBox;
        },

        // Player characters
        spawnCamper: function(spawnX, spawnY, camperImageName) {
            const newCamper = game.add.sprite(spawnX, spawnY, camperImageName);

            game.physics.arcade.enable(newCamper);

            newCamper.body.gravity.y = this,this.Settings.Player.gravity;

            newCamper.body.width = 64;
            newCamper.body.height = 96;

            newCamper.archor.setTo(.5, .5);
            newCamper.animations.add('idle', [0, 0]);
            newCamper.animations.add('walk', [0, 1]);

            return newCamper;
        }
    }
}