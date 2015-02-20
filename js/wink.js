var nLight = [];
var divLights = [];
var mySliderLight = [];
var controlWinks = [];

function createRequest() {
	var result = null;
	if (window.XMLHttpRequest) {
		// FireFox, Safari, etc.
		result = new XMLHttpRequest();
		if (typeof result.overrideMimeType != 'undefined') {
			result.overrideMimeType('text/xml'); // Or anything else
		}
	} else if (window.ActiveXObject) {
		// MSIE
		result = new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		// No known mechanism -- consider aborting the application
	}
	return result;
}

function getWinkRow(wink, row) {
	if(Object.keys(wink.capabilities)[0] == 'sensor_types'){
		var keyWinkLength = (Object.keys(wink)[2]).length;
		var strDeviceType = (Object.keys(wink)[2]).substring(0, (keyWinkLength -3));
		}
	else{
		var keyWinkLength = (Object.keys(wink)[0]).length;
		var strDeviceType = (Object.keys(wink)[0]).substring(0, (keyWinkLength -3));
		}
	strDeviceType = strDeviceType + "s";
	switch(strDeviceType){
		case 'light_bulbs':
			var cell = document.getElementById("State" + row);
			var state = document.createElement("img");
			var bPowered = wink.desired_state.powered;
			state.id = "lightbulb";
			state.src = "png/lights/" + bPowered + ".png";
			state.alt = bPowered;
			cell.appendChild(state);
			var cell = document.getElementById("Desc" + row);
			var divDesc = document.createElement('div');
			//divDesc.style.align = 'center';
			divDesc.style.width = 60;
			//divDesc.style.textAlign = 'center';
			var span = document.createElement("span");
			//img.src = "png/lights/light_bulb.png";
			//img.src = "png/lights/lightbulb27.png";
			//img.width = 48;
			//img.height = 48;
			divDesc.appendChild(span);
			//divDesc.appendChild(document.createElement("br"));
			divDesc.appendChild(document.createTextNode(wink.name));
			cell.appendChild(divDesc);
			var cell = document.getElementById("Switch" + row);
			//cell.style.width = "160px";
			var wink_id = wink.light_bulb_id;
			if(wink.desired_state.powered)
				nLight[row] = (wink.desired_state.brightness) * 100;
			else
				nLight[row] = 0;

			mySliderLight[row] = new dhtmlXSlider({
				parent: "Switch" + row,
				value: nLight[row],
				tooltip: true,
				skin: "dhx_web",
				size: 150, 
				step: 10,
				min: 0,
				max: 100
				});
			// Add Line Break
			var lineNext = document.createElement("BR");
			cell.appendChild(lineNext);
			var temp_bg = document.createElement("img");
			temp_bg.src = "png/lights/lightlegend.gif";
			temp_bg.style.paddingTop = "5px";
			temp_bg.style.align = "left";
			cell.appendChild(temp_bg);

			if(mySliderLight.length > 0)
				mySliderLight[row].attachEvent("onSlideEnd", function(newLight){
					setDevice(strDeviceType, wink_id, newLight);
					});
			break;
			
		case 'locks':
			var cell = document.getElementById("State" + row);
			var state = document.createElement("img");
			state.src = "png/locks/"+ wink.desired_state.locked + ".png";
			cell.appendChild(state);
			var cell = document.getElementById("Desc" + row);
			var divDesc = document.createElement('div');
			//divDesc.style.align = 'center';
			divDesc.style.width = 60;
			//divDesc.style.textAlign = 'center';
			var img = document.createElement("img");
			img.src = "png/locks/ic_device_locks_selection.png";
			img.width = 48;
			img.height = 48;
			divDesc.appendChild(img);
			//divDesc.appendChild(document.createElement("br"));
			divDesc.appendChild(document.createTextNode(wink.name));
			cell.appendChild(divDesc);
			var cell = document.getElementById("Switch" + row);
			//cell.style.align = 'center';
			if(wink.desired_state.locked)
				nLock = 1;
			else
				nLock = 0;
			mySliderLight[row] = new dhtmlXSlider({
				parent: cell, 
				size: 150, 
				skin: "dhx_web",
				tooltip: true,
				vertical: false, 
				min: 0,
				max: 1,
				value: nLock,
				step: 1});
//			mySliderLight[row].style.align = 'center';
			var lineNext = document.createElement("BR");
			cell.appendChild(lineNext);
			var temp_bg = document.createElement("img");
			temp_bg.style.paddingTop = "5px";
			temp_bg.src = "png/locks/LockLegend.png";
			temp_bg.style.align = 'left';
			cell.appendChild(temp_bg);
			mySliderLight[row].attachEvent("onSlideEnd", function(newLock){
				setDevice(strDeviceType, wink.lock_id, newLock);
				});
			break;
		case 'thermostats':
			var cell = document.getElementById("State" + row);
//			var state = document.createElement("img");
//			state.style.width = 10;
			var nTemp = wink.desired_state.max_set_point;
			nTemp = (nTemp * 1.8) + 32;
//			state.alt = nTemp.toString();
			var img = document.createElement("img");
			img.src = "png/thermostat/ic_device_thermostat_selection.png";
			img.width = 48;
			img.height = 48;
			cell.appendChild(img);
//			cell.appendChild(state);
			var cell = document.getElementById("Desc" + row);
			var divDesc = document.createElement('div');
			//divDesc.style.align = 'center';
			divDesc.style.width = 60;
			//divDesc.style.textAlign = 'center';
			
			//divDesc.appendChild(document.createElement("br"));
			divDesc.appendChild(document.createTextNode(wink.name + "  " + "(" + nTemp + "\xB0)"));
			//divDesc.appendChild(document.createTextNode(nTemp));
			cell.appendChild(divDesc);
			var cell = document.getElementById("Switch" + row);
			var nTemp = wink.desired_state.max_set_point;
			nTemp = (nTemp * 1.8) + 32;
			mySliderLight[row] = new dhtmlXSlider({
				parent: cell, 
				size: 150, 
				skin: "dhx_web",
				tooltip: true,
				vertical: false, 
				min: 50,
				max: 80,
				value: nTemp,
				step: 1});
			var lineNext = document.createElement("BR");
//			lineNext.style.top = "25px";
//			cell.appendChild(lineNext);
			var temp_bg = document.createElement("img");
			temp_bg.style.paddingTop = "5px";
			temp_bg.src = "png/thermostat/thermostat.gif";
			cell.appendChild(temp_bg);
			mySliderLight[row].attachEvent("onSlideEnd", function(newTemp){
				//Convert to Celsius
				newTemp = (newTemp - 32)/1.8;
				setDevice("thermostat_id", wink.thermostat_id, newTemp);
				});
			break;

		case 'hubs':
			updateHub(wink, row);
			window.setInterval(function(){updateHub(wink, row)}, 30000);
			var cell = document.getElementById("Desc" + row);
			var divDesc = document.createElement('div');
			//divDesc.style.align = 'center';
			divDesc.style.width = 60;
			//divDesc.style.textAlign = 'center';
			var span = document.createElement("span");
			//img.src = "png/hub/hub.png";
			//img.width = 48;
			//img.height = 48;
			divDesc.appendChild(span);
			//divDesc.appendChild(document.createElement("br"));
			divDesc.appendChild(document.createTextNode(wink.name));
			cell.appendChild(divDesc);
			break;

		case 'sensor_pods':
			var cell = document.getElementById("State" + row);
			var state = document.createElement("img");
			state.src = "png/sensors/sensor.png";
			state.width = 48;
			state.height = 48;
			state.alt = 'N/A';
			cell.appendChild(state);
			var cell = document.getElementById("Desc" + row);
			var divDesc = document.createElement('div');
			//divDesc.style.align = 'center';
			divDesc.style.width = 60;
			//divDesc.style.textAlign = 'center';
			//var img = document.createElement("img");
			//img.src = "png/sensors/sensor.png";
			//img.width = 64;
			//img.height = 64;
			//divDesc.appendChild(img);
			//divDesc.appendChild(document.createElement("br"));
			divDesc.appendChild(document.createTextNode(wink.name));
			cell.appendChild(divDesc);
			updateSensors(wink, row);
//			window.setInterval(function(){updateSensors(wink, row)}, 60000);			
			break;

			case 'propane_tanks':
			var cell = document.getElementById("State" + row);
			var state = document.createElement("img");
			state.src = "png/sensors/na.png";
			state.alt = 'N/A';
			cell.appendChild(state);
			var cell = document.getElementById("Desc" + row);
			var divDesc = document.createElement('div');
			//divDesc.style.align = 'center';
			divDesc.style.width = 60;
			//divDesc.style.textAlign = 'center';
			var img = document.createElement("img");
			img.src = "png/sensors/sensor.png";
			img.width = 64;
			img.height = 64;
			divDesc.appendChild(img);
			//divDesc.appendChild(document.createElement("br"));
			divDesc.appendChild(document.createTextNode(wink.name));
			cell.appendChild(divDesc);
			updateRefuel(wink, row);
//			window.setInterval(function(){updateSensors(wink, row)}, 60000);			
			break;

		case 'smoke_detectors':
			var cell = document.getElementById("State" + row);
			var state = document.createElement("img");
			state.src = "png/sensors/smokealarm.png";
			state.alt = 'N/A';
			cell.appendChild(state);
			var cell = document.getElementById("Desc" + row);
			var divDesc = document.createElement('div');
			//divDesc.style.align = 'center';
			divDesc.style.width = 60;
			//divDesc.style.textAlign = 'center';
			var span = document.createElement("span");
			//img.src = "png/sensors/smokealarm.png";
			//img.width = 64;
			//img.height = 64;
			divDesc.appendChild(span);
			//divDesc.appendChild(document.createElement("br"));
			divDesc.appendChild(document.createTextNode(wink.name));
			cell.appendChild(divDesc);
			var cell = document.getElementById("Switch" + row);
			var imgBattery = document.createElement('img');
			if(wink.last_reading.battery > .8)
				imgBattery.src = 'png/battery/battery_100.png';
			if((wink.last_reading.battery <= .8) && (wink.last_reading.battery > .6))
				imgBattery.src = 'pgn/battery/battery_75.png';
			if((wink.last_reading.battery <= .6) && (wink.last_reading.battery > .3))
				imgBattery.src = 'pgn/battery/battery_50.png';
			if((wink.last_reading.battery <= .3) && (wink.last_reading.battery > .15))
				imgBattery.src = 'pgn/battery/battery_75.png';
			if((wink.last_reading.battery <= .15) && (wink.last_reading.battery > 0))
				imgBattery.src = 'pgn/battery/battery_10.png';
			imgBattery.alt = wink.last_reading.battery;
			cell.appendChild(imgBattery);
				
			break;
			
		default:
			var cell = document.getElementById("State" + row).className += "hideme";
			var state = document.createElement("img");
			state.src = "png/lights/na.png";
			state.alt = 'not light';
			//cell.appendChild(state);
			var cell = document.getElementById("Desc" + row);
			var divDesc = document.createElement('div');
			//divDesc.style.align = 'center';
			divDesc.style.width = 60;
			//divDesc.style.textAlign = 'center';
			//var img = document.createElement("img");
			//img.width = 48;
			//img.height = 48;
			//divDesc.appendChild(img);
			//divDesc.appendChild(document.createElement("br"));
			divDesc.appendChild(document.createTextNode(wink.name));
			cell.appendChild(divDesc);
			var cell = document.getElementById("Switch" + row);
	}
	return;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) == 0)
			return c.substring(name.length, c.length);
	}
	return "";
}

