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
        event:          setCursorIcon
        description:    Called when the cursor icon should update
        parameters:     { type }
        type:           One of the possible icons: "none", "play" or "pause"
    }

    {
        event:          onSectionChange
        desciption:     Called when the section changes
        parameters:     { sectionName }
        sectionName:    One of the names of the sections: "web", "game" or "design"
    },

    {
        event:          onVideoPlay
        desciption:     Called when a video start playing
        parameters:     { id }
        id:             ID of the project where the video is playing
    },

    {
        event:          onShowAbout
        desciption:     Called when the about page should be shown
        parameters:     {  }
    },

*/
