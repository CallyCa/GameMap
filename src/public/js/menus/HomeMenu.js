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
            }
        }
    }
}