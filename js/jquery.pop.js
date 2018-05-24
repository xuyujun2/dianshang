;+function(factory){
    //AMD判断;
    if(typeof define === "function" && define.amd){
       define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
}(function($){
    //插件代码;
    function Pop(selector){ //item_main放图片  button_main放按钮
        this.main = $(selector);
        this.item_main = $(selector);
        if(this.item_main.length == 0) return ;
        this.init();
    }
    Pop.prototype = {
        constructor:Pop,
        init(){

            //事件委托，点击main时，把事件委托给li  li是页面上的标签，但是出了这行代码，就要在Pop里传参获取li
            //如果把事件委托给了img，就不行，会不停的闪，因为鼠标在img上，弹出层出来，鼠标就在弹出层上，鼠标不在img上，弹出层消失，
            //鼠标就又在img上，再出现弹出层，所以是闪烁的情况，如果把事件委托给li，当鼠标移到li上时，弹出层出来，此时事
            //件对象目标就是弹出层，鼠标在弹出层上，然后不停往上冒泡到li，所以弹出层一直出来，因为此时的事件对象是弹出层，所以是
            //找到弹出层的父级li下的img，让这个img动画     弹出层要配合mouseenter、mouseleave    弹出层和放大镜里的遮罩层是一样的          
            this.main.on("mouseenter.pop1","li",$.proxy(this.pop1,this));
            this.main.on("mouseleave.pop2","li",$.proxy(this.pop2,this));
            this.$div = $("<div></div>");
            this.$div.css({
                "width":"379",
                "height":"215",
                "background":"black",
                "z-index":"999",
                "position":"absolute",//创建元素后，要设置定位才能显示，给它有宽高的父级设值position:relative定位，然后创建的标签相对于其有relative属性的父级重新定位
                "left":"0",
                "top":"0",
                "opacity":"0.6"              
            })

        },

        pop1(){
            //$(event.target)指定了事件对象目标，好东西
            //$(event.target).stop(true).animate({width:455,height:258,marginTop:-20,marginLeft:-15,opacity:0.3},3000);
            $(event.target).parents("li").find("img").stop(true).animate({width:455,height:258,marginTop:-20,marginLeft:-15},1000);
            
            //console.log( $(event.target));  //find的是img 是img发生了动画，所以img是事件对象目标
            $(event.target).parent().parent().append(this.$div);

        },
       pop2(){
            console.log(1);
             // $(event.target).stop(true).animate({width:379,height:215,marginTop:0,marginLeft:0,opacity:1},3000);
             $(event.target).parents("li").find("img").stop(true).animate({width:379,height:215,marginTop:0,marginLeft:0},1000);
             this.$div.remove();
        },
     }

    $.pop = Pop;
    
    return Pop
});