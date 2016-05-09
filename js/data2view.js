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
var $menuUl;
var $allContainer;
$(function(){
	setTimeout(function(){
		$menuUl=$('.create-menu ul',$(window.parent.document));	
		$allContainer=$('.translate-back .page-con.j-txtWrap.lazy-img >div');
	},200);
});
var initMenuOffset=$('#screen',$(window.parent.document)).offset();

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

function loadBg(bg){
	var img=new Image();
	img.src=bg;
	img.onload=function(){
		$(".m-page").eq(0).find('.lazy-img').css('background-image','url('+bg+')');
		setTimeout(function(){
			if(vcount==0){
				loading.hide();
				$(".m-page").eq(0).removeClass('f-hide-animation').removeClass('f-hide');
				if(!hasHndleAnimation){
					hasHndleAnimation=true;
					var $animationEl=$(".m-page").eq(0).find('.animationEl');
					$animationEl.each(function(){
						var $self=$(this);
						handleAnimation($(this));				
					});					
				}
			}
		},1);
	}
	img.onError=function(){}
}

function showMenu(e,elType,multiple){
	var x=initMenuOffset.left+e.pageX;
	var y=initMenuOffset.top+e.pageY;
	var bodyHeight=initMenuOffset.top+e.pageY+185;
	if(bodyHeight>800){
		$(window.parent.document.body).css('height',bodyHeight+'px');				
	}
	if(elType=='mask'){
		$menuUl.find('li').show();
		$menuUl.find('li').hide();
		$menuUl.find('li#delete-item').show();		
	}else if(elType=='book' || elType=='message'){
		$menuUl.find('li').show();
		$menuUl.find('li#copy-item').hide();
		$menuUl.find('li#copy-item').next().hide();
	}else{
		$menuUl.find('li').show();
	}
	if(multiple){
		$menuUl.find('li').show();
		$menuUl.find('li:lt(4)').hide();
		$menuUl.find('.menu-line').hide();
	}
	$menuUl.css({left:x,top:y}).show();
}

