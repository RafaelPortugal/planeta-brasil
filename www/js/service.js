var API_ROOT_URL = 'http://192.168.25.25:8000';

var parse_json = function(raw_json){
	return eval("(function(){return " + raw_json + ";})()");
};


var camera_onSuccess = function(imageURI) {
    var data = 'image_b64=' + imageURI;
    var request = new XMLHttpRequest();
    request.open('POST', API_ROOT_URL + '/api/photos/', true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(data);
    alert("Foto enviada com sucesso!");
}

var camera_onFail = function(message) {
    alert('Ocorreu um erro: ' + message);
}


var take_picture = function(){
    navigator.camera.getPicture(camera_onSuccess, camera_onFail, { 
        quality: 50,
        encodingType: Camera.EncodingType.JPEG,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.DATA_URL
        //sourceType : Camera.PictureSourceType.CAMERA,
        //destinationType: Camera.DestinationType.FILE_URI
      });
};

//http://bluebus.s3.amazonaws.com/wp-content/uploads/2013/05/copa-do-mundo-brasil-2014.jpg
var share_facebook = function(){
  
  // com essa da pra colocar o intent certo, para ios o com.apple.social.facebook funciona
  window.plugins.socialsharing.shareVia('facebook', 
      'Message via FB', null, null, null, 
      function(){console.log('share ok')}, 
      function(msg) {alert('error: ' + msg)}
    );


  /*window.plugins.socialsharing.shareViaFacebook('Mensagem', 'http://bluebus.s3.amazonaws.com/wp-content/uploads/2013/05/copa-do-mundo-brasil-2014.jpg', null, 
      function() {
          alert('share ok')
      }, function(errormsg){
          alert(errormsg)
      });*/
};