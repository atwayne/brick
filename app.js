(function() {
    'use strict';

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var backgroundColor = 'black';
    var framesPerSecond = 30;

    var initialize = function() {
        var interval = 1000 / framesPerSecond;
        setInterval(refreshUI, interval);
    };

    var refreshUI = function() {
        drawBackground();
    };

    var drawBackground = function(color) {
        color = color || backgroundColor;
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    var app = {

      

    };

    if (document.readyState != 'loading') {
        initialize();
    } else {
        document.addEventListener('DOMContentLoaded', initialize);
    }

    window.app = window.app || app;

}());
