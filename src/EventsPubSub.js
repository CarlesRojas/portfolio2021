export default class EventsPubSub {
    events = {};

    sub(eventName, func) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(func);
    }

    unsub(eventName, func) {
        if (this.events[eventName])
            for (var i = 0; i < this.events[eventName].length; i++)
                if (this.events[eventName][i] === func) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
    }

    emit(eventName, data) {
        if (this.events[eventName])
            this.events[eventName].forEach(function (func) {
                func(data);
            });
    }
}

/*
#######################################
     EVENTS
#######################################

    {
        event:          updateInteractiveItems
        desciption:     Called when the cursor should update the interactive items
        parameters:     {}
    },
    {
        event:          onGradientChange
        desciption:     Called when the background gradient should change
        parameters:     { gradientName }
        gradientName:   One of the names of the gradients like "purple"
    },
    {
        event:          onPatternChange
        desciption:     Called when the background pattern should change
        parameters:     { patternName }
        patternName:    One of the names of the patterns like "web"
    },

*/
