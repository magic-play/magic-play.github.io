const GTOCKEN = "https://script.google.com/macros/s/AKfycbxKnEL1Xdppf0pqZGTD3NTDZKQZ18W199uWzkNcmp0MTFc4Zg/exec"


function TEMPMANICON(name,isme) {
	a = '<div class="" style="position: absolute;'
    
    if(isme){
    		a = a + 'background: url(/assets/img/menG.svg);width: inherit;transform: translateY(-50px) rotateY(65deg);height: inherit;background-size: cover;animation: rotateAnimation 8s linear infinite;'
    }else
    {
    	a = a + 'background: url(/assets/img/men.svg);width: inherit;transform: translateY(-50px) rotateY(65deg);height: inherit;background-size: cover;animation: rotateAnimation 8s linear infinite;'
        
    }
    a = a + '" data-toggle="tooltip" data-placement="right" data-original-title="'+name+'"></div>';

return a;
}


function TempBRONZE(id,unLOCK,order) {
	(unLOCK) ? order=0:order=order;
	return 	'<div onclick="doorClick(this)" id="b'+id.toString()+'" class="col-2" style="order: '+order.toString()+';max-width: 110px; cursor: pointer;"><div style="position: absolute;text-align: center;color: #ffc107;top: 20%;left: 12px;right: 0;margin: auto;">'+id.toString()+'</div><img src="/assets/img/door-bronze.png" style="width: 100px;"><div style="margin: 0;padding: 0;box-sizing: border-box;position: absolute;top: 56%;" class="d-flex"><span class="lock d-block '+((unLOCK) ? "unlocked":"")+'" style="right: -43px;"></span></div></div>';
}
function TempSILVER(id,unLOCK,order) {
	(unLOCK) ? order=0:order=order;
	return 	'<div onclick="doorClick(this)" id="s'+id.toString()+'" class="col-2" style="order: '+order.toString()+';max-width: 110px; cursor: pointer;"><div style="position: absolute;text-align: center;color: #ffc107;top: 20%;left: 12px;right: 0;margin: auto;">'+id.toString()+'</div><img src="/assets/img/door-metal.png" style="width: 100px;"><div style="margin: 0;padding: 0;box-sizing: border-box;position: absolute;top: 56%;" class="d-flex"><span class="lock d-block '+((unLOCK) ? "unlocked":"")+'" style="right: -43px;"></span></div></div>';
}
function TempGOLD(id,unLOCK,order) {
	(unLOCK) ? order=0:order=order;
	return 	'<div onclick="doorClick(this)" id="g'+id.toString()+'" class="col-2" style="order: '+order.toString()+';max-width: 110px; cursor: pointer;"><div style="position: absolute;text-align: center;color: #ffc107;top: 20%;left: 12px;right: 0;margin: auto;">'+id.toString()+'</div><img src="/assets/img/door-gold.png" style="width: 100px;"><div style="margin: 0;padding: 0;box-sizing: border-box;position: absolute;top: 56%;" class="d-flex"><span class="lock d-block '+((unLOCK) ? "unlocked":"")+'" style="right: -43px;"></span></div></div>';
}

function doorClick(door) {
	console.log($(door).attr("id"))
	var type = $(door).attr("id").substr(0,1)
	var id = $(door).attr("id")
	if (type == "b"){$("#lsum").text("30")}
	if (type == "s"){$("#lsum").text("60")}
	if (type == "g"){$("#lsum").text("90")}
	$("#roomJoinButton").data("door",id)
	if ($("#"+id+" .lock").hasClass("unlocked")){
		window.location.href = "play?id="+id
	}else{
		$("#joinModalCenter").modal("show")
	}
}

function doorOpen(id) {
	if ($("#"+id+" .lock").hasClass("unlocked")){
		window.location.href = "play?id="+id
	}else{
	if(Number(getCookie("GAMEA"))-Number(getCookie("GAMEP"))>0 && Number($("#lsum").text()) <= getCookie("MONEY").substr(0,getCookie("MONEY").length-3) ){
		
		$("#blockpagediv").removeClass("d-none");
		joinGAME(id,function() {
			DataUpdate(function () {
				window.location.href = "play?id="+id
			})
			
		})
		
	}else{
		$("#joinModalCenter .alert").removeClass("d-none");
	}
}

}



