<script src="http://libs.cartocdn.com/cartodb.js/v3/3.11/cartodb.js"></script>
	<script>
  
		window.onload = function(){
            var sql = new cartodb.SQL({ user: 'ay' });
            cartodb.createVis(map,  'http://ay.cartodb.com/api/v2/viz/8ec7b276-dcef-11e4-9dd0-0e018d66dc29/viz.json')
                .on('done', function(vis, layers) {
                  //do stuff
                  //define sublayer
                  var tz = layers[1].getSubLayer(0);
//tz set
                  tz.setCartoCSS("#travel_zones_nsw_2006{polygon-fill: #f2f0f7; polygon-opacity: 0.5; line-color: #FFF; line-width: 0.5; line-opacity: 1; }");
                  tz.setInteractivity("cartodb_id, tz06");
                  tz.setInteraction(true);
//edu on
                  tz.on('featureClick', function(e, pos, latlng, data) {
                    // //clean the previous view
                    if(vis.getOverlay('tooltip')!==undefined){
                      vis.getOverlay('tooltip').clean()
                    }
                    var master=data.name
                    var selected=data.tz06
                    console.log(selected)
                    
                    tz.setSQL("SELECT travel_zones_nsw_2006.cartodb_id, travel_zones_nsw_2006.the_geom, travel_zones_nsw_2006.the_geom_webmercator, travel_zones_nsw_2006.tz06, car_tt.destination, car_tt.origin, car_tt.time FROM travel_zones_nsw_2006, car_tt WHERE travel_zones_nsw_2006.tz06=car_tt.origin AND destination="+selected);
                    tz.setCartoCSS("#travel_zones_nsw_2006{polygon-fill: #f2f2f2; polygon-opacity: 0.4; polygon-comp-op: screen; line-color: #f2f0f7; line-width: 0.5; line-opacity: 1;}#car_tt [ time <= 60] {polygon-fill:  #4a1486; }#car_tt [ time <= 55] {polygon-fill:  #6a51a3; }#car_tt [ time <= 50] {polygon-fill:  #9e9ac8; }#car_tt [ time <= 45] {polygon-fill:  #bcbddc; }#car_tt [ time <= 40] {polygon-fill:  #dadaeb; }#car_tt [ time <= 35] {polygon-fill:  #edf8e9; } #car_tt [ time <= 30] {polygon-fill: #c7e9c0; } #car_tt [ time <= 25] {polygon-fill: #a1d99b; } #car_tt [ time <= 20] {polygon-fill: #74c476; } #car_tt [ time <= 15] {polygon-fill: #41ab5d; } #car_tt [ time <= 10] {polygon-fill: #238b45; } #car_tt[ time <= 5] {polygon-fill: #005a32}");
                    tz.setInteractivity("cartodb_id, tz06, time");
                     var ggg = vis.addOverlay({
                          layer:tz,
                          type: 'tooltip',
                          position: 'top|right',
                          template: '<h2><b>Travel time by car: </b>{{time}}</h2>'
                        });
                       });
                  })
                
                //log error
                .on('error', function(err) {
                  alert("some error occurred: " + err);
                });
        
            }
        
	</script>
