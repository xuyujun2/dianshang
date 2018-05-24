	function Magnifier(options){ //封装一个函数，写放大镜
		//必选参数和非必选参数;
		/*
			new Magnifier({
				small_ele:".small",
				focus_ele:".grayBox",
				big_ele:".big"
			})
		*/
		this.small_ele = $(options.small_ele); //放小图片的盒子
		this.focus_ele = $(options.focus_ele); //小方块
		this.big_ele = $(options.big_ele); //放大图片的盒子
		if(this.small_ele.length == 0 || this.focus_ele.length == 0 || this.big_ele.length == 0) return; //三个只要有一个不存在，就终止
		this.init();
	}
	Magnifier.prototype = {
		constructor:Magnifier,
		init(){
			
			this.scale1 = this.big_ele.width() / this.focus_ele.width(); //缩放的比例
			this.scale2 = this.big_ele.height() / this.focus_ele.height();
			this.ratio(); //缩放的函数
			this.small_ele.on("mouseenter",{hidden:false},$.proxy(this.toggleFocus,this));
			this.small_ele.on("mouseleave",{hidden:true},$.proxy(this.toggleFocus,this));
			this.small_ele.on("mousemove.smallMove",$.proxy(this.smallMove,this));
			this.small_ele.on("mousemove.bigMove",$.proxy(this.bigMove,this));
			

			this.small_ele[0].onmousewheel = function(event){// 谷歌 
				var evt = event || window.event;		
				this.ratio("ch",evt.wheelDelta);
			}.bind(this);
			this.small_ele[0].addEventListener("DOMMouseScroll",function(event){//火狐
				
				this.ratio("ff",event.detail);
			}.bind(this));
			
		},
		toggleFocus(event){
			var opacity_img = this.small_ele.find(".opacity-img");
			//console.log(this);//Magnifier

			if(event.data.hidden){ //如果事件对象的隐藏为true，就将小方框和放大图片的盒子隐藏
				this.focus_ele.stop().fadeOut(200);
				this.big_ele.stop().fadeOut(200);
				opacity_img.stop().fadeTo("fast",1);//小图片的图片变为1   fadeTo变化到
				$('body').css('overflow','scroll');
			}else{ //否则，如果事件对象的隐藏为false，就将小方框和放大图片的盒子显示
				this.focus_ele.stop().fadeIn(200);
				this.big_ele.stop().fadeIn(200);
				opacity_img.stop().fadeTo("fast",0.3); //小图片的图片变为0.3
			}
		},
		smallMove(event){
			var eleX = event.offsetX-this.focus_ele.width()/2;
			var eleY = event.offsetY-this.focus_ele.height()/2;
			// console.log(eleX,eleY);
			// 边界检测;
			var maxWidth = this.small_ele.width() - this.focus_ele.width(); //方块水平方向上所能滑动的最大距离
			var maxHeight = this.small_ele.height() - this.focus_ele.height();

			eleX = eleX <= 0 ? 0 : eleX;
			eleX = eleX >= maxWidth ?  maxWidth : eleX;
			
			eleY = eleY <= 0 ? 0 : eleY;
			eleY = eleY >= maxHeight ?  maxHeight : eleY;

			this.focus_ele.css({
				left:eleX,
				top:eleY,
				backgroundPosition:`${-eleX}px ${-eleY}px`
			})

			var fullLongX = this.small_ele.width() - this.focus_ele.width();//方块能在小图片上移动的总长度
			var fullLongY = this.small_ele.height() - this.focus_ele.height();
			this.propX = Math.round(eleX / fullLongX * 100); //比列
			this.propY = Math.round(eleY / fullLongY * 100); //是赋值给this.propX ，this指向的是Magnifier，所以在bigMove里也能调用
			// console.log(this.propX,this.propY); 
		},
		bigMove(){
			var bigImg = this.big_ele.find("img")
			var fullLongX = bigImg.width() - this.big_ele.width(); //大图片在大盒子上能移动的总长度
			var fullLongY = bigImg.height() - this.big_ele.height() ;
			
			var eleX = -Math.round(fullLongX * this.propX / 100); //大图片的坐标
			var eleY = -Math.round(fullLongY * this.propY / 100);
			
			bigImg.css({
				left:eleX,
				top:eleY
			})
			// console.log(eleX);
		},
		ratio(browser_type,data){
			
			
			if(!browser_type || !data){// 不传参数为缩放大图功能; brower_type是浏览器类型  data是滚轮滚动的值
				//1.按比例缩放大图;
				var bigImg = this.big_ele.find("img");
				bigImg.css({
					width:Math.round(this.small_ele.width() * this.scale1*0.6), //设值大图片的宽度
					height:Math.round(this.small_ele.height() * this.scale2*0.6)
				});
				// 如果我做了这件事，那么其余的事我就不做了;
				return 0;
			}

			//谷歌里滚轮向上滚动，data是正值，火狐里，滚轮向上滚动滚轮，data是负值
			//所以谷歌浏览器里，data大于0，让trun为top，火狐浏览器里，data小于0，让turn为top
			var turn;
			if(browser_type == "ch"){ 
				data > 0 ? turn = "top" : turn = "bottom";
			}else if(browser_type == "ff"){
				data > 0 ? turn = "bottom" : turn = "top";
			}
			
			
			var focus_ele_width = this.focus_ele.width() ;
			var focus_ele_height = this.focus_ele.height() ;

			if(turn == "top"){ //向上滚动滚轮
				$('body').css('overflow','hidden');
				if(this.focus_ele.width() <= this.small_ele.width() * 0.8){
					this.focus_ele //设置小方块的css样式，宽高自增2，且向上向左移动宽高的一半
					.css({
						width:"+=2",
						height:"+=2",
						top:"-=1",//小盒子不断变高，那么小盒子距放小图片盒子顶部的距离也越来越小
						//设置小方块的位置，当小方块往左移动时，背景图是相对往右移动的，因此，在前面添加负号，使得当小方块往左移动时，背景图是相对往左移动，加1是为了去除抖动
						backgroundPosition:`${-this.focus_ele.position().left+1}px ${-this.focus_ele.position().top+1}px`
					})

					var left = this.focus_ele.position().left;
					left = left <= 0 ? 0 : left - 1;//小盒子距左边的距离越来越小
					this.focus_ele.css({
						left:left
					})
				}
				//重新计算 比例值;
			}else if(turn == "bottom"){ //向下滚动滚轮
				$('body').css('overflow','hidden');
				if(this.focus_ele.width() >= this.small_ele.width() * 0.1){
					this.focus_ele
					.css({
						width:"-=2",
						height:"-=2",
						left:"+=1", //小盒子宽高不断减小，那么小盒子距上下距离则不断增大
						top:"+=1",
						backgroundPosition:`${-this.focus_ele.position().left-1}px ${-this.focus_ele.position().top-1}px`
					})
				}
			}

			this.scale1 = this.big_ele.width() / this.focus_ele.width(); //缩放的比例
			this.scale2 = this.big_ele.height() / this.focus_ele.height();
			this.ratio();
			this.bigMove();
		}	
	}
	// smallMove;
	new Magnifier({
		small_ele:".small",
		focus_ele:".grayBox",
		big_ele:".big"
	})