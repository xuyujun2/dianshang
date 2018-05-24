	//轮播图插件;
    $(function(){
        $(".gp6-banner-container")
        .gpBanner(".gp6-banner-wrapper",{
            navigation: {
                nextEl: '.gp6-button-next',
                prevEl: '.gp6-button-prev',
            },
            pagination:{
                el:".gp6-banner-pagination"
            },
            direction:"scroll",
            loop:true
        }) 

	// $("#main .container3 img").mouseover(function(){
	// 	console.log(this);
	// 	this.style.opacity ="0.3";
	// 	this.style.width="120%";
	// 	this.style.height="120%";
	// 	$(this).css({
	// 		"margin-left":"-10%",
	// 		"margin-top":"-5%"
	//     })
	// })

	// $("#main .container3 img").mouseout(function(){
	// 	console.log(1);
	// 	this.style.opacity ="1";
	// 	this.style.width="100%";
	// 	this.style.height="100%"
	// 	$(this).css({
	// 		"margin-left":"0px",
	// 		"margin-top":"0px"
	//     })
	// })

	$(".input1").click(function(e){

		e.stopPropagation();
		$(".input1").css({
			"border":"1px solid blue",
		})
	})

	$(document).click(function(){
		$(".input1").css({
			"border":0,
			"border-bottom":"1px solid gray"
		})
	})

	$(".m1").mouseover(function(){
        
		$("#header1").stop().fadeIn(2000)
	})

	$(".m1").mouseout(function(){
		$("#header1").stop().fadeOut(2000)
	})

	$("#header1").mouseover(function(){
		$("#header1").stop().fadeIn(2000)
	})

	$("#header1").mouseout(function(){
		$("#header1").stop().fadeOut(2000)
	})


    window.onscroll = function(){
    		var scroll = document.documentElement.scrollTop || document.body.scrollTop;
            
			if(scroll >= $("#header").height()){ //jquery实现添加、删除类名，判断是否含有类名
                if(!$(".nav").hasClass("active")){
                      $(".nav").addClass("active")
                }
			}else{
				$(".nav").removeClass("active")
			}
    }

})