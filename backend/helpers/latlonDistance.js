// code taken directly from https://ip-api.com/docs/api:json
// more info is here: http://www.movable-type.co.uk/scripts/latlong.html
// top stackoverflow answer: https://stackoverflow.com/a/27943

//This is the Haversine formula. It turns the points into a distance km
//This is NOT a simple x2-x1 / y2-y1 because that doesnt work for spheres

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}

module.exports = getDistanceFromLatLonInKm;