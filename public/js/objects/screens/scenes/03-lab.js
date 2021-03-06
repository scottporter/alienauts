game.Scene03 = game.Scene01.extend({
    // Exit to next scene
    "exit" : me.state.SCENE00,

    // Tutorial object definition
    "tutorial" : {
        "ticks" : 0,
        "anim" : function (context, ticks) {
            context.drawImage(
                me.loader.getImage("ship"),
                25,
                35
            );

            context.drawImage(
                me.loader.getImage("balloon"),
                62,
                25
            );

            var step = (ticks * 0.015) % (Math.PI / 2);
            context.drawImage(
                me.loader.getImage("hand"),
                65 - Math.sin(step) * 30,
                40 - Math.cos(step) * 10
            );
        }
    },

    "onResetEvent" : function onResetEvent() {
        this.parent();

        var space = cm.getSpace(),
            h = c.HEIGHT * 0.25;

        // Create an obstacle.
        var settings = {
            "elasticity" : 1,
            "friction" : 1,
            "color" : c.DEBUG ? "red" : "transparent"
        };
        me.game.add(new game.Line(
            cp.v(c.WIDTH - 200, h),
            cp.v(c.WIDTH - 200, c.HEIGHT * 0.50),
            3,
            settings
        ), 1000);
        me.game.add(new game.Line(
            cp.v(c.WIDTH - 200, c.HEIGHT * 0.50),
            cp.v(c.WIDTH - 165, c.HEIGHT * 0.45),
            3,
            settings
        ), 1000);
        me.game.add(new game.Line(
            cp.v(c.WIDTH - 165, c.HEIGHT * 0.45),
            cp.v(c.WIDTH - 165, h),
            3,
            settings
        ), 1000);

        // Create an air current.
        var img = me.loader.getImage("ac_duct");
        me.game.add(new me.SpriteObject(20, 25, img, img.width, img.height), 1000);
        me.game.add(new game.AirFlow(0, 0, c.WIDTH, c.HEIGHT * 0.2), 1000);


        // Create a balloon.
        var balloon = new game.Balloon(
            c.WIDTH * 0.4,
            c.HEIGHT - h - 90,
            15,
            {
                "mass" : -1.5
            }
        );
        me.game.add(balloon, 1003);

        // Attach balloon with a rope.
        me.game.add(new game.Rope(balloon.body, space.staticBody, cp.v(0, -20), cp.v(c.WIDTH * 0.4, h), 70, {
            "mass" : 0.2
        }), 1002);

        // Create a second scientist.
        me.game.add(new game.Scientist((Math.random() * 200) + 250, c.HEIGHT - 90, {
            "direction" : 1,
            "head" : 0
        }), 2000);
    },

    "draw" : function draw(context) {
        this.parent(context);

        context.fillStyle = "#ddf";

        // Draw obstacle
        var x = c.WIDTH - 200;

        // Left face
        context.beginPath();
        context.moveTo(x - 20, c.HEIGHT * 0.45);
        context.lineTo(x + 20, c.HEIGHT * 0.55);
        context.lineTo(x + 20, c.HEIGHT * 0.8);
        context.lineTo(x - 20, c.HEIGHT * 0.6);
        context.closePath();
        context.stroke();
        context.fill();

        // Top face
        context.fillStyle = "#ccd";
        context.beginPath();
        context.moveTo(x - 20, c.HEIGHT * 0.45);
        context.lineTo(x - 10, c.HEIGHT * 0.45);
        context.lineTo(x + 34, c.HEIGHT * 0.55);
        context.lineTo(x + 20, c.HEIGHT * 0.55);
        context.closePath();
        context.stroke();
        context.fill();

        // Front face
        context.fillStyle = "#bbc";
        context.beginPath();
        context.moveTo(x + 20, c.HEIGHT * 0.55);
        context.lineTo(x + 34, c.HEIGHT * 0.55);
        context.lineTo(x + 34, c.HEIGHT * 0.8);
        context.lineTo(x + 20, c.HEIGHT * 0.8);
        context.closePath();
        context.stroke();
        context.fill();
    }
});
