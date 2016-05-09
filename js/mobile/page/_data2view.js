//路径类型
var PATH_TYPE_IMG='img';
var PATH_TYPE_MUSIC='music';
var PATH_TYPE_VIDEO='video';
//页面类型
var PAGE_TYPE_BIGTXT='bigTxt';
var PAGE_TYPE_VIDEO='video';
var PAGE_TYPE_BOOK='book';
var PAGE_TYPE_CONTACT='contact';
var PAGE_TYPE_ANIMATION='animation';
var PAGE_TYPE_ROUND='round';
var PAGE_TYPE_SHARE='share';
//视频类型
var VIDEO_UPLOAD='upload';
var VIDEO_LINK='link';
//大图文页面的按钮类型
var BIGTXT_BUTTON_IMG='img';
var BIGTXT_BUTTON_FONT='font';
//大图文页面的按钮链接类型
var BIGTXT_BUTTON_LINK='link';
var BIGTXT_BUTTON_TEL='tel';
var BIGTXT_BUTTON_WEIXIN='weixin';
//是否开启音乐标识位，给后面使用
var isOpenMusic=false;
var prefixToRedirect="/mask/cover";
var prefixToRedirectUpload="/mask/cover/upload/image/";

//分享引导图
function showGuide(){
	$('#shareMask').show();
	$('#shareImg').show();
}
$('#shareImg,#shareMask').click(function(){
	$('#shareMask').hide();
	$('#shareImg').hide();
});

//展示留言板
function showMessage(messageTitle,messageContentTip,messageNameTip,messageColor){
	var $messageLayer=$('.m-words-wall.m-message');
	$messageLayer.find('.title>h3').html(messageTitle);
	$messageLayer.find('.content-wrap textarea.j-wall-txt').attr('placeholder',messageContentTip);
	$messageLayer.find('.content-wrap input.j-wall-input').attr('placeholder',messageNameTip);
	$messageLayer.find('.title').css('background',messageColor);
	$messageLayer.find('.j-wall-submit').css('background',messageColor);
	$messageLayer.css('top','0').show();
	$messageLayer.css('opacity','1');
	$messageLayer.find('.wrap').css('bottom','30px');
	page.page_stop();
}
$('.m-words-wall.m-message .j-wall-close').click(function(e){	
	var $messageLayer=$('.m-words-wall.m-message');
	$messageLayer.find('.wrap').css('bottom','-3000px');
	setTimeout(function(){
		$messageLayer.css('opacity','0');
		setTimeout(function(){
			$messageLayer.hide();
			page.page_start();			
		},400);	
	},100);
});
$('.m-words-wall.m-message .j-wall-edit').click(function(e){	
	var $messageLayer=$('.m-words-wall.m-message');
	$messageLayer.find('.content-wrap textarea.j-wall-txt').focus();
});
$('.m-words-wall.m-message').click(function(e){	
	if($(e.srcElement).closest('.wrap').length!=0) return;	
	var $messageLayer=$('.m-words-wall.m-message');
	$messageLayer.find('.wrap').css('bottom','-3000px');
	setTimeout(function(){
		$messageLayer.css('opacity','0');
		setTimeout(function(){
			$messageLayer.hide();
			page.page_start();			
		},400);	
	},100);
});
$(window).resize(function(){
	var dHeight=$(document).height();
	var maxHeight=dHeight-140;
	var $messageLayer=$('.m-words-wall.m-message');
	var $el=$messageLayer.find('.content');
	if(maxHeight>715){
		$el.height(715);
		$messageLayer.find('.wrap').css('top','auto');		
	}else{
		$el.height(maxHeight);
		$messageLayer.find('.wrap').css('top','22px');
	}
});

//预约
function initEditItem(bookData){
	var html='';
	for(var i=0;i<bookData.length;i++){
		var d=bookData[i];
		if(!d.isShow || d.isShow=='false'){
			continue;
		}
		if(!d) break;
		if(d.name=='name'){
			html+='<dl isMust="'+d.isMust+'"><dt>'+d.text+':</dt><dd><input type="text" maxlength="20" name="'+d.name+'" required="required" placeholder="'+d.placeholder+'"></dd></dl> ';
		}else if(d.name=='tel'){
			html+='<dl isMust="'+d.isMust+'"><dt>'+d.text+':</dt><dd><input type="text" maxlength="11" name="'+d.name+'" required="required" placeholder="'+d.placeholder+'"></dd></dl> ';
		}else if(d.type=='date'){
			html+='<dl isMust="'+d.isMust+'"><dt>'+d.text+':</dt><dd><input type="text" maxlength="20" class="picker_input picker_data picker__input" onblur="return false;" name="'+d.name+'" required="required" placeholder="'+d.placeholder+'"></dd></dl> ';
		}else if(d.type=='select'){
			html+='								<dl isMust="'+d.isMust+'"> '+
						'									<dt class="icon-job">'+d.text+':</dt> '+
						'									<dd> '+
						'										<label> <select name="'+d.name+'" '+
						'											style="border: none; background: transparent; width: 100%; outline: none; margin-left: -23px"> '+
						'												<option val="">请选择</option> ';
						if(d.placeholder){
							var arr=d.placeholder.split('|');
							for(var j=0;j<arr.length;j++){
								html+='<option val="'+arr[j]+'">'+arr[j]+'</option>';
							}
						}
			html+='										</select> '+
						'										</label> '+
						'									</dd> '+
						'								</dl> ';
		}else if(d.type=='text'){
			html+='<dl isMust="'+d.isMust+'"><dt>'+d.text+':</dt><dd><input type="text" maxlength="50" name="'+d.name+'" required="required" placeholder="'+d.placeholder+'"></dd></dl> ';
		}
	}
	$('.m-contactFormLayer .item-content').html(html);
}
//展示预约
function showBook(bookTitle,bookBtnText,bookColor){
	var $bookLayer=$('.m-contactFormLayer');
	$bookLayer.find('.m-contactForm>h2>span').html(bookTitle);
	$bookLayer.find('.btn-submit').html(bookBtnText);
	$bookLayer.find('.btn-submit').css('background',bookColor);
	$bookLayer.find('.u-maskLayer-close').css('background',bookColor);
	$bookLayer.show();
	$bookLayer.removeClass('z-hide').addClass('z-show');
	page.page_stop();
}
$('.u-maskLayer.m-contactFormLayer .u-maskLayer-close,.u-maskLayer.m-contactFormLayer').click(function(e){
	if($(e.srcElement).closest('.m-contactForm').length!=0) return;	
	var $bookLayer=$('.m-contactFormLayer');
	$bookLayer.removeClass('z-show').addClass('z-hide');
	setTimeout(function(){
		$bookLayer.hide();
		page.page_start();	
	},500);
});

