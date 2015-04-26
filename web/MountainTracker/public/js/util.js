

$(document).ready(function () {
    var url = "" + window.location;
    ///alert(url);
    url = url.substr(url.indexOf("/admin"));
    var index = url.indexOf("/","/admin".length + 1);

    if(index != -1){
        url = url.substr(0, index);
    }

    $("form").each(function () {
        //quick and dirty fix
        if(!$(this).attr("enctype")){
            $(this).submit(function (event) {
                event.preventDefault();

                var fields = $(this).serializeArray();
                var data = {};
                var method = $(this).attr("method");
                var action = $(this).attr('action');

                fields.forEach(function (field) {
                    data["" + field['name']] = "" + field['value'];
                });

                console.log(data);

                $.ajax({
                    url:action,
                    type:method,
                    data:data
                }).done(function () {
                    //window.location = url;
                });
            });
        }
    })
});