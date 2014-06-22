// var API_ROOT_URL = 'http://127.0.0.1:8000';
var API_ROOT_URL = 'http://www.planetabrasilapp.com.br';

var parse_json = function(raw_json){
	return eval("(function(){return " + raw_json + ";})()");
};

function win(r) 
{ 
    hideLoading();
    var language = window.localStorage.getItem('language');
    messages = {
        1: "Foto envianda com sucesso.",
        2: "Photo sent successfully."
      }
    alert(messages[language]);
    //alert("Sent = " + r.bytesSent); 
};

function fail(error) 
{   
    var language = window.localStorage.getItem('language');
    if (!language) {
      language = 1;
    }
    switch (error.code) 
    {  
     case FileTransferError.FILE_NOT_FOUND_ERR:
      messages = {
        1: "Arquivo não encontrado, tente novamente.",
        2: "Archive not found, try again."
      };
      alert(messages[language]); 
      break; 
     case FileTransferError.CONNECTION_ERR: 
      messages = {
        1: "Verifique sua conexão e tente novamente.",
        2: "Verify your connection and try again."
      };
      alert(messages[language]);
     default:
      messages = {
        1: "Algo inesperado aconteceu, tente novamente.",
        2: "Something unexpected occurred, try again."
      };
      alert(messages[language]);
    };
    hideLoading();
};

var camera_onSuccess = function(imageURI) {
    /*var data = 'image_b64=' + imageURI;
    var request = new XMLHttpRequest();
    request.open('POST', API_ROOT_URL + '/api/photos/', true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(data);
    */
    loading();
    var options = new FileUploadOptions(); 
    options.chunkedMode = false;
    options.fileKey = "recFile"; 
    var imagefilename = imageURI; 
    options.fileName = imagefilename; 
    options.mimeType = "image/jpeg"; 
    var ft = new FileTransfer(); 
    //alert(API_ROOT_URL + '/api/photos/');
    ft.upload(imageURI, API_ROOT_URL + '/api/photos/', win, fail, options); 

}

var camera_onFail = function(message) {
    alert('Ocorreu um erro: ' + message);
}


var take_picture = function(){
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