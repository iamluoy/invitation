var page = {
	/**
	 * 切换过程的变量控制
	 */
	page_translate_type:0, //页面切换效果，0/1/2分别代表不同效果
	page_animate_type:0, //0：动画播放一次，1：动画总是播放
	page_play_type:0,//0：循环显示，1：不循环显示
	isAutoPlay:false,//是否自动翻页
	isAuto_ing:false,//是否正在自动翻页
	autoPlayTime:0.3,//自动翻页定时秒数
	_page : $('.m-page'), // 模版页面切换的页面集合
	_pageNum : $('.m-page').size(), // 模版页面的个数
	_pageNow : 0, // 页面当前的index数
	_pageNext : null, // 页面下一个的index数

	_touchStartValY : 0, // 触摸开始获取的第一个值
	_touchDeltaY : 0, // 滑动的距离

	_moveStart : true, // 触摸移动是否开始
	_movePosition : null, // 触摸移动的方向（上、下）
	_movePosition_c : null, // 触摸移动的方向的控制
	_mouseDown : false, // 判断鼠标是否按下
	_moveFirst : true,
	_moveInit : false,
	_hasInitMap:false,

	_firstChange : false,

	page_start : function() {
		page._page.on('touchstart mousedown', page.page_touch_start);
		page._page.on('touchmove mousemove', page.page_touch_move);
		page._page.on('touchend mouseup', page.page_touch_end);
	},

	// 页面切换停止
	page_stop : function() {
		page._page.off('touchstart mousedown');
		page._page.off('touchmove mousemove');
		page._page.off('touchend mouseup');
	},

	// page触摸移动start
	page_touch_start : function(e) {
		if (!page._moveStart || page.isAuto_ing)
			return;

		if (e.type == "touchstart") {
			page._touchStartValY = window.event.touches[0].pageY;
		} else {
			page._touchStartValY = e.pageY || e.y;
			page._mouseDown = true;
		}

		page._moveInit = true;

		// start事件
		global._handleEvent('start');
	},

	// page触摸移动move
	page_touch_move : function(e) {
		e.preventDefault();

		if (!page._moveStart)
			return;
		if (!page._moveInit)
			return;

		// 设置变量值
		var $self = page._page.eq(page._pageNow), h = parseInt($self.height()), moveP, scrollTop, node = null, move = false;

		// 获取移动的值
		if (e.type == "touchmove") {
			moveP = window.event.touches[0].pageY;
			move = true;
		} else {
			if (page._mouseDown) {
				moveP = e.pageY || e.y;
				move = true;
			} else
				return;
		}

		// 获取下次活动的page
		node = page.page_position(e, moveP, $self);

		// page页面移动
		page.page_translate(node);

		// move事件
		global._handleEvent('move');
	},

	// page触摸移动判断方向
	page_position : function(e, moveP, $self) {
		var now, next;

		// 设置移动的距离
		if (moveP != 'undefined')
			page._touchDeltaY = moveP - page._touchStartValY;
		
		//如果是最后一页且设置了页面不循环显示，则_touchDeltaY=0
		if(page.page_play_type==1 && $self.next('.m-page').length == 0 && page._touchDeltaY<0){
			page._touchDeltaY=0;
			node=null;
			return node;
		}

		// 设置移动方向
		page._movePosition = moveP - page._touchStartValY > 0 ? 'down' : 'up';
		if (page._movePosition != page._movePosition_c) {
			page._moveFirst = true;
			page._movePosition_c = page._movePosition;
		} else {
			page._moveFirst = false;
		}

		// 设置下一页面的显示和位置
		if (page._touchDeltaY <= 0) {
			if ($self.next('.m-page').length == 0) {
				page._pageNext = 0;
			} else {
				page._pageNext = page._pageNow + 1;
			}

			next = page._page.eq(page._pageNext)[0];
		} else {
			if ($self.prev('.m-page').length == 0) {
				if (page._firstChange) {
					page._pageNext = page._pageNum - 1;
				} else {
					return;
				}
			} else {
				page._pageNext = page._pageNow - 1;
			}

			next = page._page.eq(page._pageNext)[0];
		}

		now = page._page.eq(page._pageNow)[0];
		node = [ next, now ];

		// move阶段根据方向设置页面的初始化位置--执行一次
		if (page._moveFirst)
			init_next(node);

		function init_next(node) {
			var s, l, _translateZ = global._translateZ();

			page._page.removeClass('action');
			$(node[1]).addClass('action').removeClass('f-hide-animation').removeClass('f-hide');
			page._page.not('.action').addClass('f-hide-animation');

			// 模版高度适配函数处理
			page.height_auto(page._page.eq(page._pageNext), 'false');

			// 显示对应移动的page
			$(node[0]).removeClass('f-hide-animation').removeClass('f-hide').addClass('active');

			// 设置下一页面的显示和位置
			if (page._movePosition == 'up') {
				s = parseInt($(window).scrollTop());
				if (s > 0)
					l = $(window).height() + s;
				else
					l = $(window).height();
				node[0].style[global._prefixStyle('transform')] = 'translate(0,'
						+ l + 'px)' + _translateZ;
				$(node[0]).attr('data-translate', l);

				$(node[1]).attr('data-translate', 0);
			} else {
				node[0].style[global._prefixStyle('transform')] = 'translate(0,-'
						+ Math.max($(window).height(), $(node[0]).height())
						+ 'px)' + _translateZ;
				$(node[0]).attr('data-translate',
						-Math.max($(window).height(), $(node[0]).height()));

				$(node[1]).attr('data-translate', 0);
			}
		}

		return node;
	},

	// page触摸移动设置函数
	page_translate : function(node) {
		// 没有传值返回
		if (!node)
			return;

		var _translateZ = global._translateZ(), y_1, y_2, scale, y = page._touchDeltaY;

		if(page.page_translate_type<4){
			// 切换的页面移动
			if ($(node[0]).attr('data-translate'))
				y_1 = y + parseInt($(node[0]).attr('data-translate'));
			node[0].style[global._prefixStyle('transform')] = 'translate(0,' + y_1
					+ 'px)' + _translateZ;	
			if(page.page_translate_type==0){
				// 当前的页面移动
				if ($(node[1]).attr('data-translate'))
					y_2 = y + parseInt($(node[1]).attr('data-translate'));
				scale = 1;
				node[1].style[global._prefixStyle('transform')] = 'translate(0,' + y_2
						+ 'px)' + _translateZ + ' scale(' + scale + ')';
			}else if(page.page_translate_type==2){
				// 当前的页面移动
				if ($(node[1]).attr('data-translate'))
					y_2 = y + parseInt($(node[1]).attr('data-translate'));
				scale = 1 - Math.abs(y * 0.2 / $(window).height());
				y_2 = y_2 / 5;
				node[1].style[global._prefixStyle('transform')] = 'translate(0,' + y_2
						+ 'px)' + _translateZ + ' scale(' + scale + ')';
			}
		}
	},

	// page触摸移动end
	page_touch_end : function(e) {
		page._moveInit = false;
		page._mouseDown = false;
		if (!page._moveStart)
			return;
		if (!page._pageNext && page._pageNext != 0)
			return;

		page._moveStart = false;

		// 确保移动了
		if (Math.abs(page._touchDeltaY) > 10) {
			page._page.eq(page._pageNext)[0].style[global
					._prefixStyle('transition')] = 'all .3s';
			page._page.eq(page._pageNow)[0].style[global
					._prefixStyle('transition')] = 'all .3s';
		}

		// 页面切换
		if (Math.abs(page._touchDeltaY) >= 100) { // 切换成功
			var $next=$(page._page[page._pageNext]);
			if(typeof(resetScale)!='undefined'){
				resetScale();
				if($next.find('.m-bg-zoom').length>0){
					beginScale(true)
				}
			}
			if(!page._hasInitMap && $next.hasClass('m-page6') && typeof(window.map)!='undefined' && typeof(window.point)!='undefined'){
				page._hasInitMap=true;
				window.map.enableScrollWheelZoom();        		  		//启用滚轮放大缩小
				window.map.enableInertialDragging();         				//启用地图拖曳
				window.map.centerAndZoom(point,15);						//将目标定位在地图的中心
				window.map.addOverlay(marker); 
				window.mapOpenInfo();
			}			
			page.page_success();
		} else if (Math.abs(page._touchDeltaY) > 10
				&& Math.abs(page._touchDeltaY) < 100) { // 切换失败
			page.page_fial();
		} else { // 没有切换
			page.page_fial();
		}

		// end事件
		global._handleEvent('end');

		// 注销控制值
		page._movePosition = null;
		page._movePosition_c = null;
		page._touchStartValY = 0;
	},

	// 切换成功
	page_success : function() {
		var _translateZ = global._translateZ();

		if(page.page_translate_type<4){
			// 下一个页面的移动
			page._page.eq(page._pageNext)[0].style[global._prefixStyle('transform')] = 'translate(0,0)'
					+ _translateZ;	
			if(page.page_translate_type==0){
				// 当前页面变小的移动
				var y = page._touchDeltaY > 0 ? $(window).height() : -$(window).height();
				var scale = 1;
				page._page.eq(page._pageNow)[0].style[global._prefixStyle('transform')] = 'translate(0,'
						+ y + 'px)' + _translateZ + ' scale(' + scale + ')';
			}else if(page.page_translate_type==2){
				// 当前页面变小的移动
				var y = page._touchDeltaY > 0 ? $(window).height() / 5 : -$(window)
						.height() / 5;
				var scale = 0.8;
				page._page.eq(page._pageNow)[0].style[global._prefixStyle('transform')] = 'translate(0,'
						+ y + 'px)' + _translateZ + ' scale(' + scale + ')';
			}
		}else{
			var $now=$(page._page.eq(page._pageNow)[0]);
			var $next=$(page._page.eq(page._pageNext)[0]);
			$now.animate({opacity:0},200);	
			setTimeout(function(){
				$now.hide();
				$now.css('opacity','1');	
			},195);
			$next.show();
			$next.css('opacity','0');	
			$next.animate({opacity:1},200);	
		}

		//展示动画
		var $nextPage=$(page._page.eq(page._pageNext)[0]);
		if($nextPage.attr('data-page-type')=='animation' || $nextPage.attr('data-page-type')=='wish'){
			var $animationEl=$nextPage.find('.animationEl');
			if($animationEl.css('display')!='block'){
				$animationEl.show();	
				$animationEl.each(function(){
					var $self=$(this);
					handleAnimation($(this));				
				});
			}	
		}
		if(page.page_animate_type==1){
			//隐藏当前页的动画
			var $nowPage=$(page._page.eq(page._pageNow)[0]);
			var $nowPageAnm=$nowPage.find('.animationEl')
			if($nowPage.attr('data-page-type')=='animation' || $nowPage.attr('data-page-type')=='wish'){
				$nowPageAnm.hide();
				//恢复初始动画时间
				$nowPageAnm.each(function(){
					var $self=$(this);
					clearTimeout(window.timeout[$self.attr('id')]);
					var initDuration=$self.attr('initduration');
					var initDelay=$self.attr('initdelay');
					var initType=$self.attr('inittype');
					if(!$self.hasClass(initType)){
						$self.addClass(initType);
					}
					$self.css({'opacity':'0','-webkit-animation-duration':initDuration+'s','-webkit-animation-delay':initDelay+'s','animation-duration':initDuration+'s','animation-delay':initDelay+'s'});
				});
				//移除动画
				for(var i=0;i<hasHandleAnm.length;i++){
					$nowPageAnm.removeClass(hasHandleAnm[i]).css('opacity','0');					
				}
			}			
		}
		
		// 成功事件
		global._handleEvent('success');
		page.isAuto_ing=false;
	},

	// 切换失败
	page_fial : function() {
		var _translateZ = global._translateZ();

		// 判断是否移动了
		if (!page._pageNext && page._pageNext != 0) {
			page._moveStart = true;
			page._moveFirst = true;
			return;
		}

		if (page._movePosition == 'up') {
			page._page.eq(page._pageNext)[0].style[global
					._prefixStyle('transform')] = 'translate(0,'
					+ $(window).height() + 'px)' + _translateZ;
		} else {
			page._page.eq(page._pageNext)[0].style[global
					._prefixStyle('transform')] = 'translate(0,-'
					+ $(window).height() + 'px)' + _translateZ;
		}

		page._page.eq(page._pageNow)[0].style[global._prefixStyle('transform')] = 'translate(0,0)'
				+ _translateZ + ' scale(1)';

		// fial事件
		global._handleEvent('fial');
	},

	height_auto : function(ele, val) {
		ele.children('.page-con').css('height', 'auto');
		var height = $(window).height();

		// 需要解除固定高度的page卡片
		var vial = true;
		if (!vial) {
			if (ele.height() <= height) {
				ele.children('.page-con').height(height + 2);
				if ((!$('.p-ct').hasClass('fixed')) && val == 'true')
					$('.p-ct').addClass('fixed');
			} else {
				global._scrollStart();
				if (val == 'true')
					$('.p-ct').removeClass('fixed');
				ele.children('.page-con').css('height', '100%');
				return;
			}
		} else {
			ele.children('.page-con').height(height + 2);
			if ((!$('.p-ct').hasClass('fixed')) && val == 'true')
				$('.p-ct').addClass('fixed');
		}
	},
	
	autoScroll:function(){
		page.isAuto_ing=true;
		// move事件
		global._handleEvent('start');
		// 设置变量值
		var $self = page._page.eq(page._pageNow), h = parseInt($self.height()), moveP, scrollTop, node = null, move = false;
		// 获取下次活动的page
		node = page.auto_page_position($self);
		if(node==null) return;
		
		setTimeout(function(){
			// page页面移动
			page.page_translate(node);

			// move事件
			global._handleEvent('move');
			
			if (!page._pageNext && page._pageNext != 0)
				return;
			page._moveStart = false;
			page._page.eq(page._pageNext)[0].style[global._prefixStyle('transition')] = 'all .3s';
			page._page.eq(page._pageNow)[0].style[global._prefixStyle('transition')] = 'all .3s';

			var $next=$(page._page[page._pageNext]);
			if(typeof(resetScale)!='undefined'){
				resetScale();
				if($next.find('.m-bg-zoom').length>0){
					beginScale(true)
				}
			}
			if(!page._hasInitMap && $next.hasClass('m-page6') && typeof(window.map)!='undefined' && typeof(window.point)!='undefined'){
				page._hasInitMap=true;
				window.map.enableScrollWheelZoom();        		  		//启用滚轮放大缩小
				window.map.enableInertialDragging();         				//启用地图拖曳
				window.map.centerAndZoom(point,15);						//将目标定位在地图的中心
				window.map.addOverlay(marker); 
				window.mapOpenInfo();
			}			
			page.page_success();

			// end事件
			global._handleEvent('end');
			// 注销控制值
			page._movePosition = null;
			page._movePosition_c = null;
			page._touchStartValY = 0;
		},200);
		
	},
	
	auto_page_position : function($self) {
		
		var now, next;
		
		//如果是最后一页且设置了页面不循环显示，则停止翻页
		if(page.page_play_type==1 && $self.next('.m-page').length == 0){
			node=null;
			return node;
		}
		
		// 设置下一页面的显示和位置
		if ($self.next('.m-page').length == 0) {
			page._pageNext = 0;
		} else {
			page._pageNext = page._pageNow + 1;
		}
		next = page._page.eq(page._pageNext)[0];
		now = page._page.eq(page._pageNow)[0];
		node = [ next, now ];

		// move阶段根据方向设置页面的初始化位置--执行一次
		init_next(node);

		function init_next(node) {
			var s, l, _translateZ = global._translateZ();

			page._page.removeClass('action');
			$(node[1]).addClass('action').removeClass('f-hide-animation').removeClass('f-hide');
			page._page.not('.action').addClass('f-hide-animation');
			// 模版高度适配函数处理
			page.height_auto(page._page.eq(page._pageNext), 'false');
			// 显示对应移动的page
			$(node[0]).removeClass('f-hide-animation').removeClass('f-hide').addClass('active');
			// 设置下一页面的显示和位置
			s = parseInt($(window).scrollTop());
			if (s > 0)
				l = $(window).height() + s;
			else
				l = $(window).height();
			node[0].style[global._prefixStyle('transform')] = 'translate(0,'
					+ l + 'px)' + _translateZ;
			$(node[0]).attr('data-translate', l);

			$(node[1]).attr('data-translate', 0);
		}

		return node;
	}
	
}