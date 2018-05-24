;+function(factory){
    //AMD判断;
    if(typeof define === "function" && define.amd){
       define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
}(function($){
    //插件代码;
    function Pagination(url,item_main,button_main){ //item_main放图片  button_main放按钮
        this.main = $(item_main);
        this.url = url;
        this.page = 1;
        this.pageNum = 5;
        this.item_main = $(item_main);
        this.button_main = $(button_main);
        if(this.url == "" || this.item_main.length == 0 || this.button_main.length == 0) return ;
        this.init();
    }
    Pagination.prototype = {
        constructor:Pagination,
        init(){
            //console.log(1);
            this.load_data()
            .then(function(res){
                 console.log(res);
                this.json = res.list;
                this.render_page();
                this.pop();
            }.bind(this));
                this.carNum = $(".car");
                this.carNum.html(this.getSum());
                console.log(this.getSum());
                this.main.on("click.addCar","button[data-id]",$.proxy(this.addCar,this));//事件委托，点击main时，把事件委托给button
                this.main.on("click.changeNum","button[data-id]",$.proxy(this.changeNum,this));
                this.button_main.on("click","a",$.proxy(this.change_page,this))
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
            console.log(html);
            this.item_main.html(html);
        },
        // create_btn(){
        //     for(var i = 0 ; i < this.pageNum; i++){
        //          var $a = $("<a>")
        //          $a.attr("href","#javascript");
        //          $a.html(i+1);
        //          this.button_main.append($a);
        //     }
        // },
        change_page(event){
            var target = event.target || event.srcElement;
            var index = $(target).index();//把点击的按钮的索引值赋给index
            // console.log(index);
            this.page = index+1; //把点击的按钮的索引加1赋给页
            this.load_data() //改变页面的时候重新加载数据，重新渲染页面
            .then(function(res){
                this.json = res.data.list;
                this.render_page();
            }.bind(this))
        },
                    addCar(event){
                //id获取 ---start;
                //我怎么知道当前点击的元素是谁;
                var target = event.target || event.srcElement;
                var goodsId = $(target).attr("data-id"); //事件对象目标的属性data-id
                //id获取 ---end;
                
                //操作cookie存入购物车;
                // [{"id":"num"}]
                
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
            getSum(){
                var shopCarString = $.cookie("shopCar");

                if(shopCarString){
                    var shopCarArray = JSON.parse(shopCarString);
                    var sum = 0;
                    shopCarArray.forEach(function(item){
                        sum += Number(item.num); //把item.num转为number类型，然后累加
                    })
                    return "[" +sum +"]";
                }

                return; //如果这里写成return 0; 那么index.html刚打开时，购物车的数量就不是[0]，而是0
            },
            pop(){
                $(".goodsList #wrap img").mouseover(function(){
                      console.log(1);
                      $(this).stop(true).animate({width:216,height:386,marginTop:-20,marginLeft:-15,opacity:0.3},3000);


                    //   $(this).css({ //出错 ，位置要统一写在animate里，否则会先执行这个样式，再执行动画，动画是异步的
                    //     "margin-top":"-10%",
                    //     "margin-left":"-10%",
                    // })
                 })

                $(".goodsList #wrap img").mouseout(function(){
                      console.log(1);
                      $(this).stop(true).animate({width:180,height:322,marginTop:0,marginLeft:0,opacity:1},3000);
                 })
            }
    }

    $.pageation = Pagination;
    
    return Pagination
});