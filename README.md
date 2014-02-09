JS-State-Machine
================

A Javascript Finite State Machine

Usage
=====

Include State by:

       var State = require('js-state');

APIs
====

* Constructor

        var st = new State({initState: 'ready', states: ['ready', 'middle', 'end']});

*initState*: The inital state of the state machine.

*states*: The availale states of the state machine.

* `addStates`

Add additional states to state machine.

        st.addStates(['initialzed', 'pending']);

* `removeStates`

Remove states from state machine.

        st.removeStates(['middle', 'pending']);

* `forth`([currentStateData], [previousStateData])

Advance state.

        st.forth('Hello world!!!');

*currentStateData*: **[Optional]** the data provided for the current state *enter* callback.

*previousStateData*: **[Optional]** the data provided for the previous state *leave* callback.

* back([currentStateData], [previousStateData])

Backward state.

        st.back('Hello universe!!!');

*currentStateData*: **[Optional]** the data provided for the current state *enter* callback.

*previousStateData*: **[Optional]** the data provided for the previous state *leave* callback.

* `go`(state, [currentStateData], [previousStateData])

Go to a state.

        st.go('ready', 'Bingo!');

*currentStateData*: **[Optional]** the data provided for the current state *enter* callback.

*previousStateData*: **[Optional]** the data provided for the previous state *leave* callback.

* on(state, event, callback)

Bind a function that will be triggered when state changed.

        st.on('middle', 'enter', function () {console.log('Aloha');});

*state*: Target state.

*event*: Tigger event. Can be either *enter* or *leave*.

*callback*: The function that will be invoked.