function forceLogout()
{
	document.execCommand("ClearAuthenticationCache");
	var req = createRequest(); // defined above
	req.open("GET", target + "?pc=" + Math.random(), true, "logout", null);
	req.send();
//	req.abort();
}

function fillBody() {
var xhr = new XMLHttpRequest();
var username = ' ';
var password = ' ';
var clientid = 'quirky_wink_android_app';
var clientsecret = 'e749124ad386a5a35c0ab554a4f2c045';
var sendstring = "{\"client_id\":\"" + clientid + "\",\"client_secret\":\"" + clientsecret + "\",\"username\":\"" + username + "\",\"password\":\"" + password + "\",\"grant_type\":\"password\"}";

xhr.open('POST', 'https://winkapi.quirky.com/oauth2/token');
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (typeof cb !== "undefined") {
      cb(this);
    }
    else {
	var result = this.responseText;

	obj = JSON.parse(result);

	AccessToken = obj.access_token;
	RefreshToken = obj.refresh_token;
	TokenType = obj.token_type;
	fetchDevices();
	return;
    }
	}
};
xhr.send(sendstring);
}

function createRows(row){
	var result = document.createElement("tr");
	td = document.createElement("td");
	//td.style.width = "10px";
	//td.style.align = "center";
	td.id = "State" + row;
	result.appendChild(td);
	var td = document.createElement("td");
	//td.style.width = "100px";
	//td.style.align = "center";
	td.id = "Desc" + row;
	//td.style.fontSize = "10px";
	result.appendChild(td);
	var td = document.createElement("td");
	//td.style.width = "160px";
	//td.style.align = "left";
	td.id = "Switch" + row;
	//td.style.fontSize = "10px";
	result.appendChild(td);
//	window.setInterval(function(){fetchDevices()}, 20000);
	
return result;
}

