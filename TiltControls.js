(function(global){

	// The tilt controls object already exists
	if ("TiltControls" in global) return;

	var TiltControls = {};

	var eventObject = {degX: 0, degY: 0};
	var listeners = [];

	TiltControls.useTopWindow = false;

	Object.defineProperty(TiltControls, 'supported', {
		get: function()
		{
			return !!(window.orientation !== undefined && window.DeviceOrientationEvent);
		}
	});

	Object.defineProperty(TiltControls, 'addEventListener', {
		enumerable: false,
		writable:false, 
		value: function(listener) {
			if(typeof listener != "function") return;
			if(listeners.indexOf(listener) == -1)
			{
				listeners.push(listener);
				if(listeners.length == 1)
				{
					window.addEventListener('deviceorientation', eventListenerFunction);
				}
			}
		}
	});

	Object.defineProperty(TiltControls, 'removeEventListener', {
		enumerable: false,
		writable:false, 
		value: function(listener) {
			var index = listeners.indexOf(listener);
			if(index > -1)
			{
				listeners.splice(index, 0);
				if(listeners.length < 1)
					window.removeEventListener('deviceorientation', eventListenerFunction);
			}
		}
	});

	var eventListenerFunction = function(event)
	{
		var orientation;
		if(TiltControls.useTopWindow)
			orientation = window.top.orientation;
		else
			orientation = window.orientation;
		switch(orientation)
		{
			case 0:
				eventObject.degX = event.gamma;
				eventObject.degY = event.beta;
				break;
			case 90:
				eventObject.degX = event.beta;
				eventObject.degY = -event.gamma;
				break;
			case -90:
				eventObject.degX = -event.beta;
				eventObject.degY = event.gamma;
				break;
			case 180:
				eventObject.degX = -event.gamma;
				eventObject.degY = -event.beta;
				break;
		}
		for(var i = listeners.length - 1; i >= 0; --i)
		{
			listeners[i](eventObject);
		}
	};

	// Assign to the global namespace
	global.TiltControls = TiltControls;
	
}(window));