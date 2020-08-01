function runWithJQuery(jQueryCode){
    if(window.jQuery)  jQueryCode();
    else{   
        var script = document.createElement('script'); 
        document.head.appendChild(script);  
        script.type = 'text/javascript';
        script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js";
        script.onload = jQueryCode;
    }
}
runWithJQuery(function jQueryCode(){
	jQuery( document ).ready(function() {
	    console.log('----ready----');
		setTimeout(function(){
			var options = '';
	    jQuery.ajax({
        url: 'https://raw.githubusercontent.com/VitaliyProdan/buki-hints/master/options.txt',
        async: false,
        success: function (data) {
          options = jQuery.map(data.split('---'), function(el) {
				    return "<option>" + el + "</option>";
			    });
        }
	    });

      var options_oplata = '';
	    jQuery.ajax({
        url: 'https://raw.githubusercontent.com/VitaliyProdan/buki-hints/master/options_oplata.txt',
        async: false,
        success: function (data) {
          options_oplata = jQuery.map(data.split('---'), function(el) {
					  return "<option>" + el + "</option>";
				  });
        }
	    });

	    console.log(options.join(' '));
			$block = jQuery("textarea.chat-field-user").parent();
			$block
        .after("<select style='width: 100%; margin-bottom: 20px;' class='js-hints'> " + options + " </select>")
        .after("<select style='width: 100%; margin-bottom: 20px;' class='js-hints'> " + options_oplata + " </select>");

			jQuery('select.js-hints').on('change', function (e) {
				jQuery('.chat-field-user').val(jQuery("option:selected", this).val());
			});

		}, 5000);
	});
});