function resizeMove($el,a,type){
	//调用拖拽缩放
	if(a.elType!='mask'){
		$el.draggable({
			start:function(event, ui){		
				try{
					//让kindeditor失去焦点
					$('.textFontsize',window.parent.document).focus();
				}catch(e){			
				}		
				var $self=ui.helper;
				if($el.find('.bar').css('display')!='block'){
					window.parent.edit(type,a);	
					Bar.setCurrEl($self);
					$('.bar-container .bar').hide();
					$self.find('.bar').show();					
				}else{
					var selectCount=0;
					$allContainer=$('.translate-back .page-con.j-txtWrap.lazy-img >div');
					$allContainer.each(function(){
						var currEl=$(this);
						if(currEl && !currEl.is($el) && currEl.find('.bar').css('display')=='block'){
							selectCount++;
						}
					});
					if(selectCount>0){
						window.parent.edit(type,a,true);
						Bar.setCurrEl($self);							
					}else{
						window.parent.edit(type,a);
						Bar.setCurrEl($self);							
					}
					//记录初始位置
					$allContainer.each(function(){
						var currEl=$(this);
						if(currEl && !currEl.is($el) && currEl.find('.bar').css('display')=='block'){
							currEl.attr('marginTop',parseFloat(currEl.css('marginTop')));
							currEl.attr('marginBottom',parseFloat(currEl.css('marginBottom')));
							currEl.attr('marginLeft',parseFloat(currEl.css('marginLeft')));
							currEl.attr('marginRight',parseFloat(currEl.css('marginRight')));
							currEl.attr('bottom',parseFloat(currEl.css('bottom')));
							currEl.attr('right',parseFloat(currEl.css('right')));
						}
					});
				}
				//隐藏弹出层
				$menuUl.hide();
				$(window.parent.document.body).css('height','auto');
			},
			drag:function(event, ui){
				var disX=ui.position.left-ui.originalPosition.left;
				var disY=ui.position.top-ui.originalPosition.top;
				ui.helper.find('.rotate').css('opacity','0.6');
				$allContainer.each(function(){
					var currEl=$(this);
					if(currEl && !currEl.is($el) && currEl.find('.bar').css('display')=='block'){
						currEl.find('.rotate').css('opacity','0.6');
						var mt=parseFloat(currEl.attr('marginTop')),
								ml=parseFloat(currEl.attr('marginLeft')),mb=parseFloat(currEl.attr('marginBottom')),
								mr=parseFloat(currEl.attr('marginRight')),b=currEl.attr('bottom'),r=currEl.attr('right');
						if(b=='0px'){
							currEl.css({marginBottom:mb-disY});
						}else{
							currEl.css({marginTop:mt+disY});					
						}
						if(r=='0px'){
							currEl.css({marginRight:mr-disX});
						}else{
							currEl.css({marginLeft:ml+disX});					
						}
					}	
				});				
			},
			stop:function(event, ui){
				//更新data数据
				var disX=(ui.position.left-ui.originalPosition.left)*2;
				var disY=(ui.position.top-ui.originalPosition.top)*2;
				window.parent.currEditObj.offsetX=parseFloat(window.parent.currEditObj.offsetX)+disX;
				window.parent.currEditObj.offsetY=parseFloat(window.parent.currEditObj.offsetY)+disY;
				ui.helper.find('.rotate').css('opacity','1');	
				$allContainer.each(function(){
					var currEl=$(this);
					if(currEl && !currEl.is($el) && currEl.find('.bar').css('display')=='block'){
						currEl.find('.rotate').css('opacity','1');	
						var index=currEl.index();
						var obj=globalData.anm[index];
						obj.offsetX=parseFloat(obj.offsetX)+disX;
						obj.offsetY=parseFloat(obj.offsetY)+disY;	
					}
				});
			}
		});
	}	
	$el.click(function(e){
		try{
			//让kindeditor失去焦点
			$('.textFontsize',window.parent.document).focus();
		}catch(e){			
		}
		var $self=$(this);
		var $container_=$('.translate-back .page-con.j-txtWrap.lazy-img >div');
		if(key_control && !$self.hasClass('ui-draggable')){
			return;
		}
		//取消选中
		if(key_control && $self.find('.bar').css('display')=='block'){
			$self.find('.bar').hide();
			$container_=$('.translate-back .page-con.j-txtWrap.lazy-img >div');
			//选中第一个
			var hasEl=false;
			$container_.each(function(){
				if($(this).find('.bar').css('display')=='block' && !$self.is($(this))){
					hasEl=true;
					key_control=true;
					$(this).find('.bar').hide();
					$(this).click();
					setTimeout(function(){
						key_control=false;
					},1);
					return;
				}
			});
			e.stopPropagation();
			if(!hasEl){
				$('.editBackground',window.parent.document).click();
			}
			return;
		}
		var flag=false;
		if($self.find('.bar').css('display')=='block' && $menuUl.css('display')=='none'){
			showMenu(e,a.elType);
			flag=true;
		}
		//判断是否按下ctrl或者shift键，且没有选中任何控件
		var hasSelect=false;
		$container_.each(function(){
			if($(this).find('.bar').css('display')=='block' && !$self.is($(this))){
				hasSelect=true;
				return;
			}
		});
		if(key_control && hasSelect){
			window.parent.edit(type,a,true);	
			Bar.setCurrEl($self);	
			$container=$('.translate-back .page-con.j-txtWrap.lazy-img>div');
			$container.each(function(){
				if(!$(this).hasClass('ui-draggable')){
					$(this).find('.bar').hide();						
				}
			});
		}else{
			window.parent.edit(type,a);
			Bar.setCurrEl($self);
			$('.bar-container .bar').hide();	
		}
		$self.find('.bar').show();
		if(flag){
			e.stopPropagation();
		}
	}).mousedown(function(e){
		if(e.which==3){
			try{
				//让kindeditor失去焦点
				$('.textFontsize',window.parent.document).focus();
			}catch(e){			
			}
			var $self=$(this);
			var hasSelect=false;
			if($self.find('.bar').css('display')=='block'){
				var $container_=$('.translate-back .page-con.j-txtWrap.lazy-img >div');
				$container_.each(function(){
					if($(this).find('.bar').css('display')=='block' && !$self.is($(this))){
						hasSelect=true;
						return;
					}
				});				
			}
			if(!hasSelect){
				window.parent.edit(type,a);
				Bar.setCurrEl($self);
				$('.bar-container .bar').hide();
				$self.find('.bar').show();
			}else{
				window.parent.edit(type,a,true);
				Bar.setCurrEl($self);
			}
			showMenu(e,a.elType,hasSelect);
		};
		e.stopPropagation();
	});
}

