var lazyImg = {
	
	lazy_count:(globalData.length-1)<3?(globalData.length-1):3,	
	
	lazy_load_count:0,
	
	// 前三张背景图片加载完成后的回调
	lazy_callback:null,
		
	// 延迟图片管理替换
	lazy_img : function() {
		var lazyNode = $('.lazy-img');
		lazyNode
				.each(function() {
					var self = $(this);
					if (self.is('img')) {
						self.attr('src','image/mobile/load.gif');
					} else {
						// 把原来的图片预先保存下来
						var position = self.css('background-position'), size = self
								.css('background-size');

						self.attr({
							'data-position' : position,
							'data-size' : size
						});

						if (self.attr('data-bg') == 'no') {
							self.css({
								'background-repeat' : 'no-repeat'
							})
						}

						self.css({
									'background-image' : 'url(image/mobile/load.gif)',
									'background-size' : '120px 120px',
									'background-position' : 'center'
								})

						if (self.attr('data-image') == 'no') {
							self.css({
								'background-image' : 'none'
							})
						}
					}
				})
	},

	// 开始加载前三个页面
	lazy_start : function() {
		var _this = this;
		// 前三个页面的图片延迟加载
		setTimeout(function() {
			for ( var i = 0; i < lazyImg.lazy_count; i++) {
				var node = $(".m-page").eq(i);
				
				//加载动画元素
				var $animationEl=node.find('.animationEl');
				$animationEl.each(function(){
					try {
						var $self = $(this);
						if ($self.attr('elType')
								&& $self.find('.rotate>a>img').length == 0) {
							loadImgAndPos(getUrl($self.attr('aSrc'),
									PATH_TYPE_IMG), $self.attr('id'));
						}
					} catch (e) {
						// TODO: handle exception
					}
				});
				
				if (node.length == 0)
					break;
				if (node.find('.lazy-img').length != 0) {
					_this.lazy_change(node, false,true);
					// 飞出窗口的延迟
					if (node.attr('data-page-type') == 'flyCon') {
						_this.lazy_change($('.m-flypop'), false);
					}
				} else
					continue;
			}
		}, 200)
	},

	// 加载当前后面第三个
	lazy_bigP : function() {
		if ($('.lazy-img').length == 0)
			return;

		for ( var i = 1; i <= 3; i++) {
			var node = $(".m-page").eq(page._pageNow + i);
			
			//加载动画元素
			var $animationEl=node.find('.animationEl');
			$animationEl.each(function(){
				try {
					var $self=$(this);
					if($self.attr('elType') && $self.find('.rotate>a>img').length==0){
						loadImgAndPos(getUrl($self.attr('aSrc'),PATH_TYPE_IMG),$self.attr('id'));						
					}
				} catch (e) {
					// TODO: handle exception
				}
			});
			
			if (node.length == 0)
				break;
			if (node.find('.lazy-img').length != 0) {
				lazyImg.lazy_change(node, false);
				// 飞出窗口的延迟
				if (node.attr('data-page-type') == 'flyCon') {
					lazyImg.lazy_change($('.m-flypop'), false);
				}
			} else
				continue;
		}
	},

	// 图片延迟替换函数
	lazy_change : function(node, goon,execCallback) {
		// 3d图片的延迟加载
		if (node.attr('data-page-type') == '3d')
			this.lazy_3d(node);

		// 飞出窗口的延迟
		if (node.attr('data-page-type') == 'flyCon') {
			var img = $('.m-flypop').find('.lazy-img');
			img.each(function() {
				var self = $(this), srcImg = self.attr('data-src');
				$('<img />').on('load', function() {
					if (self.is('img')) {
						self.attr('src', srcImg)
					}
				}).attr("src", srcImg);
			})
		}
		// 其他图片的延迟加载
		var lazy = node.find('.lazy-img');
		lazy.each(function() {
			var self = $(this), srcImg = self.attr('data-src'), position = self
					.attr('data-position'), size = self.attr('data-size');

			//判断是否颜色
			var color='';
			if(!srcImg || srcImg.length==0){
				color='#ffffff';
				srcImg=window.app.uploadImgPath+'/2015/1/weikecj/16/6d86782d-1c69-4359-a71f-d8b60ffd4054.png';
			}else if(srcImg.indexOf('#')==0){
				color=srcImg;
				srcImg=window.app.uploadImgPath+'/2015/1/weikecj/16/6d86782d-1c69-4359-a71f-d8b60ffd4054.png';
			}
			
			if (self.attr('data-bg') != 'no') {
				$('<img />').on('load', function() {
					
					//前三张背景图片加载完成时执行回调
					if(execCallback && self.hasClass('page-con')){
						lazyImg.lazy_load_count++;
						if(lazyImg.lazy_load_count==lazyImg.lazy_count && lazyImg.lazy_callback && typeof lazyImg.lazy_callback=='function'){
							lazyImg.lazy_callback();
						}
					}
					
					if (self.is('img')) {
						self.attr('src', srcImg)
					} else {
						if(color==''){							
							self.css({
								'background-image' : 'url(' + srcImg + ')',
								'background-position' : position,
								'background-size' : size
							});
						}else{
							self.css({
								'background-image' : 'none',
								'background-color' : color,
								'background-position' : position,
								'background-size' : size
							});
						}	
					}
					// 判断下面页面进行加载
					if (goon) {
						for ( var i = 0; i < $(".m-page").size(); i++) {
							var page = $(".m-page").eq(i);
							if ($(".m-page").find('.lazy-img').length == 0)
								continue
							else {
								lazyImg.lazy_change(page, true);
							}
						}
					}
				}).attr("src", srcImg);

				self.removeClass('lazy-img').addClass('lazy-finish');
			} else {
				if (self.attr('data-auto') == 'yes')
					self.css('background', 'none');
			}
		})
	},

	// load事件触发来预加载图片
	lazy_load : function() {
		var lazy = $('.lazy-img.load');
		lazy.each(function() {
			var self = $(this), srcImg = self.attr('data-src'), position = self
					.attr('data-position'), size = self.attr('data-size');

			if (self.attr('data-bg') != 'no') {
				$('<img />').on('load', function() {
					if (self.is('img')) {
						self.attr('src', srcImg)
					} else {
						self.css({
							'background-image' : 'url(' + srcImg + ')',
							'background-position' : '50% 50%',
							'background-size' : 'cover'
						})
					}
				}).attr("src", srcImg);

				self.removeClass('lazy-img').addClass('lazy-finish');
			} else {
				if (self.attr('data-auto') == 'yes')
					self.css('background', 'none');
			}
		})
	}
}

// 图片初始化替换（全部替换成loading）
$(function() {
	lazyImg.lazy_img();
})

// 图片加载--绑定是在window-load事件执行（加载前三个page的图片）
$(window).on('load', function() {
	lazyImg.lazy_start();
//	setTimeout(function() {
//		lazyImg.lazy_load();
//	}, 200);
})