jQuery(document).ready(function($){
    $('.upload-btn').click(function(e) {
        var postid=jQuery(this).attr('data-post');
        e.preventDefault();
        var image = wp.media({ 
            title: 'Upload Image',
            // mutiple: true if you want to upload multiple files at once
            multiple: false
        }).open()
        .on('select', function(e){
            // This will return the selected image from the Media Uploader, the result is an object
            var uploaded_image = image.state().get('selection').first();
            // We convert uploaded_image to a JSON object to make accessing it easier
            // Output to the console uploaded_image
           // console.log(uploaded_image);
            var image_url = uploaded_image.toJSON().url;
            // Let's assign the url value to the input field
           
           jQuery.ajax({
                type: "POST",
                url: ajaxurl,
                data: { action: 'update_vehicleimage' , img: image_url,postid:postid }
             }).done(function( msg ) {
                 jQuery("#img"+postid).html('<img src="'+image_url+'" height="50" width="100" />');
                  //console.log( "Data Saved--: " + msg.response );
                 
           });
 
        });
    });
});
