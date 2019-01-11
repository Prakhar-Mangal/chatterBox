var database,room,password;
function distroy(){
  var pass=document.getElementById("dis").value;
  var pass1;
  database=firebase.database();
  var ref=database.ref('chat/'+room);
    ref.on('value',gotData);
    function gotData(data){
    var chat=data.val();
    var keys=Object.keys(chat);
      var k=keys[0];
       pass1=chat[k].pass;
      console.log(pass1);
      }
      if(pass==pass1){
        alert("chat distroyed");
        ref.remove()
      }
      else{
        alert("Enter correct password");
      }
}

function getRoom(){
  qrStr=window.location.search;
  qrstr=qrStr.split("&");
  if(qrstr.length==2){                        // For room created
   document.getElementById("roomtype").innerHTML="Room Created";
   document.getElementById("roomtype").style.visibility="visible";
   document.getElementById("roomtype").style.color="green";
   room=qrstr[0].split("?admin=")[1];
   password=qrstr[1].split("pass=")[1];
   database=firebase.database();
   var ref=database.ref('chat/'+room);
    var data={
    pass:password,
  }
  ref.push(data);
  }
  else if(qrstr.length==1){                // For room joining
    qrStr=window.location.search;
    room=qrstr[0].split("?join=")[1];

 database=firebase.database();
  var ref=database.ref('chat/'+room);
    ref.once('value',gotData);
    function gotData(snapshot){
       if(snapshot.exists()){
        }
        else{
          alert("not exist");
          window.location.href="index.html";
        }  
    }

      document.getElementById("roomtype").innerHTML="Room Joined";
      document.getElementById("roomtype").style.visibility="visible";
      document.getElementById("roomtype").style.color="green";
    }
  funny();
}

function funny(){

	 database=firebase.database();
	var ref=database.ref('chat/'+room);
	  ref.on('value',gotData);
  function gotData(data){
  	var chat=data.val();
  	var keys=Object.keys(chat);
  	var list = document.getElementById('chatlist');
  	$( "#chatlist" ).empty();
  	for(i=1;i<keys.length;i++){
  		var k=keys[i];
  		var nam=chat[k].name;
  		var msg=chat[k].msg;
  		var entry = document.createElement('li');
  		entry.appendChild(document.createTextNode(nam+': '+msg));
  		list.appendChild(entry);
  		
  	}
  }
}
function fun(){
	var nam=document.getElementById("text1").value;
	var usr=document.getElementById("text2").value;
	if(nam==""||usr==""){
		alert("Enter name or message property");
	}
	else{
	 database=firebase.database();
	var ref=database.ref('chat/'+room);
  var data={
  	name:nam,
  	msg: usr
  }
  ref.push(data);
  
  ref.on('value',gotData,errData);
  function gotData(data){
  	var chat=data.val();
  	var keys=Object.keys(chat);
  	var list = document.getElementById('chatlist');
  	$( "#chatlist" ).empty();
  	for(i=1;i<keys.length;i++){
  		var k=keys[i];
  		var nam=chat[k].name;
  		var msg=chat[k].msg;
  		var entry = document.createElement('li');
  		entry.appendChild(document.createTextNode(nam+': '+msg));
  		list.appendChild(entry);
  		
  	}
  }
  }
  function errData(err){
  	console.log("Error");
  	console.log(err);

  }
	
}