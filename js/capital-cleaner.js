var keys = Object.keys(capitals[0]);
for (var x = 0; x < keys.length; x++) {
    var key = keys[x];
    console.log(key);
    for (var y = 0; y < capitals.length; y++) {
        var capital = capitals[y];
        console.log(capital);
        capitals = capitals.sort(function (a, b) {
            return b[key] - a[key];
        });
    }
    for (var y = 0; y < capitals.length; y++) {
        capitals[y][key + '-rank'] = y + 1;
    }
}