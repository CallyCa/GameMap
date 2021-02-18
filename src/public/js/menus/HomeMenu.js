function HomeMenu() {
    let titleStyle = { font: "60px GoodDog", fill: "#f70", align: "center"};
    let defStyle = { font: "60px GoodDog", fill: "black", align: "center"};
    let hoverStyle = { font: "50px GoodDog", fill: "black", align: "center"};

    this.buttons = {
        title: {

            offset_x: 0, offset_y: 0, isLink: false, toObj: null,
            
            styles: {
                fnt_def: titleStyle, fnt_hover: titleStyle
            }, text: "Dasher Survival", callback: function() {},

            play: {
                offset_x: 0, offset_y: 100, isLink: true, toObj: null,
                styles: {
                    fnt_def: defStyle, fnt_hover: hoverStyle
                },
                text: "Play",
                callback: function() {
                    game.state.add('level_0', new Level('level_0'))
                    game.state.start('level_0');
                }
            },
            levels: {
                offset_x: 0, offset_y: 200, isLink: true, toObj: null,
                styles: {
                    fnt_def: defStyle, fnt_hover: hoverStyle
                },
                text: "Level Select",
                callback: function() {
                    game.state.add('level_menu', new LevelMenu(Global.levels));
                    game.state.start('level_menu')
                }
            },
            controls: {
                offset_x: 0, offset_y: 300, isLink: true, toObj: null,
                styles: {
                    fnt_def: defStyle, fnt_hover: hoverStyle
                },
                text: "Settings",
                callback: function() {
                    window.alert("This hasn't been implement yet!")
                }
            }
        }
    }
}

HomeMenu.prototype = {
    create: function() {

        let self = this;
        game.stage.backgroundColor = "#DFE";
        let leftOffset = (game.width / 2);
        let topOffset = (game.height / 8.0);

        $.each(this.buttons, function(i,e) {
            e.toObj = game.add.text(leftOffset + e.offset_x, topOffset + e.offset_y, e.text, e.styles.fnt_def);
            e.toObj.anchor.set(0.5);
            e.toObj.inputEnabled = true;
            e.toObj.events.onInputDown.add(e.callback, self);
            e.toObj.events.onInputOver.add(function() {
                e.toObj.setStyle(e.styles.fnt_hover);
                if(e.isLink) {
                    game.canvas.style.cursor = "pointer";
                }else {
                    game.canvas.style.cursor = "default";
                }
            }, self);

            e.toObj.events.onInputOut.add(function() {
                e.toObj.setStyle(e.styles.fnt_def);
                game.canvas.style.cursor = "default";
            }, self);
        })
    }
}