var database;
function fun(){
	var nam=document.getElementById("text1").value;
	var usr=document.getElementById("text2").value;
	if(nam==""||usr==""){
		alert("Enter name or message property");
	}
	else{
	 database=firebase.database();
	
	
  var ref=database.ref('chat');
  var data={
  	name:nam,
  	msg: usr
  }
  ref.push(data);
  
  ref.on('value',gotData,errData);
  function gotData(data){
  	//console.log(data.val());
  	var chat=data.val();
  	var keys=Object.keys(chat);
  	var list = document.getElementById('chatlist');
  	$( "#chatlist" ).empty();
  	//console.log(keys);
  	for(i=0;i<keys.length;i++){
  		var k=keys[i];
  		var nam=chat[k].name;
  		var msg=chat[k].msg;
  
  		//console.log(nam,msg);
  		//var list = document.getElementById('chatlist');
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
	//console.log(firebase);
	
}
