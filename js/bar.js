var Bar={
	
	container:$('.bar-container'),
	
	currEl:null,
	
	callback:null,
	
	setCurrEl:function($el){
		Bar.currEl=$el;
	},

	_initDocumentEvent:function(){
		$(document).mousemove(function(e) {
			if (!!this.move) {
				Bar.callback.call(this.initPosix, e);
			}
		}).mouseup(function(e) {
			if (!!this.move) {
				//更新data数据
				if(this.initPosix.centerX==undefined || this.initPosix.centerX==null){
					window.parent.currEditObj.width=Bar.currEl.width()*2;
					window.parent.currEditObj.height=Bar.currEl.height()*2;
					//console.log(window.parent.currEditObj.width+','+Bar.currEl.height());
					if(window.parent.currEditObj.initPos=='center'){
						window.parent.currEditObj.offsetX=(Bar.currEl.offset().left-(160-Bar.currEl.width()/2))*2;
						window.parent.currEditObj.offsetY=(Bar.currEl.offset().top-(237.5-Bar.currEl.height()/2))*2;						
					}else{
						//处理其他情况。。。。。。。。。。。
					}
				}else{
					var rotate=Bar.currEl.find('.rotate')[0].style.transform;
					if(rotate){
						var deg=rotate.replace('rotate(','').replace('deg)','');
						window.parent.currEditObj.rotate=deg;					
					}
				}				
				$.extend(this, {
					'move': false,
					'initPosix': null
				});
			}
		});
	},
	
	_initSelfScale:function($self){
		var $nw=$self.find('.bar-nw');
		var $ne=$self.find('.bar-ne');
		var $sw=$self.find('.bar-sw');
		var $se=$self.find('.bar-se');
		var $n=$self.find('.bar-n');
		var $s=$self.find('.bar-s');
		var $w=$self.find('.bar-w');
		var $e=$self.find('.bar-e');
		var $rotate=$self.find('.bar-rotate');
		$self.find('.bar').mousedown(function(){
			Bar.setCurrEl($self);
			window.parent.currEditObj=globalData.anm[$self.index()];
		});
		$nw.mousedown(function(e){  
			if(window.parent.currEditObj.initPos!='center') return;
		    var initPosix = {'x': e.pageX, 'y': e.pageY,w:Bar.currEl.width(),h:Bar.currEl.height(),ml:parseFloat(Bar.currEl.css('marginLeft')),mt:parseFloat(Bar.currEl.css('marginTop'))};
		    Bar.callback=function(e) {
		    	var posix=this;
		    	var w=posix.w-e.pageX + posix.x;
		    	var h=posix.h-e.pageY + posix.y;
		    	Bar.currEl.css({
		    		marginTop:posix.mt+(e.pageY - posix.y),
		    		marginLeft:posix.ml+(e.pageX - posix.x),
		    		width:w,
		    		height:h
		    	});
		    	Bar.currEl.find('.rotate').css({
		    		width:w,
		    		height:h	
		    	});
		    	Bar.currEl.find('.rotate>a').css({
		    		width:w,
		    		height:h	
		    	});
			};
		    $.extend(document, {'move': true, 'initPosix': initPosix});
		    e.stopPropagation();
		});
		$ne.mousedown(function(e){  
			if(window.parent.currEditObj.initPos!='center') return;
		    var initPosix = {'x': e.pageX, 'y': e.pageY,w:Bar.currEl.width(),h:Bar.currEl.height(),ml:parseFloat(Bar.currEl.css('marginLeft')),mt:parseFloat(Bar.currEl.css('marginTop'))};
		    Bar.callback=function(e) {
		    	var posix=this;
		    	var w=posix.w+e.pageX - posix.x;
		    	var h=posix.h-e.pageY + posix.y;
		    	Bar.currEl.css({
		    		marginTop:posix.mt+(e.pageY - posix.y),
		    		width:w,
		    		height:h
		    	});
		    	Bar.currEl.find('.rotate').css({
		    		width:w,
		    		height:h	    		
		    	});
		    	Bar.currEl.find('.rotate>a').css({
		    		width:w,
		    		height:h	
		    	});
			};
		    $.extend(document, {'move': true, 'initPosix': initPosix});
		    e.stopPropagation();
		});
		$sw.mousedown(function(e){  
			if(window.parent.currEditObj.initPos!='center') return;
		    var initPosix = {'x': e.pageX, 'y': e.pageY,w:Bar.currEl.width(),h:Bar.currEl.height(),ml:parseFloat(Bar.currEl.css('marginLeft')),mt:parseFloat(Bar.currEl.css('marginTop'))};
		    Bar.callback=function(e) {
		    	var posix=this;
		    	var w=posix.w-e.pageX + posix.x;
		    	var h=posix.h+e.pageY - posix.y;
		    	Bar.currEl.css({
		    		marginLeft:posix.ml+(e.pageX - posix.x),
		    		width:w,
		    		height:h
		    	});
		    	Bar.currEl.find('.rotate').css({
		    		width:w,
		    		height:h	    		
		    	});
		    	Bar.currEl.find('.rotate>a').css({
		    		width:w,
		    		height:h	
		    	});
			};
		    $.extend(document, {'move': true, 'initPosix': initPosix});
		    e.stopPropagation();
		});
		$se.mousedown(function(e){  
		    var initPosix = {'x': e.pageX, 'y': e.pageY,w:Bar.currEl.width(),h:Bar.currEl.height(),ml:parseFloat(Bar.currEl.css('marginLeft')),mt:parseFloat(Bar.currEl.css('marginTop'))};
		    Bar.callback=function(e) {
		    	var posix=this;
		    	var w=posix.w+e.pageX - posix.x;
		    	var h=posix.h+e.pageY - posix.y;
		    	Bar.currEl.css({
		    		width:w,
		    		height:h
		    	});
		    	Bar.currEl.find('.rotate').css({
		    		width:w,
		    		height:h		    		
		    	});
		    	Bar.currEl.find('.rotate>a').css({
		    		width:w,
		    		height:h	
		    	});
			};
		    $.extend(document, {'move': true, 'initPosix': initPosix});
		    e.stopPropagation();
		});
		$e.mousedown(function(e){  
		    var initPosix = {'x': e.pageX, 'y': e.pageY,w:Bar.currEl.width(),h:Bar.currEl.height(),ml:parseFloat(Bar.currEl.css('marginLeft')),mt:parseFloat(Bar.currEl.css('marginTop'))};
		    Bar.callback=function(e) {
		    	var posix=this;
		    	var w=posix.w+e.pageX - posix.x;
		    	Bar.currEl.css({
		    		width:w
		    	});
		    	Bar.currEl.find('.rotate').css({
		    		width:w
		    	});
		    	Bar.currEl.find('.rotate>a').css({
		    		width:w
		    	});
			};
		    $.extend(document, {'move': true, 'initPosix': initPosix});
		    e.stopPropagation();
		});
		$w.mousedown(function(e){  
			if(window.parent.currEditObj.initPos!='center') return;
		    var initPosix = {'x': e.pageX, 'y': e.pageY,w:Bar.currEl.width(),h:Bar.currEl.height(),ml:parseFloat(Bar.currEl.css('marginLeft')),mt:parseFloat(Bar.currEl.css('marginTop'))};
		    Bar.callback=function(e) {
		    	var posix=this;
		    	var w=posix.w-e.pageX + posix.x;
		    	Bar.currEl.css({
		    		marginLeft:posix.ml+(e.pageX - posix.x),
		    		width:w
		    	});
		    	Bar.currEl.find('.rotate').css({
		    		width:w
		    	});
		    	Bar.currEl.find('.rotate>a').css({
		    		width:w
		    	});
			};
		    $.extend(document, {'move': true, 'initPosix': initPosix});
		    e.stopPropagation();
		});
		$s.mousedown(function(e){  
		    var initPosix = {'x': e.pageX, 'y': e.pageY,w:Bar.currEl.width(),h:Bar.currEl.height(),ml:parseFloat(Bar.currEl.css('marginLeft')),mt:parseFloat(Bar.currEl.css('marginTop'))};
		    Bar.callback=function(e) {
		    	var posix=this;
		    	var h=posix.h+e.pageY - posix.y;
		    	Bar.currEl.css({
		    		height:h
		    	});
		    	Bar.currEl.find('.rotate').css({
		    		height:h  		
		    	});
		    	Bar.currEl.find('.rotate>a').css({
		    		height:h  		
		    	});
			};
		    $.extend(document, {'move': true, 'initPosix': initPosix});
		    e.stopPropagation();
		});
		$n.mousedown(function(e){  
			if(window.parent.currEditObj.initPos!='center') return;
		    var initPosix = {'x': e.pageX, 'y': e.pageY,w:Bar.currEl.width(),h:Bar.currEl.height(),ml:parseFloat(Bar.currEl.css('marginLeft')),mt:parseFloat(Bar.currEl.css('marginTop'))};
		    Bar.callback=function(e) {
		    	var posix=this;
		    	var h=posix.h-e.pageY + posix.y;
		    	Bar.currEl.css({
		    		marginTop:posix.mt+(e.pageY - posix.y),
		    		height:h
		    	});
		    	Bar.currEl.find('.rotate').css({
		    		height:h    		
		    	});
		    	Bar.currEl.find('.rotate>a').css({
		    		height:h  		
		    	});
			};
		    $.extend(document, {'move': true, 'initPosix': initPosix});
		    e.stopPropagation();
		});
		$rotate.mousedown(function(e){  
		    var initPosix = {'x': e.pageX, 'y': e.pageY,centerX:(Bar.currEl.offset().left+Bar.currEl.width()/2),centerY:(Bar.currEl.offset().top+Bar.currEl.height()/2)};
		    Bar.callback=function(e) {
		    	var posix=this;
		    	var deg=0;
		    	if(e.pageX==posix.centerX && e.pageY<posix.centerY){
		    		deg=0;
		    	}else if(e.pageX==posix.centerX && e.pageY>posix.centerY){
		    		deg=180;
		    	}else if(e.pageX<posix.centerX && e.pageY==posix.centerY){
		    		deg=270;
		    	}else if(e.pageX>posix.centerX && e.pageY==posix.centerY){
		    		deg=90;
		    	}else if(e.pageX>posix.centerX && e.pageY<posix.centerY){
		    		deg=Math.atan((e.pageX-posix.centerX)/(posix.centerY-e.pageY))/Math.PI*180;
		    	}else if(e.pageX>posix.centerX && e.pageY>posix.centerY){
		    		deg=Math.atan((e.pageY-posix.centerY)/(e.pageX-posix.centerX))/Math.PI*180+90;
		    	}else if(e.pageX<posix.centerX && e.pageY>posix.centerY){
		    		deg=Math.atan((posix.centerX-e.pageX)/(e.pageY-posix.centerY))/Math.PI*180+180;
		    	}else if(e.pageX<posix.centerX && e.pageY<posix.centerY){
		    		deg=Math.atan((posix.centerY-e.pageY)/(posix.centerX-e.pageX))/Math.PI*180+270;
		    	}
		    	Bar.currEl.find('.rotate')[0].style.transform='rotate('+deg+'deg)';
		    	Bar.currEl.find('.rotate')[0].style.webkitTransform='rotate('+deg+'deg)';
			};
		    $.extend(document, {'move': true, 'initPosix': initPosix});
		    e.stopPropagation();
		});
	},
	
	_initScale:function(){
		Bar.container.each(function(){
			var $self=$(this);
			Bar._initSelfScale($self);
		});
	},
		
	init:function(){
		Bar._initScale();
		Bar._initDocumentEvent();
	}
	
}
//初始化
$(function(){
	Bar.init();
});