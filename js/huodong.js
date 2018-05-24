$(function(){
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

})