//展示视频
function showVedio(content,closeColor){
	content=content.replace(/&quot;/g,'"');
	closeColor=closeColor?closeColor:'#000000';
	var $vedioLayer=$('.u-maskLayer.m-youkuVideoLayer');
	$vedioLayer.find('.u-maskLayer-close').css('background',closeColor);
	$vedioLayer.show();
	$vedioLayer.removeClass('z-hide').addClass('z-show');
	setTimeout(function(){
		$vedioLayer.find('.m-Video-box').html(content);		
		if (media._audio){
			media._audioNode.addClass('close');
			media._audio.pause();
		}
		page.page_stop();
	},400);
}
$('.u-maskLayer.m-youkuVideoLayer .u-maskLayer-close,.u-maskLayer.m-youkuVideoLayer').click(function(){
	var $vedioLayer=$('.u-maskLayer.m-youkuVideoLayer');
	$vedioLayer.removeClass('z-show').addClass('z-hide');
	setTimeout(function(){
		$vedioLayer.hide();
		if(!media._audio_val && media._audio){
			media._audioNode.removeClass('close');
			media._audio.play();
		}
		page.page_start();
		$vedioLayer.find('.m-Video-box').html('');	
	},500);
});

//展示iframe
var iframeSrc;
function showIframe(title,content,pColor){
	var $iframeLayer=$('.m-words-wall.m-iframe');
	$iframeLayer.find('.title>h3>span').html(title);
	$iframeLayer.find('.title').css('background',pColor);
	$iframeLayer.find('.content').height($(document).height()-138);
	var $newIframe=$('<iframe style="width:100%;height:100%;" scrolling="yes" frameborder="0"></iframe>');
	$iframeLayer.find('.content').html('').append($newIframe);
	$newIframe.height($(document).height()-138);
	$iframeLayer.css('top','0').show();
	$iframeLayer.css('opacity','1');
	iframeSrc=content;
	$iframeLayer.find('.wrap').css('top','25px');
	setTimeout(function(){
		$newIframe[0].contentWindow.location.href=content;
	},400);
	page.page_stop();
}
$('.m-words-wall.m-iframe .j-wall-close').click(function(e){	
	var $iframeLayer=$('.m-words-wall.m-iframe');
	$iframeLayer.find('.wrap').css('top','2000px');
	setTimeout(function(){
		$iframeLayer.css('opacity','0');
		setTimeout(function(){
			$iframeLayer.hide();
			page.page_start();			
		},400);	
	},100);
	page.page_start();	
});
$('.m-words-wall.m-iframe .j-wall-edit').click(function(e){	
	var $iframeLayer=$('.m-words-wall.m-iframe');
	$iframeLayer.find('.content>iframe').attr('src',iframeSrc);
});
$('.m-words-wall.m-iframe').click(function(e){	
	if($(e.srcElement).closest('.wrap').length!=0) return;	
	var $iframeLayer=$('.m-words-wall.m-iframe');
	$iframeLayer.find('.wrap').css('top','2000px');
	setTimeout(function(){
		$iframeLayer.css('opacity','0');
		setTimeout(function(){
			$iframeLayer.hide();
			page.page_start();			
		},400);	
	},100);
	page.page_start();	
});
$(window).resize(function(){
	var $iframeLayer=$('.m-words-wall.m-iframe');
	$iframeLayer.find('.content').height($(document).height()-138);
	$iframeLayer.find('.content>iframe').height($(document).height()-138);
});

// 创建大图文页面
function createBitTxt(bg,summary,detail,openBtn,bType,bContent,bLinkType,bLinkContent){	
	bg=getUrl(bg,PATH_TYPE_IMG);	
	var html='<div class="m-page m-bigTxt f-hide f-hide-animation" data-page-type="bigTxt" '+
		'data-statics="info_list"> ';	
	if(summary && detail){
		html+='<div class="page-con j-txtWrap lazy-img" '+
			'data-src="'+bg+'"> '+
			'<div class="bigTxt-bd j-txt"> '+
				'<div class="bigTxt-title j-title"> '+
					'<p>'+summary+'</p> '+
					'<span class="bigTxt-arrow txt-arrow css_sprite01 f-cur"></span> '+
				'</div> '+
				'<div class="bigTxt-detail j-detail"> '+
					'<p>'+detail+'</p> '+
				'</div> '+
			'</div> '+
		'</div>';
	}else{
		html+='<div class="page-con j-txtWrap lazy-img" '+
			'data-src="'+bg+'"> '+
			'</div>';
	}		
	if(openBtn){
		if(bType==BIGTXT_BUTTON_IMG){
			bContent=getUrl(bContent,PATH_TYPE_IMG);
			html+='<div class="bigTxt-btn bigTxt-btn-wx lazy-img" '+
				'data-src="'+bContent+'"> '+
				'<a href="'+(bLinkType==BIGTXT_BUTTON_LINK?bLinkContent:bLinkType==BIGTXT_BUTTON_TEL?'tel:'+bLinkContent:'javascript:void(0)')+'"></a> '+
			'</div>';
		}else if(bType==BIGTXT_BUTTON_FONT){
			var defaultBg=getUrl('/image/mobile/bigtxt_bg_02@2x.jpg',PATH_TYPE_IMG);
			html+='<div class="bigTxt-btn bigTxt-btn-wx lazy-img" '+
				'data-src="'+defaultBg+'"> '+
				'<a href="'+(bLinkType==BIGTXT_BUTTON_LINK?bLinkContent:bLinkType==BIGTXT_BUTTON_TEL?'tel:'+bLinkContent:'javascript:void(0)')+'">'+bContent+'</a> '+
			'</div>';
		}
	}	
	if(bLinkType==BIGTXT_BUTTON_WEIXIN){
		var defaultGuide=getUrl(bLinkContent?bLinkContent:'image/mobile/weixin-share-guide.png',PATH_TYPE_IMG);
		html+='<div class="bigTxt-weixin"> '+
			'<img src="'+defaultGuide+'"> '+
		'</div>';
	}		
	html+='</div>';	
	$('div.translate-back').append($(html));
}

