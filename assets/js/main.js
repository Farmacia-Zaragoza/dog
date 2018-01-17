$( document ).ready(function() {

jQuery.fn.load = function(callback){ $(window).on("load", callback) };
///////////////////////cookies
Cookies.get('c_fontSieze');
Cookies.get('c_keyboard');
Cookies.get('c_autoscroll');
/////////////letS GOES BELOW/////////////////////////////////////////////////////////////////////
let $testButton;
let $nextButton;
let $prevButton;
let $navImage;
let $bigImg;
let counter = 0;
let device = 'string';
let slider = {};
let IMGDATA = [];
let pathToImgFolder = $('#slider-container').attr('pathToImgFolder');
let imgExtension = $('#slider-container').attr('imgExtension');
let globalCounter = 0;
let initialArraySize = 40; //THIS MUST BE EQ TO THE QUANTITY OF ITEMS ON THE FIRST JSON FILE!
let ARRAYDATA = ($('body').attr('data-array').split(" "));
let arrayCounter = 0;
let exit = false;
let intervalNext;
let movingLeft;
let socialChecker = false;
var sandbox = true;
//After you create another page wich using same images add this page to the if statement below
if($('#slider-container').attr('page') == 'main') {
	var globalPathToImgFolder = 'img/';
} else if ($('#slider-container').attr('page') == 'product'){
	var globalPathToImgFolder = '../../img/';
} else if ($('#slider-container').attr('page') == 'policy'){
	var globalPathToImgFolder = '../../img/';
}
console.log($('#slider-container').attr('page'))
/*var facebookData;
$.get( "https://graph.facebook.com/?id=http://dog.dbrqx.com", function( data ) {
	facebookData =  data;
});*/

/////////////CHEKING WHAT DEVICE IS USING///////////////////////////////////////////////////////
function checkDevice(){
	if ($(window).width()<576) {
		device = 'PortraitPhone';
	} else if ($(window).width()>=576&&$(window).width()<768) {
		device = 'LandscapePhone';
	} else if ($(window).width()>=768&&$(window).width()<992) {
		device = 'Tablet';
	} else if ($(window).width()>=992&&$(window).width()<1200) {
		device = 'Desktop';
	} else if ($(window).width()>=1200) {
		device = 'LargeDesktop';
	};
	console.log(device)
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
		numberOfNavImages:parseInt($('#slider-container').attr('numberOfNavImages'+device)),
		parentElement:$('#slider-container')
	};
	slider.parentElement.append(
		'<div class="row justify-content-center">'+
			'<div class="col-12 col-lg-6 text-center" id="frame">'+
				'<div class="settings-container">'+
					'<div data-toggle="popover" data-trigger="focus" title="Facebook" data-content="Click to show Facebook feed." class="setting-block fb-main"></div>'+
					'<div data-toggle="popover" data-trigger="focus" title="LinkedIn" data-content="Click to show LinkedIn feed." class="setting-block lin-main"></div>'+
					'<div data-toggle="popover" data-trigger="focus" title="Google" data-content="Click to show Google feed." class="setting-block google-main"></div>'+
					'<div data-toggle="popover" data-trigger="focus" title="Twitter" data-content="Click to show Twitter feed." class="setting-block twitter-main"></div>'+
					'<div data-toggle="popover" data-trigger="focus" title="Brightness" data-content="Click to adjust brightness of the page." class="setting-block setting-br"></div>'+
					'<a href="assets/pages/policy.html"><div data-toggle="popover" data-trigger="focus" title="Cookies" data-content="Click to show cookies page." class="setting-block cookies-main"></div></a>'+
					'<div class="setting-block info-main"></div>'+
				'</div>'+
				'<div class="linkedin-container">'+
					'<script src="//platform.linkedin.com/in.js" type="text/javascript"> lang: en_US</script>'+
					'<script type="IN/Share" data-url="https://www.linkedin.com/in/brqxng/" data-counter="top"></script>'+
					'<script src="//platform.linkedin.com/in.js" type="text/javascript"></script>'+
					'<script type="IN/MemberProfile" data-id="https://www.linkedin.com/in/brqxng/" data-format="inline"  data-width="300" data-related="false"></script>'+
				'</div>'+
				'<div class="facebook-container">'+
					/*'<div id="demo1" data-url="http://dog.dbrqx.com/index2/" data-text="Make your sharing widget with Sharrre (jQuery Plugin)" data-title="share"></div>'+*/
					'<div class="facebook-warning">Please log in to Facebook to see facebook feed!</div>'+
					'<div class="fb-page" data-href="https://www.facebook.com/edubuscanovia/" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">'+
						'<blockquote cite="https://www.facebook.com/edubuscanovia/" class="fb-xfbml-parse-ignore">'+
							'<a href="https://www.facebook.com/edubuscanovia/">Facebook</a>'+
						'</blockquote>'+
					'</div>'+
					'<div id="fb-root"></div>'+
					'<div class="fb-like" data-href="http://dog.dbrqx.com/index2/" data-layout="button_count" data-size="large" data-action="recommend" data-show-faces="true"></div>'+
				'</div>'+
				'<div class="twitter-container">'+
					'<a class="twitter-follow-button" href="https://twitter.com/EduBuscaNovia">Follow @EduBuscaNovia</a>'+
					'<a class="twitter-timeline" href="https://twitter.com/EduBuscaNovia?ref_src=twsrc%5Etfw">Tweets by EduBuscaNovia</a>'+
					'<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'+
				'</div>'+
				'<div class="google-container">'+
					'<div class="g-follow" data-annotation="bubble" data-height="24" data-href="https://plus.google.com/u/0/+RicardoCabelloTorres" data-rel="author"></div>'+
				'</div>'+
				'<div class="info-container">'+
					'<div class="info-warning">Click to proceed to the information page.</div>'+
				'</div>'+
				/*'<button type="button" class="btn btn-warning social-share-button"></button>'+*/
				'<button type="button" class="btn btn-info social-close-button">Close</button>'+
				'<img src="" alt="" class="img-fluid big-img">'+//img goes here
			'</div>'+
		'</div>');
	$('.setting-block, .info-cloud-bot-row-button').popover({
  		trigger: 'hover',
  		placement: 'top'
	})
	if($('#slider-container').attr('page') == 'main') {
			slider.parentElement.append('<div id="addAlign" class="row no-gutters justify-content-center align-items-center"><div class="col button-holder"><button id="button-prev" type="button" class="btn btn-dark"><</button></div><div class="col button-holder"><button id="button-next" type="button" class="btn btn-dark">></button></div></div>');
		for (let i = 0; i<slider.numberOfNavImages; i++){
			$('<div class="col img-holder no-gutters text-center"><img class="img-fluid nav-img" src="" alt=""></div>').insertAfter($('#button-prev').parent());
		}
	} else if ($('#slider-container').attr('page') == 'product'){
			$('.big-img').attr('src', '../../edu/0935x0700/edu_first_selection_2017_brqx_dog_025_0935x0700.jpg')
			$('#slider-container').css('margin-bottom', '100px')

	} else if ($('#slider-container').attr('page') == 'policy'){
			$('#slider-container').css('margin-bottom', '100px')
			$('.settings-container').remove();
			let $marquee = $(
				'<div class="marquee-container">'+
					'<div class="marquee-up no-gutters row justify-content-between">'+
						'<div class="col-2 "><img class="img-fluid top-left-mq-arrow" src="'+globalPathToImgFolder+'arrows/hover_layer_arrow_up_2017.svg"></div>'+
						'<div class="col-2 "><img class="img-fluid top-right-mq-arrow" src="'+globalPathToImgFolder+'arrows/hover_layer_arrow_up_2017.svg"></div>'+
					'</div>'+
					'<div class="marquee row no-gutters justify-content-center"><div class="col-8 mq-text" style="text-align: left; font-size: 12px; margin-bottom: 0px!important;">'+`<div class="justify-content-start">
                    <section>
                        <p class="">
                            In DBRQX we use cookies with the objective of providing a better service and providing you with a better experience in your navigation. We want to inform you clearly and accurately about the cookies we use, detailing below, which is a cookie, what it serves, what types of cookies we use, what are their purpose and how you can configure or disable them if you want.
                        </p>
                    </section>
                    <section>
                        <h2 class="c" style="color: #CD5C5C">
                            What are cookies?
                        </h2>
                        <p class="">
                            A "Cookie" is a small file that is stored on the user's computer, tablet, smartphone or any other device with navigation information.
                        </p>
                        <p class="">
                            Cookies help us improve the quality of our website.
                        </p>
                        <p class="">
                            Cookies are essential for the operation of the internet, providing innumerable advantages, facilitating the navigation and usability of our web.En no case the cookies could damage your equipment. By contrast, those who are active helps us to know the performance of the website, we must modify and problems that may arise.
                        </p>
                    </section>
                    <section>
                        <h2 class="" style="color: #CD5C5C">
                            What types of cookies do we use?
                        </h2>
                        <h3 class="" style="color: #CD5C5C">
                            Own cookies:
                        </h3>
                        <p class="">
                            They are those that are sent to your team from our own computers or domains and from which we render the service that you request.
                        </p>
                         <h3 class="" style="color: #CD5C5C">
                            Third-party cookies:
                        </h3>
                        <p class="">
                            They are those that are sent to your team from a team or domain that is not managed by us, but by another collaborating entity. Such as those used by social networks, or by external content such as Google Maps.
                         </p>
                         <h3 class="" style="color: #CD5C5C">
                            Session Cookies:
                        </h3>
                        <p class="">
                            They are temporary cookies that remain in the cookie file of your browser until you leave the website, so none is recorded on the hard disk of your computer. The information obtained through these cookies, serve to analyze traffic patterns on the web. In the long run, this allows us to provide a better experience to improve the content and facilitate its use.
                         </p>
                          <h3 class="" style="color: #CD5C5C">
                              Persistent Cookies:
                          </h3>
                        <p class="">
                            They are stored on the hard drive and our website reads them every time you make a new visit. A permanent website has a specific expiration date. The cookie will stop working after that date or when you delete it. These cookies are generally used to facilitate purchase and registration services.
                         </p>
                    </section>
                    <section>
                        <h2 class="" style="color: #CD5C5C">
                            List of used cookies.
                        </h2>
                        <ol>
                            <li class="">IF_EVER_VISTED</li>
                        </ol>
                    </section>
                    <section>
                        <h2 class="" style="color: #CD5C5C">
                            How we obtain your consent to install cookies, and how you can revoke it
                        </h2>
                        <p class="">
                            By accessing the Website for the first time you will receive a notice about the use of cookies. In this first layer, you will be informed about the type of cookies we use, the purposes for which we use them, and you will be provided a link to this Cookies Policy, where you can find more detailed information. If you continue browsing, you will be giving your consent for us to install the cookies as described in this policy.
                        </p>
                        <p class="">
                            You may revoke your consent for the use of cookies at any time. To do so, you have the possibility to disable cookies by modifying the privacy settings of your browser. Here you can find links where you can find detailed information on how to configure cookies in the main browsers:
                        </p>
                        <p class="">
                            <strong>Chrome - </strong><a href="https://support.google.com/chrome/answer/95647?hl=en">https://support.google.com/chrome/answer/95647?hl=en</a>
                        </p>
                         <p class="">
                            <strong>Internet Explorer - </strong><a href="http://windows.microsoft.com/en-us/windows7/how-to-manage-cookies-in-internet-explorer-9">http://windows.microsoft.com/en-us/windows7/how-to-manage-cookies-in-internet-explorer-9</a>
                        </p>
                         <p class="">
                            <strong>Firefox - </strong><a href="https://support.mozilla.org/en/kb/activate-y-disable-cookies-which-sitios-we">https://support.mozilla.org/en/kb/activate-y-disable-cookies-which-sitios-we</a>
                        </p>
                    </section>
                  </div>`+
					'</div></div>'+
					'<div class="marquee-down no-gutters row justify-content-between">'+
						'<div class="col-2"><img class="img-fluid bott-left-mq-arrow" src="'+globalPathToImgFolder+'arrows/hover_layer_dog_arrow_left_down_2017.svg"></div>'+
						'<div class="col-2"><img class="img-fluid bott-right-mq-arrow" src="'+globalPathToImgFolder+'arrows/hover_layer_dog_arrow_right_down_2017.svg"></div>'+
					'</div>'+
				'</div>'
			);
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
//	<img class="img-fluid" src="edu/0935x0700/edu_first_selection_2017_brqx_dog_025_0935x0700.jpg" alt="">
	$('.google-container').kycoGooglePlusFeed2('116899029375914044550');
	if (device === 'LargeDesktop') {
		$('#addAlign').removeClass('align-items-center');
	};
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
		function(){//need to be fixed asap!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			$('.info-warning').css('display', 'block')
			$('.info-warning').click(function(){
				let h = $('html').height()
				$('.helper').css('height', h+'px');
				$('.helper').toggle();
				$('.page-information').toggleClass( "page-information-clicked");
				$('.mini-edu').toggleClass( "mini-edu-clicked");
				$('.texted').text($('.texted').text() == 'PAGE INFORMATION (CLICK TO EXPAND)' ? 'Go Back' : 'PAGE INFORMATION (CLICK TO EXPAND)');
			})
		},function(){
			$('.info-warning').mouseout(function(){
				$('.info-warning').css('display', 'none');
				$( ".info-warning" ).off( "click" );
			});
		});

	//$('.helper').css('height', h);
	//$('.helper').toggle( 'clip');
	//$('.page-information').toggleClass( "page-information-clicked");
	//$('.mini-edu').toggleClass( "mini-edu-clicked");
	//$('.texted').text($('.texted').text() == 'PAGE INFORMATION (CLICK TO EXPAND)' ? 'Go Back' : 'PAGE INFORMATION (CLICK TO EXPAND)');
	//$('.texted').text($('.texted').text() == 'Go Back' ? 'Go Back' : 'PAGE INFORMATION<br>(CLICK TO EXPAND)');

	$('.setting-br').hover(function(){
		$('#frame').append('<div class="brightness-container-main"><p>Brightness level</p><i class="fas fa-sun"></i><div id="slider1-main"><div class="thumb"></div></div><i class="far fa-sun"></i><div id="close-brightness-container"><i class="fas fa-times"></i></div></div>');
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
			$('.brightness-container-main').remove()
		});
	}, function(){
		$('.brightness-container-main').mouseleave(function(){
			$('.brightness-container-main').remove();
		});
	})
};
/*(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));*/

