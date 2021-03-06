$(document).ready(function(){
		$('#fullpage').fullpage({
			scrollingSpeed:600,
			anchors:['1', '2', '3', '4', '5', '6', '7', '8'],
			menu: '.nav-circle__items',
			scrollBar:true
		});

	var sendMail = function(){
		var obj={
			name:$("#name").val(),
			phone:$("#phone").val(),
			street:$("#street").val(),
			house:$("#house").val(),
			housing:$("#housing").val(),
			apartment:$("#apartment").val(),
			floor:$("#floor").val(),
			coment:$("#coment").val(),
			pay:($("#pay1").is(':checked'))?"Потребуется сдача":"Оплата по карте",
			dialing:($("#dialing").is(':checked'))?"Не звонить":"Позвонить"
		};
		for (key in obj){
			if(obj[key]!=""){
				flag=1;
			}
			else{
				if(key=='housing'||key=='coment'){
					flag=1;
				}
				else{
					flag=0;
					break;
				}
			}
		}
		if(flag){
			$.ajax({
				type: "POST",
				url: "http://dragin.ru/sendMail.php",
				data: {
					method: "mail", 
					input:obj
				},
				dataType: "json",
				success: function(data) {
					//alert();
					addElement($(".delivery__modal"),"none");
				}
			})
		}
		if(!flag){
			alert("заполните все поля");
		}
	}
	var slider = function(container,slideNum){
		var items=container.find(".courusel__wrap"),
		activeSlide=container.find(".courusel__wrap_active"),
		reqItem=items.eq(slideNum),
		reqIndex=reqItem.index();
		container.css("left",""+-reqIndex*100+'%'+"");
		activeSlide.removeClass("courusel__wrap_active");
		reqItem.addClass("courusel__wrap_active");
	}
	var accordeon = function(container,num){
		var item = container.children(),
		activeItem= container.find(".is-active"),
		nextItem=item.eq(num);
		console.log(num);
		console.log(activeItem.index()==num);
		if(activeItem.index()==num){
			close(activeItem,"is-active");
		}
		else{
			close(activeItem,"is-active");
			addElement(nextItem,"is-active");
		}
	}
	var close = function(container,className){
		if(className){
			container.removeClass(className);
		}
		else{
			container.hide(300);
		}
	}
	var addElement = function(container,className){
		if(className){
			container.addClass(className);
		}
		else{
			container.show(200);
		}
	}


	$('.str').on('click',function(e){
		e.preventDefault();
		var $this=$(this),
		container=$(".courusel__container"),
		items=$(".courusel__wrap",container),
		activeItem = items.filter(".courusel__wrap_active"),
		nextItem=activeItem.next(),
		prevItem=activeItem.prev();
		if($this.hasClass("str_left")){
			if(nextItem.length){
				slider(container,nextItem.index());
			}
			else{
				slider(container,0);
			}
		}
		else{
			if(prevItem.length){
				slider(container,prevItem.index());
			}
			else{
				slider(container,items.length-1);
			}
		}
	})
	$('.menu_burg__close').on('click',function(e){
		e.preventDefault();
		var element = $(".menu_burg");
		close(element);
	})
	$('.menu_burg__href').on('click',function(e){
		e.preventDefault();
		var element = $(".menu_burg");
		close(element);
	})
	$('.burg').on('click',function(e){
		e.preventDefault();
		var element = $(".menu_burg");
		addElement(element);
	})
	/*$(window).on('scroll',function(){
		var element = $(".header");
		if ($("html").scrollTop()) {
			addElement(element,'header_active');
		}
		else{
			close(element,'header_active');
		}
	})*/
	$(".accordeon__item").on('click',function(e){
		e.preventDefault();
		var $this = $(this),
		element=$(".accordeon"),
		num=element.find($this).index();
		accordeon(element,num);
	})
	$(".menu-accordeon__item").on('click',function(e){
		e.preventDefault();
		var $this = $(this),
		element=$(".menu-accordeon"),
		num=element.find($this).index();
		accordeon(element,num);
	})
	$(".button-review").on('click',function(e){
		e.preventDefault();
		var $this = $(this),
		num=$this.closest('.review__item').eq(0).index(),
		element=$($(".modal")[num]);
		addElement(element,'modal_active');
		//console.log(num);
	})
	$('.modal__close').on('click',function(e){
		e.preventDefault();
		var element = $(".modal");
		close(element,'modal_active');
	})
	$('a[href^="#"]').on('click',function(e){
		e.preventDefault();
		var el = $(this).attr('href');
		$('html').animate({
			scrollTop: $(el).offset().top-50}, 800);
	})
	$(".nav-circle__item").on('click',function(e){
		e.preventDefault();
		var $this = $(this),
		element=$(".nav-circle__href"),
		num=$this.closest('.nav-circle__href').index();
		//console.log(num);
		accordeon(element,num);
	})
	$("#send").on('click',function(e){
		e.preventDefault();
		sendMail();
	})
	$(".delivery__modal-button").on('click',function(e){
		e.preventDefault();
		close($(".delivery__modal"),"none");
	})

});
