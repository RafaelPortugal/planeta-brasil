Importante, versão do cordova sem bugs:
- sudo npm uninstall -g cordova
- sudo npm install -g cordova@3.4.0-0.1.0

Push (só funciona fazendo via phonegap build)
- cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
- cordova plugin add https://github.com/phonegap-build/PushPlugin.git
- sudo gem install pushmeup
- Com isso dá para rodar o script de exemplo que está em:
	planeta-brasil/plugins/com.phonegap.plugins.PushPlugin/Example/server/pushGCM.rb

