var images = [];

var dir = "tilesets/";
var fileextension = ".jpg";
var imagePath
$.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: dir,
    success: function (data) {
        //List all jpg file names in the page
        $(data).find("a:contains(" + fileextension + ")").each(function () {
            var filename = this.href.replace(window.location.host, "").replace("http:///", "").replace("Archive/","").replace(fileextension,"");
            //$("body").append($("<img src=" + dir + filename + "></img>"));
            images.push(filename);
        });
    }

});


jQuery.each( images, function( i, value ) {
$( "#gallery" ).append( '<figure class="reference_image">\n<a href="tilsets/'+value["src"]+'">\n<img src="tilesets/thumbs/'+value["src"]+'">\n<figcaption>\n'+value["name"]+'\n</figcaption>\n</a>\n</figure>' );
});

