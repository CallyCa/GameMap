function LevelMenu(levels) {
    
    // font, size and alignment for the buttons

    let titleStyle = { font:"60px GoodDog", fill: "#f70", align: "center"};
    let defStyle = { font:"40px GoodDog", fill: "black", align: "center"};
    let hoverStyle = { font:"60px GoodDog", fill: "black", align: "center"};
    let searchStyle = { font:"30px Arial", fill: "black", align: "left"};

    // populates the page with text title text

    this.buttons = {
        title: {
            offset_x: 0, offset_y: 0, isLink: false, toObj: null,
            styles: {
                fnt_def: titleStyle, fnt_hover: titleStyle
            },
            text: "Dasher Survival", callback: function() {

            }
        }
    };

    // sets all buttons with same style attributes

    let style = { 
        fnt_def: defStyle,
        fnt_hover: hoverStyle
    };

    // populates page with level buttons

    let z = '0';
    for(let i = 150; i < 251; i+=100) {
        for(let j = -200; j < 201; j+=200){
            let fName = levels[z];
            if(fName != undefined) {
                let split = levels[z].split('_');
                if(split.length > 1) {
                    if(split[1] != undefined && !(function(){ return (/[\d]+/);})().test(split[1])){
                        let file = fName
                    } else {
                        let file = split[0] + '_' + (Number(split[1]) + 1);
                    }
                } else {
                    let file = fName
                }
            };

            let levelImg = 'levels/thumbs/level_0.png';

            let res = JSON.parse(Get('api/fileExists?file=' + 'levels/thumbs/' + fName + '.png'));

            if(res.exists) {
                levelImg = 'levels/thumbs/' + fName + '.png';
            }

            this.buttons[levels[z]] = {
                offset_x: j,
                offset_y: i,
                styles: style,
                text: file,
                image, levelImg,
                callback: function(fName) {
                    game.state.add(fName.text, new Level(fName.text));
                    game.state.start(fName.text);
                }
            }
            z++;
        };
    }
}

// propotype levelMenu

LevelMenu.prototype = {
    preload: function() {
        let self = this;

        // Load the images here

        $.each(this.buttons, function(i,e) {
            if(e.image !== undefined) {
                game.load.image(e.text, e.image);
            }
        });
    },
    create: function() {
        let self = this;

        game.stage.backgroundColor = "#DFE";

        // button rendering

        let leftOffset = (game.width / 2);
        let topOffset = (game.height / 8.0);

        $.each(this.buttons, function(i, e) {
            if(e.image !== undefined) {
                game.add.image(leftOffset + (Number(e.offset_x) + 50), topOffset + (Number(e.offset_y) - 35), e.text);
            }

            e.toObj = game.add.text(leftOffset + e.offset_x, topOffset + e.offset_y, e.text, e.styles.up);
            e.toObj.anchor.set(0.5);
            e.toObj.inputEnabled = true;
            e.toObj.events.onInputDown.add(e.callback, self);
            e.toObj.events.onInputOver.add(function() {
                e.toObj.setStyle(e.styles.fnt_hover);
                game.canvas.style.cursor = "pointer"
            }, self);

            e.toObj.events.onInputOut.add(function() {
                e.toObj.setStyle(e.styles.fnt_def);
                game.canvas.style.cursor = "default";
            }, self);
        });

        window.setTimeout(function() {
            $.each(self.buttons, function(i, e) {
                e.toObj.setStyle(e.styles.fnt_def);
            });
        },10);
    }
};