// JavaScript Document
$(document).ready(function(e) {
	
	function clear(){
		  $(".info_map").css("background","#fff");
		$("#details").removeClass("details");
		$("article,#result_title,#audio,#map_add,#map_name,#map_desc,#ajax_results,#ajax_results2,#ajax_results3,#page_ctrls,#mapcontainer,#im ul").empty()
		}
	 $("#form").submit(function(){
		 return false;
		 })
	$("#search").keydown(function(){
		$(".status").empty();
		})
		
	<!----search------>
	$("#submit").click(function(){
		clear();
		 $("#im ul").empty();
		var data = $("#form :input").serializeArray();
		
		$.post($("#form").attr("action"),data,function(json){
			if(json.status=='fail'){$(".status").html("<p>"+json.message+"</p>");}
			var a = json.message.data;
			var d = json.message.data2;
			
			if(json.status == 'success' && json.message.type=="specific"){
				var lat = a.lat; var long = a.lng; var desc = a.desc; var add = a.add; var loc_name = a.locname; var pic  = a.pic; var audio = a.audio;
				getLocation(lat,long,desc,add,name)
				$("#audio").empty()
				if(audio != ""){
					var audio_mp3 = "<audio controls style='overflow:hidden; width:100%;' ><source src='audio/" + audio + "'" + "type='audio/mp3' id='mp3'><source src='horse.ogg' type='audio/ogg'><embed height='50' width='100%' src='horse.mp3'></audio>";
					$("#audio").append(audio_mp3).fadeIn();
				}
				$("#im ul").empty();
				$.each(json.message.pic,function(){
					var img = "<li><a href='interact.php?id="+this['id'] +"' target='_blank' ><img src='images/"+this['pic']+"' /></a></li>";
					$("#im ul").append(img);
					})
				}
				
			 if(json.status=='success' && json.message.type=="zone_list"){
				 var paginationCtrls    =  "";
			     var page_num 		    =   d.page_num;
				 var last               =   d.last;
				 var rows               =   d.rows;
				 var sach               =  d.sach;
				 if(last > 1){
				    if(page_num > 1){
					    previous           = page_num - 1;
					    paginationCtrls  += "<a  id='prv_but' value='"+ sach+"|" + previous + "'>Previous</a>";
						for(i=page_num-4;i< page_num;i++){
							if(i>0){
							 paginationCtrls += "<a href='#' value='"+sach +"|"+i+"' class='link'>"+ i +"</a>";
						}
							}
					 }
					  paginationCtrls += page_num;
					 if(page_num < last){
							for(i=page_num+1;i<=last;i++){ paginationCtrls += "<a href='#' value='"+sach +"|"+i+"' class='link'>"+ i +"</a>";
							if(i >= 4){break;}
					}
					if(page_num != last){
						next    = page_num + 1;
						 paginationCtrls  += "<a id='nxt_but' value='"+ sach+"|" + next + "' class='link'>Next</a>";
					}
					 
					}
				}
				var list1     = "<p class='sr'><span style class='a'>Search Results:"+ rows+"</span><span class='b'>Page "+ page_num +" of " + last +"</span></p>";
				$("#result_title").empty().append(list1);
				$("#page_ctrls").empty().append( paginationCtrls);
				$("#ajax_results2").empty();
				$.each(a,function(){
					 query = "<p class='zone_list'><a href='#' value='"+this['id']+"|"+this['user_id'] + "' class='zone_links' >"+this['zone_name']+"</a></p>";
					$("#ajax_results2").append(query);
					})
				 
				 }
			 
			if(json.status == 'success' && json.message.type=="gen"){
				var paginationCtrls    =  "";
			    var page_num 		   = a.page_num;
				var last               = a.last;
				var rows               = a.rows;
				var sach               = a.sach;
				if(last > 1){
				    if(page_num > 1){
					    previous           = page_num - 1;
					    paginationCtrls  += "<a  id='prv_but' value='"+ sach+"|" + previous + "'>Previous</a>";
						for(i=page_num-4;i< page_num;i++){
							if(i>0){
							 paginationCtrls += "<a href='#' value='"+sach +"|"+i+"' class='link'>"+ i +"</a>";
						}
							}
					 }
					  paginationCtrls += page_num;
					 if(page_num < last){
							for(i=page_num+1;i<=last;i++){ paginationCtrls += "<a href='#' value='"+sach +"|"+i+"' class='link'>"+ i +"</a>";
							if(i >= 4){break;}
					}
					if(page_num != last){
						next    = page_num + 1;
						 paginationCtrls  += "<a id='nxt_but' value='"+ sach+"|" + next + "' class='link'>Next</a>";
					}
					 
					}
				}
				var list1     = "<p class='sr'><span style class='a'>Search Results:"+ rows+"</span><span class='b'>Page "+ page_num +" of " + last +"</span></p>";
				$("#result_title").empty().append(list1);
				$("#page_ctrls").empty().append( paginationCtrls);
				$("#ajax_results").empty();
				$.each(d,function(){
					 query = "<p class='srl'><a href='#' value='"+this['key']+"|"+this['id'] +"' class='gen_links' >"+this['locname']+"</a></p>";
					$("#ajax_results").append(query);
					})
				}
			},"json");
		})
		
		$("#ajax_results").on('click','a',(function(){
			h = $(this).attr('value');
			j = h.split('|');
			k = j[0];
			l = j[1];
			$.post("ajax.php",{key: k, id:l,data:"data_gen"},function(json){
				if(json.status=='success'){
					m = json.message.data;
					$("#im ul").empty();
				    $.each(json.message.pic,function(){
					var img = "<li><a href='interact.php?id="+this['id'] +"' target='_blank' ><img src='images/"+this['pic']+"' /></a></li>";
					if(json.message.pic.length!=0){
					$("#im ul").append(img);
					}
					})
					 var latt = m.lat; var longg = m.lng; var descc =  m.desc;var addd = m.add; var loc_namee = m.locname; var picc  = m.pic;var audioo = m.audio;
					 getLocation(latt,longg,descc,addd,loc_namee);
					 $("#audio").empty()
				if(audioo != ""){
					var audio_mp3 = "<audio controls style='overflow:hidden; width:100%;' ><source src='audio/" + audioo + "'" + "type='audio/mp3' id='mp3'><source src='horse.ogg' type='audio/ogg'><embed height='50' width='100%' src='horse.mp3'></audio>";
					$("#audio").append(audio_mp3).fadeIn();
				}
					}
				},"json")
			}
		
		))
		
	$("#page_ctrls").on("click",".link",function(){
		b = $(this).attr('value')
		c = b.split('|');
		d = c[0];
		e = c[1];
		$.post("ajax.php",{search: d, pn:e, data:'data'},function(json){
			
			if(json.status=='fail'){clear();$("#seacrh").append("<p>"+json.message+"</p>");}
			var a = json.message.data;
			var d = json.message.data2;
			if(json.status == 'success' && json.message.type=="specific"){
				var lat = a.lat; var long = a.lng; var desc = a.desc; var add = a.add; var loc_name = a.locname; var pic  = a.pic; var audio = a.audio;
				getLocation(lat,long,desc,add,loc_name)
				$.each(json.message.pic,function(){
					var img = "<li><a href='interact.php?id="+this['id'] +"' target='_blank' ><img src='images/"+this['pic']+"' /></a></li>";
					$("#im ul").append(img);
					})
				}
			if(json.status == 'success' && json.message.type=="gen"){
				var paginationCtrls    =  "";
			    var page_num 		   = a.page_num;
				var last               = a.last;
				var rows               = a.rows;
				var sach               = a.sach;
				if(last > 1){
				    if(page_num > 1){
					    previous           = page_num - 1;
					    paginationCtrls  += "<a  id='prv_but' value='"+ sach+"|" + previous + "' class='link'>Previous</a>";
						for(i=page_num-4;i< page_num;i++){
							if(i>0){
							 paginationCtrls += "<a href='#' value='"+sach +"|"+i+"' class='link'>"+ i +"</a>";
						}
							}
					 }
					  paginationCtrls += page_num;
					 if(page_num < last){
							for(i=page_num+1;i<=last;i++){ paginationCtrls += "<a href='#' value='"+sach +"|"+i+"' class='link'>"+ i +"</a>";
							if(i >= 4){break;}
					}
					if(page_num != last){
						next    = page_num + 1;
						 paginationCtrls  += "<a id='nxt_but' value='"+ sach+"|" + next + "' class='link'>Next</a>";
					}
					 
					}
				}
				var list1     = "<p class='sr'><span style class='a'>Search Results:"+ rows+".</span> Page "+ page_num +" of " + last +" </p>";
				$("#result_title").empty().append(list1);
				$("#page_ctrls").empty().append( paginationCtrls);
				$("#ajax_results").empty();
				$.each(d,function(){
					 query = "<p class='srl'><a href='#' value='"+this['key']+"|"+this['id'] +"' class='gen_links' >"+this['locname']+"</a></p>";
					$("#ajax_results").append(query);
					})
				}
			},"json")
		})
  
  //onclick of zone_list
  $("#ajax_results2").on("click",'a:not(a.link)',function(){
	  		b   = $(this).attr("value").split("|")
			$.post("ajax.php",{'zone_id':b[0],'user_id':b[1],'zone':'zone'},function(json){
			if(json.status=='fail' && json.message.type=='zone'){$(".status").empty().append("<p>"+json.message.data+"</p>");}
			    if(json.status=='success' && json.message.type=="zone_list_data"){
				$(".status").empty()
				a                      =json.message.data2
				var paginationCtrls    =  "";
			    var page_num 		   = a.page_num;
				var last               = a.last;
				var rows               = a.rows;
				var sach               = a.sach;
				if(last > 1){
				    if(page_num > 1){
					    previous           = page_num - 1;
					    paginationCtrls  += "<a  id='prv_but' value='"+ sach+"|" + previous + "' class='link'>Previous</a>";
						for(i=page_num-4;i< page_num;i++){
							if(i>0){
							 paginationCtrls += "<a href='#' value='"+sach +"|"+i+"' class='link'>"+ i +"</a>";
						}
							}
					 }
					  paginationCtrls += page_num;
					 if(page_num < last){
							for(i=page_num+1;i<=last;i++){ paginationCtrls += "<a href='#' value='"+sach +"|"+i+"' class='link'>"+ i +"</a>";
							if(i >= 4){break;}
					}
					if(page_num != last){
						next    = page_num + 1;
						 paginationCtrls  += "<a id='nxt_but' value='"+ sach+"|" + next + "' class='link'>Next</a>";
					}
					 
					}
				}
				var list1     = "<p class='sr'><span style class='a'>Search Results:"+ rows+".</span> Page "+ page_num +" of " + last +" </p>";
				$("#result_title").empty().append(list1);
				$("#page_ctrls").empty().append( paginationCtrls);
				$("#ajax_results2").empty()
				$("#ajax_results3").empty();
				$.each(json.message.data,function(){
					 query = "<p class='srl'><a href='#' value='"+this['id']+"|"+this['keyword']+"' class='z_links' >"+this['loc_name']+"</a></p>";
					 $("#ajax_results3").append(query);
					})
					}
				},"json");
			
	  })
	  //on click of specific Zone entry
	 $("#ajax_results3").on("click",".z_links",function(){
		 	$("#im ul").empty()
		 	az_data = ($(this).attr("value")).split("|");
			az      = az_data[0]; key = az_data[1];
			$.post("ajax.php",{'az':az,'key':key},function(json){
					if(json.status=="fail"){$(".status").html(json.status)}
					if(json.status=="success"){
					a = json.message.data ;
					var latt = a.lat; var longg = a.lng; var descc =  a.description; var addd = a.address; var loc_namee = a.loc_name; var picc  = a.pic;var audioo = a.audio;
					$.each(json.message.gallery,function(){
					var img = "<li><a href='interact.php?id="+this['id'] +"' target='_blank' ><img src='images/"+this['pic']+"' /></a></li>";
					if(json.message.gallery!=0 && this['pic']!=""){
					$("#im ul").append(img);
					} 
						})
					 getLocation(latt,longg,descc,addd,loc_namee);	
						}
					
				},"json")
		 });
});