function getDoors(type,callback) {
	if(!getCookie("GLU")) {setCookie("GLU",new Date()); UpdateDoors(type,callback);}else{
    oldDate = new Date(getCookie("GLU"));
    nowDate = new Date();
    delta = nowDate - oldDate;
    if (delta > 300000){setCookie("GLU",new Date()); UpdateDoors(type,callback);}else{
    	if(type == "a"){
    		$("#gmain").html("")
    		var hid = [];
    		var brC = Number(getCookie("GDBRONZE"));
    		var srC = Number(getCookie("GDSILVER"));
    		var gdC = Number(getCookie("GDGOLD"))
    		var cD = (brC+srC+gdC)
    		for (var i = 1; i <= cD; i++) {
    			r = Math.ceil(Math.random() * cD);
    			if(hid.includes(r)) {i=i-1 }else{console.log(r);hid.push(r)}
    		}
    		console.log(hid)
    		var idR=1
    		for (var i = 0; i < hid.length; i++) {

    			if(brC > 0){
    				$("#gmain").append(TempBRONZE(idR.toString(),getCookie("GAMEIDS").split(",").includes("b"+idR.toString()),hid[i]));
    				brC = brC-1;
    				i++;
    			};
    			
    			if(srC > 0){
    				$("#gmain").append(TempSILVER(idR.toString(),getCookie("GAMEIDS").split(",").includes("s"+idR.toString()),hid[i]));
					srC = srC-1;
					i++;
    			};
    			
    			if(gdC > 0)
    				{$("#gmain").append(TempGOLD(idR.toString(),getCookie("GAMEIDS").split(",").includes("g"+idR.toString()),hid[i]));
					gdC = gdC-1;
					idR++;
    		};
    			
    		}
    		
    	};
    	if (type == "b"){
    		$("#gmain").html("")
    		var hid = [];
    		var cD = (Number(getCookie("GDBRONZE")))
    		for (var i = 1; i <= cD; i++) {
    			r = Math.ceil(Math.random() * cD);
    			if(hid.includes(r)) {i=i-1 }else{console.log(r);hid.push(r)}
    		}
    		console.log(hid)
    		var idR=1
    		for (var i = 0; i < hid.length; i++) {
    			(hid[i]) ? $("#gmain").append(TempBRONZE(idR.toString(),getCookie("GAMEIDS").split(",").includes("g"+idR.toString()),hid[i])) : false;
    			idR++;
    		}
    		
    	
    	};
    	if (type == "s"){
    		$("#gmain").html("")
    		var hid = [];
    		var cD = (Number(getCookie("GDSILVER")))
    		for (var i = 1; i <= cD; i++) {
    			r = Math.ceil(Math.random() * cD);
    			if(hid.includes(r)) {i=i-1 }else{console.log(r);hid.push(r)}
    		}
    		console.log(hid)
    		var idR=1
    		for (var i = 0; i < hid.length; i++) {
    			(hid[i]) ? $("#gmain").append(TempSILVER(idR.toString(),getCookie("GAMEIDS").split(",").includes("g"+idR.toString()),hid[i])) : false;
    			idR++;
    		}
    		
    	
    	};
    	if (type == "g"){
    		$("#gmain").html("")
    		var hid = [];
    		var cD = (Number(getCookie("GDGOLD")))
    		for (var i = 1; i <= cD; i++) {
    			r = Math.ceil(Math.random() * cD);
    			if(hid.includes(r)) {i=i-1 }else{console.log(r);hid.push(r)}
    		}
    		console.log(hid)
    		var idR=1
    		for (var i = 0; i < hid.length; i++) {
    			(hid[i]) ? $("#gmain").append(TempGOLD(idR.toString(),getCookie("GAMEIDS").split(",").includes("g"+idR.toString()),hid[i])) : false;
    			idR++;
    		}
    		
    	
    	};
      
    	if (typeof callback == "function") callback();
    }
  }
console.log((window.location.hash.substr(1)) ? window.onhashchange() : false);
}
function UpdateDoors(type,callback) {
	$.post(GTOCKEN+"?f=update",function (data) {
		data = JSON.parse(data);
			setCookie("GDBRONZE",data["BRONZE"]);
			setCookie("GDSILVER",data["SILVER"]);
			setCookie("GDGOLD",data["GOLD"]);
			getDoors(type)
			if (typeof callback == "function") callback(); 
		})
	
	
}

