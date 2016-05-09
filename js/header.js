$(function() {
	$("#menu li a").wrapInner( '<span class="out"></span>' ).append( '<span class="bg"></span>' );
	$("#menu li a").each(function() {
		$( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
	});
	$("#menu li a").hover(function() {
		$(".out",this).stop().animate({'top':'45px'},250);
		$(".over",this).stop().animate({'top':'0px'},250);
		$(".bg",this).stop().animate({'top':'0px'},	120);
	}, function() {
		$(".out",this).stop().animate({'top':'0px'},250);
		$(".over",this).stop().animate({'top':'-45px'},250);
		$(".bg",this).stop().animate({'top':'-45px'},120); 
	});
});

//百度统计代码
/*var _hmt = _hmt || [];
(function() {
var hm = document.createElement("script");
hm.src = "//hm.baidu.com/hm.js?9776e608fc5f737bee8217e61d8f67a4";
var s = document.getElementsByTagName("script")[0]; 
s.parentNode.insertBefore(hm, s);
})();*/