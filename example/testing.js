#!/usr/local/bin/node

var State = require('node-state');

var state = new State({
    initState: 'ready',
    states: ['ready']
});

state.addStates(['middle', 'done']);

state.on('ready', 'enter', function () {
    'use strict';
    console.log('In ready now');
}).on('ready', 'leave', function () {
    'use strict';
    console.log('Left ready.');
}).on('middle', 'enter', function (name) {
    'use strict';
    console.log('Welcome,', name);
}).on('done', 'enter', function () {
    'use strict';
    console.log('Entered done.');
});

console.log('Begin now...');

state.forth('Feifei').go('ready').forth('Lanlan').forth().back('Casanova').forth();

console.log('Exit now...');