//创建视频页面
function createVideo(bg,title,titleColor,detail,detailColor,vType,vCover,videoUrl,vLink){
	bg=getUrl(bg,PATH_TYPE_IMG);
	vCover=getUrl(vCover,PATH_TYPE_IMG);
	videoUrl=getUrl(videoUrl,PATH_TYPE_VIDEO);
	var html;
	if(vType==VIDEO_UPLOAD){
		html='<div class="m-page m-video f-hide f-hide-animation" data-page-type="video" '+
							'data-statics="video_list"> '+
						'<div class="page-con lazy-img" '+
							'data-src="'+bg+'"> '+
							'<div class="video-con j-video" data-width="640" data-height="480" '+
							'	data-src="'+videoUrl+'"> '+
							'	<div class="img lazy-img" '+
							'		data-src="'+vCover+'"> '+
							'		<span class="css_sprite01"></span> '+
							'	</div> '+
							'</div> '+
							'<div class="video-title"> '+
							'	<h4 class="f-tc" style="color: '+titleColor+';">'+title+'</h4> '+
							'	<p style="color:'+detailColor+';">'+detail+'</p>'+
							'</div> '+
						'</div> '+
					'</div> ';
	}else if(vType==VIDEO_LINK){
		if(!vCover){
			vCover=getUrl('/image/admin/module/video_bg_01@2x.jpg',PATH_TYPE_IMG);
		}
		html='<div class="m-page m-video f-hide f-hide-animation" data-page-type="video" '+
			'data-statics="video_list"> '+
			'<div class="page-con lazy-img" '+
				'data-src="'+bg+'"> '+
				'<div class="video-con" data-width="640" data-height="480"> '+
				'	<div class="img lazy-img" '+
				'		data-src="'+vCover+'"> '+
				'		<span class="css_sprite01 m-btnPlay a-bouncein"></span> '+
				'	</div> '+
				'</div> '+
				'<div class="u-maskLayer m-youkuVideoLayer z-hide" style="display: none;background-color: rgba(0, 0, 0, 0.7);"> '+
				'	<div class="m-Video-box" style="position: absolute;top: 250px;width:640px;height:480px;" id="videoBody_3"  video-data="'+vLink+'"> '+
				'		<!-- <iframe height=460px width=640px src=http://player.youku.com/embed/XNzQ0NzkyNTcy frameborder=0 allowfullscreen autoplay></iframe> --> '+
				'		<!-- <video autoplay="autoplay" controls="" preload="preload" width="640" height="480" src="http://127.0.0.1//media/mobile/jiebao/5351334a9775925673.mp4"></video> --> '+
				'	</div> '+
				'	<a href="javascript:void(0);" class="u-maskLayer-close" style="background: #000000;"></a>'+
				'</div> '+
				'<div class="video-title" style="padding: 15px 10px;"> '+
				'	<h4 class="f-tc" style="font-size: 26px;color: '+titleColor+';  margin-bottom: 8px;text-align: left;font-weight: bold;">'+title+'</h4> '+
				'	<p style="color:'+detailColor+';">'+detail+'</p>'+
				'</div> '+
			'</div> '+
		'</div> ';
	}
	$('div.translate-back').append($(html));
}

