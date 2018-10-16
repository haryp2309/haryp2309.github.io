var jQueryScriptOutputted = false;
function initJQuery() {
    if (typeof(jQuery) == 'undefined') {  
        if (! jQueryScriptOutputted) {
            jQueryScriptOutputted = true;
            document.write("<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js'></script>");
        }
        setTimeout("initJQuery()", 5);
    } else {                      
        $(function() {  
			$("head").append("<link rel='stylesheet' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'><script src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'></script>");
			
			var id=$('.ytce').data(); 
			var url = 'http://ytchannelembed.com/jsonfr.php?';
			$.each(id, function( k, v ) {
				 url = url + k + "=" + v + "&";
			});
			url = url + "jsoncallback=?";
				$.getJSON(url, function(data){     	
					$(data.gallery).appendTo('.ytce');    
				});			
		});
	}    
}
initJQuery();