function joinGAME(id,callback) {

	$.post(GTOCKEN+"?f=join"+islogin()+"&id="+id,function (data) {
		if(data == "nologin") {logout_dash();return}
		if(data == "e") {$("#joinModalCenter .alert").removeClass("d-none");$("#blockpagediv").addClass("d-none");return}
		if(data == "u") {getDoors(getCookie("GAMEDATATYPE"),function () {window.location.replace("rooms");return;});return}
		if ( data == "join") callback(id); 
	})
}

function exitGAME(id) {
	$("#blockpagediv").removeClass("d-none")
	$.post(GTOCKEN+"?f=exit"+islogin()+"&id="+id,function (data) {
		if(data == "nologin") {logout_dash();return}
		if(data == "e") {$("#exitModalCenter .alert").removeClass("d-none");$("#blockpagediv").addClass("d-none");return}
		if(data == "u" || data == "exit") {DataUpdate(function () {window.location.replace("rooms");return;});return}
 
	})
}

function setDGAME(data) {

	me = data[data.length-1]
	var places = $(".rad")
	var nofgood = 0;
	for (var i=0;i+1<data.length;i++){

			if (data[i][0] != "-") {
				nofgood++
			}
			
			if (i == 0)  {
				if (data[i][0] != "-") {
					$(places[14]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 1)  {
				if (data[i][0] != "-") {
					$(places[13]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 2)  {
				if (data[i][0] != "-") {
					$(places[6]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 3)  {
				if (data[i][0] != "-") {
					$(places[12]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 4)  {
				if (data[i][0] != "-") {
					$(places[4]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 5)  {
				if (data[i][0] != "-") {
					$(places[10]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 6)  {
				if (data[i][0] != "-") {
					$(places[2]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 7)  {
				if (data[i][0] != "-") {
					$(places[5]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 8)  {
				if (data[i][0] != "-") {
					$(places[11]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 9)  {
				if (data[i][0] != "-") {
					$(places[3]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 10)  {
				if (data[i][0] != "-") {
					$(places[9]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 11)  {
				if (data[i][0] != "-") {
					$(places[1]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 12)  {
				if (data[i][0] != "-") {
					$(places[8]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 13)  {
				if (data[i][0] != "-") {
					$(places[0]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}
			if (i == 14)  {
				if (data[i][0] != "-") {
					$(places[7]).children(".cube").prepend(TEMPMANICON(data[i][0],(me == i.toString()) ? true : false))
				}
			}






		}
			//prigress
				let percent = Math.round((((nofgood*2)+1)*100)/30)
				$(".progress").attr("data-percentage",percent);
				$(".progress > div > div > span:nth-child(1)").text(percent.toString()+"%")
				if (percent == 100){
					DataUpdate(function () {window.location.replace("rooms");return;})
				}
}


function updateDGAME(id,callback) {
	$.post(GTOCKEN+"?f=get&id="+id+islogin(),function (data) {
		setCookie("GDPR-"+id,data);
		data = JSON.parse(data);
		setDGAME(data)
		setCookie("GDPR-"+id,JSON.stringify(data));
		if (typeof callback == "function") callback(data);
	})

}


function getDGAME(id,callback) {
	updateDGAME(id,callback);
  // if(true/*!getCookie("GDU")*/) {setCookie("GDU",new Date()); updateDGAME(id,callback);}else{
  //   oldDate = new Date(getCookie("GDU"));
  //   nowDate = new Date();
  //   delta = nowDate - oldDate;
  //   if (delta > 120000){setCookie("GDU",new Date()); updateDGAME(id,callback);}else{
  //   	if(!getCookie("GDPR-"+id)){

  //   		updateDGAME(id,function(data){

  //   			setCookie("GDPR-"+id,JSON.stringify(data));
  //   			if (typeof callback == "function") callback(data); 

  //   		})
  //   	}else{
  //   		let data = JSON.parse(getCookie("GDPR-"+id));
  //   		setDGAME(data)
  //   		if (typeof callback == "function") callback(data); 
  //   	}

  //   }
  //}



	
}