function popErr(text){
	var $popup_error=$('.u-note.error');
	$popup_error.html(text).addClass('on');
	setTimeout(function(){
		$popup_error.html(text).removeClass('on');
	},2000);
}

function popSuccess(text){
	var $popup_sucess=$('.u-note.sucess');
	$popup_sucess.html(text).addClass('on');
	setTimeout(function(){
		$popup_sucess.html(text).removeClass('on');
	},3000);
}

//提交数据
$('.m-contactFormLayer .btn-submit').click(function(){
	
	var $form=$('form#formContact');
	
	var $name=$form.find('input[name="name"]');
	var name=$name.val();
	if($.trim(name).length==0){
		popErr("请输入姓名");
		return;
	}
	
	var $tel=$form.find('input[name="tel"]');
	var tel=$tel.val();
	if($.trim(tel).length==0){
		popErr("请输入手机");
		return;
	}
	if(isNaN(tel) || tel.length<8 || tel.length>18){
		popErr("请输入正确的手机");
		return;
	}
	
	var time1='';
	var $time1=$form.find('input[name="time1"]');
	time1=$time1.val();
	if($time1.length>0 && $time1.parents('dl').attr('isMust')=='true'){
		if($.trim(time1).length==0){
			popErr('请输入'+$time1.parents('dl').find('dt').html().replace(':',''));
			return;
		}
	}
	
	var text1='';
	var $text1=$form.find('input[name="text1"]');
	text1=$text1.val();
	if($text1.length>0 && $text1.parents('dl').attr('isMust')=='true'){
		if($.trim(text1).length==0){
			popErr('请输入'+$text1.parents('dl').find('dt').html().replace(':',''));
			return;
		}
	}
	var text2='';
	var $text2=$form.find('input[name="text2"]');
	text2=$text2.val();
	if($text2.length>0 && $text2.parents('dl').attr('isMust')=='true'){
		if($.trim(text2).length==0){
			popErr('请输入'+$text2.parents('dl').find('dt').html().replace(':',''));
			return;
		}
	}
	var text3='';
	var $text3=$form.find('input[name="text3"]');
	text3=$text3.val();
	if($text3.length>0 && $text3.parents('dl').attr('isMust')=='true'){
		if($.trim(text3).length==0){
			popErr('请输入'+$text3.parents('dl').find('dt').html().replace(':',''));
			return;
		}
	}
	var text4='';
	var $text4=$form.find('input[name="text4"]');
	text4=$text4.val();
	if($text4.length>0 && $text4.parents('dl').attr('isMust')=='true'){
		if($.trim(text4).length==0){
			popErr('请输入'+$text4.parents('dl').find('dt').html().replace(':',''));
			return;
		}
	}
	
	var select1='';
	var $select1=$form.find('select[name="select1"]');
	select1=$select1.val();
	if($select1.length>0 && $select1.parents('dl').attr('isMust')=='true'){
		if($.trim(select1).length==0 || $.trim(select1)=='请选择'){
			popErr('请输入'+$select1.parents('dl').find('dt').html().replace(':',''));
			return;
		}
	}
	var select2='';
	var $select2=$form.find('select[name="select2"]');
	select2=$select2.val();
	if($select2.length>0 && $select2.parents('dl').attr('isMust')=='true'){
		if($.trim(select2).length==0 || $.trim(select1)=='请选择'){
			popErr('请输入'+$select2.parents('dl').find('dt').html().replace(':',''));
			return;
		}
	}
	var $self=$(this);	
	$self.prop('disabled',true);
	$self.val('正在提交...');
	$.ajax({
		url : "/mobile/action",
		dataType : "json",
		type:'post',
		data : {
			action:'addBook',
			activityId:window.app.activityId,
			name:name,
			tel:tel,
			sex:2,
			time1:time1,
			select1:select1,
			select2:select2,
			text1:text1,
			text2:text2,
			text3:text3,
			text4:text4
		},
		success : function(res){
		}
	});
	setTimeout(function(){
		popSuccess('提交成功');
		$self.prop('disabled',false);
		$self.val('立即提交');
		$('form#formContact')[0].reset();
	},600);
	
});