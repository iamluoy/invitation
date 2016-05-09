var mouse_down=false;
var mouse_down_pos={x:0,y:0};
var mouse_move_first=true;
var mouse_all_location=[];
var mouse_hasSelect=false;

function getAllViewEl(){
	mouse_all_location=[];
	var $screen,$container_;
	if($('#screen').length>0){
		$screen=$('#screen');
		$container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div',$('#screen')[0].contentWindow.document);
	}else{
		$screen=$('#screen',window.parent.document);	
		$container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div');
	}
	var iframePos={x:$screen.offset().left,y:$screen.offset().top};
	$container_.each(function(){
		var $self=$(this);
		var center={
			x:$self.offset().left+$self.width()/2+iframePos.x,
			y:$self.offset().top+$self.height()/2+iframePos.y,
			el:$self
		}
		mouse_all_location.push(center);
	});
}
function toSelectEl($area){
	var $container_;
	if($('#screen').length>0){
		$container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div .bar',$('#screen')[0].contentWindow.document).hide();
	}else{
		$container_=$('.translate-back .page-con.j-txtWrap.lazy-img>div .bar').hide();
	}
	var left=$area.offset().left;
	var right=left+$area.width();
	var top=$area.offset().top;
	var bottom=top+$area.height();
	var selectCount=0;
	for(var i=0;i<mouse_all_location.length;i++){
		if(mouse_all_location[i].x>=left && mouse_all_location[i].x<=right && mouse_all_location[i].y>=top && mouse_all_location[i].y<=bottom){
			selectCount++;
			if(!mouse_hasSelect){
				mouse_hasSelect=true;
				mouse_all_location[i].el.click();				
			}else{
				mouse_all_location[i].el.find('.bar').show();				
			}
		}
	}
	if(selectCount==0 || selectCount>1){
		if(selectCount==0){
			mouse_hasSelect=false;				
		}	
		if($('#screen').length>0){	
			$('.main .mobile.edit').hide();
			$('.main .mobile.edit.bg').show();
		}else{	
			$(window.parent.document).find('.main .mobile.edit').hide();
			$(window.parent.document).find('.main .mobile.edit.bg').show();					
		}		
	}
}

$(function(){
	
	
	setTimeout(function(){
	
		var areaWidth,areaHeight,areaTop,areaLeft;
		if($('#screen').length>0){
			var $selectArea=$('.selectArea');	
			var iframePos={w:$(document).width(),h:$(document).height()};
			$(document).on('mousedown',function(e){
				if($(e.srcElement).parents('.header').length==0 && !$(e.srcElement).is('.header')
						&& $(e.srcElement).parents('#editSpan input').length==0 && !$(e.srcElement).is('#editSpan input')
						&& $(e.srcElement).parents('input').length==0 && !$(e.srcElement).is('input')
						&& $(e.srcElement).parents('textarea').length==0 && !$(e.srcElement).is('textarea')
						&& $(e.srcElement).parents('.colorpicker').length==0 && !$(e.srcElement).is('.colorpicker') ){
					mouse_move_first=true;
					mouse_down=true;
					mouse_down_pos.x=e.clientX;
					mouse_down_pos.y=e.clientY;		
					getAllViewEl();
				}
			}).on('mousemove',function(e){
				if($(e.srcElement).parents('.header-nav').length==0 && !$(e.srcElement).is('.header-nav')
						&& $(e.srcElement).parents('#editSpan input').length==0 && !$(e.srcElement).is('#editSpan input')
						&& $(e.srcElement).parents('input').length==0 && !$(e.srcElement).is('input')
						&& $(e.srcElement).parents('textarea').length==0 && !$(e.srcElement).is('textarea')){
					e.preventDefault();
				}
				if(mouse_down){
					e.preventDefault();
					if($(e.srcElement).parents('.mobile.edit').length==0 && !$(e.srcElement).is('.mobile.edit')
								&& $(e.srcElement).parents('.m-popup.new-popup').length==0 && !$(e.srcElement).is('.m-popup.new-popup') 
								&& $(e.srcElement).parents('.colorpicker').length==0 && !$(e.srcElement).is('.colorpicker') 
								&& $(e.srcElement).parents('#page').length==0 && !$(e.srcElement).is('#page')){
							$('.translate-back .page-con.j-txtWrap.lazy-img >div',$('#screen')[0].contentWindow.document).find('.bar').hide();
							if($(e.srcElement).parents('div[rightChange]').length==0 && !$(e.srcElement).is('div[rightChange]')){
//								$('.editBackground').click();						
							}
					}else{
							if(mouse_move_first){
								return;
							}					
					}
					mouse_move_first=false;
					areaLeft=mouse_down_pos.x;
					areaTop=mouse_down_pos.y;
					areaWidth=Math.abs(areaLeft-e.clientX);
					areaHeight=Math.abs(areaTop-e.clientY);
					if(e.clientX>areaLeft){
						$selectArea.css('left',areaLeft);
					}else{
						$selectArea.css('left','auto');
						$selectArea.css('right',iframePos.w-areaLeft);				
					}
					if(e.clientY>areaTop){
						$selectArea.css('top',areaTop);
					}else{
						$selectArea.css('top','auto');
						$selectArea.css('bottom',iframePos.h-areaTop);				
					}
					$selectArea.css({width:areaWidth,height:areaHeight}).show();
					toSelectEl($selectArea);
				}			
			}).on('mouseup',function(e){
				mouse_down=false;
				mouse_down_pos.x=0;
				mouse_down_pos.y=0;
				$selectArea.css({left:'auto',right:'auto',top:'auto',bottom:'auto',display:'none'})
			});
		}else{
			var $selectArea=$(window.parent.document).find('.selectArea');
			var $screen=$('#screen',window.parent.document);
			var iframePos={x:$screen.offset().left,y:$screen.offset().top,w:$(window.parent.document).width(),h:$(window.parent.document).height()};
			$(document).on('mousedown',function(e){
				mouse_down=true;
				mouse_down_pos.x=e.clientX;
				mouse_down_pos.y=e.clientY;
				$('.translate-back .page-con.j-txtWrap.lazy-img >div').find('.bar').hide();	
				$(window.parent.document).find('.main .mobile.edit').hide();
				$(window.parent.document).find('.main .mobile.edit.bg').show();	
				getAllViewEl();
			}).on('mousemove',function(e){
				if(mouse_down){
					areaLeft=mouse_down_pos.x;
					areaTop=mouse_down_pos.y;
					areaWidth=Math.abs(areaLeft-e.clientX);
					areaHeight=Math.abs(areaTop-e.clientY);
					if(e.clientX>areaLeft){
						$selectArea.css('left',areaLeft+iframePos.x);
					}else{
						$selectArea.css('left','auto');
						$selectArea.css('right',iframePos.w-(areaLeft+iframePos.x));				
					}
					if(e.clientY>areaTop){
						$selectArea.css('top',areaTop+iframePos.y);
					}else{
						$selectArea.css('top','auto');
						$selectArea.css('bottom',iframePos.h-(areaTop+iframePos.y));				
					}
					$selectArea.css({width:areaWidth,height:areaHeight}).show();
					toSelectEl($selectArea);
				}			
			}).on('mouseup',function(e){
				setTimeout(function(){
					mouse_hasSelect=false;					
				},1);
				mouse_down=false;
				mouse_move_first=true;
				mouse_down_pos.x=0;
				mouse_down_pos.y=0;
				$selectArea.css({left:'auto',right:'auto',top:'auto',bottom:'auto',display:'none'})
			});
			
		}			
		
	},300);
	
	
});