//创建预定页面
function createBook(bg,title,titleColor,buttonTxt,buttonColor,isShare,bookData){
	bg=getUrl(bg,PATH_TYPE_IMG);
	var nBookData=[];
	for(var i=0;i<bookData.length;i++){
		if(bookData[i] && bookData[i].isShow){
			nBookData.push(bookData[i]);
		}
	}
	bookData=nBookData;
	var html='<div class="m-page m-bigTxt m-page7 f-hide f-hide-animation" data-page-type="bigTxt" '+
					'	data-statics="info_list" data-translate="" style=""> '+
					'<div class="page-con j-txtWrap lazy-img" '+
					'	data-src="'+bg+'"> '+
					'	<div class="wct"> '+
					'		<h3 style="color:'+titleColor+'">'+title+'</h3> '+
					'		<form class="wct_form"> '+
					'			<div class="tableWrap tableWrap-1"> '+
					'				<table> '+
					'					<colgroup> '+
					'						<col width="30%"> '+
					'						<col width="70%"> '+
					'					</colgroup> '+
					'					<tbody> ';
	
					for(var i=0;i<4;i++){
						
						var d=bookData[i];
						if(!d) break;
						if(d.name=='name'){
							html+='<tr class="base-info" isMust="'+d.isMust+'"> '+
										'	<th><span>'+d.text+'</span></th> '+
										'	<td><input class="base-info-input" type="text" maxlength="20" '+
										'			placeholder="'+d.placeholder+'" name="'+d.name+'" onblur="return false;"> '+
										'	</td> '+
										'</tr> ';
						}else if(d.name=='sex'){
							html+='<tr class="base-info" isMust="'+d.isMust+'"> '+
										'	<th><span>'+d.text+'</span></th> '+
										'	<td> '+
										'		<p class="sex" data-sex="1"> '+
										'			<span class="select"><strong></strong></span><span '+
										'				class="value">女士</span> '+
										'		</p> '+
										'		<p class="sex" data-sex="2"> '+
										'			<span class="select"><strong></strong></span><span '+
										'				class="value">先生</span> '+
										'		</p> <input type="hidden" class="base-info-input" value="" '+
										'		name="sex"> '+
										'	</td> '+
										'</tr> ';
						}else if(d.name=='tel'){
							html+='<tr class="base-info" isMust="'+d.isMust+'"> '+
										'	<th><span>'+d.text+'</span></th> '+
										'	<td><input class="base-info-input" type="tel"  maxlength="11" '+
										'		placeholder="'+d.placeholder+'" name="'+d.name+'" onblur="return false;"> '+
										'	</td> '+
										'</tr> ';
						}else if(d.type=='date'){
							html+='<tr class="base-info" isMust="'+d.isMust+'"> '+
							'	<th><span>'+d.text+'</span></th> '+
							'	<td><input type="tel"  maxlength="20" '+
							'		 class="picker_input picker_data picker__input" placeholder="'+d.placeholder+'" name="'+d.name+'" onblur="return false;"> '+
							'	</td> '+
							'</tr> ';
						}else if(d.type=='select'){
							html+='<tr class="base-info" isMust="'+d.isMust+'"> '+
							'	<th><span>'+d.text+'</span></th> '+
							'	<td><select style="width:88%" name="'+d.name+'">';		
							html+='<option val="">请选择</option>';					
							if(d.placeholder){
								var arr=d.placeholder.split('|');
								for(var j=0;j<arr.length;j++){
									html+='<option val="'+arr[j]+'">'+arr[j]+'</option>';
								}
							}							
							html+='</select></td> '+
							'</tr> ';
						}else if(d.type=='text'){
							html+='<tr class="base-info" isMust="'+d.isMust+'"> '+
							'	<th><span>'+d.text+'</span></th> '+
							'	<td><input class="base-info-input" type="text"  maxlength="50" '+
							'		placeholder="'+d.placeholder+'" name="'+d.name+'" onblur="return false;"> '+
							'	</td> '+
							'</tr> ';
						}
						
					}
					
				html+='</tbody></table> ';
				
				if(bookData.length>4){
					html+='<div class="edit-more-info"> '+
						'	<div class="txt">完善更多信息</div> '+
						'</div> ';
				}
							
				html+='<p class="submit submit-custom btn-boder-color" style="background:'+buttonColor+'"> '+
							'	<input type="button" class="submitBtn" value="'+buttonTxt+'"> '+
							'</p> ';
					
				if(isShare){
					html+='				<p class="share btn-boder-color" data-id="25676"> '+
					'					<a href="javascript:void(0);"><span '+
					'						class="share_icon css_sprite01 css_sprite01_n"></span>&nbsp;立即分享</a> '+
					'				</p> ';	
				}
					
					
				html+='			</div> '+
					'			<div class="tableWrap tableWrap-2" style="margin-left: 0px;"> '+
					'				<table> '+
					'					<colgroup> '+
					'						<col width="30%"> '+
					'						<col width="70%"> '+
					'					</colgroup> '+
					'					<tbody> ';
				
				for(var i=4;i<bookData.length;i++){
					
					var d=bookData[i];
					if(!d) break;
					if(d.type=='date'){
						html+='<tr class="more-info" isMust="'+d.isMust+'"> '+
									'	<th><span>'+d.text+'</span></th> '+
									'	<td><input type="text" class="picker_input picker_data picker__input" placeholder="'+d.placeholder+'"  maxlength="20" '+
									'			 name="'+d.name+'"></td> '+
									'</tr> ';
					}else if(d.type=='select'){
						html+='<tr class="more-info" isMust="'+d.isMust+'"> '+
						'	<th><span>'+d.text+'</span></th> '+
						'	<td><select style="width:88%" name="'+d.name+'">';		
						html+='<option val="">请选择</option>';
						if(d.placeholder){
							var arr=d.placeholder.split('|');
							for(var j=0;j<arr.length;j++){
								html+='<option val="'+arr[j]+'">'+arr[j]+'</option>';
							}
						}							
						html+='</select></td> '+
						'</tr> ';
					}else if(d.type=='text'){
						html+='<tr class="more-info" isMust="'+d.isMust+'"> '+
									'	<th><span>'+d.text+'</span></th> '+
									'	<td><input type="text" name="'+d.name+'" placeholder="'+d.placeholder+'" maxlength="50" ></td> '+
									'</tr> ';
					}
					
				}
					
				html+='	</tbody> '+
					'				</table> '+
					'				<p class="submit submit-2 submit-custom btn-boder-color"> '+
					'					<input type="button" class="submitBtn" value="'+buttonTxt+'"> '+
					'				</p> '+
					'				<p class="submit submit-3 btn-boder-color return"> '+
					'					<input type="button" value="返回"> '+
					'				</p>				 '+
					'			</div> '+
					'			<p class="popup popup_error"></p> '+
					'			<p class="popup popup_sucess">幸苦了！谢谢您的预约！</p> '+
					'		</form> '+
					'	</div>		 '+		
					'</div> '+
				'</div>';
	$('div.translate-back').append($(html));
}

function createContact(bg,tel,address,latitude,longitude,worktime,title,summary,imgs){	
	if(!address){
		address='本元大厦';
	}
	if(!latitude||!longitude){
		latitude='22.541544';
		longitude='114.032837'; 
	}	
	bg=getUrl(bg,PATH_TYPE_IMG);
	var arr=imgs.split(',');
	var n_imgs='';
	for(var i=0;i<arr.length;i++){
		if(i!=0){
			n_imgs+=',';
		}
		n_imgs+=getUrl(arr[i],PATH_TYPE_IMG);
	}
	var html='<div class="m-page m-page6 m-bigTxt f-hide f-hide-animation" data-page-type="bigTxt" '+
					'	data-statics="info_list">  '+
					'	<div class="page-con j-txtWrap lazy-img" '+
					'		data-src="'+bg+'">					 '+
					'		<div class="m-map" style="'+((!imgs||imgs.length==0)?'height:400px':'')+'"> '+
					'			<div id="ylMap" class="ylMap"></div> '+
					'			<div class="mapVal "> '+
					'				<input class="address" type="hidden" value=\'{"sign_name":"","contact_tel":"'+tel+'","address":"'+address+'"}\'> '+
					'				<input class="latitude" type="hidden" value="'+latitude+'"> '+
					'				<input class="longitude" type="hidden" value="'+longitude+'"> '+
					'			</div> '+
					'			<div class="tit"> '+
					'				<p><a href="#"><span class="css_sprite01 css_sprite01_m"></span>'+address+'</a></p> '+
					'				<a class="close_map css_sprite01" href="javascript:void(0)"></a> '+
					'			</div> '+
					'		</div> ';
	
		if(imgs&&imgs.length>0){
			html+='		<div class="u-img"> '+
			'			<div class="imgSlider"> '+
			'				<input type="hidden" value="'+n_imgs+'" /> '+
			'			</div> '+
			'		</div> ';
		}	
					
		html+='		<div class="m-intro"> '+
					'			<h3>'+title+'</h3> '+
					'			<div class="m-txt m-txt02 txt" data-txt="1" style="height: 50px;max-height: 250px; width: 560px;z-index:9999;"> '+
					'				<div class="wtxt"> '+
					'					<p>'+summary+'</p> '+
					'				</div><span class="expand css_sprite01 css_sprite01_j"></span>	 '+						
					'			</div> '+
					'			<div class="btn"> ';
		
		if(worktime){
			html+=	'<p class="time"><a href="#"><span class="css_sprite01 css_sprite01_c"></span>'+worktime+'</a></p> ';
		}
		
		html+=	'				<p class="tel btn-boder-color"><a href="tel:'+tel+'"><span class="css_sprite01 css_sprite01_t"></span>'+tel+'</a></p> '+
					'			</div> '+
					'		</div> '+
					'	</div> '+
					'</div>';
	$('div.translate-back').append($(html));
}

