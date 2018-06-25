/*main.js for Dog page (24.06.18) [v.1.0.3_DEV]*/
$( document ).ready(function() {

jQuery.fn.load = function(callback){ $(window).on("load", callback) };
let $testButton;
let $nextButton;
let $prevButton;
let $navImage;
let $bigImg;
let counter = 0;
let device = 'string';
let slider = {};
let IMGDATA = [];
let pathToImgFolder = $('#slider-container').attr('path').toLowerCase();
let imgExtension = $('#slider-container').attr('ext').toLowerCase();
let globalCounter = 0;
let initialArraySize = 40; //THIS MUST BE EQUAL TO THE QUANTITY OF ITEMS ON THE FIRST JSON FILE!
let ARRAYDATA = ($('body').attr('data-array').split(" "));
let arrayCounter = 0;
let exit = false;
let intervalNext;
let movingLeft;
let socialChecker = false;
var sandbox = true;
var resnumbers = ($('#slider-container').attr('resnumbers').split(","));
var resnumber;
var resNumbersTop = ($('#top-row-images').attr('resnumbers').split(","));
var resnumberTop;
var dynamicPath = $('body').attr('path').toLowerCase();
var format = $('body').attr('format').toLowerCase();

///////////////////////cookies
Cookies.get('c_fontSieze');
if (!Cookies.get('c_lang')) {
	Cookies.set('c_lang', 'gb')
};
if (Cookies.get('c_infoPage')=='shown') {
	$('.helper').toggle();
	$('.page-information').toggleClass( "page-information-clicked");
	$('.mini-edu').toggleClass( "mini-edu-clicked");
} else {
	Cookies.set('c_infoPage', 'hidden');
};
if (Cookies.get('c_infoPage')=='shown') {
$('body').on({  //preventing defauld events
		'mousewheel': function(e) {
			e.preventDefault();
			e.stopPropagation();
		}
	});
	$('.black-line-for-trigger').css('display', 'none')
	$("body").toggleClass("hidden");
} else {
	$('body').unbind()
}

if (Cookies.get('c_autoScroll')=='on') {
	sandbox = false;
$('.sandbox').css('display', 'block');
	$('.auto-scroll-button').toggleClass('clicked-info-button');
	$('.marquee-container').toggleClass('marquee-scroll')
	$('.sandbox').toggleClass('marquee-scroll')
	$('.sandbox-scroll').toggle();
	if ($('.auto-scroll-button').attr('src').search('green') > 0) {
		$('.auto-scroll-button').attr('src', $('.auto-scroll-button').attr('src').replace('green', 'red'))
	} else {
		$('.auto-scroll-button').attr('src', $('.auto-scroll-button').attr('src').replace('red', 'green'))
	}
} else {
	(Cookies.set('c_autoScroll', 'off'))
}
if (Cookies.get('c_keyboard')=='on'){
	$('.keyboard-button').toggleClass('clicked-info-button');
	if ($('.keyboard-button').attr('src').search('green') > 0) {
		$('.keyboard-button').attr('src', $('.keyboard-button').attr('src').replace('green', 'red'))
	} else {
		$('.keyboard-button').attr('src', $('.keyboard-button').attr('src').replace('red', 'green'))
	}
} else {
	Cookies.set('c_keyboard', 'off');
}

//After you create another page wich using same images add this page to the if statement below
if($('#slider-container').attr('page') == 'main') {
	var globalPathToImgFolder = dynamicPath;
} else if ($('#slider-container').attr('page') == 'product'){
	var globalPathToImgFolder = dynamicPath;
} else if ($('#slider-container').attr('page') == 'policy'){
	var globalPathToImgFolder = dynamicPath;
}
console.log('What page is it:',$('#slider-container').attr('page'))

/////////////CHEKING WHAT DEVICE IS USING///////////////////////////////////////////////////////
function checkDevice(){
	if ($(window).width()<576) {
		resnumber = resnumbers[4];
		resnumberTop = resNumbersTop[4];
		device = 'PortraitPhone';
	} else if ($(window).width()>=576&&$(window).width()<768) {
		resnumber = resnumbers[3];
		resnumberTop = resNumbersTop[3];
		device = 'LandscapePhone';
	} else if ($(window).width()>=768&&$(window).width()<992) {
		resnumber = resnumbers[2];
		resnumberTop = resNumbersTop[2];
		device = 'Tablet';
	} else if ($(window).width()>=992&&$(window).width()<1200) {
		resnumber = resnumbers[1];
		resnumberTop = resNumbersTop[1];
		device = 'Desktop';
	} else if ($(window).width()>=1200) {
		resnumber = resnumbers[0];
		resnumberTop = resNumbersTop[0];
		device = 'LargeDesktop';
	};
	console.log('Actual screen size:',device)
};
checkDevice();
$(window).resize(function(){location.reload();});
/////////////GET REQUEST GOES BELOW//////////////////////////////////////////////////////////////
$.getJSON(ARRAYDATA[arrayCounter], function(result){//getting JSON file with array of SRC's for our images
	$.each(result, function(key, val){
		IMGDATA.push(val);
	});
})
.done(function(){
		console.log('...json loaded...');
		arrayCounter++;
		createTopRowImages();
		createSlider();
		createBottomRowImages();
		getHeight();
		createLanguageSlider();
		initLangSlider();
		createEduLetters();
		loadImages();
		cookieAppear();
		renderMq();
	})
.fail(function(){
		console.log('JSON DIDNT LOAD COZ ERROR APPEARS!')
});
/////////////MAIN SLIDER CODE BEGIN///////////////////////////////////////////////////////////////
/////////////CREATING SLIDER /////////////////////////////////////////////////////////////////////
function createSlider(){
	slider = {
		numberOfNavImages:resnumber,
		parentElement:$('#slider-container')
	};
	// slider.parentElement.append(`
		
	// 	`);
	$('.triggerLayer0').css('display', 'flex')
	$('.setting-block, .info-cloud-bot-row-button').popover({
  		trigger: 'hover',
  		placement: 'top'
	})
	if($('#slider-container').attr('page') == 'main') {
			slider.parentElement.append(`
				<div id="addAlign" class="row no-gutters justify-content-center align-items-center">
					<div class="col button-holder">
						<button id="button-prev" type="button" class="btn btn-dark"><</button>
					</div>
					<div class="col button-holder">
						<button id="button-next" type="button" class="btn btn-dark">></button>
					</div>
				</div>`);
		for (let i = 0; i<slider.numberOfNavImages; i++){
			$('<div class="col img-holder no-gutters text-center"><img class="img-fluid nav-img" src="" alt=""></div>').insertAfter($('#button-prev').parent());
		}
	} else if ($('#slider-container').attr('page') == 'product'){
			var currImgName = $('.big-img').attr('img-name');
			$('.big-img').attr('src', `${globalPathToImgFolder}edu/${currImgName}${format}`)
			$('#slider-container').css('margin-bottom', '100px')

	} else if ($('#slider-container').attr('page') == 'policy'){
			$('#slider-container').css('margin-bottom', '100px')
			$('.settings-container').remove();
			$('#frame').append($marquee);
			$('#frame').hover(function(){return});
			$('.marquee-up').hover(function(){
				movingUp = setInterval(function() {
					var actualHeight = $('.mq-text').height();
					y = parseInt($('.mq-text').css('top'));
					if(y > -actualHeight){
						y--;
						$('.mq-text').css('top', y+'px');
					} else {
						return;
					}
				}, 25);
			},function(){
				clearInterval(movingUp);
			});
			$('.marquee-down').hover(function(){
				movingDown = setInterval(function() {
					var actualHeight = $('.mq-text').height();
					y = parseInt($('.mq-text').css('top'));
					if(y < 0){
						y++;
						$('.mq-text').css('top', y+'px');
					} else {
						return;
					}
				}, 25);
			},function(){
				clearInterval(movingDown);
			})
		};
	//$('.google-container').kycoGooglePlusFeed2('116899029375914044550');
	if (device === 'LargeDesktop') $('#addAlign').removeClass('align-items-center')
	$('.open-settings').click(function(){
		$(this).toggleClass('close-settings');
		$('.settings-container').toggle('slide',{direction: 'right'}, '400');
	});
	$('.close-settings').click(function(){
		$(this).toggleClass('close-settings');
		$('.settings-container').toggle('slide',{direction: 'right'}, '400');
	});
	$testButton = $('#test-button');
	$nextButton = $('#button-next');
	$prevButton = $('#button-prev');
	$navImage = $('.nav-img');
	$bigImg = $('.big-img');
	$navImage.mouseover(chooseActiveImage);
	$nextButton.hover(function(){
		intervalNext = setInterval(loadImages, 500);
	}, function(){
		clearInterval(intervalNext);
	});
	$prevButton.hover(function(){
		intervalNext = setInterval(loadPrevImages, 500);
	}, function(){
		clearInterval(intervalNext);
	});
	//settings block
	$('.info-main').hover(
		function(){
			$('.info-warning').css('display', 'flex')
			$('.info-warning').click(function(){
				$('.black-line-for-trigger').toggle();
				let h = $('html').height()
				$('.helper').css('height', h+30+'px');
				$('.helper').toggle();
				if (Cookies.get('c_infoPage')=='shown') {
					Cookies.set('c_infoPage', 'hidden')
				} else if (Cookies.get('c_infoPage')=='hidden'){
					Cookies.set('c_infoPage', 'shown')
				}
				$('.page-information').toggleClass( "page-information-clicked");
				$('.mini-edu').toggleClass( "mini-edu-clicked");
				$('.texted').text($('.texted').text() == 'PAGE INFORMATION (CLICK TO EXPAND)' ? `${backWord}` : 'PAGE INFORMATION (CLICK TO EXPAND)');
				$("body").toggleClass("hidden");
				if (Cookies.get('c_infoPage')=='shown') {
					console.log('prevent')
				$('body').on({  //preventing defauld events
			      'mousewheel': function(e) {
			        e.preventDefault();
			        e.stopPropagation();
			      }
			    });
				} else {
					$("body").toggleClass("hidden");
					$('body').unbind()
				}
			})
		},function(){
			$('.info-warning').mouseout(function(){
				$('.info-warning').css('display', 'none');
				$( ".info-warning" ).off( "click" );
			});
		});
	$('.setting-br').hover(function(){
		$('.brightness-container-main').css('display', 'block');
		function getCoords1(elem) {
			let box = elem.getBoundingClientRect();
			return {
				top: box.top + pageYOffset,
				left: box.left + pageXOffset
			};
		};
		let block1 = document.getElementById('container-fluid');
		let sliderElem1 = document.getElementById('slider1-main');
		let thumbElem1 = sliderElem1.children[0];
		thumbElem1.onmousedown = function(e) {
			let thumbCoords1 = getCoords(thumbElem1);
			let shiftX1 = e.pageX - thumbCoords1.left;
			let sliderCoords1 = getCoords(sliderElem1);
			document.onmousemove = function(e) {
				let newLeft1 = e.pageX - shiftX1 - sliderCoords1.left;
					if (newLeft1 < 0) {
						newLeft1 = 0;
					}
				let rightEdge1 = sliderElem1.offsetWidth - thumbElem1.offsetWidth;
					if (newLeft1 > rightEdge1) {
						newLeft1 = rightEdge1;
					}
					block1.style.filter = 'brightness('+newLeft1/100+')';
					block1.style.filter = 'opacity('+newLeft1/100+')';
					thumbElem1.style.left = newLeft1 + 'px';
			}
			document.onmouseup = function() {
				document.onmousemove = document.onmouseup = null;
			};
			return false;
		};
		thumbElem1.ondragstart = function() {
			return false;
		};
		$('#close-brightness-container').click(function(){
			$('.brightness-container-main').css('display', 'none');
		});
	}, function(){
		$('.brightness-container-main').mouseleave(function(){
			$('.brightness-container-main').css('display', 'none');
		});
	})
};

/////////////OTHER CODE FOR SLIDER GOES BELOW////////////////////////////////////////////////////
function loadImages(){//loading first/next set of images
	removeActiveClass();
	imageRender();
	chooseFirst();
	checkGlobalCounter();
};
function loadPrevImages(){ //loading previous set of images
	removeActiveClass();
	counter = counter - slider.numberOfNavImages*2;
	imageRender();
	chooseFirst();
	checkGlobalCounter();
};
function chooseActiveImage(){//choosing active image
	removeActiveClass();
	$(this).addClass('nav-img-active');//highlighting active image (giving it border=blue)
	let temporarySrc = $(this).attr('src');
	$bigImg.attr('src', temporarySrc);//applying SRC of active image to our big image
};
function removeActiveClass(){//removing border of previous active image
	$('.nav-img-active').removeClass('nav-img-active');
};
function imageRender(){//applying SRC's to our images
	checkCounter();
	$('.nav-img').each(function(){
		let temporarySrc = pathToImgFolder+IMGDATA[counter]+imgExtension;
		$(this).attr('src', temporarySrc);
		counter++;
	});
	globalCounter = globalCounter + $('.nav-img').length;
};
function chooseFirst(){//making first image of this set active
	$('.nav-img').first().addClass('nav-img-active');
	let temporarySrc = $('.nav-img').first().attr('src');
	$bigImg.attr('src', temporarySrc);//applying SRC of active image to our big image
};
function checkCounter(){//checking if counter is still in the range of our array and looping counter
	if(counter<0){
		counter = IMGDATA.length - slider.numberOfNavImages;
	} else if (counter>=IMGDATA.length){
		counter=0;
	};
};
function checkGlobalCounter(){
	if ( arrayCounter == ARRAYDATA.length || arrayCounter > ARRAYDATA.length) {
		exit = true;
	} else if (exit == false && globalCounter > IMGDATA.length-$('.nav-img').length) {
		$.getJSON(ARRAYDATA[arrayCounter], function(result){//getting JSON file with array of SRC's for our images
			$.each(result, function(key, val){
				IMGDATA.push(val);
			});
		})
		.done(function(){
				arrayCounter++;
				console.log('...json loaded...');
			})
		.fail(function(){
			console.log('JSON DIDNT LOAD COZ ERROR APPEARS!')
		});
	} else {
		return;
	};
};
/////////////MAIN SLIDER CODE END////////////////////////////////////////////////////////////////////
/////////////TOP-BOTTOM ROW CODE BEGIN///////////////////////////////////////////////////////////////
function createTopRowImages(){
	for (let i=0; i<resnumberTop; i++){
		let random = IMGDATA[Math.floor(Math.random()*IMGDATA.length)];
		let src = pathToImgFolder+random+imgExtension;
		$('#top-row-images').append(`
			<div class="col top-row-image-container">
				<img src="${src}" alt="dog" class="img-fluid top-row-img">
			</div>
		`);
	};
};
function createBottomRowImages(){
	for (let i=0; i<resnumberTop; i++){
		let random = IMGDATA[Math.floor(Math.random()*IMGDATA.length)];
		let src = pathToImgFolder+random+imgExtension;
		$('#bottom-row-images').append(`
			<div class="col bottom-row-image-container">
				<img src="${src}" alt="dog" class="img-fluid top-row-img">
			</div>
		`);
	};
};
function getHeight() {
	let h = $('.top-row-image-container').width()/1.353395062;
	$('.top-row-image-container').height(h);
	$('.top-row-img').height(h);
	let h1 = $('#frame').width()/1.353395062;
	$('#frame').height(h1);
	$('.big-img').height(h1);
	let h2 = $('.img-holder').width()/1.353395062;
	$('.img-holder').height(h2);
	$('.nav-img').height(h2);
};
/////////////TOP-BOTTOM ROW CODE END/////////////////////////////////////////////////////////////////
/////////////LANGUAGE SLIDER CODE BEGIN//////////////////////////////////////////////////////////////
function createLanguageSlider() {
	if ( device == 'PortraitPhone' || device == 'LandscapePhone' || device == 'Tablet') {
		$('.triggerLayer1').css('display', 'grid')
		$('.active-lang-w').append(`<img src="${$('.mobile-lang-item[lang='+Cookies.get('c_lang')+']').attr('src')}" alt="" class="active-lang img-fluid">`)
	} else {
		$('.triggerLayer2').css('display', 'block');
	}
	$('.social-link-button').popover({
  		trigger: 'hover',
  		placement: 'top'
	})
	$('.active-lang').click(function(){
		$('body').on({	//preventing defauld events
    	'mousewheel': function(e) {
        e.preventDefault();
        e.stopPropagation();
    	}
		});
		$('.mobile-langs').toggle(); //toggling the view
		$('.black-line-for-trigger').toggle();//this is for inner page issues, you shouldnt reuse it just skip this line
		$('.lang-wrapper').click(function(){//handling clicking out of any language
			$('.mobile-langs').toggle();//closing view
			$('.black-line-for-trigger').toggle();//this is for inner page issues, you shouldnt reuse it just skip this line
			$('body').unbind();//this is where we let the browser scroll/swipe. THIS IS VERY IMPORTANT. if you do not fire that function your page would remain withoit scroll/swipe
		});
	});
	$('.mobile-lang-item').click(function(){//this is event for selection of language
		$('.lang-wrapper').unbind();//we unbinding any events from this element, this is necessary to prevent future bugs if any apperas
		$('body').unbind();//here we deleting prevents of default events from line 512
		$('.active-lang').attr('src', $(this).attr('src'));//resolving change of image of flag language in main view
		$('.mobile-langs').toggle();//closing view with all languages
		Cookies.set('c_lang', $(this).attr('lang'));//this line is for cookies, skip it if you have your own way of doing it
		$('.black-line-for-trigger').toggle();//this is for inner page issues, you shouldnt reuse it just skip this line
	});
	$('.lang-scroll-up').hover(function(){
		movingUp = setInterval(function() {
			var actualHeight = $('.lang-wrapper').height();
			y = parseInt($('.lang-wrapper').css('top'));
			if(y > -actualHeight/2){
				y--;
				$('.lang-wrapper').css('top', y+'px');
			} else {
				return;
			}
		}, 25);
	},function(){
		clearInterval(movingUp);
	});
	$('.lang-scroll-down').hover(function(){
		movingDown = setInterval(function() {
			var actualHeight = $('.lang-wrapper').height();
			y = parseInt($('.lang-wrapper').css('top'));
			if(y !=0 ){
				y++;
				$('.lang-wrapper').css('top', y+'px');
			} else {
				return;
			}
		}, 25);
	},function(){
		clearInterval(movingDown);
	});
	$('.flag-image, .dogSelector').hover(
		function(){
			selectorXposition = $(this).offset().left;
			selectorYposition = $(this).offset().top;
			let cursorImgName = $('.container-fluid').attr('cursor-img-name');
			$('.container-fluid').append(`<img class="dogSelector" src="${globalPathToImgFolder}selector/${cursorImgName}${format}">`);
			$('.dogSelector').css('position', 'absolute');
			$('.dogSelector').css('left', selectorXposition-5);
			$('.dogSelector').css('top', selectorYposition-56);
		},
		function(){
			$('.dogSelector').remove();
	});
	$('.lang-arrow-prev').hover(function(){
		goinPrev = setInterval(function() {
			$('#language-slider-container').flexslider('prev');
		}, 1000)}, function(){
			clearInterval(goinPrev);
		});
	$('.lang-arrow-next').hover(function(){
		goinNext = setInterval(function() {
			$('#language-slider-container').flexslider('next');
		}, 1000)}, function(){
			clearInterval(goinNext);
		});
	//delete
	$('.twitter-button, .twitter-main').hover(function(){
		$('.linkedin-container').css('display', 'none');
		$('.facebook-container').css('display', 'none');
		$('.google-container').css('display', 'none');
		$('.twitter-container').css('display', 'block');
		socialChecker = true;
		$('.social-close-button').css('display', 'block');
		$('.social-close-button').click(function(){
			$('.twitter-container').css('display', 'none');
			$(this).css('display', 'none');
			socialChecker = false;
		});
	}, function(){
		$('.twitter-container').css('dsplay', 'none')
	});
	$('.linkedin-button, .lin-main').hover(function(){
		$('.facebook-container').css('display', 'none');
		$('.twitter-container').css('display', 'none');
		$('.google-container').css('display', 'none');
		$('.linkedin-container').css('display', 'block')
		$('.linkedin-container').css('z-index', '14')
		socialChecker = true;
		$('.social-close-button').css('display', 'block');
		$('.social-close-button').click(function(){
			$('.linkedin-container').css('display', 'none');
			$(this).css('display', 'none');
			socialChecker = false;
		});
	}, function(){
		$('.linkedin-container').css('dsplay', 'none')
	});
	$('.facebook-button,.fb-main').hover(function(){
		$('.twitter-container').css('display', 'none');
		$('.linkedin-container').css('display', 'none');
		$('.google-container').css('display', 'none');
		$('.facebook-container').css('display', 'block');
		socialChecker = true;
		$('.social-close-button').css('display', 'block');
		$('.social-close-button').click(function(){
			$('.facebook-container').css('display', 'none');
			$(this).css('display', 'none');
			socialChecker = false;
		});
	}, function(){
		$('.facebook-container').css('dsplay', 'none')
	});
	$('.google-button, .google-main').hover(function(){
		$('.twitter-container').css('display', 'none');
		$('.linkedin-container').css('display', 'none');
		$('.facebook-container').css('display', 'none');
		$('.google-container').css('display', 'block');
		socialChecker = true;
		$('.social-close-button').css('display', 'block');
		$('.social-close-button').click(function(){
			$('.google-container').css('display', 'none');
			$(this).css('display', 'none');
			socialChecker = false;
		});
	}, function(){
		$('.google-container').css('dsplay', 'none')
	});
};
function initLangSlider() {
	$('#language-slider-container').flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: true,
		itemMargin: 5,
		maxItems: 6,
		itemWidth: 100,
		auto: false
	});
};
/////////////LANGUAGE SLIDER CODE END////////////////////////////////////////////////////////////////
/////////////BACKGROUND CODE BEGIN///////////////////////////////////////////////////////////////////
$('.background-image').hover(function(){
	let replaced = $(this).attr('src').replace('dark', 'light');
	$(this).attr('src', replaced);
}, function(){
	let replaced = $(this).attr('src').replace('light', 'dark');
	$(this).attr('src', replaced);
});
/////////////BACKGROUND CODE END/////////////////////////////////////////////////////////////////////
/////////////EDU LETTERS CODE BEGIN///////////////////////////////////////////////////////////////
function createEduLetters() {
	let result = true;
	let rand = (Math.random()*(1-0)+0);
	if ( device == 'Desktop' || device == 'LargeDesktop' && rand > 0.5) {
		$('.triggerLayer3').css('display', 'block');
	} else if ( device == 'Desktop' || device == 'LargeDesktop' && rand < 0.5) {
		$('.triggerLayer4').css('display', 'block');
	} else {
		result = false;
	};
	if (result) {
		$('.edu-letter').each(function(){
			let left = (Math.random()*(15-0)+0) + '%';
			$(this).css("left", left)
		});
	};
}
/////////////EDU LETTERS CODE END/////////////////////////////////////////////////////////////////
/////////////BOTTOM DOGS CODE START///////////////////////////////////////////////////////////////
function createDog(){
	let whichDog = Math.random()*100;
	let percentsDog = ($('.black-happy-dog').attr('percents').split(","));
	let blackDog = percentsDog[0];
	let happyDog = percentsDog[1];
	let eduDog = percentsDog[2];
	let actualHeight;
	if (whichDog > blackDog && whichDog < happyDog+blackDog) {
		let happyDogImg = $('.black-happy-dog').attr('happy-dog-img');
		$('.black-happy-dog').attr('src', dynamicPath+'dogs/'+happyDogImg+format); //happy
		actualHeight = 316
		$('.black-happy-dog').css('height', actualHeight)
	} else if (whichDog < blackDog){
		let pixelDogImg = $('.black-happy-dog').attr('pixel-dog-img');
		$('.black-happy-dog').attr('src', dynamicPath+'dogs/'+pixelDogImg+format); //black
		actualHeight = 386
		$('.black-happy-dog').css('height', actualHeight)
	} else if (whichDog > happyDog+blackDog){
		let realDogImg = $('.black-happy-dog').attr('real-dog-img');
		$('.black-happy-dog').attr('src', dynamicPath+'dogs/'+realDogImg+format); //edu
		actualHeight = 154
		$('.black-happy-dog').css('height', actualHeight)
	};
};
setTimeout(createDog, 1000);
/////////////BOTTOM DOGS CODE END/////////////////////////////////////////////////////////////////
/////////////COOKIESS CODE START//////////////////////////////////////////////////////////////////
function cookieAppear() {
	$('.cookie-div').css('display', 'flex');
	$('.cookie-button').click(function(){
		cookieHide();
	});
};
function cookieHide(){
	$('.cookie-container').hide('drop', {direction: 'up'}, 3000);
}
setTimeout(cookieHide, 10000);

