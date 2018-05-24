define(["pagination"],function(pagination){
    // pagination.init();
    // console.log(pagination)
    var url = "http://localhost:80/js31/daima/jsop/data/callback.php"
    new pagination(url,"#wrap",".pagination");
})