function createRound(bg,imgs){
	bg=getUrl(bg,PATH_TYPE_IMG);
	var first='',iStr='';
	if(imgs){
		var iArr=imgs.split(',');
		for(var i=0;i<iArr.length;i++){
			if(i==0){
				first=getUrl(iArr[i],PATH_TYPE_IMG);
			}else{
				iStr+=',';
			}
			iStr+=getUrl(iArr[i],PATH_TYPE_IMG);
		}
	}	
	var html='<div class="m-page m-page4 m-bigTxt f-hide f-hide-animation" data-page-type="bigTxt" '+
					'	data-statics="info_list"> '+
					'<div class="page-con j-txtWrap lazy-img" data-src="'+bg+'">		 '+			
					'	<div class="m-exhibit"> '+
					'		<div class="imgbox"> '+
					'			<span class="boxWrap"></span> '+
					'			<img class="lazy-bk" src="'+first+'"/> '+
					'			<input type="hidden" value="'+iStr+'"> '+
					'		</div> '+
					'	</div> '+
					'</div> '+
				'</div>';
	$('div.translate-back').append($(html));	
}

function getContent(str){
	str = str.replace(/&/g, "&amp;");
	str = str.replace(/</g, "&lt;");
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/"/g, "&quot;");
	str = str.replace(/'/g, "&squo;");
	str = str.replace(/\r\n/g, "");
	str = str.replace(/\r/g, "");
	str = str.replace(/\n/g, "");
	return str;
}

function parseContent(str){
	str = str.replace(/&amp;/g, "&");
	str = str.replace(/&lt;/g, "<");
	str = str.replace(/&gt;/g, ">");
	str = str.replace(/&quot;/g, '"');
	str = str.replace(/&squo;/g, "'");
	return str;
}

//让所有动画图片都先加载完成
var vcount=0;
var maskinit=true;
function loadImgAndPos(src,id){
	if(!src || src.length==0 || src.indexOf('bar-t-1px.png')>0){
		src='img/a203937a-669d-44f3-aa48-3dccb51196e2.png';
	}
	vcount++;
	var img=new Image();
	img.src=src;
	img.onload=function(){
		vcount--;
		if(vcount==0){
			window.loadingStep++;
			if(window.loadingStep==2 && maskinit){
				loading.hide();
				$(".m-page").eq(0).removeClass('f-hide-animation').removeClass('f-hide');
				var $animationEl=$(".m-page").eq(0).find('.animationEl');
				$animationEl.show();	
				$animationEl.each(function(){
					var $self=$(this);
					handleAnimation($(this));				
				});
				media.media_init();
				setTimeout(function(){
					media.audio_play();
				},1000);
			}	
		}
		var $el=$('#'+id);
		var yuanjiao=$el.attr('yuanjiao');
		$el.find('.rotate>a').append('<img style="width:100%;z-index: -1;height:100%;position: absolute;left:0px;top:0px;border-radius:'+yuanjiao+'px;-webkit-border-radius:'+yuanjiao+'px;" src="'+src+'">');
		var w=$el.width()?$el.width():img.width;
		var h=$el.height()?$el.height():img.height;
		if($el.width()!=w){
			$el.width(w);
		}
		if($el.height()!=h){
			$el.height(h);
		}
		//定位
		var parr=$el.attr('pos').split('::');
		var pt=parr[0],offX=parseFloat(parr[1]),offY=parseFloat(parr[2]),mtop=0,mleft=0;
		if(pt=='left'){
			mtop=0-h/2+offY;
			mleft=offX;
			$el.css('top','50%').css('left','0px').css('margin-top',mtop).css('margin-left',mleft);
		}else if(pt=='right'){
			mtop=0-h/2+offY;
			mleft=offX;
			$el.css('top','50%').css('right','0px').css('margin-top',mtop).css('margin-right',0-mleft);
		}else if(pt=='top'){
			mtop=offY;
			mleft=0-w/2+offX;
			$el.css('top','0px').css('left','50%').css('margin-top',mtop).css('margin-left',mleft);
		}else if(pt=='bottom'){
			mtop=offY;
			mleft=0-w/2+offX;
			$el.css('bottom','0px').css('left','50%').css('margin-bottom',0-mtop).css('margin-left',mleft);
		}else if(pt=='center'){
			mtop=0-h/2+offY;
			mleft=0-w/2+offX;
			$el.css('top','50%').css('left','50%').css('margin-top',mtop).css('margin-left',mleft);
		}else if(pt=='leftTop'){
			mtop=offY;
			mleft=offX;
			$el.css('top','0px').css('left','0px').css('margin-top',mtop).css('margin-left',mleft);
		}else if(pt=='leftBottom'){
			mtop=offY;
			mleft=offX;
			$el.css('bottom','0px').css('left','0px').css('margin-bottom',0-mtop).css('margin-left',mleft);
		}else if(pt=='rightTop'){
			mtop=offY;
			mleft=offX;
			$el.css('top','0px').css('right','0px').css('margin-top',mtop).css('margin-right',0-mleft);
		}else if(pt=='rightBottom'){
			mtop=offY;
			mleft=offX;
			$el.css('bottom','0px').css('right','0px').css('margin-bottom',0-mtop).css('margin-right',0-mleft);
		}
	}
	img.onError=function(){
		$('#'+id+'>a').css('display','none!important');
	}
}

function loadTextAndPos(content,id){

	setTimeout(function(){
		var $content=$('<span>'+content+'</span>');
		$content.css('display','inline-block').css('position','absolute').css('top','-2000px');
		$('body').append($content);
		var w=$content.width();
		var h=$content.height();
		$content.remove();
		var $el=$('#'+id);
		w=$el.attr('pw');
		h=$el.attr('ph');
		if($el.width()!=w){
			$el.width(w);
		}
		if($el.height()!=h){
			$el.height(h);
		}
		//定位
		var parr=$el.attr('pos').split('::');
		var pt=parr[0],offX=parseFloat(parr[1]),offY=parseFloat(parr[2]),mtop=0,mleft=0,h=parseFloat(h),w=parseFloat(w);
		if(pt=='left'){
			mtop=0-h/2+offY;
			mleft=offX;
			$el.css('top','50%').css('left','0px').css('margin-top',mtop).css('margin-left',mleft);
		}else if(pt=='right'){
			mtop=0-h/2+offY;
			mleft=offX;
			$el.css('top','50%').css('right','0px').css('margin-top',mtop).css('margin-right',0-mleft);
		}else if(pt=='top'){
			mtop=offY;
			mleft=0-w/2+offX;
			$el.css('top','0px').css('left','50%').css('margin-top',mtop).css('margin-left',mleft);
		}else if(pt=='bottom'){
			mtop=offY;
			mleft=0-w/2+offX;
			$el.css('bottom','0px').css('left','50%').css('margin-bottom',0-mtop).css('margin-left',mleft);
		}else if(pt=='center'){
			mtop=0-h/2+offY;
			mleft=0-w/2+offX;
			$el.css('top','50%').css('left','50%').css('margin-top',mtop).css('margin-left',mleft);
		}else if(pt=='leftTop'){
			mtop=offY;
			mleft=offX;
			$el.css('top','0px').css('left','0px').css('margin-top',mtop).css('margin-left',mleft);
		}else if(pt=='leftBottom'){
			mtop=offY;
			mleft=offX;
			$el.css('bottom','0px').css('left','0px').css('margin-bottom',0-mtop).css('margin-left',mleft);
		}else if(pt=='rightTop'){
			mtop=offY;
			mleft=offX;
			$el.css('top','0px').css('right','0px').css('margin-top',mtop).css('margin-right',0-mleft);
		}else if(pt=='rightBottom'){
			mtop=offY;
			mleft=offX;
			$el.css('bottom','0px').css('right','0px').css('margin-bottom',0-mtop).css('margin-right',0-mleft);
		}
	});

}

var initMaskInterval=null;
function createAnimation(bg,anm,first){
	bg=getUrl(bg,PATH_TYPE_IMG);
	var html='<div class="m-page m-bigTxt f-hide f-hide-animation" data-page-type="animation"> '+
						'<div class="page-con j-txtWrap lazy-img" data-src='+bg+'> ';
	//对从上弹入效果做特殊处理
	if(anm){
		for(var i=0;i<anm.length;i++){
			var a=anm[i];
			if(a.duration==undefined || Math.ceil(a.duration)==0){
				a.type='';
			}
			var zIndex=a.zIndex?a.zIndex:(i+1);
			if(a.elType=='text'){
				var id=new Date().getTime()+''+i+parseInt(Math.random()*10000).toString();
				var initContent=parseContent(a.textContent);
				var p_width=a.width?(a.width+'px'):'auto';
				var p_height=a.height?(a.height+'px'):'auto';
				var width=p_width;
				var height=p_height;
				var addFontsize=0;
				//安卓字体调整
				if(fontAdjust!=false){
					var $content=$('<div>'+initContent+'</div>');
					var len=$content.text().length+20;
					var addFontsize=fontAdjust['font'+a.textFontsize];
					width=a.width?((a.width+len*fontAdjust['font'+a.textFontsize])+'px'):'auto';
					height=a.height?((a.height+len*fontAdjust['font'+a.textFontsize])+'px'):'auto';
					addFontsize=addFontsize;
					if(initContent.indexOf('text-align:center')!=-1 || initContent.indexOf('text-align:right')!=-1 || $content.text().length*a.textFontsize*2>a.width){
						width=p_width;
						height=p_height;
						addFontsize=fontAdjust['font'+a.textFontsize];
						//处理行距
						if(initContent.indexOf('line-height')!=-1){
							var bi=(parseInt(a.textFontsize)*2)/(parseInt(a.textFontsize)*2+addFontsize);
							initContent=initContent.replace(/line-height:1.5/g,'line-height:'+(1.5*bi)).replace(/line-height:2/g,'line-height:'+(2*bi)).replace(/line-height:2.5/g,'line-height:'+(2.5*bi)).replace(/line-height:3/g,'line-height:'+(3*bi));
						}	
					}
					initContent=initContent.replace(/--/g,'<span style="font-size:'+(parseInt(a.textFontsize)*2+addFontsize+15)+'px">--</span>')
				}
				//高度微调整，有些情况显示不全
				height=height+8;
				var rotate=a.rotate?a.rotate:'0';
				var opacity=a.opacity?a.opacity:'0';
				opacity=1-parseFloat(opacity)/100;
				var htmlAnm='<div id="'+id+'" elType="'+a.elType+'" inittype="'+a.type+'" initduration="'+a.duration+'" initdelay="'+a.delay+'" pos="'+a.initPos+'::'+a.offsetX+'::'+a.offsetY+'" pw="'+p_width+'" ph="'+p_height+'" class="animationEl '+a.type+'" style="'+(a.type=='a-bounceinT'?'-webkit-transform:translateY(10000px);transform:translateY(10000px)':'opacity:0;')+';-webkit-animation-duration:'+a.duration+'s;-webkit-animation-delay:'+(0.5+parseFloat(a.delay))+'s;animation-duration:'+a.duration+'s;animation-delay:'+a.delay+'s;'+(first?'':'display:none;')+'width:'+width+';height:'+height+';z-index:'+zIndex+';'+((!a.type)?'opacity:1;':'')+'" attach-animation="'+getAttachDisappearAnimation(a.isDisappear,a.disappearType,a.disappearDuration,parseFloat(a.duration)+parseFloat(a.delay)+parseFloat(a.disappearDelay))+'">';
				htmlAnm+='<div class="rotate" style="width:'+width+';height:'+height+';font-size: '+(parseInt(a.textFontsize)*2+addFontsize)+'px;color: '+a.textColor+';background-color:transparent;transform: rotate('+rotate+'deg);-webkit-transform: rotate('+rotate+'deg);cursor:default;">';
				htmlAnm+='<a style="opacity:'+opacity+';display:block;width:100%;height:100%;overflow:hidden;">'+initContent+'</a>';
				htmlAnm+='</div></div>';
				html+=htmlAnm;
				loadTextAndPos(initContent,id);
			}else if(a.elType=='button' || a.elType=='vedio' || a.elType=='book' || a.elType=='message' || a.elType=='iframe'){
				if(a.src.indexOf('weikechangjing/image/edit/web-add-image.png')!=-1){
					//过滤掉尚未上传的图片
					continue;
				}
				var id=new Date().getTime()+''+i+parseInt(Math.random()*10000).toString();
				var width=a.width?(a.width+'px'):'auto';
				var height=a.height?(a.height+'px'):'auto';
				var rotate=a.rotate?a.rotate:'0';
				var opacity=a.opacity?a.opacity:'0';
				opacity=1-parseFloat(opacity)/100;
				var yuanjiao=a.yuanjiao?a.yuanjiao:'0';
				var htmlAnm='<div id="'+id+'" elType="'+a.elType+'" aSrc="'+a.src+'" yuanjiao="'+yuanjiao+'" inittype="'+a.type+'" initduration="'+a.duration+'" initdelay="'+a.delay+'" pos="'+a.initPos+'::'+a.offsetX+'::'+a.offsetY+'" class="animationEl '+a.type+'" style="'+(a.type=='a-bounceinT'?'-webkit-transform:translateY(10000px);transform:translateY(10000px)':'opacity:0;')+';-webkit-animation-duration:'+a.duration+'s;-webkit-animation-delay:'+(0.5+parseFloat(a.delay))+'s;animation-duration:'+a.duration+'s;animation-delay:'+a.delay+'s;'+(first?'':'display:none;')+'width:'+width+';height:'+height+';z-index:'+zIndex+';'+((!a.type)?'opacity:1;':'')+'" attach-animation="'+getAttachDisappearAnimation(a.isDisappear,a.disappearType,a.disappearDuration,parseFloat(a.duration)+parseFloat(a.delay)+parseFloat(a.disappearDelay))+'">';
				htmlAnm+='<div class="rotate" style="width:'+width+';height:'+height+';font-size: '+(parseInt(a.btnFontsize)*2)+'px;color: '+a.btnColor+';background-color: '+(a.btnBgColor?a.btnBgColor:'transparent')+';border-radius:'+yuanjiao+'px;-webkit-border-radius:'+yuanjiao+'px;transform: rotate('+rotate+'deg);-webkit-transform: rotate('+rotate+'deg);cursor:default;">';
				if(a.func){
					if(a.func=='share'){ 
						htmlAnm+='<a onclick="showGuide();" style="width:'+width+';height:'+height+';text-align: center;display: table-cell;vertical-align: middle;color: '+a.btnColor+';"><span>'+a.btnText+'</span></a>';
					}else if(a.func=='link'){
						htmlAnm+='<a href="'+a.funcContent+'" style="width:'+width+';height:'+height+';text-align: center;display: table-cell;vertical-align: middle;color: '+a.btnColor+';"><span>'+a.btnText+'</span></a>';
					}else if(a.func=='tel'){
						htmlAnm+='<a href="tel:'+a.funcContent+'" style="width:'+width+';height:'+height+';text-align: center;display: table-cell;vertical-align: middle;color: '+a.btnColor+';"><span>'+a.btnText+'</span></a>';
					}else if(a.func=='vedio'){
						htmlAnm+='<a onclick="showVedio(\''+a.vLink+'\',\''+a.vCloseColor+'\');" style="width:'+width+';height:'+height+';text-align: center;display: table-cell;vertical-align: middle;color: '+a.btnColor+';"><span>'+a.btnText+'</span></a>';
					}else if(a.func=='book'){
						initEditItem(a.bookData);
						htmlAnm+='<a onclick="showBook(\''+a.bookTitle+'\',\''+a.bookBtnText+'\',\''+a.bookColor+'\');" style="width:'+width+';height:'+height+';text-align: center;display: table-cell;vertical-align: middle;color: '+a.btnColor+';"><span>'+a.btnText+'</span></a>';
					}else if(a.func=='message'){
						htmlAnm+='<a onclick="showMessage(\''+a.messageTitle+'\',\''+a.messageContentTip+'\',\''+a.messageNameTip+'\',\''+a.messageColor+'\');" style="width:'+width+';height:'+height+';text-align: center;display: table-cell;vertical-align: middle;color: '+a.btnColor+';"><span>'+a.btnText+'</span></a>';
					}else if(a.func=='iframe'){
						htmlAnm+='<a onclick="showIframe(\''+a.pTitle+'\',\''+a.pLink+'\',\''+a.pColor+'\');" style="width:'+width+';height:'+height+';text-align: center;display: table-cell;vertical-align: middle;color: '+a.btnColor+';"><span>'+a.btnText+'</span></a>';
					}
				}else{
					htmlAnm+='<a style="width:'+width+';height:'+height+';text-align: center;display: table-cell;vertical-align: middle;color: '+a.btnColor+';"><span>'+a.btnText+'</span></a>';
				}
				htmlAnm+='</div></div>';
				html+=htmlAnm;
			}else if(a.elType=='mask'){
				var cover=a.bg;
				if(!cover||cover.length==0) continue;
				maskinit=false;
				var percent=a.percent?a.percent:30;
				if(cover.indexOf(UPLOAD_PREFIX)==0){
					cover=prefixToRedirectUpload+cover.replace(UPLOAD_PREFIX,'');
				}else{
					cover=prefixToRedirect+cover;
				}
				initMaskInterval=setInterval(function(){
					if(typeof initMask =='function'){
						initMask(percent,cover);
						clearInterval(initMaskInterval);
					}					
				},300);
				setTimeout(function(){
					clearInterval(initMaskInterval);
				},2000);
			}else{
				if(a.src.indexOf('weikechangjing/image/edit/web-add-image.png')!=-1){
					//过滤掉尚未上传的图片
					continue;
				}
				var id=new Date().getTime()+''+i+parseInt(Math.random()*10000).toString();
				var width=a.width?(a.width+'px'):'auto';
				var height=a.height?(a.height+'px'):'auto';
				var rotate=a.rotate?a.rotate:'0';
				var opacity=a.opacity?a.opacity:'0';
				opacity=1-parseFloat(opacity)/100;
				var yuanjiao=a.yuanjiao?a.yuanjiao:'0';
				var htmlAnm='<div id="'+id+'" elType="'+a.elType+'" aSrc="'+a.src+'" yuanjiao="'+yuanjiao+'" inittype="'+a.type+'" initduration="'+a.duration+'" initdelay="'+a.delay+'" pos="'+a.initPos+'::'+a.offsetX+'::'+a.offsetY+'" class="animationEl '+a.type+'" style="'+(a.type=='a-bounceinT'?'-webkit-transform:translateY(10000px);transform:translateY(10000px)':'opacity:0;')+';-webkit-animation-duration:'+a.duration+'s;-webkit-animation-delay:'+(0.5+parseFloat(a.delay))+'s;animation-duration:'+a.duration+'s;animation-delay:'+a.delay+'s;'+(first?'':'display:none;')+'width:'+width+';height:'+height+';z-index:'+zIndex+';'+((!a.type)?'opacity:1;':'')+'" attach-animation="'+getAttachDisappearAnimation(a.isDisappear,a.disappearType,a.disappearDuration,parseFloat(a.duration)+parseFloat(a.delay)+parseFloat(a.disappearDelay))+'">';
				htmlAnm+='<div class="rotate" style="width:100%;height:100%;opacity:'+opacity+';transform: rotate('+rotate+'deg);-webkit-transform: rotate('+rotate+'deg);">';
				if(a.func){
					if(a.func=='share'){
						htmlAnm+='<a onclick="showGuide();"></a>';
					}else if(a.func=='link'){
						htmlAnm+='<a href="'+a.funcContent+'"></a>';
					}else if(a.func=='tel'){
						htmlAnm+='<a href="tel:'+a.funcContent+'"></a>';
					}
				}else{
					htmlAnm+='<a></a>';
				}
				htmlAnm+='</div></div>';
				html+=htmlAnm;
			}			
		}
	}	
	
	html+='</div></div>';
	$('div.translate-back').append($(html));	
}

/*********持续动画延时出现方法**********/
var oldWebkit=true;
setTimeout(function(){
	//判断是否新版webkit浏览器
	var $animationEl=$('.m-page .animationEl');
	if($animationEl.length>0 && $animationEl.css('animation-name')){
		oldWebkit=false;
	}
},1);
function getAttachDisappearAnimation(isDisappear,disappearType,duration,delay){
	if(!isDisappear) return '';
	if(!disappearType) disappearType='a-fadeout';
	if(!duration) duration=0;
	if(!delay) delay=0;
	if(duration>0){
		if(disappearType.indexOf('out')>0){
			return disappearType+'::'+duration+'::'+delay;
		}
	}
	return '';
}
var hasHandleAnm=[];
window.timeout={};
function handleAnimation($el){
	var str=$el.attr('attach-animation');
	if(!str) return;
	var anims=str.split('$$');
	var delay=0;
	for(var i=0;i<anims.length;i++){
		var s=anims[i];
		if(!s) continue;
		var arr=s.split('::');
		delay=delay+parseFloat(arr[2]);
		window.timeout[$el.attr('id')]=setTimeout(function(){
			$el.show();
			$el.css({'opacity':'1','-webkit-animation-duration':arr[1]+'s','-webkit-animation-delay':'0s','animation-duration':arr[1]+'s','animation-delay':'0s'});
			$el.removeClass('a-rotateR').removeClass('a-rotateL').removeClass('a-slowshake').removeClass('a-slowflag');
			$el.addClass(arr[0]);	
		},oldWebkit?((delay+0.5)*1000):(delay*1000));
		if(hasHandleAnm.indexOf(arr[0])==-1){
			hasHandleAnm.push(arr[0]);				
		}
	}	
}

//根据数据初始化页面元素
function initEl(jsonData){
	
	for(var i=0;i<jsonData.length;i++){
		var page=jsonData[i];
		if(page.type==PAGE_TYPE_ANIMATION && i==0){
			if(page.isMusic){
				isOpenMusic=true;
				$('.u-audio').attr('data-src',getUrl(page.musicUrl,PATH_TYPE_MUSIC));
			}
			createAnimation(page.bg,page.anm,true);
		}else if(page.type==PAGE_TYPE_BIGTXT){
			createBitTxt(page.bg,page.summary,page.detail,page.openButton,page.buttonType,page.buttonContent,page.buttonLinkType,page.buttonLinkContent);
		}else if(page.type==PAGE_TYPE_VIDEO){
			createVideo(page.bg,page.title,page.titleColor,page.detail,page.detailColor,page.vType,page.vCover,page.videoUrl,page.vLink);
		}else if(page.type==PAGE_TYPE_BOOK){
			createBook(page.bg,page.title,page.titleColor,page.buttonTxt,page.buttonColor,page.isShare,page.bookData);
		}else if(page.type==PAGE_TYPE_CONTACT){
			createContact(page.bg,page.tel,page.address,page.latitude,page.longitude,page.worktime,page.title,page.summary,page.imgs)
		}else if(page.type==PAGE_TYPE_ROUND){
			createRound(page.bg,page.imgs)
		}else if(page.type==PAGE_TYPE_ANIMATION){
			createAnimation(page.bg,page.anm)
		}else if(page.type==PAGE_TYPE_SHARE){
			var logo=getUrl(page.logo,PATH_TYPE_IMG);
			window.initShareInfo(page.title,page.description,logo);
		}
	}
	
}