//geolocation code
		function getLocation(lat,long,desc,add,name){
			
	  function success(position) {
		  document.getElementById("map_name").innerHTML="<strong>Name</strong>: "+ name;
		document.getElementById("map_desc").innerHTML="<strong>Description</strong>: "+ desc;
		 document.getElementById("map_add").innerHTML="<strong>Address</strong>: "+ add;
		 $("#details").addClass("details");
		 var title = $("#map_name").text();
					  $("#pic_title").replaceWith(title);
	   // document.getElementById("address").innerHTML="Address: "+ address+ "|";
	    $("#mapcontainer").remove();
		var mapcanvas = document.createElement('div');
		mapcanvas.id = 'mapcontainer';
		   mapcanvas.style.height = '300px';
		mapcanvas.style.width = '100%';
		document.querySelector('article').appendChild(mapcanvas);
	  
		var coords = new google.maps.LatLng(lat,long);
		
		var options = {
		  zoom: 15,
		  center: coords,
		  mapTypeControl: false,
		  navigationControlOptions: {
			  style: google.maps.NavigationControlStyle.SMALL
		  },
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("mapcontainer"), options);
	  
		var marker = new google.maps.Marker({
			position: coords,
			map: map,
			title:"You are here!"
		});
	  }
	  
	  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success);
	  } else {
		error('Geo Location is not supported');
	  } 
	  }	
