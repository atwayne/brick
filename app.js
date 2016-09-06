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
        },
        start: function() {
            var self = this;
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

    var initialize = function() {
        debug.logMouseCoords();

        var interval = 1000 / framesPerSecond;
        setInterval(refreshUI, interval);
    };

    var refreshUI = function() {
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

    var app = {



    };

    window.app = window.app || app;

    if (document.readyState != 'loading') {
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', initialize);
    }

}());
