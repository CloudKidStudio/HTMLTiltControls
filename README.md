HTML Tilt Controls
==============

Calculates device angle relative to the screen orientation, instead of in absolute values.

##Usage##
Check to make sure that it is supported and add an event listener:
```js
if(window.TiltControls.supported)
	window.TiltControls.addEventListener(function(event))
		{
			//positive is tilted to the right, negative is to the left
			var leftRightTilt = event.degX;
			//positive is tilted towards the user, negative is away from the user
			var upDownTilt = event.degY;
		});
```
Values are in degrees. Devices may rotate after about 25-30 degrees of rotation.

##License##

Copyright (c) 2014 [CloudKid](http://github.com/cloudkidstudio)

Released under the MIT License.
