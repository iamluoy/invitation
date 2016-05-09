var key_deleting=false;//标识是否正在删除控件
var key_control=false;//标记是否按下了ctrl或者shift键
var key_copyItem={item:[],data:[]};//复制内容
function bubbleSort(arr){
    //外层循环，共要进行arr.length次求最大值操作
    for(var i=0;i<arr.length;i++){
        //内层循环，找到第i大的元素，并将其和第i个元素交换
        for(var j=i;j<arr.length;j++){
            if(parseInt(arr[i].css('z-index'))>parseInt(arr[j].css('z-index'))){
                //交换两个元素的位置
                var temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp;
            }
        }
    }
}
function bubbleSortData(arr){
    //外层循环，共要进行arr.length次求最大值操作
    for(var i=0;i<arr.length;i++){
        //内层循环，找到第i大的元素，并将其和第i个元素交换
        for(var j=i;j<arr.length;j++){
            if(parseInt(arr[i].zIndex)>parseInt(arr[j].zIndex)){
                //交换两个元素的位置
                var temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp;
            }
        }
    }
}
$(function(){
	
	
	$(document).on('keydown',function(e){
		
		if($(e.srcElement).is('input') || $(e.srcElement).is('textarea')){
			return;
		}
		
		//方向键
		if(e.keyCode>=37 && e.keyCode<=40){
			var currEl=null;
			try{
				currEl=Bar.currEl;
			}catch(e){
			}
			if(currEl==null){
				try{
					currEl=$('#screen')[0].contentWindow.Bar.currEl;		
				}catch(e){
					currEl=$('#screen',window.parent.document)[0].contentWindow.Bar.currEl;		
				}
			}
			if(currEl&&!currEl.hasClass('ui-draggable')) return;
			
			//兼容全选没有选中任何控件的时候
			if(!currEl){
				if($('#screen').length>0){
					var $container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div',$('#screen')[0].contentWindow.document);
					$container_.each(function(){
						if($(this).hasClass('ui-draggable')){
							$('#screen')[0].contentWindow.Bar.setCurrEl($(this));	
							currEl=$(this);
							window.currEditObj=$('#screen')[0].contentWindow.globalData.anm[$(this).index()];
						}
					});			
				}else if($('#select_pic').length>0){
					var $container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div',$('#screen',window.parent.document)[0].contentWindow.document);
					$container_.each(function(){
						if($(this).hasClass('ui-draggable')){
							$('#screen',window.parent.document)[0].contentWindow.Bar.setCurrEl($(this));	
							currEl=$(this);
							window.currEditObj=$('#screen',window.parent.document)[0].contentWindow.globalData.anm[$(this).index()];
						}
					});			
				}else{
					var $container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div');
					$container_.each(function(){
						if($(this).hasClass('ui-draggable')){
							Bar.setCurrEl($(this));	
							currEl=$(this);
							window.parent.currEditObj=globalData.anm[$(this).index()];
						}
					});						
				}
			}
			
			
			if(currEl && currEl.find('.bar').css('display')=='block'){
				//隐藏弹出层
				try{
					$menuUl.hide();
					$(window.parent.document.body).css('height','auto');
					$(window.document.body).css('height','auto');					
				}catch(e){					
				}
				e.preventDefault();
				var disX=0,disY=0,mt=parseFloat(currEl.css('marginTop')),
						ml=parseFloat(currEl.css('marginLeft')),mb=parseFloat(currEl.css('marginBottom')),
						mr=parseFloat(currEl.css('marginRight')),b=currEl.css('bottom'),r=currEl.css('right');
				if(e.keyCode==37){
					disX=-1;
				}else if(e.keyCode==38){
					disY=-1;
				}else if(e.keyCode==39){
					disX=1;
				}else if(e.keyCode==40){
					disY=1;					
				}
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
				//改变data里面控件的位置
				var currEditObj_=null;
				try{
					currEditObj_=window.parent.currEditObj;
				}catch(e){
				}
				if(currEditObj_==null){
					currEditObj_=window.currEditObj;
				}
				currEditObj_.offsetX=parseFloat(currEditObj_.offsetX)+disX*2;
				currEditObj_.offsetY=parseFloat(currEditObj_.offsetY)+disY*2;	
				
				//处理其他被选中的
				var $container=null;
				try{
					$container=$('.translate-back .page-con.j-txtWrap.lazy-img>div');
				}catch(e){
				}
				try{
					if($container==null || $container.length==0){
						$container=$('.translate-back .page-con.j-txtWrap.lazy-img>div',$('#screen')[0].contentWindow.document);
					}
				}catch(e){
					$container=$('.translate-back .page-con.j-txtWrap.lazy-img>div',$('#screen',window.parent.document)[0].contentWindow.document);
				}
				if($container!=null){
					$container.each(function(){
						var $el=$(this);
						if($el && !$el.is(currEl) && $el.find('.bar').css('display')=='block'){
							mt=parseFloat($el.css('marginTop'));
							ml=parseFloat($el.css('marginLeft'));
							mb=parseFloat($el.css('marginBottom'));
							mr=parseFloat($el.css('marginRight'));
							b=$el.css('bottom');
							r=$el.css('right');
							if(b=='0px'){
								$el.css({marginBottom:mb-disY});
							}else{
								$el.css({marginTop:mt+disY});					
							}
							if(r=='0px'){
								$el.css({marginRight:mr-disX});
							}else{
								$el.css({marginLeft:ml+disX});					
							}
							//处理data里面的控件位置
							var index=$el.index();
							var obj=null;
							try{
								obj=globalData.anm[index];
							}catch(e){
							}
							try{
								if(obj==null){
									obj=$('#screen')[0].contentWindow.globalData.anm[index];
								}
							}catch(e){
								obj=$('#screen',window.parent.document)[0].contentWindow.globalData.anm[index];
							}
							obj.offsetX=parseFloat(obj.offsetX)+disX*2;
							obj.offsetY=parseFloat(obj.offsetY)+disY*2;	
						}
					});
				}				
			}		
		}
		
		//删除键
		if(e.keyCode==46){
			if(key_deleting) return;
			key_deleting=true;
			var currEl=null;
			try{
				currEl=Bar.currEl;
			}catch(e){
			}
			if(currEl==null){
				try{
					currEl=$('#screen')[0].contentWindow.Bar.currEl;		
				}catch(e){
					currEl=$('#screen',window.parent.document)[0].contentWindow.Bar.currEl;		
				}
			}	
			
			//兼容全选没有选中任何控件的时候
			if(!currEl){
				if($('#screen').length>0){
					var $container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div',$('#screen')[0].contentWindow.document);
					$container_.each(function(){
						if($(this).hasClass('ui-draggable')){
							$('#screen')[0].contentWindow.Bar.setCurrEl($(this));	
							currEl=$(this);
							window.currEditObj=$('#screen')[0].contentWindow.globalData.anm[$(this).index()];
						}
					});			
				}else if($('#select_pic').length>0){
					var $container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div',$('#screen',window.parent.document)[0].contentWindow.document);
					$container_.each(function(){
						if($(this).hasClass('ui-draggable')){
							$('#screen',window.parent.document)[0].contentWindow.Bar.setCurrEl($(this));	
							currEl=$(this);
							window.currEditObj=$('#screen',window.parent.document)[0].contentWindow.globalData.anm[$(this).index()];
						}
					});			
				}else{
					var $container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div');
					$container_.each(function(){
						if($(this).hasClass('ui-draggable')){
							Bar.setCurrEl($(this));	
							currEl=$(this);
							window.parent.currEditObj=globalData.anm[$(this).index()];
						}
					});						
				}
			}
			
			if(currEl && currEl.find('.bar').css('display')=='block'){
				if($('#screen').length>0){
					$('#screen')[0].contentWindow.$menuUl.find('#delete-item').click();						
				}else if($('#select_pic').length>0){
					$('#screen',window.parent.document)[0].contentWindow.$menuUl.find('#delete-item').click();							
				}else{
					$menuUl.find('#delete-item').click();						
				}			
			}else{
				key_deleting=false;
			}
			
		}
		
		//ctrl或者shift键
		if(e.keyCode==16 || e.keyCode==17){
			try{
				key_control=true;
				$('#screen')[0].contentWindow.key_control=true;
			}catch(e){
				$('#screen',window.parent.document)[0].contentWindow.key_control=true;
			}
		}
		
		//ctrl+a键
		if (e.ctrlKey && e.which == 65){
			e.preventDefault();
			var $container=null;
			try{
				$container=$('.translate-back .page-con.j-txtWrap.lazy-img>div');
			}catch(e){
			}
			try{
				if($container==null || $container.length==0){
					$container=$('.translate-back .page-con.j-txtWrap.lazy-img >div',$('#screen')[0].contentWindow.document);
				}
			}catch(e){
				$container=$('.translate-back .page-con.j-txtWrap.lazy-img >div',$('#screen',window.parent.document)[0].contentWindow.document);
			}
			if($container!=null){
				$container.each(function(){
					if($(this).hasClass('ui-draggable')){
						$(this).find('.bar').show();
					}else{
						$(this).find('.bar').hide();						
					}
				});
			}
			if($('#screen').length>0){	
				$('.main .mobile.edit').hide();
				$('.main .mobile.edit.bg').show();
			}else{	
				$(window.parent.document).find('.main .mobile.edit').hide();
				$(window.parent.document).find('.main .mobile.edit.bg').show();					
			}		
		}
		
		//ctrl+c键
		if (e.ctrlKey && e.which == 67){
			
			var key_copyItem_={item:[],data:[]};			
			var $container_;
			if($('#screen').length>0){
				$container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div',$('#screen')[0].contentWindow.document);	
			}else if($('#select_pic').length>0){
				$container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div',$('#screen',window.parent.document)[0].contentWindow.document);					
			}else{
				$container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div');
			}
				
			var canCopy=false;
			$container_.each(function(){
				var $self=$(this);
				if($self.find('.bar').css('display')=='block' && $self.hasClass('ui-draggable')){
					canCopy=true;
					return;
				}
			});
			if(!canCopy) return;
			
			var newAnm_=[];
			$container_.each(function(){
				var $self=$(this);
				if($self.find('.bar').css('display')=='block'){
					var currIdx;
					if($('#screen').length>0){
						currIdx=$('#page li.selected').index()-1;					
					}else{
						currIdx=$('#page li.selected',window.parent.document).index()-1;							
					}	
					var anm_=window.parent.app.data[currIdx].anm;
					var pluginIdx=1;
					var copyItem_;
					for(var i=0;i<anm_.length;i++){
						if($self.css('z-index')==anm_[i].zIndex){
							//复制ui
							copyItem_=$self.clone();
							copyItem_.removeAttr('id');
							copyItem_.css('z-index',$container_.length+pluginIdx);
							copyItem_.attr('class',copyItem_.attr('class').replace('a-','b-')).css('opacity','1');
							var tempDelay=copyItem_[0].style.webkitAnimationDelay;
							var tempDuration=copyItem_[0].style.webkitAnimationDuration;
							copyItem_[0].style.animationDelay='0s';
							copyItem_[0].style.animationDuration='0s';
							copyItem_[0].style.webkitAnimationDelay='0s';
							copyItem_[0].style.webkitAnimationDuration='0s';
							copyItem_[0].style.webkitTransform='translateY(0px)';
							copyItem_[0].style.transform='translateY(0px)';
							key_copyItem_.item.push(copyItem_);
							//复制数据
							var copy={};
							$.extend(true, copy, anm_[i]);
							copy.zIndex=$container_.length+pluginIdx;
							copy.offsetX=parseFloat(copy.offsetX)+20;
							copy.offsetY=parseFloat(copy.offsetY)+30;
							key_copyItem_.data.push(copy);
							pluginIdx++;
						}
					}
				}
			});
			//排序
			bubbleSort(key_copyItem.item);
			bubbleSortData(key_copyItem.data);
			if($('#screen').length>0){
				$('#screen')[0].contentWindow.key_copyItem=key_copyItem_;
				$('#app_pic_select')[0].contentWindow.key_copyItem=key_copyItem_;
				key_copyItem=key_copyItem_;
			}else{
				$('#app_pic_select',window.parent.document)[0].contentWindow.key_copyItem=key_copyItem_;
				window.parent.key_copyItem=key_copyItem_;
				key_copyItem=key_copyItem_;
			}
			if($('#select_pic').length>0){
				$('#screen',window.parent.document)[0].contentWindow.key_copyItem=key_copyItem_;
			}
			
		}
		
		//ctrl+v键
		if (e.ctrlKey && e.which == 86){
			
			if($('#screen').length>0){
				$('.bar-container .bar',$('#screen')[0].contentWindow.document).hide();
				var $container=$('.m-page .page-con',$('#screen')[0].contentWindow.document);
				var count=$('.m-page .page-con>div',$('#screen')[0].contentWindow.document).length;		
				var currIdx=$('#page li.selected').index()-1;
				var anm=window.parent.app.data[currIdx].anm;
				var copyArr=[];
				for(var i=0;i<key_copyItem.data.length;i++){
					var copyTemp={};
					$.extend(true, copyTemp, key_copyItem.data[i]);
					copyTemp.zIndex=(count+i+1);
					anm.push(copyTemp);	
					copyArr.push(copyTemp);
				}
				var lastItem;
				for(var i=0;i<key_copyItem.item.length;i++){
					var copyItem_=key_copyItem.item[i].clone();;
					copyItem_.css('z-index',(count+i+1));
					$container.append(copyItem_);	
					copyItem_.css({top:(copyItem_.offset().top-parseFloat(copyItem_.css('margin-top'))+15),left:(copyItem_.offset().left-parseFloat(copyItem_.css('margin-left'))+10)});	
					if(i==(key_copyItem.item.length-1)){
						lastItem=copyItem_;
					}
					var copy=copyArr[i];
					var type=copy.elType?copy.elType:window.parent.TYPE_IMAGE;
					$('#screen')[0].contentWindow.resizeMove(copyItem_,copy,type);
					$('#screen')[0].contentWindow.Bar._initSelfScale(copyItem_);
				}		
				if(lastItem){
					lastItem.find('.bar').hide();
					key_control=true;
					lastItem.click();
					setTimeout(function(){
						key_control=false;					
					},1);
				}
			}else if($('#select_pic').length>0){
				
				$('.bar-container .bar',$('#screen',window.parent.document)[0].contentWindow.document).hide();
				var $container=$('.m-page .page-con',$('#screen',window.parent.document)[0].contentWindow.document);
				var count=$('.m-page .page-con>div',$('#screen',window.parent.document)[0].contentWindow.document).length;		
				var currIdx=$('#page li.selected',window.parent.document).index()-1;
				var anm=window.parent.app.data[currIdx].anm;
				var copyArr=[];
				for(var i=0;i<key_copyItem.data.length;i++){
					var copyTemp={};
					$.extend(true, copyTemp, key_copyItem.data[i]);
					copyTemp.zIndex=(count+i+1);
					anm.push(copyTemp);	
					copyArr.push(copyTemp);
				}
				var lastItem;
				for(var i=0;i<key_copyItem.item.length;i++){
					var copyItem_=key_copyItem.item[i].clone();;
					copyItem_.css('z-index',(count+i+1));
					$container.append(copyItem_);	
					copyItem_.css({top:(copyItem_.offset().top-parseFloat(copyItem_.css('margin-top'))+15),left:(copyItem_.offset().left-parseFloat(copyItem_.css('margin-left'))+10)});	
					if(i==(key_copyItem.item.length-1)){
						lastItem=copyItem_;
					}
					var copy=copyArr[i];
					var type=copy.elType?copy.elType:window.parent.TYPE_IMAGE;
					$('#screen',window.parent.document)[0].contentWindow.resizeMove(copyItem_,copy,type);
					$('#screen',window.parent.document)[0].contentWindow.Bar._initSelfScale(copyItem_);
				}		
				if(lastItem){
					lastItem.find('.bar').hide();
					key_control=true;
					lastItem.click();
					setTimeout(function(){
						key_control=false;					
					},1);
				}
				
			}else{
				key_copyItem=key_copyItem?key_copyItem:window.parent.key_copyItem;
				$('.bar-container .bar').hide();
				var $container=$('.m-page .page-con');
				var count=$('.m-page .page-con>div').length;				
				var currIdx=$('#page li.selected',window.parent.document).index()-1;
				var anm=window.parent.app.data[currIdx].anm;		
				var copyArr=[];
				for(var i=0;i<key_copyItem.data.length;i++){
					var copyTemp={};
					$.extend(true, copyTemp, key_copyItem.data[i]);
					copyTemp.zIndex=(count+i+1);
					anm.push(copyTemp);	
					copyArr.push(copyTemp);
				}
				var lastItem;
				for(var i=0;i<key_copyItem.item.length;i++){
					var copyItem_=key_copyItem.item[i].clone();
					copyItem_.css('z-index',(count+i+1));
					$container.append(copyItem_);	
					copyItem_.css({top:(copyItem_.offset().top-parseFloat(copyItem_.css('margin-top'))+15),left:(copyItem_.offset().left-parseFloat(copyItem_.css('margin-left'))+10)});												
					if(i==(key_copyItem.item.length-1)){
						lastItem=copyItem_;
					}
					var copy=copyArr[i];
					var type=copy.elType?copy.elType:window.parent.TYPE_IMAGE;
					resizeMove(copyItem_,copy,type);
					Bar._initSelfScale(copyItem_);
				}	
				if(lastItem){
					lastItem.find('.bar').hide();
					key_control=true;
					lastItem.click();
					setTimeout(function(){
						key_control=false;					
					},1);
				}
			}
			
		}
		
		//ctrl+z键
		if (e.ctrlKey && e.which == 90){
			var historyData_;
			try{
				if($('#screen').length>0){
					historyData_=historyData;
					if(historyData_.length<=1) return;
					historyData_.pop();
					var lastData=historyData_.pop();
					var currIdx=$('#page li.selected').index()-1;
					window.app.data[currIdx]=lastData;
					$('#screen')[0].contentWindow.location.reload();
			    	$('.main .top .editBackground').click();
				}else if($('#select_pic').length>0){
					historyData_=window.parent.historyData;		
					if(historyData_.length<=1) return;
					historyData_.pop();
					var lastData=historyData_.pop();		
					var currIdx=$('#page li.selected',window.parent.document).index()-1;
					window.parent.app.data[currIdx]=lastData;
					$('#screen',window.parent.document)[0].contentWindow.location.reload();
			    	$('.main .top .editBackground',window.parent.document).click();
				}else{
					historyData_=window.parent.historyData;		
					if(historyData_.length<=1) return;
					historyData_.pop();
					var lastData=historyData_.pop();		
					var currIdx=$('#page li.selected',window.parent.document).index()-1;
					window.parent.app.data[currIdx]=lastData;
					location.reload();
			    	$('.main .top .editBackground',window.parent.document).click();
				}		
			}catch(e){				
			}			
		}
		
		//ctrl+s键
		if (e.ctrlKey && e.which == 83){
			e.preventDefault();
			if($('#screen').length>0){
				$('#save').click();
			}else{
				$('#save',window.parent.document).click();				
			}
		}
		
	}).on('keyup',function(e){
		try{
			key_control=false;
			$('#screen')[0].contentWindow.key_control=false;
		}catch(e){
		}
	});
	
});