/////////////COOKIESS CODE END////////////////////////////////////////////////////////////////////
/////////////BOTTOM SLIDER START//////////////////////////////////////////////////////////////////
let timeoutBottom;
$('.bottom-trigger').flexslider({
	animation: "slide",
	animationLoop: false,
	itemWidth: 250,
	itemMargin: 5
});
let timerForSlider;
$('.bottom-arrow-prev').hover(function(){
	timerForSlider = setInterval(function() {
		$('.bottom-trigger').flexslider('prev');
}, 500);
}, function(){
	clearInterval(timerForSlider);
});
$('.bottom-arrow-next').hover(function(){
	timerForSlider = setInterval(function() {
		$('.bottom-trigger').flexslider('next');
}, 500);
}, function(){
	clearInterval(timerForSlider);
});
function hideBottom(){
	$('.bottom-trigger').hide('drop', {direction: 'down'}, 500);
	$('.black-line-for-trigger').css('background-color','black');
};
$('.bottom-hide').click(hideBottom)
$('.black-line-for-trigger').hover(function(){
	clearTimeout(timeoutBottom);
	$('.black-line-for-trigger').css('background-color','transparent');
	$('.bottom-trigger').show('drop', {direction: 'down'}, 500)
},function(){
	timeoutBottom = setTimeout(hideBottom, 10000);
});
$('.bottom-trigger').hover(function(){
	clearTimeout(timeoutBottom);
},function(){
	timeoutBottom = setTimeout(hideBottom, 10000);
})
/////////////BOTTOM SLIDER END////////////////////////////////////////////////////////////////////
/////////////MARQUEE START////////////////////////////////////////////////////////////////////////
function renderMq() {
	if ($('#slider-container').attr('page') == 'policy'){ return }
	$('.marquee-container').css('display', 'block');
	$('.marquee-container').css('visibility', 'hidden');
	if (!Cookies.get('c_fontSize')) {///COOKIES FONT SIZE HERE!!!!
		$('.mq-text').css('font-size', '14px');
	} else {
		var size = Cookies.get('c_fontSize');
		$('.mq-text').css('font-size', size);
	};//find it
	$('#frame').hover(function(){
		if (!socialChecker) {
			$('.marquee-container').css('visibility', 'visible');
		} else {
			return;
		}
	},function(){
		$('.marquee-container').css('visibility', 'hidden')
	});
	$('.marquee-up').hover(function(){
		movingUp = setInterval(function() {
			y = parseInt($('.mq-text').css('top'));
			if(y > -300){
				y--;
				$('.mq-text').css('top', y+'px');
			} else {
				return;
			}
		}, 25);
	},function(){
		clearInterval(movingUp);
	});
	$('.marquee-down').hover(function(){
		movingDown = setInterval(function() {
			y = parseInt($('.mq-text').css('top'));
			if(y < 0){
				y++;
				$('.mq-text').css('top', y+'px');
			} else {
				return;
			}
		}, 25);
	},function(){
		clearInterval(movingDown);
	})
};
/////////////MARQUEE END////////////////////////////////////////////////////////////////////////
/////////////HELPER START///////////////////////////////////////////////////////////////////////
console.log('helper loaded')
$('.mini-edu ').hover(function(){
	var miniEduHoverImg = $('.mini-edu').attr('mini-edu-hover-img-name');
	$('.mini-edu ').css('width', '200px');
	$('.mini-edu ').css('height', '200px');
	$('.mini-edu-img-1').css('display', 'none');
	$('.page-information').css('display', 'block');
	$('.mini-edu-img-2').css('display', 'block');
	$('.mini-edu ').css('background-image', 'url('+globalPathToImgFolder+'round_square/'+miniEduHoverImg+format+')');
}, function(){
	$('.mini-edu-img-1').css('display', 'block');
	$('.mini-edu ').css('width', '60px');
	$('.mini-edu ').css('height', '60px');
	$('.page-information').css('display', 'none');
	$('.mini-edu ').css('background-image', 'none');
	$('.mini-edu-img-2').css('display', 'none');
});
$('.container-fluid, .dogs-background-container').click(function(){
	$('.mini-edu-img-1').css('display', 'block');
	$('.mini-edu ').css('width', '60px');
	$('.mini-edu ').css('height', '60px');
	$('.page-information').css('display', 'none');
	$('.mini-edu ').css('background-image', 'none');
	$('.mini-edu-img-2').css('display', 'none');
});
$('.mini-edu, .page-information ').click(function(){
	let h = $('html').height();
		$('.helper').css('height', h+30+'px');
		$('.black-line-for-trigger').toggle();
	$('.helper').toggle();
	if (Cookies.get('c_infoPage')=='shown') {
		Cookies.set('c_infoPage', 'hidden');
	} else if (Cookies.get('c_infoPage')=='hidden'){
		Cookies.set('c_infoPage', 'shown');
	}
	$('.page-information').toggleClass( "page-information-clicked");
	$('.mini-edu').toggleClass( "mini-edu-clicked");
	$('.texted').text($('.texted').text() == 'PAGE INFORMATION (CLICK TO EXPAND)' ? 'Go Back' : 'PAGE INFORMATION (CLICK TO EXPAND)');
	if (Cookies.get('c_infoPage')=='shown') {
		console.log('prevent')
	$('body').on({  //preventing defauld events
      'mousewheel': function(e) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
		$("body").toggleClass("hidden");
	} else {
		console.log('unprevent')
		$('body').unbind()
		$("body").toggleClass("hidden");
	}
});

$('.info-cloud-top-row-button').hover(function(){
	$('.sandbox').remove();
	sandbox = true;
	$('.info-cloud-helper-title').html($(this).attr('data-header'))
	$('.info-cloud-helper-text').html($(this).attr('data-content'))
	if (device=="Desktop"||device=="LargeDesctop"){
	if($('.helper-bone').css('display') == 'none'){
			$('.helper-bone').toggle('drop', {direction: 'left'}, 'fast');
		} else {
			$('.helper-bone').effect('shake');
		};
		setTimeout(function() {
			if ($('info-cloud-helper-block').css('display') == 'none') {
				$('.info-cloud-helper-block').toggle('fade', 'fast');
			} else {
				$('.info-cloud-helper-block').effect('highlight');
			}
		}, 250)
	} else {
		if ($('info-cloud-helper-block').css('display') == 'none') {
				$('.info-cloud-helper-block').toggle('fade', 'fast');

			} else {
				$('.info-cloud-helper-block').effect('highlight');
				$('.info-cloud-helper-block').css('width', '300px')
			}
	}
}, function(){
	$('.info-cloud-helper-block').toggle('fade', 'fast');//here
	$('.helper-bone').css('display', 'none');
});
$('.auto-scroll-button').click(function(){
	$(this).toggleClass('clicked-info-button')
	$('.marquee-container').toggleClass('marquee-scroll')
	$('.sandbox').toggleClass('marquee-scroll')
	$('.sandbox-scroll').toggle()
	if (Cookies.get('c_autoScroll') == 'on') {
		Cookies.set('c_autoScroll', 'off');
	} else if (Cookies.get('c_autoScroll') == 'off') {
		Cookies.set('c_autoScroll', 'on');
	}
});
$('.size-minus').click(function(){
	let size = parseInt($('.mq-text').css('font-size'))
	$('.mq-text').css('font-size', size-1);
	Cookies.set('c_fontSize', size-1+'px')
	let sizeTest = parseInt($('.sand-text').css('font-size'))
	$('.sand-text').css('font-size', sizeTest-1+'px');
});
$('.size-plus').click(function(){
	let size = parseInt($('.mq-text').css('font-size'))
	$('.mq-text').css('font-size', size+1);
	Cookies.set('c_fontSize', size+1+'px')
	let sizeTest = parseInt($('.sand-text').css('font-size'))
	$('.sand-text').css('font-size', sizeTest+1+'px');
})//////hereeeee!!!!
$('.info-cloud-bot-row-button').click(function(){
	if ($(this).attr('src').search('green') > 0) {
		$(this).attr('src', $(this).attr('src').replace('green', 'red'))
	} else {
		$(this).attr('src', $(this).attr('src').replace('red', 'green'))
	}
});
$('.keyboard-button').click(function(){
	$(this).toggleClass('clicked-info-button')
	if (Cookies.get('c_keyboard') == 'on') {
		Cookies.set('c_keyboard', 'off');
	} else if (Cookies.get('c_keyboard') == 'off') {
		Cookies.set('c_keyboard', 'on');
	}
});
$('.info-cloud-bot-row-button').mouseenter(function(){
	if ( sandbox ){
		sandbox = false;
	$('.sandbox').css('display', 'block');
		if (!Cookies.get('c_fontSize')) {///COOKIES FONT SIZE HERE!!!!
			$('.sand-text').css('font-size', '14px')
		} else {
			var size = Cookies.get('c_fontSize');
			$('.sand-text').css('font-size', Cookies.get('c_fontSize'));
		};
	$('.close-sandbox').click(function(){
		$('.sandbox').remove();
		sandbox = true;
	})
	$('.sandbox-scroll-up').hover(function(){
		movingSandUp = setInterval(function() {
			y = parseInt($('.sand-text').css('top'));
			if(y > -300){
				y--;
				$('.sand-text').css('top', y+'px');
			} else {
				return;
			}
		}, 25);
	},function(){
		clearInterval(movingSandUp);
	})
	$('.sandbox-scroll-down').hover(function(){
		movingSandDown = setInterval(function() {
			y = parseInt($('.sand-text').css('top'));
			if(y < 0){
				y++;
				$('.sand-text').css('top', y+'px');
			} else {
				return;
			}
		}, 25);
	},function(){
		clearInterval(movingSandDown);
	})
} else { return }
});
/////////////HELPER END/////////////////////////////////////////////////////////////////////////
/////////////LINKS START////////////////////////////////////////////////////////////////////////
	var goldBoneImg = $('.links-container').attr('gold-bone');

	var whiteBoneImg = $('.links-container').attr('white-bone');

	var orangeBoneImg = $('.links-container').attr('orange-bone');
$('.link-container').hover(function(){
	$(this).css('background-image', 'url('+globalPathToImgFolder+'bones/'+goldBoneImg+format+')')
},function(){
	$(this).css('background-image', 'url('+globalPathToImgFolder+'bones/'+whiteBoneImg+format+')')
});
$('.link-container').click(function(){
	$(this).css('background-image', 'url('+globalPathToImgFolder+'bones/'+orangeBoneImg+format+')')
})
let linkWidth = $('.link-text').width();
$('.link-text-control-right').hover(function(){
	let that = $(this).siblings('.link-text');
	movingLeft = setInterval(function() {
		x = parseInt(that.css('left'));
		if (x<-linkWidth) {
			that.css('left', 0+'px');
		} else {
			x--;
			that.css('left', x+'px');
		}
	}, 25);
},function(){
	clearInterval(movingLeft);
});
$('.link-text-control-left').hover(function(){
	let that = $(this).siblings('.link-text');
	movingLeft = setInterval(function() {
		x = parseInt(that.css('left'));
		if (x>50) {
			that.css('left',-linkWidth+'px');
		} else {
			x++;
			that.css('left', x+'px');
		}
	}, 25);
},function(){
	clearInterval(movingLeft);
});
/////////////SOCIALSS END///////////////////////////////////////////////////////////////////////
//fontsize
$('body').css('font-size', $('.font-size').attr('font-data'));
/////////////BRIGHTNESS START///////////////////////////////////////////////////////////////////
function getCoords(elem) {
	let box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
};
setTimeout(function(){
	let height = $('body').height();
	$('.background-container').css('min-height', height);
	$('.bottom-slider').css('background-image', 'url('+dynamicPath+'dogs/'+$('.bottom-slider').attr('bottom-slider-background-img')+format+')');
	$('.top-row-image-container').css('background-image', 'url('+dynamicPath+'square/'+$('#imgs-name-holder').attr('top-image-container')+format+')');
	$('#frame').css('background-image', 'url('+dynamicPath+'square/'+$('#frame').attr('frame-background-img')+format+')');
	$('.bottom-row-image-container').css('background-image', 'url('+dynamicPath+'square/'+$('#imgs-name-holder').attr('bottom-row-container')+format+')');
	$('.helper').css('background-image', 'url('+dynamicPath+'edu_best/'+$('.helper').attr('helper-background-img')+imgExtension+')');
	$('.info-cloud').css('background-image', 'url('+dynamicPath+'round_square/'+$('.info-cloud').attr('info-cloud-row-background')+format+'');

	$('.setting-br').css('background-image', 'url('+dynamicPath+'symbols/'+$('.setting-br').attr('setting-br-background')+format+')');
	$('.setting-br').hover(function(){
		$('.setting-br').css('background-image', 'url('+dynamicPath+'symbols/'+$('.setting-br').attr('setting-br-background-hover')+format+')');
	},function(){
		$('.setting-br').css('background-image', 'url('+dynamicPath+'symbols/'+$('.setting-br').attr('setting-br-background')+format+')');
	});

	$('.info-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.info-main').attr('info-main-background')+format+')');
	$('.info-main').hover(function(){
		$('.info-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.info-main').attr('info-main-background-hover')+format+')');
	},function(){ 
		$('.info-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.info-main').attr('info-main-background')+format+')');
	});

	$('.fb-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.fb-main').attr('fb-main-background')+format+')');
	$('.fb-main').hover(function(){
		$('.fb-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.fb-main').attr('fb-main-background-hover')+format+')');
	},function(){
		$('.fb-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.fb-main').attr('fb-main-background')+format+')');
	});

	$('.lin-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.lin-main').attr('lin-main-background')+format+')');
	$('.lin-main').hover(function(){
		$('.lin-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.lin-main').attr('lin-main-background-hover')+format+')');
	},function(){
		$('.lin-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.lin-main').attr('lin-main-background')+format+')');
	});

	$('.google-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.google-main').attr('oogle-main-background')+format+')');
	$('.google-main').hover(function(){
		$('.google-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.google-main').attr('oogle-main-background-hover')+format+')');
	},function(){
		$('.google-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.google-main').attr('oogle-main-background')+format+')');
	});

	$('.twitter-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.twitter-main').attr('twitter-background')+format+')');
	$('.twitter-main').hover(function(){
		$('.twitter-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.twitter-main').attr('twitter-background-hover')+format+')');
	},function(){
		$('.twitter-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.twitter-main').attr('twitter-background')+format+')');
	});

	$('.cookies-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.cookies-main').attr('cookeis-background')+format+')');
	$('.cookies-main').hover(function(){
		$('.cookies-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.cookies-main').attr('cookeis-background-hover')+format+')');
	},function(){
		$('.cookies-main').css('background-image', 'url('+dynamicPath+'symbols/'+$('.cookies-main').attr('cookeis-background')+format+')');
	});
	
	$('.link-container').css('background-image', 'url('+dynamicPath+'bones/'+$('.link-container').attr('white-dog-bone')+format+')')
}, 1000);


});