function updateSensors(wink, row){
	document.getElementById("winkResult").innerHTML = "Updating Sensor Status...";
	var cell = document.getElementById("Switch" + row);
	var divSensor = document.createElement('div');
	var imgBattery = document.createElement('img');
	if(wink.last_reading.battery > .8)
		imgBattery.src = 'png/battery/battery_100.png';
	if((wink.last_reading.battery <= .8) && (wink.last_reading.battery > .6))
		imgBattery.src = 'pgn/battery/battery_75.png';
	if((wink.last_reading.battery <= .6) && (wink.last_reading.battery > .3))
		imgBattery.src = 'pgn/battery/battery_50.png';
	if((wink.last_reading.battery <= .3) && (wink.last_reading.battery > .15))
		imgBattery.src = 'pgn/battery/battery_75.png';
	if((wink.last_reading.battery <= .15) && (wink.last_reading.battery > 0))
		imgBattery.src = 'pgn/battery/battery_10.png';
	imgBattery.alt = wink.last_reading.battery;
	divSensor.appendChild(imgBattery);
	imgOpened = document.createElement('img');
	if(wink.name.search("Door") > 0)
		if(wink.name.search("Garage") > 0){
			if(wink.last_reading.opened)
				imgOpened.src = 'png/sensors/sensors_small_garagedoor_open.png';
			else
				imgOpened.src = 'png/sensors/sensors_small_garagedoor_closed.png';
			}
		else{
			if(wink.last_reading.opened)
				imgOpened.src = 'png/sensors/sensors_small_door_open.png';
			else
				imgOpened.src = 'png/sensors/sensors_small_door_closed.png';
			}
	if(wink.name.search("Window") > 0)
		if(wink.last_reading.opened)
			imgOpened.src = 'png/sensors/sensors_small_window_open.png';
		else
			imgOpened.src = 'png/sensors/sensors_small_window_closed.png';
	if(wink.name.search("Cabinet") > 0)
		if(wink.last_reading.opened)
			imgOpened.src = 'png/sensors/sensors_small_cabinet_open.png';
		else
			imgOpened.src = 'png/sensors/sensors_small_cabinet_closed.png';
	divSensor.appendChild(imgOpened);
	cell.appendChild(divSensor);
	document.getElementById("winkResult").innerHTML = "Found "
		+ controlWinks.length + " Wink devices"; // + resp;
}

