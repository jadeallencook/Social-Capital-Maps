(function () {

    var map = L.map('map').setView([40, -98], 4);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFkZWFsbGVuY29vayIsImEiOiJjamU3cTA5ZDgwNTNnMnFvMWRjdnI1aXYzIn0.63_s4EQVQur7r670eBY3DA', {
        attribution: 'Developed by <a href="#" target="_blank">Jade Allen Cook</a> for <a href="#" target="_blank">Deseret News</a>',
        maxZoom: 6,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiamFkZWFsbGVuY29vayIsImEiOiJjamU3cTA5ZDgwNTNnMnFvMWRjdnI1aXYzIn0.63_s4EQVQur7r670eBY3DA',
        style: 'mapbox://styles/mapbox/light-v9'
    }).addTo(map);

    L.geoJSON(statesData).addTo(map);

    function style(feature) {
        var color;
        var capital = capitals[feature.properties.name];
        if (capital) {
            color = capital.color;
        } else {
            color = '#DDDDDD';
        }
        return {
            fillColor: color,
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    L.geoJson(statesData, {
        style: style
    }).addTo(map);

    function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        });
    }

    geojson = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>Social Capital</h4>';
        if (props) {
            var info = capitals[props.name];
            var html = '<b>' + props.name + '</b> ranks <b>' + info['state-rank'] + '</b> out of 50 states and DC.';
            html += '<br /><br /><b>Subindex Rankings:</b><br />';
            html += 'Family Unity: ' + info['Family-Unity-rank'] + '<br />';
            html += 'Family Interaction: ' + info['Family-Interaction-rank'] + '<br />';
            html += 'Social Support: ' + info['Social-Support-rank'] + '<br />';
            html += 'Community Health: ' + info['Community-Health-rank'] + '<br />';
            html += 'Institutional Health: ' + info['Institutional-Health-rank'] + '<br />';
            html += 'Collective Efficacy: ' + info['Collective-Efficacy-rank'] + '<br />';
            html += 'Philanthropic Health: ' + info['Philanthropic-Health-rank'];
            this._div.innerHTML += html;
        } else {
            this._div.innerHTML += 'Click on a state for a description';
        }
    };

    info.addTo(map);

})();