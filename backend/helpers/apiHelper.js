//Hard-coded sample data for testing
var latsArray = [42.0267, 41.6040, 41.6055];
var longsArray = [-93.6465, -93.6585, -93.6573];
newLatitude = 41.6029;
newLongitude = -93.65782

if(!duplicateLatitude(latsArray, newLatitude)) {
    console.log ("Not a Duplicate Latitude entry");
} else {
    console.log("Duplicate Latitude entry");
};

if(!duplicateLongtitude(longsArray, newLongitude)) {
    console.log ("Not a Duplicate Longitude entry");
} else {
    console.log("Duplicate Longitude entry");
};


//Function to determine if latitude is a duplicate
function duplicateLatitude(lats, newLat) {
    for (var i = 0; i < lats.length; i++) {
        var absLat = Math.abs(lats[i]);
        var absNewLat = Math.abs(newLat);
        var difference = absLat = absNewLat;
        if (-0.001 < difference < 0.001) {
            return true;
        }
    }
    return false;
}

//Function to determine if longitude is a duplicate
function duplicateLongtitude(longs, newLong) {
    for (var i = 0; i < longs.length; i++) {
        var absLong = Math.abs(longs[i]);
        var absNewLong = Math.abs(newLong);
        var difference = absLong - absNewLong;
        if (-0.001 < difference < 0.001) {
            return true;
        }
    }
    return false;
}