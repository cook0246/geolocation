
  //img.src = 'http://localhost/images/sample.jpg';
var canvas;
var context;

document.addEventListener("DOMContentLoaded", function(){
  
  if( navigator.geolocation ){ //checks to see if browser supports geolocation then executes code when supported
    var params = {enableHighAccuracy: false, timeout:36000, maximumAge:60000};
    navigator.geolocation.getCurrentPosition( reportPosition, gpsError, params ); 
    
      //displays message while user waits
      var header = document.createElement('h1');
      header.innerHTML ="Geolocation";
      document.body.appendChild(header);
      
        var message = document.createElement('p');
        message.innerHTML ="Note: image may take a little longer than 30 seconds to load...";
        document.body.appendChild(message);
      
    //creates the canvas element then appends it to the page
    canvas = document.createElement('canvas');
    canvas.height = 400;
    canvas.width = 400;
    document.body.appendChild(canvas);
        
      
          
  }else{
    //browser does not support geolocation api
    alert("Sorry, but your browser does not support location based awesomeness.");
  }
});

function reportPosition( position ){ 
    var output = document.createElement('div');
    var lati = position.coords.latitude;    //latitude
    var longi = position.coords.longitude;  //longitude
    
    output.innerHTML += "Latitude: " + lati + "&deg;<br/>"
                   + "Longitude: " + longi + "&deg;<br/>"
                   + "Accuracy: " + position.coords.accuracy;
    
    document.body.appendChild(output);
    
    //create map image
    var map = document.createElement('img');
        map.onload = function() {
    //draw map image to canvas
    context = canvas.getContext('2d');
    context.drawImage(map, 0, 0);  
    }
        map.src = 'https://maps.googleapis.com/maps/api/staticmap?center='
        + lati + ',' + longi       //where the center is
        +'&zoom=14&size=400x400'   //zoom level and size of image
        +'&markers=color:blue'     //marker and colour of marker
        //+'|label:1'              //label in marker (can only be one letter or one number)
        +'|' + lati + ',' + longi; //where the marker is
}

function gpsError( error ){   
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}