    $(function(){
		var oK1 = document.querySelectorAll(".k1")[0];
		var oK2 = document.querySelectorAll(".k2")[0];

		$(".b").on("click",function(){
			console.log(1);
            oK1.style.display = "block";

            //$(".k2").style.display = "none";  // 行不通 ??
            oK2.style.display = "none";
		})

		$(".c").on("click",function(){
			console.log(1);
            oK1.style.display = "none";
            oK2.style.display = "block";
		})
    	
        $("#login").on("click",function(){
            
            //把登陆信息交给后台验证;
            var yz = $(".yz").val();
            var yzm = $(".yzm").val();
            var username = $("#usr").val();
            var pwd = $("#pwd").val();
            var opt = {
                url:"http://localhost/dianshang/php/user_login.php",
                type:"POST",
                data:{username:username,password:pwd,yz:yz,yzm:yzm,type:"login"}
            }
            $.ajax(opt)
            .then(function(res){
                //console.log(res);
                alert(res);
                // console.log(yz);
                // console.log(yzm);
                // console.log(yz == yzm)
	                if(res == "登陆成功"){
	                	 window.location.href = "./dianshang.html";
	                }

	                return;	 
            })
        })
	   function y(){
			    var a = parseInt(Math.random()*10);
			    var b = parseInt(Math.random()*10);
			    var c = parseInt(Math.random()*10);
			    var d = parseInt(Math.random()*10);	

			    //var str = " "+a+" "+b+" "+c+" "+d+" ";//str要是这种写法，那么输入验证码时必须写成 空格a空格b空格c空格d空格，才能匹配到
			    var str = ""+a+""+b+""+c+""+d+"";
			   
			    //$(".yzm").val() = str; // 行不通??

			    var oYzm = document.querySelectorAll(".yzm")[0];
			    oYzm.value = str;
	     }

	     y();

	     var oYzm = document.querySelectorAll(".yzm")[0];
	     oYzm.onclick = y;

	     $("#usr").blur(function(){
	    	var reg = /^[a-zA-Z]{3,9}$/;
	    	var str = $("#usr").val();
	    	if(!reg.test(str)){
	    		$("#usr").val("用户名必须是3位以上的纯字母");
	    		$("#usr").css({"color":"red"})
	    	}else{
	    		$("#usr").css({"color":"blue"})
	    	}
	    })

	    $("#pwd").blur(function(){
	    	var str = $("#pwd").val().length;
	    	if(str < 5){
	    		$("#pwd").val("密码必须大于5位");
	    		$("#pwd").css({"color":"red"})
	    	}else{
	    		$("#pwd").css({"color":"blue"})
	    	}
	    })

	         
	    })	