/**/

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
	for (let i=0; i<parseInt($('#top-row-images').attr('numberOfTopImages'+device)); i++){
		let random = IMGDATA[Math.floor(Math.random()*IMGDATA.length)];
		let src = pathToImgFolder+random+imgExtension;
		$('#top-row-images').append('<div class="col top-row-image-container"><img src="'+src+'" alt="dog" class="img-fluid top-row-img"></div>');
	};
};
function createBottomRowImages(){
	for (let i=0; i<parseInt($('#bottom-row-images').attr('numberOfBottomImages'+device)); i++){
		let random = IMGDATA[Math.floor(Math.random()*IMGDATA.length)];
		let src = pathToImgFolder+random+imgExtension;
		$('#bottom-row-images').append('<div class="col bottom-row-image-container"><img src="'+src+'" alt="dog" class="img-fluid top-row-img"></div>');
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
		$('#language-slider').html(`
			<div class="col-8">
				<div class="row no-gutters">
					<div class="col">
						<a href="#"><img src="${globalPathToImgFolder}buttons/dog_button_2017.svg" alt="" class="img-fluid"></a>
					</div>
				<div class="col-5">
					<div class="row no-gutters">
						<div class="col">
							<a href="#"><img src="${globalPathToImgFolder}letters/edu_letter_e_2017.svg" alt="" class="img-fluid small-edu-letter"></a>
						</div>
					<div class="col">
						<a href="#"><img src="${globalPathToImgFolder}letters/edu_letter_d_2017.svg" alt="" class="img-fluid small-edu-letter"></a>
					</div>
					<div class="col">
						<a href="#"><img src="${globalPathToImgFolder}letters/edu_letter_u_2017.svg" alt="" class="img-fluid small-edu-letter"></a>
					</div>
				</div>
			</div>
			<div class="col">
				<a href="#"><img src="${globalPathToImgFolder}buttons/dog_button_blue_dark_2017.svg" alt="" class="img-fluid"></a>
			</div>
			<div class="col">
				<a href="#"><img src="${globalPathToImgFolder}buttons/dog_button_orange_2017.svg" alt="" class="img-fluid"></a>
			</div>
			<div class="col">
				<a href="#"><img src="${globalPathToImgFolder}buttons/dog_button_green_2017.svg" alt="" class="img-fluid"></a>
			</div>
		</div>
	</div>
	<div class="col-4">
		<div class="dropdown show">
			<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				<img src="${globalPathToImgFolder}flags/brqx_flag_bangladesh_2016_320_200.svg" alt="" class="img-fluid">
			</a>
			<div class="dropdown-menu text-center" aria-labelledby="dropdownMenuLink">
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_bangladesh_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_catalunya_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_china_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_england_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_france_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_germany_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_india_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_italy_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_japan_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_portugal_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_rusia_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_spain_2016_320_200.svg" alt="" class="img-fluid">
				</a>
				<a class="dropdown-item" href="#">
					<img src="${globalPathToImgFolder}flags/brqx_flag_ukraine_2016_320_200.svg" alt="" class="img-fluid">
				</a>
			</div>
		</div>
	</div>`);
	} else {
		$('#language-slider').html('<div class="col button-container"><img src="'+globalPathToImgFolder+'buttons/dog_button_2017.svg" alt="" class="img-fluid twitter-button dog-button"></div><div class="col-1 lang-arrow-prev"><button id="lang-button-prev" type="button" class="btn btn-dark"><</button></div><div class="col-6"><div class="row no-gutters" id="language-slider-container"><ul class="slides"><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_bangladesh_2016_320_200.svg" alt="" class="img-fluid flag-image"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_catalunya_2016_320_200.svg" alt="" class="flag-image img-fluid"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_china_2016_320_200.svg" alt="" class="flag-image img-fluid"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_england_2016_320_200.svg" alt="" class="flag-image img-fluid"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_france_2016_320_200.svg" alt="" class="flag-image img-fluid"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_germany_2016_320_200.svg" alt="" class="flag-image img-fluid"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_india_2016_320_200.svg" alt="" class="flag-image img-fluid"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_italy_2016_320_200.svg" alt="" class="flag-image img-fluid"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_japan_2016_320_200.svg" alt="" class="flag-image img-fluid"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_portugal_2016_320_200.svg" alt="" class="flag-image img-fluid"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_rusia_2016_320_200.svg" alt="" class="flag-image img-fluid"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_spain_2016_320_200.svg" alt="" class="flag-image img-fluid"></li><li><img src="'+globalPathToImgFolder+'flags/brqx_flag_ukraine_2016_320_200.svg" alt="" class="flag-image img-fluid"></li></ul></div></div><div class="col-1 lang-arrow-next"><button id="lang-button-next" type="button" class="btn btn-dark">&gt;</button></div><div class="col button-container text-right"><img src="'+globalPathToImgFolder+'buttons/dog_button_2017.svg" alt="" class="linkedin-button img-fluid dog-button"></div>');
	};
	$('.flag-image, .dogSelector').hover(
		function(){
			selectorXposition = $(this).offset().left;
			selectorYposition = $(this).offset().top;
			$('.container-fluid').append('<img class="dogSelector" src="'+globalPathToImgFolder+'selector/edu_dog_selectorb_2017.svg">');
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
			//$('.social-share-button').css('display', 'none')
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
/*	$('.google-button, .google-main').hover(function(){
		$('.twitter-container').css('display', 'none');
		$('.linkedin-container').css('display', 'none');
		$('.facebook-container').css('display', 'none');
		$('.google-container').css('display', 'block');
		socialChecker = true;
	}, function(){
		$('.social-close-button').css('display', 'block');
		$('.social-close-button').click(function(){
			$('.google-container').css('display', 'none');
			$(this).css('display', 'none');
			socialChecker = false;
		});
	});*/

	//delete
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
$('.background-row-light').each(function(){

	$(this).append(
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_001.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_002.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_003.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_004.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_005.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_006.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_007.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_008.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_009.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_010.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_011.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_012.svg" alt="" class="background-image img-fluid"></a></div>')
});
$('.background-row-dark').each(function(){
	$(this).append(
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_013.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_014.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_015.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_016.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_017.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_018.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_019.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_020.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_021.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_022.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-ligh col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_001.svg" alt="" class="background-image img-fluid"></a></div>'+
		'<div class="background-item background-item-dark col"><a src="#" class="background-link"><img src="'+globalPathToImgFolder+'square_dogs/dog_dark_002.svg" alt="" class="background-image img-fluid"></a></div>')
});
$('.background-image').hover(function(){
	let replaced = $(this).attr('src').replace('dark', 'light');
	$(this).attr('src', replaced);
}, function(){
	let replaced = $(this).attr('src').replace('light', 'dark');
	$(this).attr('src', replaced);
});
/*let srcsArray = $('.truck_links').attr('srcs').split(' ');//here is the sode for that dogswuare parser of links
console.log($('.background-link').length)
for (let i =0; i<=$('.background-link').length; i++) {
	console.log(i)
}*/
/////////////BACKGROUND CODE END/////////////////////////////////////////////////////////////////////
/////////////EDU LETTERS CODE BEGIN///////////////////////////////////////////////////////////////
function createEduLetters() {
	let result = true;
	let rand = (Math.random()*(1-0)+0);
	if ( device == 'Desktop' || device == 'LargeDesktop' && rand > 0.5) {
		$('.edu-letters-container-left').append('<a href="#"><img src="'+globalPathToImgFolder+'letters/edu_letter_e_2017.svg" alt="" class="img-fluid edu-letter"></a><a href="#"><img src="'+globalPathToImgFolder+'letters/edu_letter_d_2017.svg" alt="" class="img-fluid edu-letter"></a><a href="#"><img src="'+globalPathToImgFolder+'letters/edu_letter_u_2017.svg" alt="" class="img-fluid edu-letter edu-letter-last"></a>');
	} else if ( device == 'Desktop' || device == 'LargeDesktop' && rand < 0.5) {
		$('.edu-letters-container-right').append('<a href="#"><img src="'+globalPathToImgFolder+'letters/edu_letter_e_2017.svg" alt="" class="img-fluid edu-letter"></a><a href="#"><img src="'+globalPathToImgFolder+'letters/edu_letter_d_2017.svg" alt="" class="img-fluid edu-letter"></a><a href="#"><img src="'+globalPathToImgFolder+'letters/edu_letter_u_2017.svg" alt="" class="img-fluid edu-letter edu-letter-last"></a></div>');
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
	let blackDog = +$('.black-happy-dog').attr('data-black-dog-percent');
	let happyDog = +$('.black-happy-dog').attr('data-happy-dog-percent');
	let eduDog = +$('.black-happy-dog').attr('data-edu-dog-percent');
	let actualHeight;
	if (whichDog > blackDog && whichDog < happyDog+blackDog) {
		$('.black-happy-dog').attr('src', ''+globalPathToImgFolder+'dogs/edu_version_01_happy_dog.svg'); //happy
		actualHeight = 316
		$('.black-happy-dog').css('height', actualHeight)
	} else if (whichDog < blackDog){
		$('.black-happy-dog').attr('src', ''+globalPathToImgFolder+'dogs/edu_version_02_pixel_dog.svg'); //black
		actualHeight = 386
		$('.black-happy-dog').css('height', actualHeight)
	} else if (whichDog > happyDog+blackDog){
		$('.black-happy-dog').attr('src', ''+globalPathToImgFolder+'dogs/edu_version_03_real_dog.png'); //edu
		actualHeight = 154
		$('.black-happy-dog').css('height', actualHeight)
	};
	/*let position = $('.black-line-for-trigger').position();
	let h = $('body').height();
	let dogPosition = h - position.top;
	console.log('h',  h)
	console.log('position',  position.top)
	$('.black-happy-dog').css("bottom", dogPosition);*/
};
setTimeout(createDog, 1000);
/////////////BOTTOM DOGS CODE END/////////////////////////////////////////////////////////////////
/////////////COOKIESS CODE START//////////////////////////////////////////////////////////////////
function cookieAppear() {
	$('.cookie-div').html('<div class="cookie-container text-center col-10"><span>Este portal utiliza cookies para mejorar la experiencia en la navegación. Al continuar usádolo autorizas que se guarde esta información en tu navegador. Algunas cookies son fundamentales para que nuestro sitio pueda funcionar ; otras nos ayudan a mejorar la experiencia del usuari]. Al usar este sitio ,das tu consentimiento a la colocación de estas cookies en tu equipo. Consulta nuestra </span><br><a href="#">Política de Cookies</a></div>')
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
	let $marquee = $(
		'<div class="marquee-container">'+
			'<div class="marquee-up no-gutters row justify-content-between">'+
				'<div class="col-2 "><img class="img-fluid top-left-mq-arrow" src="'+globalPathToImgFolder+'arrows/hover_layer_arrow_up_2017.svg"></div>'+
				'<div class="col-2 "><img class="img-fluid top-right-mq-arrow" src="'+globalPathToImgFolder+'arrows/hover_layer_arrow_up_2017.svg"></div>'+
			'</div>'+
			'<div class="marquee row no-gutters justify-content-center"><div class="col-8 mq-fix"><div class="mq-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</div></div></div>'+
			'<div class="marquee-down no-gutters row justify-content-between">'+
				'<div class="col-2"><img class="img-fluid bott-left-mq-arrow" src="'+globalPathToImgFolder+'arrows/hover_layer_dog_arrow_left_down_2017.svg"></div>'+
				'<div class="col-2"><img class="img-fluid bott-right-mq-arrow" src="'+globalPathToImgFolder+'arrows/hover_layer_dog_arrow_right_down_2017.svg"></div>'+
			'</div>'+
		'</div>'
	);
	$('#frame').append($marquee);
	$('.marquee-container').css('visibility', 'visible');
	if (!Cookies.get('c_fontSize')) {///COOKIES FONT SIZE HERE!!!!
		$('.mq-text').css('font-size', '14px');
	} else {
		var size = Cookies.get('c_fontSize');
		$('.mq-text').css('font-size', size);
	};
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
$('.mini-edu ').hover(function(){
	$('.mini-edu ').css('width', '200px');
	$('.mini-edu ').css('height', '200px');
	$('.mini-edu-img-1').css('display', 'none');
	$('.page-information').css('display', 'block');
	$('.mini-edu-img-2').css('display', 'block');
	$('.mini-edu ').css('background-image', 'url('+globalPathToImgFolder+'round_square/dog_footprint_200_2017.svg)');
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
	let h = $('html').height()/*+'px'*/;//if wont work fix here
	/*if (h > $(window).height()) {
		*/$('.helper').css('height', h+'px');
	/*} else {
		$('.helper').css('height', $(window).height());
	}*/
	//$('.helper').css('height', h);
	$('.helper').toggle();
	$('.page-information').toggleClass( "page-information-clicked");
	$('.mini-edu').toggleClass( "mini-edu-clicked");
	$('.texted').text($('.texted').text() == 'PAGE INFORMATION (CLICK TO EXPAND)' ? 'Go Back' : 'PAGE INFORMATION (CLICK TO EXPAND)');
	//$('.texted').text($('.texted').text() == 'Go Back' ? 'Go Back' : 'PAGE INFORMATION<br>(CLICK TO EXPAND)');
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
$('.info-cloud-bot-row-button').mouseenter(function(){
	if ( sandbox ){
		sandbox = false;
	$('.helper').append(`
			<div class="sandbox text-center">
				<div class="sandbox-scroll-up sandbox-scroll"></div>
				<h6>This is sandbox where you can see how things work</h6>
				<div class="sand-mq">
					<div class="sand-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae, quidem nostrum quibusdam quam, eligendi veritatis perspiciatis ullam ratione libero in quia soluta reprehenderit, ipsa similique neque minima? Nobis, eveniet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
					</div>
				</div>
				<div class="sandbox-scroll-down sandbox-scroll"></div>
				<a class="close-sandbox">[X]</a>
			</div>
		`);
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
$('.link-container').hover(function(){
	$(this).css('background-image', 'url('+globalPathToImgFolder+'bones/gold_dog_bone_2017.svg)')
},function(){
	$(this).css('background-image', 'url('+globalPathToImgFolder+'bones/white_dog_bone_2017.svg)')
});
$('.link-container').click(function(){
	$(this).css('background-image', 'url('+globalPathToImgFolder+'bones/orange_dog_bone_2017.svg)')
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
/////////////LINKS END//////////////////////////////////////////////////////////////////////////
/////////////SOCIALSS START/////////////////////////////////////////////////////////////////////
/*function showLinkedin() {
	$('.linkedin-container').css('z-index', '14')
};
function closeLinkedin() {
	$('.linkedin-container').css('z-index', '11')
	$('.linkedin-container').html('');
	$('.linkedin-container').css('background-color', 'transparent');
	$('.linkedin-container').css('overflow-y', 'hidden')
};
function showTwitter() {
	$('.linkedin-container').css('z-index', '14')
	$('.linkedin-container').css('overflow-y', 'scroll')
	$('.linkedin-container').css('background-color', 'white')
	$('.linkedin-container').hover(function(){
		$('.linkedin-container').append('<div class="close-linkedin">Close</div>')
		$('.close-linkedin').click(closeLinkedin);
	},
	function(){
		$('.close-linkedin').remove()
	})
};
function showFacebook() {
	$('.linkedin-container').css('z-index', '14')
	$('.linkedin-container').css('overflow-y', 'scroll')
	$('.linkedin-container').css('background-color', 'white')
	$('.linkedin-container').hover(function(){
		$('.linkedin-container').append('<div class="close-linkedin">Close</div>')
		$('.close-linkedin').click(closeLinkedin);
	},
	function(){
		$('.close-linkedin').remove()
	})
};
$('.facebook-button').click(showFacebook)*/
/////////////SOCIALSS END///////////////////////////////////////////////////////////////////////
/////////////BRIGHTNESS START///////////////////////////////////////////////////////////////////
function getCoords(elem) {
	let box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
};
/*
let block1 = document.getElementById('container-fluid');
let sliderElem1 = document.getElementById('slider1');
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
};*/
/////////////BRIGHTNESS END/////////////////////////////////////////////////////////////////////
//share

/*$('#demo1').sharrre({
	share: {
		facebook: true
	},
	buttons: {
		googlePlus: {size: 'tall', annotation:'bubble'},
		facebook: {layout: 'box_count'},
		twitter: {count: 'vertical', via: '_JulienH'}
	},
	hover: function(api, options){
		$(api.element).find('.buttons').show();
	},
	hide: function(api, options){
		$(api.element).find('.buttons').hide();
	},
	enableTracking: true
});*/

setTimeout(function(){
	let height = $('body').height();
	$('.background-container').css('min-height', height);
}, 1000);
console.log($('body').height())

});
