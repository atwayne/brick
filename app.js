(function() {
    'use strict';

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var background = {
        color: 'black',
        width: canvas.width,
        height: canvas.height
    };

    var framesPerSecond = 30;

    var mouse = {
        color: "yellow",
        position: {
            X: 0,
            Y: 0
        }
    };

    var ball = {
        color: 'white',
        radius: 10,
        speed: {
            X: 5,
            Y: 5
        },
        position: {
            X: 5,
            Y: 5
        }
    };

    var debug = {
        enabled: true,
        logMouseCoords: function() {
            var self = this;
            canvas.addEventListener(
                'mousemove',
                function(event) {
                    mouse.position.X = event.clientX;
                    mouse.position.Y = event.clientY;
                }
            );
        }
    };

    var setupBorders = function() {
        background.edge = {
            left: ball.radius,
            right: background.width - ball.radius,
            top: ball.radius,
            bottom: background.height - ball.radius
        };
    };

    var setup = function() {
        setupBorders();
    };

    var initialize = function() {
        debug.logMouseCoords();
        setup();

        var interval = 1000 / framesPerSecond;
        setInterval(refreshUI, interval);
    };

    var refreshUI = function() {
        motion();

        drawBackground();
        drawBall();
        drawMouseTooltip();
    };

    var drawBackground = function() {
        var previousStyle = context.fillStyle;
        context.fillStyle = background.color;
        context.fillRect(0, 0, background.width, background.height);
        context.fillStyle = previousStyle;
    };

    var drawBall = function() {
        var previousStyle = context.fillStyle;
        context.beginPath();
        context.fillStyle = ball.color;
        context.arc(ball.position.X, ball.position.Y, ball.radius, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = previousStyle;
    };

    var drawMouseTooltip = function() {
        if (!debug.enabled) {
            return false;
        }

        context.fillStyle = mouse.color;
        var text = mouse.position.X + "," + mouse.position.Y;
        context.fillText(text, mouse.position.X, mouse.position.Y);
    };

    var motion = function() {
        var ballMove = function() {
            var nextX = ball.position.X + ball.speed.X;
            var nextY = ball.position.Y + ball.speed.Y;

            if (nextX > background.edge.right) {
                nextX = background.edge.right;
                ball.speed.X *= -1;
            }
            if (nextX < background.edge.left) {
                nextX = background.edge.left;
                ball.speed.X *= -1;
            }

            if (nextY > background.edge.bottom) {
                nextY = background.edge.bottom;
                ball.speed.Y *= -1;
            }
            if (nextY < background.edge.top) {
                nextY = background.edge.top;
                ball.speed.Y *= -1;
            }

            ball.position.X = nextX;
            ball.position.Y = nextY;
        };

        ballMove();
    };

    var app = {



    };

    window.app = window.app || app;

    if (document.readyState != 'loading') {
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', initialize);
    }

}());
