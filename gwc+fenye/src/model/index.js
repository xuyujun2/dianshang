define(["pagination"],function(pagination){
    // pagination.init();
    // console.log(pagination)
    var url = "http://localhost:80/dianshang/gwc+fenye/data/callback.php"
    new pagination(url,"#wrap",".pagination","#list2");
})