


;+function(factory){
    //AMD判断;
    if(typeof define === "function" && define.amd){
       define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
}(function($){
    //插件代码;
    function Pagination(url,item_main,button_main,li_main){ //item_main放图片  button_main放按钮
        this.main = $(item_main);
        this.url = url;
        this.page = 1;
        this.pageNum = 5;
        this.item_main = $(item_main);
        this.button_main = $(button_main);

        //一个方法两个页面调用，然而有的页面没有其中的参数，所以让参数变成可选参数，不能是必选，所以就将下面这段代码注释掉
        //if(this.url == "" || this.item_main.length == 0 || this.button_main.length == 0) return ;

         this.li_main = $(li_main);
        this.init();

    }
    Pagination.prototype = {
        constructor:Pagination,
        init(){
            //console.log(1);
            this.load_data()
            .then(function(res){
                 //console.log(res);
                this.json = res.list;
                this.render_page();
                this.changeNum();
                this.pop();
            }.bind(this));
            this.carNum = $(".car");
            //this.carNum.html(this.change_car());
           
            //点击购买按钮时，设值cookie
            this.main.on("click.addCar","button[data-id]",$.proxy(this.addCar,this));//事件委托，点击main时，把事件委托给button
             //点击购买按钮时，通过获取的cookie，改变购物车数量，且将获取的cookie放入rendering，渲染出购物列表页
            this.main.on("click.changeNum","button[data-id]",$.proxy(this.changeNum,this));


            this.button_main.on("click","a",$.proxy(this.change_page,this));//分页          
        },
        load_data(){
            var opt = {
                url:this.url,
                dataType:"jsonp",
                data:{page:this.page}
            }
            return $.ajax(opt);
        },
        render_page(){
            var html = "";
            
            this.json.forEach(function(item){
                html += `<li class="goods">
                            <a href="../detail/detail.html"><img src="${item.img}" alt=""></a>
                            <h5>${item.info.substring(0,18)}...</h5>
                            <h6>￥${item.price}</h6>
                            <button data-id=${item.id}>购买</button>
                        </li>`
            })
            //console.log(html);
            this.item_main.html(html);
        },
        change_page(event){
            var target = event.target || event.srcElement;
            var index = $(target).index();//把点击的按钮的索引值赋给index
            // console.log(index);
            this.page = index+1; //把点击的按钮的索引加1赋给页
            this.load_data() //改变页面的时候重新加载数据，重新渲染页面
            .then(function(res){
                this.json = res.list;
                this.render_page();
            }.bind(this))
        },
        addCar(event){
  
                var target = event.target || event.srcElement;
                var goodsId = $(target).attr("data-id"); //获取事件对象目标的属性data-id  一个参数是获取
  
                
                if(!$.cookie("shopCar")){
                    //表示是第一次存数据; 如果点击的商品之前不存在，那就为点击的商品添加数据
                    var shopCarArray = [
                        {
                            id:goodsId,
                            num:1
                        }
                    ]
                    $.cookie("shopCar",JSON.stringify(shopCarArray)) //设值cookie
                    // console.log($.cookie("shopCar"));
                    return 0;
                }
                //其余次数进行购物车添加;
                
                //id是否在购物车之中存在;

                var shopCarString = $.cookie("shopCar"); 
                var shopCarArray = JSON.parse(shopCarString); //获取cookie后，把cookie转为数组

                // console.log(shopCarArray)
                var hasItem = false;
                shopCarArray.forEach(function(item){    
                    // console.log(item);
                    //如果购物车列表之中有当前项，让商品数量自增就可以了;
                    if(item.id == goodsId){ //goodsId是之前点击的事件对象的data-id属性，第一次点击商品添加数据，goodsId就是添加的数据值，如果点击的商品的id等于之前点击的商品的id，则让num++，hasItem为true
                        item.num ++;
                        hasItem = true;
                    }
                })
                if(!hasItem){ //如果hasItem为false，则说明item.id 不等于 goodsId ，即之前没添加过商品，那么就为第一次点击的商品添加数据
                    var item = {
                        id:goodsId,
                        num:1,
                    }
                    shopCarArray.push(item)
                }
                $.cookie("shopCar",JSON.stringify(shopCarArray));
                // console.log($.cookie("shopCar"));
            },

            changeNum(){
                this.carNum.html(this.getSum());
            },
            rendering(m,n){
                var html = "";
                //console.log(m,n)
                m.forEach(function(item){
                    console.log(item.num);
                    html += `<li class="item" data-id=${item.id} data-num=${item.num}>
                                <div class="msg">
                                    <a href="../detail/detail.html"><img src="${item.img}" alt=""></a>
                                    <h5>${item.info}...</h5>
                                    <h6>￥<span>${item.price}</span></h6>
                               </div>

                               <div class="operation">
                                    <button class="btn1" data-id=${item.id}>-</button>
                                    <input class="nb" type="text" value="${item.num}">
                                    <button class="btn2" data-id=${item.id}>+</button> 
                               </div>
                                
                                <div class="jiesuan">
                                    <input type="text" value="0"/>
                                </div>
                               
                               <a id="dl" data-id=${item.id}>删除</a>
                            </li>`
                })

                //console.log(html);
               
                n.html(html);             
                
              

               $('.btn1').click(function(event){
                    
                    //事件对象是个好东西，用事件对象目标可以获取对应唯一的按钮
                    var n =  $(event.target).parent().find("input").val(); 

                     n--;
                   
                     $(this).parent().find("input").val(n);

                      var bb = n * $(event.target).parent().parent().find(".msg").find("span").text();
                      $(event.target).parent().parent().find(".jiesuan").find("input").val(bb);

                })

                $('.btn2').click(function(event){
                    
                     var n =  $(event.target).parent().find("input").val();

                     n++;

                     $(this).parent().find("input").val(n);
                     var bb = n * $(event.target).parent().parent().find(".msg").find("span").text();
                     //console.log($(event.target).parent().parent().find("jiesuan").find("input"));
                      $(event.target).parent().parent().find(".jiesuan").find("input").val(bb);

                })

                this.li_main.on("click","a[data-id]",$.proxy(this.removeCar,this));

                
                
            },

            getSum(){

               
                    var shopCarString = $.cookie("shopCar");
                    var shopCarArray = JSON.parse(shopCarString);
                    //console.log(shopCarString)
                    var carArray = [];
                
                         
                    var sum = 0;
                    for(var i = 0 ;i < shopCarArray.length ; i++){
                        var itemId = shopCarArray[i].id;
                        var itmeobj = this.fromIdToItem(itemId,this.json);
                        
                        itmeobj.num = shopCarArray[i].num;
                        carArray.push(itmeobj);
                        sum += Number(itmeobj.num);
                    }




                     this.rendering(carArray,this.li_main);


                     return "[" +sum +"]";
                            
            },

            fromIdToItem(id,json){
                for(var i = 0 ; i < json.length ; i++){
                    if(json[i].id == id){
                        return json[i]
                    }
                } 
            },

            removeCar(){
                //console.log(this.aa_main);
                
                var isRemove = confirm("确认删除该商品？");
                
                if(!isRemove) return 0;//如果!isRemove，则终止删除操作

                //alert(3);

                var goodsId = $("a").parent().attr("data-id");


                //console.log($("a").parent().attr("data-id"));

                var shopCarString = $.cookie("shopCar");

                var shopCarArray = JSON.parse(shopCarString);
               // console.log(2);
                for(var i = 0 ; i < shopCarArray.length ; i++){
                    if(goodsId == shopCarArray[i].id){ //如果li的data-id等于数据的id(cookie值的id)
                        shopCarArray.splice(i,1); //则删除这条数据
                        break;
                    }
                }
                
                //把操作好的数据(删除某项后的数据)作为cookie值设置cookie，设置好cookie后，就可以在别的地方获取最新的cookie
                shopCarString = JSON.stringify(shopCarArray);
                $.cookie("shopCar",shopCarString);

                 location.reload();//每次点击删除按钮时，重新加载一下页面
                
            },

            pop(){
                $(".goodsList #wrap img").mouseover(function(){
                      
                      $(this).stop(true).animate({width:216,height:386,marginTop:-20,marginLeft:-15,opacity:0.3},3000);


                    //   $(this).css({ //出错 ，位置要统一写在animate里，否则会先执行这个样式，再执行动画，动画是异步的
                    //     "margin-top":"-10%",
                    //     "margin-left":"-10%",
                    // })
                 })

                $(".goodsList #wrap img").mouseout(function(){
                      //console.log(1);
                      $(this).stop(true).animate({width:180,height:322,marginTop:0,marginLeft:0,opacity:1},3000);
                 })
            }
    }

    $.pageation = Pagination;
    
    return Pagination
});