var database,password,nam;

  function createRoom(){
    var admin=document.getElementById("admin").value;
    var password=document.getElementById("pass").value;
    var name=document.getElementById("cname").value;
 if(pass==""||admin==""||name=="")
      alert("Enter name or Id or password correctly");
    else{
 database=firebase.database();
  var ref=database.ref('chat/'+admin);
    ref.once('value',    function(snapshot){
       if(snapshot.exists()){
        alert("Id already taken, please create another one");
        window.location.search="index.html";
        }
        else{
          // new id
                pushUser(name,admin);    
        database=firebase.database();
      var ref=database.ref('chat/'+admin+'/password');
    var data={
    pass:password
  }
ref.push(data,function (){window.location.href= "first.html?admin="+admin+"&pass="+password+"&name="+name;
  });
        }  
    });

  }
}

   function joinRoom(){
      var join=document.getElementById("join").value;
      var name=document.getElementById("jname").value;
      if(join==""||name==""){
        alert("enter name or id correctly");
      }
      else{
 database=firebase.database();
  var ref=database.ref('chat/'+join+'/password');
    ref.once('value',    function(snapshot){
       if(snapshot.exists()){
        pushUser(name,join,"first.html?join="+join+"&name="+name);
        }
        else{
          alert("room not exist");
          window.location.href="index.html";
        }  
    });
        
      
}
    }

function destroy(){
  var pass=document.getElementById("dis").value;
  var pass1;
  database=firebase.database();
  var ref=database.ref('chat/'+room+'/password');
    ref.on('value',gotData);
    function gotData(data){
    var chat=data.val();
    var keys=Object.keys(chat);
      var k=keys[0];
       pass1=chat[k].pass;
        if(pass==pass1){
        ref=database.ref('chat/'+room);
        alert("chat destroyed");
        ref.push({
          text:"distroyed"
        },
        ()=>{
          ref.remove(
            ()=>{
              window.location.href="index.html";
            });
        });     
      }
      else{
        alert("Enter correct password");
      }
      
      }
     
}

function getText(){

 qrStr=window.location.search;
  qrstr=qrStr.split("&");
  if(qrstr.length==3){                        // For room created
   room=qrstr[0].split("?admin=")[1];
  }
  else if(qrstr.length==2){                // For room joining
    room=qrstr[0].split("?join=")[1];
    
    }


  database=firebase.database();
  var ref=database.ref('chat/'+room);
    ref.on('value',gotData);
    function gotData(data){
    var chat=data.val();
    var keys=Object.keys(chat);
      var k=keys[0];
    pass1=chat[k].text;
    if(pass1=="distroyed"){
      alert("distroyed");
      window.location.href="index.html";
    }
       
     }


}


function getRoom(){

getText();
  qrStr=window.location.search;
  qrstr=qrStr.split("&");
  if(qrstr.length==3){                        // For room created
   document.getElementById("roomtype").innerHTML="Room Created";
   document.getElementById("roomtype").style.visibility="visible";
   document.getElementById("roomtype").style.color="green";
   room=qrstr[0].split("?admin=")[1];
   password=qrstr[1].split("pass=")[1];
   nam=qrstr[2].split("name=")[1];
  }
  else if(qrstr.length==2){              
    qrStr=window.location.search;
    room=qrstr[0].split("?join=")[1];
    nam=qrstr[1].split("name=")[1];

        
      document.getElementById("roomtype").innerHTML="Room Joined";
      document.getElementById("roomtype").style.visibility="visible";
      document.getElementById("roomtype").style.color="green";
      
    }


  funny(room);
}

function pushUser(nam,room,link){
 
   database=firebase.database();
  var ref=database.ref('chat/'+room+'/userNames');
  var data={
    usern:nam
  }
  ref.push(data,()=>{
    if(link)window.location.href=link});
}

function funny(room){
  var room1 =room
  users(room1);
	 database=firebase.database();
	var ref=database.ref('chat/'+room+'/userId');
	  ref.on('value',gotData);
  function gotData(data){
  	var chat=data.val();
  	var keys=Object.keys(chat);
  	var list = document.getElementById('chatlist');
  	$( "#chatlist" ).empty();
  	for(i=0;i<keys.length;i++){
  		var k=keys[i];
  		var nam=chat[k].name;
  		var msg=chat[k].msg;
  		var entry = document.createElement('li');
  		entry.appendChild(document.createTextNode(nam+': '+msg));
  		list.appendChild(entry);
  		
  	}
  }
}

function users(room){
   database=firebase.database();
  var ref=database.ref('chat/'+room+'/userNames'); 
  ref.on('value',gotData);
  function gotData(data){
    var chat=data.val();
    var keys=Object.keys(chat);
    var list = document.getElementById('userlist');
    $( "#userlist" ).empty();
    for(i=0;i<keys.length;i++){
      var k=keys[i];
      var nam=chat[k].usern;
      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(nam));
      list.appendChild(entry);
      
    }
  }

}

function fun(){
	var usr=document.getElementById("text2").value;
  document.getElementById("text2").value="";

	if(usr==""){
		alert("Type Something..");
	}
	else{

   qrStr=window.location.search;
  qrstr=qrStr.split("&");
  if(qrstr.length==3){                        // For room created
   room=qrstr[0].split("?admin=")[1];
  }
  else if(qrstr.length==2){                // For room joining
    room=qrstr[0].split("?join=")[1];
    
    }
	 database=firebase.database();
	var ref=database.ref('chat/'+room+'/userId');
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
  	for(i=0;i<keys.length;i++){
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