//让所有动画图片都先加载完成
var vcount=0;
function loadImgAndPos(a,id,callback){
	vcount++;
	var src=getUrl(a.src,PATH_TYPE_IMG);
	if(!src || src.length==0 || src.indexOf('bar-t-1px.png')>0){
		src='img/a203937a-669d-44f3-aa48-3dccb51196e2.png';
	}
	var img=new Image();
	img.src=src;
	img.onload=function(){
		vcount--;
		if(vcount==0){
			setTimeout(function(){
				loading.hide();
				$(".m-page").eq(0).removeClass('f-hide-animation').removeClass('f-hide');
				if(!hasHndleAnimation){
					hasHndleAnimation=true;
					var $animationEl=$(".m-page").eq(0).find('.animationEl');
					$animationEl.each(function(){
						var $self=$(this);
						handleAnimation($(this));				
					});					
				}
			},200);				
		}
		var $el=$('#'+id);
		var yuanjiao=a.yuanjiao?a.yuanjiao:'0';
		$el.find('.rotate>a').append('<img src="'+src+'" style="width:100%;height:100%;position: absolute;left: 0;	top: 0;z-index: -1;border-radius:'+yuanjiao+'px;-webkit-border-radius:'+yuanjiao+'px;" onmousedown="return false">');
		var w=a.width?a.width/2:img.width/2;
		var h=a.height?a.height/2:img.height/2;
		if($el.css('width')=='0px'){
			$el.width(w);
		}
		if($el.css('height')=='0px'){
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
		var elType=(a.elType&&a.elType!='pic')?a.elType:window.parent.TYPE_IMAGE;
		resizeMove($el,a,elType);
		if(callback && typeof callback=='function'){
			callback();
		}
	}
	img.onError=function(){
		$('#'+id+'>a').css('display','none!important');
	}
}

function loadTextAndPos(a,id,callback){
	var content=a.textContent;
	setTimeout(function(){
		var $content=$('<span onmousedown="return false">'+content+'</span>');
		$content.css('display','inline-block').css('position','absolute').css('top','-2000px');
		$('body').append($content);
		var $el=$('#'+id);
		var w=a.width?a.width/2:$content.width();
		var h=a.height?a.height/2:$content.height();
		if($el.css('width')=='0px'){
			$el.width(w);
		}
		if($el.css('height')=='0px'){
			$el.height(h);
		}
		$content.remove();
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
		var elType=(a.elType&&a.elType!='pic')?a.elType:window.parent.TYPE_IMAGE;
		resizeMove($el,a,elType);
		if(callback && typeof callback=='function'){
			callback();
		}
	});

}

function createAnimation(bg,anm,first){
	bg=getUrl(bg);
	if(bg.indexOf('#')!=0){
		loadBg(bg);		
	}
	var html='<div class="m-page m-bigTxt f-hide f-hide-animation" data-page-type="animation"> '+
						'<div class="page-con j-txtWrap lazy-img" style="'+(bg.indexOf('#')==0?('background-color:'+bg):'')+'"> ';
	//对从上弹入效果做特殊处理
	if(anm){
		for(var i=0;i<anm.length;i++){
			var a=anm[i];
			var anmType=a.type;
			if(a.duration==undefined || Math.ceil(a.duration)==0){
				anmType='';
			}
			var zIndex=a.zIndex?a.zIndex:(i+1);
			if(a.elType=='text'){
				var id=new Date().getTime()+''+i+parseInt(Math.random()*10000).toString();
				var width=a.width?(a.width/2+'px'):'auto';
				var height=a.height?(a.height/2+'px'):'auto';
				var rotate=a.rotate?a.rotate:'0';
				var opacity=a.opacity?a.opacity:'0';
				opacity=1-parseFloat(opacity)/100;
				var htmlAnm='<div id="'+id+'" pos="'+a.initPos+'::'+(a.offsetX/2)+'::'+(a.offsetY/2)+'" class="bar-container animationEl '+anmType+'" style="'+(anmType=='a-bounceinT'?'-webkit-transform:translateY(10000px);transform:translateY(10000px)':'opacity:0;')+';-webkit-animation-duration:'+a.duration+'s;-webkit-animation-delay:'+(1.2+parseFloat(a.delay))+'s;animation-duration:'+a.duration+'s;animation-delay:'+a.delay+'s;touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);width:'+width+';height:'+height+';z-index:'+zIndex+';'+((!anmType)?'opacity:1;':'')+'" attach-animation="'+getAttachDisappearAnimation(a.isDisappear,a.disappearType,a.disappearDuration,parseFloat(a.duration)+parseFloat(a.delay)+parseFloat(a.disappearDelay))+'">';
				htmlAnm+='<div class="rotate" style="width:'+width+';height:'+height+';font-size: '+a.textFontsize+'px;color: '+a.textColor+';background-color:transparent;transform: rotate('+rotate+'deg);-webkit-transform: rotate('+rotate+'deg);cursor:default;">';
				var content=parseContent(a.textContent);
				htmlAnm+='<a style="opacity:'+opacity+';display:block;width:100%;height:100%;overflow:hidden;">'+content+'</a>';
				htmlAnm+='<div class="bar bar-rotate bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
								'<div class="bar bar-line"></div> '+
								'<div class="bar bar-n" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
								'<div class="bar bar-s" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
								'<div class="bar bar-e" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
								'<div class="bar bar-w" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
								'<div class="bar bar-ne bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
								'<div class="bar bar-nw bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
								'<div class="bar bar-se bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
								'<div class="bar bar-sw bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div>';
				htmlAnm+='</div></div>';
				html+=htmlAnm;
				loadTextAndPos(a,id);
			}else if(a.elType=='button' || a.elType=='vedio' || a.elType=='book' || a.elType=='message' || a.elType=='iframe'){
				var id=new Date().getTime()+''+i+parseInt(Math.random()*10000).toString();
				var width=a.width?(a.width/2+'px'):'auto';
				var height=a.height?(a.height/2+'px'):'auto';
				var rotate=a.rotate?a.rotate:'0';
				var opacity=a.opacity?a.opacity:'0';
				opacity=1-parseFloat(opacity)/100;
				var yuanjiao=a.yuanjiao?a.yuanjiao:'0';
				var htmlAnm='<div id="'+id+'" pos="'+a.initPos+'::'+(a.offsetX/2)+'::'+(a.offsetY/2)+'" class="bar-container animationEl '+anmType+'" style="'+(anmType=='a-bounceinT'?'-webkit-transform:translateY(10000px);transform:translateY(10000px)':'opacity:0;')+';-webkit-animation-duration:'+a.duration+'s;-webkit-animation-delay:'+(1.2+parseFloat(a.delay))+'s;animation-duration:'+a.duration+'s;animation-delay:'+a.delay+'s;touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);width:'+width+';height:'+height+';z-index:'+zIndex+';'+((!anmType)?'opacity:1;':'')+'" attach-animation="'+getAttachDisappearAnimation(a.isDisappear,a.disappearType,a.disappearDuration,parseFloat(a.duration)+parseFloat(a.delay)+parseFloat(a.disappearDelay))+'">';
				htmlAnm+='<div class="rotate" style="width:'+width+';height:'+height+';font-size: '+a.btnFontsize+'px;color: '+a.btnColor+';background-color: '+(a.btnBgColor?a.btnBgColor:'transparent')+';border-radius:'+yuanjiao+'px;-webkit-border-radius:'+yuanjiao+'px;transform: rotate('+rotate+'deg);-webkit-transform: rotate('+rotate+'deg);cursor:default;">';
				htmlAnm+='<a style="width:'+width+';height:'+height+';opacity:'+opacity+';text-align: center;display: table-cell;vertical-align: middle;"><span>'+a.btnText+'</span></a>';
				htmlAnm+='<div class="bar bar-rotate bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-line"></div> '+
									'<div class="bar bar-n" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-s" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-e" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-w" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-ne bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-nw bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-se bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-sw bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div>';
				htmlAnm+='</div></div>';
				html+=htmlAnm;
				loadImgAndPos(a,id);
			}else if(a.elType=='mask'){
				var id=new Date().getTime()+''+i+parseInt(Math.random()*10000).toString();
				var width=a.width?(a.width/2+'px'):'auto';
				var height=a.height?(a.height/2+'px'):'auto';
				var rotate=a.rotate?a.rotate:'0';
				var opacity=a.opacity?a.opacity:'0';
				opacity=1-parseFloat(opacity)/100;
				var yuanjiao=a.yuanjiao?a.yuanjiao:'0';
				var htmlAnm='<div id="'+id+'" pos="'+a.initPos+'::'+(a.offsetX/2)+'::'+(a.offsetY/2)+'" class="bar-container animationEl '+anmType+'" style="'+(anmType=='a-bounceinT'?'-webkit-transform:translateY(10000px);transform:translateY(10000px)':'opacity:0;')+';-webkit-animation-duration:'+a.duration+'s;-webkit-animation-delay:'+(1.2+parseFloat(a.delay))+'s;animation-duration:'+a.duration+'s;animation-delay:'+a.delay+'s;touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);width:'+width+';height:'+height+';z-index:'+zIndex+';'+((!anmType)?'opacity:1;':'')+'">';
				htmlAnm+='<div class="rotate" style="width:'+width+';height:'+height+';font-size: '+a.btnFontsize+'px;color: '+a.btnColor+';background-color: '+(a.btnBgColor?a.btnBgColor:'transparent')+';border-radius:'+yuanjiao+'px;-webkit-border-radius:'+yuanjiao+'px;transform: rotate('+rotate+'deg);-webkit-transform: rotate('+rotate+'deg);cursor:default;">';
				htmlAnm+='<a style="width:'+width+';height:'+height+';opacity:'+opacity+';text-align: center;display: table-cell;vertical-align: middle;"><span>'+a.btnText+'</span></a>';
				htmlAnm+='<div class="bar bar-n" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-s" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-e" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-w" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> ';
				htmlAnm+='</div></div>';
				html+=htmlAnm;
				loadImgAndPos(a,id);
			}else{
				var id=new Date().getTime()+''+i+parseInt(Math.random()*10000).toString();
				var width=a.width?(a.width/2+'px'):'auto';
				var height=a.height?(a.height/2+'px'):'auto';
				var rotate=a.rotate?a.rotate:'0';
				var opacity=a.opacity?a.opacity:'0';
				opacity=1-parseFloat(opacity)/100;
				var htmlAnm='<div id="'+id+'" pos="'+a.initPos+'::'+(a.offsetX/2)+'::'+(a.offsetY/2)+'" class="bar-container animationEl '+anmType+'" style="'+(anmType=='a-bounceinT'?'-webkit-transform:translateY(10000px);transform:translateY(10000px)':'opacity:0;')+';-webkit-animation-duration:'+a.duration+'s;-webkit-animation-delay:'+(1.2+parseFloat(a.delay))+'s;animation-duration:'+a.duration+'s;animation-delay:'+a.delay+'s;touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);width:'+width+';height:'+height+';z-index:'+zIndex+';'+((!anmType)?'opacity:1;':'')+'" attach-animation="'+getAttachDisappearAnimation(a.isDisappear,a.disappearType,a.disappearDuration,parseFloat(a.duration)+parseFloat(a.delay)+parseFloat(a.disappearDelay))+'">';
				htmlAnm+='<div class="rotate" style="width:100%;height:100%;transform: rotate('+rotate+'deg);-webkit-transform: rotate('+rotate+'deg);">';
				htmlAnm+='<a style="opacity:'+opacity+';"></a>';
				htmlAnm+='<div class="bar bar-rotate bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-line"></div> '+
									'<div class="bar bar-n" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-s" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-e" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-w" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-ne bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-nw bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-se bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div> '+
									'<div class="bar bar-sw bar-radius" style="touch-action: pan-x pan-y; -webkit-user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></div>';
				htmlAnm+='</div></div>';
				html+=htmlAnm;
				loadImgAndPos(a,id);
			}			
		}
	}	
	
	html+='</div></div>';
	$('div.translate-back').append($(html));	
	
	if(!anm || anm.length==0){
		setTimeout(function(){
			loading.hide();
			$(".m-page").eq(0).removeClass('f-hide-animation').removeClass('f-hide');
		},200);
	}
	
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
			setTimeout(function(){
				$el.css({'opacity':'1','-webkit-animation-duration':'0s','-webkit-animation-delay':'0s','animation-duration':'0s','animation-delay':'0s'});
				$el.removeClass(arr[0]);
			},parseFloat(arr[1])*1000+100);
		},oldWebkit?(delay*1000+1200):(delay*1000));
	}	
}

//根据数据初始化页面元素
function initEl(jsonData){
	createAnimation(jsonData.bg,jsonData.anm);
}
