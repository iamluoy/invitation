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

//初始化
$(function(){
		
	function refreshLayer(){
		var $container=$('.bar-container');
		var currIdx=$('#page li.selected',window.parent.document).index()-1;
		var anm=window.parent.app.data[currIdx].anm;
		for(var i=0;i<$container.length;i++){
			anm[i].zIndex=$container.eq(i).css('z-index');
		}
		//隐藏弹出层
		$menuUl.hide();
		$(window.parent.document.body).css('height','auto');
	}
	
	setTimeout(function(){
		
		//上移一层
		$menuUl.find('#bring-up').click(function(){		
			var zIndex=parseInt(Bar.currEl.css('z-index'));
			var $container=$('.bar-container');
			//判断是否最上一层
			if($container.length==zIndex){
				//隐藏弹出层
				$menuUl.hide();
				$(window.parent.document.body).css('height','auto');
				return;
			}
			$container.each(function(){
				var $self=$(this);
				var zIdx=parseInt($self.css('z-index'));
				if(zIdx==zIndex+1){
					//更新ui
					Bar.currEl.css('z-index',(zIndex+1));
					$self.css('z-index',zIndex);
					//更新数据
					refreshLayer();
					return false;
				}
			});		
		});
		
		//下移一层
		$menuUl.find('#bring-down').click(function(){
			var zIndex=parseInt(Bar.currEl.css('z-index'));
			var $container=$('.bar-container');
			//判断是否最下一层
			if(1==zIndex){
				//隐藏弹出层
				$menuUl.hide();
				$(window.parent.document.body).css('height','auto');
				return;
			}
			$container.each(function(){
				var $self=$(this);
				var zIdx=parseInt($self.css('z-index'));
				if(zIdx==zIndex-1){
					//更新ui
					Bar.currEl.css('z-index',(zIndex-1));
					$self.css('z-index',zIndex);
					//更新数据
					refreshLayer();
					return false;
				}
			});	
		});
		
		//置于顶层
		$menuUl.find('#bring-top').click(function(){		
			var zIndex=parseInt(Bar.currEl.css('z-index'));
			var $container=$('.bar-container');
			//判断是否最上一层
			if($container.length==zIndex){
				//隐藏弹出层
				$menuUl.hide();
				$(window.parent.document.body).css('height','auto');
				return;
			}
			$container.each(function(){
				var $self=$(this);
				var zIdx=parseInt($self.css('z-index'));
				if(zIdx>zIndex){
					//更新ui
					$self.css('z-index',(zIdx-1));
				}
			});
			Bar.currEl.css('z-index',$container.length);
			//更新数据
			refreshLayer();		
		});
		
		//置于底层
		$menuUl.find('#bring-bottom').click(function(){		
			var zIndex=parseInt(Bar.currEl.css('z-index'));
			var $container=$('.bar-container');
			//判断是否最下一层
			if(1==zIndex){
				//隐藏弹出层
				$menuUl.hide();
				$(window.parent.document.body).css('height','auto');
				return;
			}
			$container.each(function(){
				var $self=$(this);
				var zIdx=parseInt($self.css('z-index'));
				if(zIdx<zIndex){
					//更新ui
					$self.css('z-index',(zIdx+1));
				}
			});
			Bar.currEl.css('z-index',1);
			//更新数据
			refreshLayer();		
		});
		
		//删除
		$menuUl.find('#delete-item').click(function(){
			//隐藏弹出层
			$menuUl.hide();
			$(window.parent.document.body).css('height','auto');
			//先置于顶层
			$menuUl.find('#bring-top').click();	
			Bar.currEl.remove();
			var currIdx=$('#page li.selected',window.parent.document).index()-1;
			var anm=window.parent.app.data[currIdx].anm;
			var curr=window.parent.currEditObj;
			var newAnm=[];
			for(var i=0;i<anm.length;i++){
				if(curr!=anm[i]){
					newAnm.push(anm[i]);
				}
			}
			window.parent.app.data[currIdx].anm=newAnm;	
			//处理其他选中的
			var $container=$('.translate-back .page-con.j-txtWrap.lazy-img>div');
			$container.each(function(){				
				var $self=$(this);
				if($self.find('.bar').css('display')=='block'){
					//至于顶层
					var zIndex=$self.css('z-index');
					if($container.length!=zIndex){
						$container.each(function(){
							var zIdx=parseInt($(this).css('z-index'));
							if(zIdx>zIndex){
								//更新ui
								$(this).css('z-index',(zIdx-1));
							}
						});
						$self.css('z-index',$container.length);
						//更新数据
						refreshLayer();	
					}
					
					newAnm=[];
					anm=window.parent.app.data[currIdx].anm;
					for(var i=0;i<anm.length;i++){
						if($self.css('z-index')!=anm[i].zIndex){
							newAnm.push(anm[i]);
						}
					}
					window.parent.app.data[currIdx].anm=newAnm;	
					$self.remove();
				}				
			});
			$('.main .top .editBackground',window.parent.document).click();
			
			try{
				key_deleting=false;
				window.parent.key_deleting=false;
			}catch(e){				
			}
		});
		
		//复制
		$menuUl.find('#copy-item').click(function(){

			//兼容全选没有选中任何控件的时候
			var $container_;
			if($('#screen').length>0){
				$container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div',$('#screen')[0].contentWindow.document);
			}else{
				$container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div');				
			}
			if(!Bar.currEl){
				if($('#screen').length>0){
					$container_.each(function(){
						if($(this).hasClass('ui-draggable')){
							$('#screen')[0].contentWindow.Bar.setCurrEl($(this));	
							Bar.currEl=$(this);
							window.currEditObj=$('#screen')[0].contentWindow.globalData.anm[$(this).index()];
						}
					});			
				}else{
					$container_.each(function(){
						if($(this).hasClass('ui-draggable')){
							Bar.setCurrEl($(this));	
							Bar.currEl=$(this);
							window.parent.currEditObj=globalData.anm[$(this).index()];
						}
					});						
				}
			}
			//选择
			var minIdx=0;
			var copyItems=[];
			$container_.each(function(){
				if($(this).find('.bar').css('display')=='block'){					
					if(minIdx==0 || parseInt($(this).css('z-index'))<minIdx){
						minIdx=$(this).css('z-index');
						Bar.currEl=$(this);
						window.parent.currEditObj=globalData.anm[$(this).index()];
					}else{
						copyItems.push($(this));						
					}
				}
			});
			//排序
			bubbleSort(copyItems);
			
			//复制ui	
			var $container=$('.bar-container');
			var copyItem=Bar.currEl.clone();
			var currItem=Bar.currEl;
			copyItem.attr('id',copyItem.attr('id')+'0');
			copyItem.css('z-index',$container.length+1);
			copyItem.attr('class',copyItem.attr('class').replace('a-','b-')).css('opacity','1');
			var tempDelay=copyItem[0].style.webkitAnimationDelay;
			var tempDuration=copyItem[0].style.webkitAnimationDuration;
			copyItem[0].style.animationDelay='0s';
			copyItem[0].style.animationDuration='0s';
			copyItem[0].style.webkitAnimationDelay='0s';
			copyItem[0].style.webkitAnimationDuration='0s';
			copyItem[0].style.webkitTransform='translateY(0px)';
			copyItem[0].style.transform='translateY(0px)';
			$('.m-page .page-con').append(copyItem);
			copyItem.css({top:(copyItem.offset().top-parseFloat(copyItem.css('margin-top'))+15),left:(copyItem.offset().left-parseFloat(copyItem.css('margin-left'))+10)});
			//复制数据
			var currIdx=$('#page li.selected',window.parent.document).index()-1;
			var anm=window.parent.app.data[currIdx].anm;
			var curr=window.parent.currEditObj;
			var copy={};
			$.extend(true, copy, curr);
			copy.zIndex=$container.length+1;
			copy.offsetX=parseFloat(copy.offsetX)+20;
			copy.offsetY=parseFloat(copy.offsetY)+30;
			anm.push(copy);
			var type=copy.elType?copy.elType:window.parent.TYPE_IMAGE;
			resizeMove(copyItem,copy,type);
			Bar._initSelfScale(copyItem);
			//隐藏弹出层
			$menuUl.hide();
			$(window.parent.document.body).css('height','auto');
			
			//复制其他选中控件
			if($menuUl.find('.menu-line').css('display')!='none'){
				//选中复制元素
				copyItem.click();				
			}else{
				copyItem.find('.bar').hide();
				var initCopyItem=copyItem;
				var newAnm_=[];
				var pluginIdx=2;
				for(var i=0;i<copyItems.length;i++){
					var $self=copyItems[i];
					if($self.find('.bar').css('display')=='block' && !$self.is(currItem)){
						var anm_=window.parent.app.data[currIdx].anm;
						var copyItem_;
						for(var j=0;j<anm_.length;j++){
							if($self.css('z-index')==anm_[j].zIndex){
								//复制ui
								copyItem_=$self.clone();
								copyItem_.attr('id',copyItem_.attr('id')+(i+1));
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
								$('.m-page .page-con').append(copyItem_);
								copyItem_.css({top:(copyItem_.offset().top-parseFloat(copyItem_.css('margin-top'))+15),left:(copyItem_.offset().left-parseFloat(copyItem_.css('margin-left'))+10)});
								//复制数据
								var copy={};
								$.extend(true, copy, anm_[j]);
								copy.zIndex=$container_.length+pluginIdx;
								copy.offsetX=parseFloat(copy.offsetX)+20;
								copy.offsetY=parseFloat(copy.offsetY)+30;
								newAnm_.push(copy);
								var type=copy.elType?copy.elType:window.parent.TYPE_IMAGE;
								resizeMove(copyItem_,copy,type);
								Bar._initSelfScale(copyItem_);
								//选中		
								key_control=true;
								copyItem_.find('.bar').show();
								pluginIdx++;
								$self.find('.bar').hide();
								break;
							}
						}
					}
				}
				for(var i=0;i<newAnm_.length;i++){
					anm.push(newAnm_[i]);
				}
				currItem.find('.bar').hide();
				initCopyItem.find('.bar').hide();
				initCopyItem.click();
				key_control=false;
			}
			//隐藏弹出层
			$menuUl.hide();
			
		});
		
	},800);
	
});