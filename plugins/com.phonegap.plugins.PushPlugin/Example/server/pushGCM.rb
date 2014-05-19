require 'rubygems'
require 'pushmeup'
GCM.host = 'https://android.googleapis.com/gcm/send'
GCM.format = :json
GCM.key = "AIzaSyCIrW_gpOaY4fmlP-U1Ing3mRvA8Zkvj28"
destination = ["APA91bH16i4vW5IMOU4IoQCJpvm-1ZChYtI9GnGDBALZ6mktvbl-vcd9OYm8nLBUPzt0Wj_Ou5tbZmfzLQsg4vjO7WZ8KDYTDW7LJ12OkIBpaQ6wre4A5coy-hkdy3QBNtezqJfpZ4Ie7QamMTbMMzN9qbzhFp73b59cvRBJb3SQUmIl1nJQTaE"]
data = {:message => "TESTEEE", :msgcnt => "1", :soundname => "beep.wav"}

GCM.send_notification( destination, data)
