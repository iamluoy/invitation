var loading={
	show:function(){
		var $umask=$('.u-mask');
		var $ualert=$('.u-alert');
		$('.u-alert').animate({opacity:1},400);
	},
	hide:function(){
		setTimeout(function(){
			var $umask=$('.u-mask');
			var $ualert=$('.u-alert');
			$ualert.animate({opacity:0},400);
			$umask.find('>span').animate({opacity:0},400);
			setTimeout(function(){
				$umask.animate({opacity:0},400);
			},600);
			setTimeout(function(){
				$umask.hide();
				$ualert.hide();
			},1000);
		},300);		
	}
}