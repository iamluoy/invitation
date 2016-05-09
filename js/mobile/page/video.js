$(function(){
		
	$('.m-video .m-btnPlay.a-bouncein').click(function(){	
		var $self=$(this);
		var $para=$self.parents('.m-video');
		$para.css('z-index','auto');
		$para.find('.u-maskLayer').show().removeClass('z-hide').addClass('z-show');
		setTimeout(function(){
			$self.hide();		
			var $videoBox=$para.find('.m-Video-box');
			var content=$videoBox.attr('video-data');
			if(content.indexOf('100%')>0){
				$videoBox.html(content);
			}else{
				var $ifa=$(content);
				$ifa.attr('width','100%').attr('height','100%').css('width','100%').css('height','100%');
				$videoBox.append($ifa);
			}			
			if (media._audio){
				media._audioNode.addClass('close');
				media._audio.pause();
			}
			page.page_stop();
		},400);
	});
	
	$('.u-maskLayer .u-maskLayer-close,.u-maskLayer.m-youkuVideoLayer').click(function(){
		var $para=$(this).parents('.m-video');
		$para.find('.u-maskLayer').removeClass('z-show').addClass('z-hide');
		setTimeout(function(){
			$para.removeAttr("style");
			$para.find('.u-maskLayer').hide();
			$para.find('.m-btnPlay.a-bouncein').show();
			var $videoBox=$para.find('.m-Video-box');
			$videoBox.html('');
			if(!media._audio_val && media._audio){
				media._audioNode.removeClass('close');
				media._audio.play();
			}
			page.page_start();
		},500);
	});
	
	$('.m-video .m-contact-book .u-maskLayer').on('mousedown mousemove mouseup touchstart touchmove touchend',function(e){
		return false;
	});
	
});