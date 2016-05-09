$(function() {

	var loading=false;
	function listById(lastId) {
		if(loading) return;
		loading=true;
		$('.detail-item.more>p').html('加载中...');
		$.ajax({
			url : "/mobile/action",
			dataType : "json",
			type : 'get',
			data : {
				action : 'listMessage',
				activityId : window.app.activityId,
				lastId : lastId
			},
			success : function(res) {
				loading=false;
				$('.detail-item.more>p').html('点击加载更多');
				if (res.success == true) {
					var record = res.record;
					var $more = $('.detail-item.more');
					var html = '';
					for ( var i = 0; i < record.length; i++) {
						html += '<li class="detail-item"> ' + '	<h4><span>'
								+ record[i].name
								+ '</span><strong>'+getDateDiff(record[i].time.time)+'</strong></h4> ' + '	<p>'
								+ record[i].content + '</p> ' + '</li>';
					}
					$(html).insertBefore($more);
					if (record.length < 15) {
						$more.hide();
					} else {
						$more.attr('lastId', record[record.length - 1].id).show();
					}
				} else {
					// do nothing
				}
			}
		});
	}

	var $wall = $('.m-words-wall');
	var $btn = $('.m-words-btn');
	var $submitBtn = $('.btn.j-wall-submit');

	$('.m-words-wall .wrap').on(
			'mousedown mousemove mouseup touchstart touchmove touchend',
			function(e) {
				e.stopPropagation();
			});

	$btn.click(function() {
		$wall.css('top','0px');
	});

	$wall.find('.edit.j-wall-edit').click(function() {
		$('textarea.j-wall-txt').focus();
	});

	$submitBtn.click(function() {

		var message = $(this).parent().find('textarea').val();
		var name = $(this).parent().find('input').val();
		if ($.trim(message).length == 0) {
			popErr('说点什么吧！');
			return;
		}
		if ($.trim(name).length == 0) {
			popErr('请留下您的大名吧！');
			return;
		}
		var $load = $('.u-pageLoading');
		$load.show();
		$.ajax({
			url : "/mobile/action",
			dataType : "json",
			type : 'post',
			data : {
				action : 'addMessage',
				activityId : window.app.activityId,
				name : name,
				message : message
			},
			success : function(res) {
			}
		});
		setTimeout(function(){
			$load.hide();
			$('.m-words-form textarea').val('');
			popSuccess('发送成功！');
			var html = '<li class="detail-item"> ' + '	<h4><span>'
					+ name + '</span><strong>刚刚发表</strong></h4> '
					+ '	<p>' + message + '</p> ' + '</li>';
			$('.m-words-detail ul').prepend($(html));
		},600);

	});

	$('.detail-item.more>p').click(function() {
		var lastId = $(this).parent().attr('lastId');
		listById(lastId);
	});

	$(window).load(function() {
		listById(0);
	});

});