var currEditObj=null;

//编辑
var TYPE_SETTING='setting';
var TYPE_WIDGET='widget';
var TYPE_BG='bg';
var TYPE_TEXT='text';
var TYPE_IMAGE='image';
var TYPE_BUTTON='button';
var TYPE_VEDIO='vedio';
var TYPE_BOOK='book';
var TYPE_MESSAGE='message';
var TYPE_MASK='mask';
var TYPE_IFRAME='iframe';

var $menuUl;
$(function(){
	setTimeout(function(){
		$menuUl=$('.create-menu ul');		
	},500);
});

function edit(type,content,hideedit){
	if($('#screen')[0].contentWindow.Bar && $('#screen')[0].contentWindow.Bar.currEl){
		var t=currEditObj.elType?currEditObj.elType:'image';
		$('.edit.mobile.'+t).find('input,select').blur();
	}
	//如果是场景设置，则马上赋值
	if(currEditObj && currEditObj.length>1 && $('.mobile.edit.'+TYPE_SETTING).css('display')=='block'){
		var lastObj=currEditObj[currEditObj.length-1];
		window.app.name=$('.content .appname').val().replace(/"/g,"");
		lastObj.title=$('.content .sharetitle').val().replace(/"/g,"");
		lastObj.description=$('.content .sharedesc').val().replace(/"/g,"");
	}
	setTimeout(function(){
		currEditObj=content;
		if(!hideedit){
			$('.main .mobile.edit').hide();
			$('.main .mobile.edit.'+type).show();			
		}else{
			//默认显示编辑背景
			$('.main .mobile.edit').hide();
			$('.main .mobile.edit.'+TYPE_BG).show();	
		}
		if(type==TYPE_WIDGET){
			if($('#page li.selected').index()==1){
				$('.additem .item_mod[data-add="mask"]').show();
			}else{
				$('.additem .item_mod[data-add="mask"]').hide();
			}
		}else if(type==TYPE_SETTING){
			editSetting();
		}else if(type==TYPE_BG){
			editBg();
		}else if(type==TYPE_TEXT){
			editText();
		}else if(type==TYPE_IMAGE){
			editImage();
		}else if(type==TYPE_BUTTON){
			editButton();
		}else if(type==TYPE_VEDIO){
			editVedio();
		}else if(type==TYPE_BOOK){
			editBook();
		}else if(type==TYPE_MESSAGE){
			editMessage();
		}else if(type==TYPE_MASK){
			editMask();
		}else if(type==TYPE_IFRAME){
			editIframe();
		}
		$('.main .mobile.edit .content').scrollTop(0);
	},10);	
}

$(function() {
	    function resort(ui){
	    	//json排序
	    	var fromIdx=parseInt(ui.item.attr('idx'));
	    	var toIdx=ui.item.index()-1;
	    	if(toIdx>fromIdx){
	    		//向下拖动
	    		if(fromIdx==0){
	    			var temp=window.app.data[fromIdx];
	    			window.app.data[fromIdx]=window.app.data[fromIdx+1];
	    			window.app.data[fromIdx].isMusic=temp.isMusic;
	    			window.app.data[fromIdx].musicUrl=temp.musicUrl;
		    		for(var i=fromIdx+2;i<=toIdx;i++){
		    			window.app.data[i-1]=window.app.data[i];
		    		}
		    		delete temp.isMusic;
		    		delete temp.musicUrl;
		    		window.app.data[toIdx]=temp;
	    		}else{
		    		var temp=window.app.data[fromIdx];
		    		for(var i=fromIdx+1;i<=toIdx;i++){
		    			window.app.data[i-1]=window.app.data[i];
		    		}
		    		window.app.data[toIdx]=temp;
	    		}
	    	}else{
	    		//向上拖动
	    		if(toIdx==0){
	    			var temp=window.app.data[fromIdx];
		    		for(var i=fromIdx-1;i>=toIdx;i--){
		    			window.app.data[i+1]=window.app.data[i]
		    		}
		    		window.app.data[toIdx]=temp;
		    		window.app.data[0].isMusic=window.app.data[1].isMusic;
		    		window.app.data[0].musicUrl=window.app.data[1].musicUrl;
		    		delete window.app.data[1].isMusic;
		    		delete window.app.data[1].musicUrl;
	    		}else{
	    			var temp=window.app.data[fromIdx];
		    		for(var i=fromIdx-1;i>=toIdx;i--){
		    			window.app.data[i+1]=window.app.data[i]
		    		}
		    		window.app.data[toIdx]=temp;
	    		}	    		
	    	}	    	
	    	//重排
		    var $pageli=$('#page>li');
	    	$pageli.each(function(i){
	    		$(this).attr('idx',i).html('<span>'+(i+1)+'</span>第'+(i+1)+'页<img class="del" title="删除" src="../image/edit/del.png"><img class="copy" title="复制" src="../image/edit/copy.png"><img class="template" title="页面模版" src="../image/edit/template.png">');
	    	});
	    }
	    //拖动
	    $('#page').sortable({
	    	update: function(event, ui) {
	    		resort(ui);
	    		if(!ui.item.hasClass('selected')){
	    			ui.item.click();    			
	    		}
	    	}
	    });
	    $('#page').on('click','li',function(){
	    	historyData=[];
	    	$('#page>li').removeClass('selected');
	    	$('#page>li').removeClass('hover');
	    	$(this).addClass('selected');
	    	var r=new Date().getTime()+''+Math.ceil(Math.random()*10000);
	    	$('#screen').attr('src','action-screen.html?page='+($(this).index()-1)+'&r='+r);
	    	$('.main .top .editBackground').click();
	    });
	    $('#page').on('mouseover','li',function(){
	    	$(this).addClass('hover');
	    });
	    $('#page').on('mouseout','li',function(){
	    	$(this).removeClass('hover');
	    });
	    //添加
	    $('#addPage').on('click',function(){
	    	//判断是否超出页数
	    	if(window.app.data.length-1>=window.app.maxpage){
	    		alert('您已经达到页数上限，普通用户最多只能添加'+window.app.maxpage+'页');
	    		return;
	    	}	    	
	    	showSelectTemplate(function(data){	    			
		    	hideSelectTemplate();
		    	//页面处理
		    	var end=window.app.data[window.app.data.length-1];
			   	window.app.data[window.app.data.length-1]=data;
			   	window.app.data.push(end);
			   	var count=$('#page>li').length;
			   	var html=' <li idx="'+count+'" class="page-li selected"><span>'+(count+1)+'</span>第'+(count+1)+'页<img class="del" title="删除" src="../image/edit/del.png"><img class="copy" title="复制" src="../image/edit/copy.png"><img class="template" title="页面模版" src="../image/edit/template.png"></li>';
			   	var $newPage=$(html);
			   	var $page=$('#page');
			   	$page.append($newPage);
			   	$('#page>li').last().click();
			   	$page.parent().animate({scrollTop:1000000},0);		    		
	    	});
	    	
	    });
	    //复制
	    $('#page').on('click','li .copy',function(e){
	    	if(window.confirm('确定要复制此页？')){
	    		//判断是否超出页数
		    	if(window.app.data.length-1>=window.app.maxpage){
		    		alert('您已经达到页数上限，普通用户最多只能添加'+window.app.maxpage+'页');
		    		return;
		    	}	  
		    	var $currli=$(this).parent();
		    	var idx=parseInt($currli.attr('idx'));
		    	//如果是最后一页
		    	if((window.app.data.length-2)==idx){
		    		var copy={};
		    		$.extend(true, copy, window.app.data[idx]);
		    		if(idx==0){
		    			delete copy.isMusic;
			    		delete copy.musicUrl;
		    		}
			    	//过滤预约、留言、涂抹控件
		    		if(copy.anm && copy.anm.length>0){
		    			for(var i=0;i<copy.anm.length;i++){
		    				if(copy.anm[i].elType=='mask'){
		    					delete copy.anm.splice(i,1);
		    				}
		    			}
		    			for(var i=0;i<copy.anm.length;i++){
		    				if(copy.anm[i].elType=='message'){
		    					delete copy.anm.splice(i,1);
		    				}
		    			}
		    			for(var i=0;i<copy.anm.length;i++){
		    				if(copy.anm[i].elType=='book'){
		    					delete copy.anm.splice(i,1);
		    				}
		    			}
		    		}
		    		var end=window.app.data[idx+1];
		    		window.app.data.push(copy);
		    		window.app.data[idx+2]=end;
		    		window.app.data[idx+1]=copy;
		    	}else{
			    	var newData=[];
		    		for(var i=0;i<(idx+1);i++){
		    			newData.push(window.app.data[i]);
			    	}
		    		var copy={};
		    		$.extend(true, copy, newData[idx]);
		    		if(idx==0){
		    			delete copy.isMusic;
			    		delete copy.musicUrl;
		    		}
		    		//过滤预约、留言、涂抹控件
		    		if(copy.anm && copy.anm.length>0){
		    			for(var i=0;i<copy.anm.length;i++){
		    				if(copy.anm[i].elType=='mask'){
		    					delete copy.anm.splice(i,1);
		    				}
		    			}
		    			for(var i=0;i<copy.anm.length;i++){
		    				if(copy.anm[i].elType=='message'){
		    					delete copy.anm.splice(i,1);
		    				}
		    			}
		    			for(var i=0;i<copy.anm.length;i++){
		    				if(copy.anm[i].elType=='book'){
		    					delete copy.anm.splice(i,1);
		    				}
		    			}
		    		}
		    		newData.push(copy);
		    		for(var i=idx+1;i<window.app.data.length;i++){
		    			newData.push(window.app.data[i]);
			    	}
		    		window.app.data=newData;
		    	}	   
		    	var html=' <li idx="'+(idx+1)+'" class="page-li selected"><span>'+(idx+2)+'</span>第'+(idx+2)+'页<img class="del" title="删除" src="../image/edit/del.png"><img class="copy" title="复制" src="'+window.app.basePath+'image/copy.png"><img class="template" title="页面模版" src="../image/edit/template.png"></li>';
		    	var $newPage=$(html);
			    var $pageli=$('#page>li');
			    $newPage.insertAfter($pageli.eq(idx));
		    	//重排
		    	$pageli=$('#page>li');
		    	$pageli.each(function(i){
		    		$(this).attr('idx',i).html('<span>'+(i+1)+'</span>第'+(i+1)+'页<img class="del" title="删除" src="../image/edit/del.png"><img class="copy" title="复制" src="../image/edit/copy.png"><img class="template" title="页面模版" src="../image/edit/template.png">');
		    	});
		    	$pageli.eq(idx+1).click();
	    	}
	    	e.stopPropagation();
	    });
	  	//删除
	    $('#page').on('click','li .del',function(e){
	    	if(window.confirm('确定要删除此页？')){
	    		if($('#page>li').length==1){
	    			alert('至少要保留一页哦！');
	    			return;
	    		}
	    		var $currli=$(this).parent();
		    	var idx=parseInt($currli.attr('idx'));
		    	if(idx==0){
		    		window.app.data[idx+1].isMusic=window.app.data[idx].isMusic;
		    		window.app.data[idx+1].musicUrl=window.app.data[idx].musicUrl;
		    	}
		    	delete window.app.data[idx];
			    var newData=[];
		    	for(var i=0;i<window.app.data.length;i++){
		    		if(!window.app.data[i]) continue;
		    		newData.push(window.app.data[i]);
			    }
		    	window.app.data=newData;    	
	    		$currli.remove();
	    		//重排
		    	var $pageli=$('#page>li');
		    	$pageli.each(function(i){
		    		$(this).attr('idx',i).html('<span>'+(i+1)+'</span>第'+(i+1)+'页<img class="del" title="删除" src="../image/edit/del.png"><img class="copy" title="复制" src="../image/edit/copy.png"><img class="template" title="页面模版" src="../image/edit/template.png">');
		    	});
		    	if(!$pageli.eq(idx).hasClass('selected')){
		    		if(idx==(window.app.data.length-1)){
		    			$pageli.eq(idx-1).click();
		    		}else{
			    		$pageli.eq(idx).click();    			    			
		    		}		
	    		}
	    	}
	    	e.stopPropagation();	    	
	    });	  	
	    //页面模版
	    $('#page').on('click','li .template',function(e){
	    	var $currli=$(this).parent();
	    	var idx=parseInt($currli.attr('idx'));
	    	showSelectTemplate(function(data){	    	
	    		if(window.confirm('确定要使用该页面模版，覆盖当前页面？')){
		    		var currData=window.app.data[$('#page li.selected').index()-1];
		    		currData.bg=data.bg;
		    		currData.anm=data.anm;
		    		hideSelectTemplate();
		    		var $pageli=$('#page>li');
		    		$pageli.eq(idx).click();
	    		}   		
	    	});
	    	e.stopPropagation();
	    });
	    
	    $('.main .top .setting').click(function(){
	    	edit(TYPE_SETTING,window.app.data);
	    });
	    $('.main .top .addWidget').click(function(){
	    	var currIdx=$('#page li.selected').index()-1;
	    	edit(TYPE_WIDGET,window.app.data[currIdx]);
	    });
	    $('.main .top .editBackground').click(function(){
	    	var currIdx=$('#page li.selected').index()-1;
	    	edit(TYPE_BG,window.app.data[currIdx]);
	    });
	    
	    //编辑app名称
		$('.edit-app-name').on('click', function(){
			if ($('p.p-edit-app-name').length>0) {
				$('p.p-edit-app-name').find('input').focus();
				return false;
			}			
			var h4 = $(this).parent('h4');
			var id = h4.attr('data-id');
			var oldname = h4.find('span:first').text();
			var input = $('<input type="text" placeHolder="场景名称" value="'+oldname+'" style="width:370px; margin-left: 0!important;margin-top: 2px;"></input>');
			h4.find('.app-name-show').hide();
			h4.find('.edit-app-name').hide();			
			h4.prepend(input);
			input.focus();
			input.on('blur', function(){
				var $this = $(this);
				var name = $.trim($this.val());
				if (name == '') {
					$this.focus();
					alert("请输入场景应用名称");
					return false;
				} else if(name.length > 22) {
					$this.focus();
					alert("场景应用名称不能超过22个字！");
					return false;				
				}
				name=name.replace(/"/g,"");
				$('.u-listShow-2 .item-bottom h4 a').html(name);
				input.remove();
				h4.find('.app-name-show').show();
				h4.find('.edit-app-name').show();
				window.app.name=name;
				$('.content .appname').val(name);
			});
		});
	    
		var ajaxing=false;
		function ajaxData(callback){
			if(ajaxing) return;
			var globalData=window.app.data;
			var data=[];
			for(var i=0;i<globalData.length;i++){
				if(globalData[i]){
					data.push(globalData[i]);
				}
			}
			data=getValidateData(data);
			data=JSON.stringify(data);
			ajaxing=true;
			$.ajax({
				url : "saveInviteLetter.action",
				//dataType: "json",
//				jsonp: "callback",
				type:'post',
				data : {
					//action:'modifyData',
					id: window.app.invitation_id,
					desc: JSON.stringify(window.app.data),
					langType: window.app.langType,
					name: window.app.name
				},
				success : function(res){
					if (res == '0000') {
						if (callback && typeof callback == 'function') {
							callback();
						}
					} else {
						alert('更新数据失败');
					}
					/*if(res && res.responseText && res.responseText.indexOf('login.jsp')!=-1){
						//显示登录框
						showLogin();
					}
					if(res.success==true){
						if(callback && typeof callback=='function'){
							callback();
						}
					}else{
						alert('更新数据失败');
					}*/
					ajaxing=false;
				},
				error:function(res){
					/*if(res && res.responseText && res.responseText.indexOf('login.jsp')!=-1){
						//显示登录框
						showLogin();
					}*/
					ajaxing=false;
				}
			});
		}
		
		//保存数据
		$('#save').click(function(){
			ajaxData(function(){
				alert('场景已保存成功');
				/*$(window).unbind('beforeunload');
				location.reload();*/
			});
		});
		//30分钟自动保存数据
		setInterval(function(){
			ajaxData();
		},1000*60*30);
		
		//登录
		function showLogin(){
			//读取已记住的登录信息
			var $unameEl = $('#masklogin #loginUserName>input');
			var $pwdEl = $('#masklogin #loginPassWord>input');
			var uname = $.cookie(window.app.unamekey);
			var pwd = $.cookie(window.app.pwdKey);
			uname = uname ? uname : '';
			pwd = pwd ? pwd : '';
			$unameEl.val(uname);
			$pwdEl.val(pwd);
			$('#masklogin').show();
		}
		function hideLogin(){
			$('#masklogin').hide();
		}
		//标志位，防止重复点击
		var logining = false;
		function login(){
			if (logining) return;
			var $unameEl = $('#masklogin #loginUserName>input');
			var $pwdEl = $('#masklogin #loginPassWord>input');
			var username = $unameEl.val();
			var password = $pwdEl.val();
			if ($.trim(username).length == 0 || $.trim(password).length == 0) {
				alert('请填写帐号与密码');
				return;
			}
			logining = true;
			$.post('/login', {
				username : username,
				password : password
			}, function(result) {
				logining = false;
				if (result.success) {
					if(username==window.app.uname){
						hideLogin();						
					}else{
						location.href='/myapp/list.jsp';
					}
				} else {
					alert('账号或密码不正确，请重试');
				}
			}, 'json');
		}
		$('#masklogin').on('click', '.submit a', login);
		$('#masklogin').on('keyup', '.formWrap .input input', function(e){
			var event=e?e:window.event;
			if(event.keyCode==13){
				login();				
			}
		});
		
		//禁止右键事件
		$('.create-menu ul').live("contextmenu",function(e){
	        return false;
	    });
		$(document).click(function(e){
			if(!$(e.target).is('.create-menu ul li')){
				$('.create-menu ul').hide();
				$(window.document.body).css('height','auto');
			}
			/*if(!$(e.target).is($('.create-menu ul li'))){
				$('.bar-container .bar',$('#screen')[0].contentWindow.document.body).hide();		
			}*/
		});
		
		//初始化，默认为场景设置界面
    	edit(TYPE_BG,window.app.data[$('#page li.selected').index()-1],true);
		$('.main .top .setting').click();
		
		//高级设置
		function toInitPos($el,pos){
			var w=$el.width();
			var h=$el.height();
			//定位
			var pt=pos,offX=0,offY=0,mtop=0,mleft=0;
			if(pt=='left'){
				mtop=0-h/2+offY;
				mleft=offX;
				$el.css('top','50%').css('left','0px').css('margin-top',mtop).css('margin-left',mleft);
			}else if(pt=='right'){
				mtop=0-h/2+offY;
				mleft=offX;
				$el.css('top','50%').css('right','0px').css('left','inherit').css('margin-top',mtop).css('margin-right',0-mleft);
			}else if(pt=='top'){
				mtop=offY;
				mleft=0-w/2+offX;
				$el.css('top','0px').css('left','50%').css('margin-top',mtop).css('margin-left',mleft);
			}else if(pt=='bottom'){
				mtop=offY;
				mleft=0-w/2+offX;
				$el.css('bottom','0px').css('top','inherit').css('left','50%').css('margin-bottom',0-mtop).css('margin-left',mleft);
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
				$el.css('bottom','0px').css('top','inherit').css('left','0px').css('margin-bottom',0-mtop).css('margin-left',mleft);
			}else if(pt=='rightTop'){
				mtop=offY;
				mleft=offX;
				$el.css('top','0px').css('right','0px').css('left','inherit').css('margin-top',mtop).css('margin-right',0-mleft);
			}else if(pt=='rightBottom'){
				mtop=offY;
				mleft=offX;
				$el.css('bottom','0px').css('top','inherit').css('right','0px').css('left','inherit').css('margin-bottom',0-mtop).css('margin-right',0-mleft);
			}
	}
	$('.edit.mobile select.initpos').change(function(){
		var val=$(this).val();
		//更新数据
	    currEditObj.initPos=val;
	    currEditObj.offsetX=0;
	    currEditObj.offsetY=0;
	    toInitPos($('#screen')[0].contentWindow.Bar.currEl,val);
	});
		
});

//路径类型
var PATH_TYPE_IMG='img';
var PATH_TYPE_MUSIC='music';
var PATH_TYPE_VIDEO='video';

//调用图库
var selectImg=null;
function showSelectImg(callback){
	$('#new_media_div_').show();
	selectImg=callback;
}
function hideSelectImg(){
	$('#new_media_div_').fadeOut(100,function(){
		$('#myImage',$('#app_pic_select')[0].contentWindow.document.body).click();
	});
}
//页面模版
var selectTemplate=null;
function showSelectTemplate(callback){
	$('#new_template_div_').show();
	selectTemplate=callback;
}
function hideSelectTemplate(){
	$('#new_template_div_').fadeOut(100,function(){
		$('#showAll',$('#app_template_select')[0].contentWindow.document.body).click();		
	});
}
//隐藏音乐选择窗口
function hideSelectMusic(){
	$('#preMusic').get(0).pause();
	$('#new_music_div_ .pBtn.pause').hide();
	$('#new_music_div_ .pBtn.play').show();	
	$('#new_music_div_').hide();
}
//关闭浏览器提示
$(window).bind('beforeunload', function() {return '请确认场景内容已保存';} );
//顶部菜单、logo跳转不提示
$('.header .menu ul li a,.header .content a.fl').live('click',function(){
	$(window).unbind('beforeunload');
});

$(function(){
	$('div.ed-btn .i001').hover(function(){
		$('div.ed-btn>a.i001').toggleClass('hover');
	});
	$('div.ed-btn .i002').hover(function(){
		$('div.ed-btn>a.i002').toggleClass('hover');
	});
	$('div.ed-btn .i003').hover(function(){
		$('div.ed-btn>a.i003').toggleClass('hover');
		$('.i003-tip').toggleClass('f-hide');
	});
	$('div.ed-btn .i004').hover(function(){
		$('div.ed-btn>a.i004').toggleClass('hover');
		$('.i004-tip').toggleClass('f-hide');
	});
});

//定时轮询当前页面data，以做历史记录
var historyData=[];
var maxHistoryStep=11;
setInterval(function(){
	var currIdx=$('#page li.selected').index()-1;
	var currentData=window.app.data[currIdx];
	if(historyData.length==0){
		var copyTemp={};
		$.extend(true, copyTemp, currentData);
		historyData.push(copyTemp);
	}else{
		if(JSON.stringify(historyData[historyData.length-1])!=JSON.stringify(currentData)){
			var copyTemp={};
			$.extend(true, copyTemp, currentData);
			//判断是否超过最大记录数
			if(historyData.length==maxHistoryStep){
				var newData=[];
				for(var i=1;i<historyData.length;i++){
					newData.push(historyData[i]);
				}
				historyData=newData;
			}
			historyData.push(copyTemp);
		}
	}
},600);

//* url.js *//
function getValiteStr(str){
	str=str.replace(/"/g,'');
	str=str.replace(/'/g,'');
	str=str.replace(/\r\n/g,' ');
	str=str.replace(/\n/g,' ');
	str=str.replace(/\r/g,' ');
	return str;
}

//判断是否为页面的参数
var propertyArr=['type','bg','anm','canDelete','isMusic','musicUrl','description','loadinglogo','logo','title','pageanimate','pageplaytype','pagescrolltype','isAutoPlay','autoPlayTime'];
function isPropForPage(prop){
	if(!prop) return true;
	if(propertyArr.indexOf(prop)!=-1){
		return true;
	}else{
		return false;
	}
}
function getValidateData(data){
	
	if(!data || data.length==0) return data;
	for(var i=0;i<data.length;i++){
		var d=data[i];
		if(!d) continue;
		for(var o in d){
			if(!isPropForPage(o)){
				delete d[o];
				continue;
			}
			if('string' == typeof d[o]){
				d[o]=getValiteStr(d[o]);
			}
			if(i==data.length-1){
				d['type']='share';
				if(d['anm']){
					d['anm']='';
					delete d['anm'];
				}
			}
		}
	}
	return data;
}
//* url.js  end *//