var media = {
	_audioNode : $('.u-audio'), // 声音模块
	_audio : null, // 声音对象
	_audio_val : false, // 声音是否开启控制
	_hasInit:false,

	_videoNode : $('.j-video'), // 视频DOM

	// 声音初始化
	audio_init : function() {
		
		// media资源的加载
		var $_audio = $('<audio loop="loop" id="media" autoplay="autoplay" preload="preload"></audio>');
		$('body').append($_audio);
		$_audio.attr('src',this._audioNode.attr('data-src'));
		media._audio=$_audio.get(0);
		media._audio.load();
		media._audio.play();
		//防止苹果手机不播放音乐
		document.addEventListener("WeixinJSBridgeReady", function () {
		    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
      		    $('#media')[0].play();
		    });
		}, false);
		
	},

	// 声音事件绑定
	audio_addEvent : function() {
		if (this._audioNode.length <= 0)
			return;

		// 声音按钮点击事件
		var txt = this._audioNode.find('.txt_audio'), time_txt = null;

		// 声音打开事件
		$(this._audio).on('play', function() {

			audio_txt(txt, true, time_txt);

			// 播放事件
			global._handleEvent('audio_play');
		})

		// 声音关闭事件
		$(this._audio).on('pause', function() {
			audio_txt(txt, false, time_txt)

			// 停止事件
			global._handleEvent('audio_pause');
		})

		function audio_txt(txt, val, time_txt) {
			if (val)
				txt.text('打开');
			else
				txt.text('关闭');

			if (time_txt)
				clearTimeout(time_txt);

			txt.removeClass('z-move z-hide');
			time_txt = setTimeout(function() {
				txt.addClass('z-move').addClass('z-hide');
			}, 1000)
		}
	},

	// 声音控制函数
	audio_contorl : function() {
		if (!media._audio_val) {
			media._audioNode.addClass('close');
			media.audio_stop();
		} else {
			media._audioNode.removeClass('close');
			media.audio_play();
		}
	},

	// 声音播放
	audio_play : function() {
		media._audio_val = false;
		if (media._audio)
			media._audio.play();
	},

	// 声音停止
	audio_stop : function() {
		media._audio_val = true;
		if (media._audio)
			media._audio.pause();
	},

	// 视频初始化
	video_init : function() {
		// 视频
		this._videoNode.each(function() {
			var option_video = {
				controls : 'controls',
				preload : 'none',
				// poster : $(this).attr('data-poster'),
				width : $(this).attr('data-width'),
				height : $(this).attr('data-height'),
				src : $(this).attr('data-src')
			}

			var video = $('<video class="f-hide"></video>')[0];
			var img = $(this).find('.img');

			for ( var key in option_video) {
				if (option_video.hasOwnProperty(key) && (key in video)) {
					video[key] = option_video[key];
				}
				this.appendChild(video);
			}

			$(video).on('play', function() {
				img.hide();
				$(video).removeClass('f-hide');
				if (media._audio){
					media._audioNode.addClass('close');
					media._audio.pause();
				}
			});

			$(video).on('pause', function() {
				img.show();
				$(video).addClass('f-hide');
				if(!media._audio_val && media._audio){
					media._audioNode.removeClass('close');
					media._audio.play();
				}
			});
			
			img.click(function(){				
				video.play();				
			});
			
		})
	},

	// 处理声音和动画的切换
	media_control : function() {
		if (!this._audio)
			return;
		if ($('video').length <= 0)
			return;

		$(this._audio).on('play', function() {
			$('video').each(function() {
				if (!this.paused) {
					this.pause();
				}
			});
		});
	},

	// media管理初始化
	media_init : function() {
		if(!this._hasInit){
			this._hasInit=true;

			// 声音初始化
			this.audio_init();
			this._audioNode.find('.btn_audio').on('click', this.audio_contorl);

			// 视频初始化
			this.video_init();

			// 绑定音乐加载事件
			this.audio_addEvent();

			// 音频切换
			this.media_control();
		}		
	}
}

$(window).on('unload', function() {
	media._audio.pause();
	$(media._audio).remove();
});
