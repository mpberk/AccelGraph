var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
		document.getElementById('btnAccel').disabled = false;
		var watchID;
		var accelOn = false;

		function updateVal(x, y, z) {
			document.getElementById('accelX').innerText = x;
			document.getElementById('accelY').innerText = y;
			document.getElementById('accelZ').innerText = z;
		}
		updateVal(0,0,0);

		function toggle() {
			if (!accelOn) {
				function onSuccess(acceleration) {
					updateVal(	acceleration.x,
								acceleration.y,
								acceleration.z );
				};
				function onError() {
					alert('Error');
				}
				var options = {frequency: 500}; // will update twice every second
				watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
				accelOn = true;
			} else {
				navigator.accelerometer.clearWatch(watchID);
				updateVal(0,0,0);
				accelOn = false;
			}
		}
		document.addEventListener("click", toggle);
    }
};