function updateRefuel(wink, row){
	document.getElementById("winkResult").innerHTML = "Updating Refuel Status...";
	var cell = document.getElementById("Switch" + row);
	var divSensor = document.createElement('div');
	var imgBattery = document.createElement('img');
	if(wink.last_reading.battery > .8)
		imgBattery.src = 'png/battery/battery_100.png';
	if((wink.last_reading.battery <= .8) && (wink.last_reading.battery > .6))
		imgBattery.src = 'pgn/battery/battery_75.png';
	if((wink.last_reading.battery <= .6) && (wink.last_reading.battery > .3))
		imgBattery.src = 'pgn/battery/battery_50.png';
	if((wink.last_reading.battery <= .3) && (wink.last_reading.battery > .15))
		imgBattery.src = 'pgn/battery/battery_75.png';
	if((wink.last_reading.battery <= .15) && (wink.last_reading.battery > 0))
		imgBattery.src = 'pgn/battery/battery_10.png';
	imgBattery.alt = wink.last_reading.battery;
	divSensor.appendChild(imgBattery);
	var imgRefuel = document.createElement('img');
	if(wink.last_reading.remaining > .8)
		imgRefuel.src = 'png/refuel/ic_device_refuel_stroke.png';
	if((wink.last_reading.remaining <= .8) && (wink.last_reading.refuel > .6))
		imgRefuel.src = 'pgn/refuel/ic_refuel_4.png';
	if((wink.last_reading.remaining <= .6) && (wink.last_reading.refuel > .4))
		imgRefuel.src = 'pgn/refuel/ic_refuel_3.png';
	if((wink.last_reading.remaining <= .4) && (wink.last_reading.refuel > .3))
		imgRefuel.src = 'pgn/refuel/ic_refuel_2.png';
	if((wink.last_reading.remaining <= .3) && (wink.last_reading.refuel > .15))
		imgRefuel.src = 'pgn/refuel/ic_refuel_1.png';
	if((wink.last_reading.remaining <= .15) && (wink.last_reading.refuel > 0))
		imgRefuel.src = 'pgn/refuel/ic_refuel_0.png';
	imgRefuel.alt = wink.last_reading.battery;
	divSensor.appendChild(imgRefuel);
	cell.appendChild(divSensor);
	document.getElementById("winkResult").innerHTML = "Found "
		+ controlWinks.length + " Wink devices"; // + resp;
}

