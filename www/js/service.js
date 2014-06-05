// var API_ROOT_URL = 'http://127.0.0.1:8001';
var API_ROOT_URL = 'http://www.planetabrasilapp.com.br';

var parse_json = function(raw_json){
	return eval("(function(){return " + raw_json + ";})()");
};


function win(r) 
{ 
    alert("Foto enviada com sucesso!");
    //alert("Sent = " + r.bytesSent); 
};

function fail(error) 
{ 
    switch (error.code) 
    {  
     case FileTransferError.FILE_NOT_FOUND_ERR: 
      alert("Arquivo não encontrado"); 
      break; 
     case FileTransferError.INVALID_URL_ERR: 
      alert("Url inválida"); 
      break; 
     case FileTransferError.CONNECTION_ERR: 
      alert("Erro na conexão"); 
      break; 
    } 

    alert("Ocorreu um erro: Code = " + error.code); 
};

var camera_onSuccess = function(imageURI) {
    /*var data = 'image_b64=' + imageURI;
    var request = new XMLHttpRequest();
    request.open('POST', API_ROOT_URL + '/api/photos/', true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(data);
    */

    var options = new FileUploadOptions(); 
    options.chunkedMode = false;
    options.fileKey = "recFile"; 
    var imagefilename = imageURI; 
    options.fileName = imagefilename; 
    options.mimeType = "image/jpeg"; 
    var ft = new FileTransfer(); 
    
    //alert(API_ROOT_URL + '/api/photos/');
    ft.upload(imageURI, API_ROOT_URL + '/api/photos/', win, fail, options); 
    hideLoading();
}

var camera_onFail = function(message) {
    alert('Ocorreu um erro: ' + message);
    hideLoading();
}


var take_picture = function(){
    loading();
    navigator.camera.getPicture(camera_onSuccess, camera_onFail, { 
        quality: 50,
        encodingType: Camera.EncodingType.JPEG,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.FILE_URI
        //sourceType : Camera.PictureSourceType.CAMERA,
        //destinationType: Camera.DestinationType.DATA_URL
      });
};

//http://bluebus.s3.amazonaws.com/wp-content/uploads/2013/05/copa-do-mundo-brasil-2014.jpg
var share_facebook = function(url){
  
  /* com essa da pra colocar o intent certo, para ios o com.apple.social.facebook funciona
  window.plugins.socialsharing.shareVia('facebook', 
      'Message via FB', null, null, null, 
      function(){console.log('share ok')}, 
      function(msg) {alert('error: ' + msg)}
    );*/

  // Funciona redondo para links e imagens, mas não dá para customizar o texto
  //http://bluebus.s3.amazonaws.com/wp-content/uploads/2013/05/copa-do-mundo-brasil-2014.jpg
  window.plugins.socialsharing.shareViaFacebook('Planeta Brasil', url, null, 
      function() {
          alert('share ok')
      }, function(errormsg){
          alert(errormsg)
      });
};
