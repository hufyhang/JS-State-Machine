#!/usr/local/bin/node

function State(args) {
    'use strict';
    this.states = args.states || [];
    this.current = args.initState || undefined;
    this.events = {};
}

State.prototype = {
    state: function () {
        'use strict';
        return this.current;
    },
    addStates: function (args) {
        'use strict';
        var index, elementIndex;
        if (args !== undefined && args.length !== 0) {
            for (index = 0; index !== args.length; ++index) {
                elementIndex = this.states.indexOf(args[index]);
                // only add those not in state list yet.
                if (elementIndex === -1) {
                    this.states.push(args[index]);
                }
            }
        }
        return this;
    },
    removeStates: function (args) {
        'use strict';
        var index, elementIndex;
        if (args !== undefined && args.length !== 0) {
            for (index = 0; index !== args.length; ++index) {
                elementIndex = this.states.indexOf(args[index]);
                // only remove those in state list.
                if (elementIndex !== -1) {
                    this.states.splice(elementIndex, 1);
                }
            }
        }
        return this;
    },
    on: function (state, event, callback) {
        'use strict';
        // first, check number of arguments
        if (arguments.length === 3) {
            if (state !== undefined && event !== undefined &&
                callback !== undefined) {
                if (this.events[state] === undefined) {
                    this.events[state] = {};
                }
                this.events[state][event] = callback;
            }
        }
        return this;
    },
    eventTrigger: function (previousState, currentData, previousData) {
        'use strict';
        // first check if has previous events
        if (this.events[previousState]) {
            // trigger previous leave event first
            if (this.events[previousState].leave !== undefined) {
                this.events[previousState].leave(previousData);
            }
        }

        // then check if has current event
        if (this.events[this.current]) {
            // trigger current enter event
            if (this.events[this.current].enter !== undefined) {
                this.events[this.current].enter(currentData);
            }
        }
    },
    forth: function (currentData, previousData) {
        'use strict';
        var currentIndex, previousState;
        currentIndex = this.states.indexOf(this.current);
        previousState = this.current;
        // only advance if it is not the last state yet.
        if (currentIndex !== this.states.length - 1) {
            this.current = this.states[currentIndex + 1];
            this.eventTrigger(previousState, currentData, previousData);
        }
        return this;
    },
    back: function (currentData, previousData) {
        'use strict';
        var currentIndex, previousState;
        currentIndex = this.states.indexOf(this.current);
        previousState = this.current;
        // only backward if it is not the first state yet.
        if (currentIndex !== 0) {
            this.current = this.states[currentIndex - 1];
            this.eventTrigger(previousState, currentData, previousData);
        }
        return this;
    },
    go: function (state, currentData, previousData) {
        'use strict';
        var elementIndex, previousState;
        if (state !== undefined && this.current !== state) {
            elementIndex = this.states.indexOf(state);
            // only if the given state is valid
            if (elementIndex !== -1) {
                previousState = this.current;
                this.current = this.states[elementIndex];
                this.eventTrigger(previousState, currentData, previousData);
            }
        }
        return this;
    }
};

module.exports = State;