function updateHub(wink, row){
	document.getElementById("winkResult").innerHTML = "Updating Hub Status...";
	if('WebSocket' in window){
		var ws = new WebSocket("ws://" + wink.last_reading.ip_address);
		ws.onerror = function(error){
			ws.close();
			ws = null;
			var cell = document.getElementById("State" + row);
			cell.innerHTML = "";
			var state = document.createElement("img");
			state.src = "png/hub/true.png";
			state.alt = "On-Line";
			state.id = "hub";
			cell.appendChild(state);
		};
		setTimeout(function(){
			if(ws != null){
				ws.close();
				ws = null;
				var cell = document.getElementById("State" + row);
				cell.innerHTML = "";
				var state = document.createElement("img");
				state.src = "png/hub/false.png";
				state.alt = "Off-Line";
				state.id = "hub";
				cell.appendChild(state);
			}
		}, 2000);
	}
	else
		alert("WebSocket are not supported");
	document.getElementById("winkResult").innerHTML = "Found "
		+ controlWinks.length + " Wink devices"; // + resp;
}

function fetchDevices(){
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://winkapi.quirky.com/users/me/wink_devices');
xhr.setRequestHeader("Authorization","Bearer " + AccessToken);
xhr.onreadystatechange = function () {
  if (this.readyState == 4) 
   	if (xhr.status != 200) {
		// Handle request failure here...
		document.getElementById("winkResult").innerHTML = "Error Calling Wink REST API "
			+ xhr.status + " " + xhr.statusText;
			return;
			}
    else {
 		var text = this.responseText;
		obj = JSON.parse(text);
		document.getElementById("winkResult").innerHTML = "Calling Wink REST API";
	
		// Request successful, read the response
		var resp = xhr.responseText;
		// ... and use it as needed by your app.
		var winks = JSON.parse(resp);
		var tbody = document.createElement("tbody");
		var numWinks = 0;
		controlWinks = [];
//		for (var i = 0; i < 6; i++) {
		for (var i = 0; i < winks.data.length; i++) {
			//Remove hubs and sensors from device list
//			if(!(Object.keys(winks.data[i])[2] == 'sensor_pod_id')){
			controlWinks.push(winks.data[i]);
			tbody.appendChild(createRows(numWinks));
			++numWinks;
//			}
		}
		document.getElementById("winkResult").innerHTML = "Found "
				+ controlWinks.length + " Wink devices"; // + resp;
		var winkTable = document.getElementById("winkTable");
		winkTable.replaceChild(tbody, document.getElementById("winkDevices"));
		tbody.setAttribute("id", "winkDevices");
		for (var i = 0; i < controlWinks.length; i++) {
			getWinkRow(controlWinks[i], i);
		
		}
	}
};
	document.getElementById("winkResult").innerHTML = "Fetching...";
	xhr.send();
	window.setTimeout(function(){fetchDevices()},6000);

}


function setDevice(model, udn, value) {
var req = new XMLHttpRequest();
	// Create the callback:
	req.onreadystatechange = function() {
		if (req.readyState != 4)
			return; // Not there yet
		if (req.status != 200) {
			// Handle request failure here...
			document.getElementById("winkResult").innerHTML = "Error Calling Wink REST API "
					+ req.status;
			return;
		}
		// Request successful, read the response
		var resp = req.responseText;
		document.getElementById("winkResult").innerHTML = "SetDevice " + udn
				+ " to " + value + ": " + resp;
		fetchDevices();
	}
	document.getElementById("winkResult").innerHTML = "Setting...";
	switch(model){
	case "light_bulbs":
		var deviceTarget = model+ "/" + udn;
		if(value > 0)
			bPowered = true;
		else
			bPowered = false;
//		nLight = value;
		value = value/100;
		var body = {
		"desired_state":
		{
		"powered":bPowered,"brightness":value
		}
		};
		break;
	case "locks":
		if(value > 0)
			bLocked = true;
		else
			bLocked = false;
		var deviceTarget = model + "/" + udn;
		var body = {
		"desired_state":
		{
		"locked":bLocked
		}
		};
		break;
	case "thermostat_id":
		var deviceTarget = "thermostats/" + udn;
		var body = {
		"desired_state":
		{
		"mode":"heat_only","powered":true,"modes_allowed":null,"min_set_point":value,"max_set_point":value
		}
		};
		break;
	default:
		;
	}
	req.open("PUT", 'https://winkapi.quirky.com/' + deviceTarget);
	req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Authorization","Bearer " + AccessToken);
	req.send(JSON.stringify(body));
}