//微信js-sdk导入
!function(a,b){"function"==typeof define&&(define.amd||define.cmd)?define(function(){return b(a)}):b(a,!0)}(this,function(a,b){function c(b,c,d){a.WeixinJSBridge?WeixinJSBridge.invoke(b,e(c),function(a){i(b,a,d)}):l(b,d)}function d(b,c,d){a.WeixinJSBridge?WeixinJSBridge.on(b,function(a){d&&d.trigger&&d.trigger(a),i(b,a,c)}):d?l(b,d):l(b,c)}function e(a){return a=a||{},a.appId=B.appId,a.verifyAppId=B.appId,a.verifySignType="sha1",a.verifyTimestamp=B.timestamp+"",a.verifyNonceStr=B.nonceStr,a.verifySignature=B.signature,a}function f(a,b){return{scope:b,signType:"sha1",timeStamp:a.timestamp+"",nonceStr:a.nonceStr,addrSign:a.addrSign}}function g(a){return{timeStamp:a.timestamp+"",nonceStr:a.nonceStr,"package":a.package,paySign:a.paySign,signType:"SHA1"}}function i(a,b,c){var d,e,f;switch(delete b.err_code,delete b.err_desc,delete b.err_detail,d=b.errMsg,d||(d=b.err_msg,delete b.err_msg,d=j(a,d,c),b.errMsg=d),c=c||{},c._complete&&(c._complete(b),delete c._complete),d=b.errMsg||"",B.debug&&!c.isInnerInvoke&&alert(JSON.stringify(b)),e=d.indexOf(":"),f=d.substring(e+1)){case"ok":c.success&&c.success(b);break;case"cancel":c.cancel&&c.cancel(b);break;default:c.fail&&c.fail(b)}c.complete&&c.complete(b)}function j(a,b){var d,e,f,g;if(b){switch(d=b.indexOf(":"),a){case q.config:e="config";break;case q.openProductSpecificView:e="openProductSpecificView";break;default:e=b.substring(0,d),e=e.replace(/_/g," "),e=e.replace(/\b\w+\b/g,function(a){return a.substring(0,1).toUpperCase()+a.substring(1)}),e=e.substring(0,1).toLowerCase()+e.substring(1),e=e.replace(/ /g,""),-1!=e.indexOf("Wcpay")&&(e=e.replace("Wcpay","WCPay")),f=r[e],f&&(e=f)}g=b.substring(d+1),"confirm"==g&&(g="ok"),-1!=g.indexOf("failed_")&&(g=g.substring(7)),-1!=g.indexOf("fail_")&&(g=g.substring(5)),g=g.replace(/_/g," "),g=g.toLowerCase(),("access denied"==g||"no permission to execute"==g)&&(g="permission denied"),"config"==e&&"function not exist"==g&&(g="ok"),b=e+":"+g}return b}function k(a){var b,c,d,e;if(a){for(b=0,c=a.length;c>b;++b)d=a[b],e=q[d],e&&(a[b]=e);return a}}function l(a,b){if(B.debug&&!b.isInnerInvoke){var c=r[a];c&&(a=c),b&&b._complete&&delete b._complete,console.log('"'+a+'",',b||"")}}function m(){if(!("6.0.2">y)){var b=new Image;A.appId=B.appId,A.initTime=z.initEndTime-z.initStartTime,A.preVerifyTime=z.preVerifyEndTime-z.preVerifyStartTime,E.getNetworkType({isInnerInvoke:!0,success:function(a){A.networkType=a.networkType;var c="https://open.weixin.qq.com/sdk/report?v="+A.version+"&o="+A.isPreVerifyOk+"&s="+A.systemType+"&c="+A.clientVersion+"&a="+A.appId+"&n="+A.networkType+"&i="+A.initTime+"&p="+A.preVerifyTime+"&u="+A.url;b.src=c}})}}function n(){return(new Date).getTime()}function o(b){v&&(a.WeixinJSBridge?b():s.addEventListener&&s.addEventListener("WeixinJSBridgeReady",b,!1))}function p(){E.invoke||(E.invoke=function(b,c,d){a.WeixinJSBridge&&WeixinJSBridge.invoke(b,e(c),d)},E.on=function(b,c){a.WeixinJSBridge&&WeixinJSBridge.on(b,c)})}var q,r,s,t,u,v,w,x,y,z,A,B,C,D,E;if(!a.jWeixin)return q={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest"},r=function(){var b,a={};for(b in q)a[q[b]]=b;return a}(),s=a.document,t=s.title,u=navigator.userAgent.toLowerCase(),v=-1!=u.indexOf("micromessenger"),w=-1!=u.indexOf("android"),x=-1!=u.indexOf("iphone")||-1!=u.indexOf("ipad"),y=function(){var a=u.match(/micromessenger\/(\d+\.\d+\.\d+)/)||u.match(/micromessenger\/(\d+\.\d+)/);return a?a[1]:""}(),z={initStartTime:n(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},A={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:x?1:w?2:-1,clientVersion:y,url:encodeURIComponent(location.href)},B={},C={_completes:[]},D={state:0,res:{}},o(function(){z.initEndTime=n()}),E={config:function(a){B=a,l("config",a),o(function(){c(q.config,{verifyJsApiList:k(B.jsApiList)},function(){C._complete=function(a){z.preVerifyEndTime=n(),D.state=1,D.res=a},C.success=function(){A.isPreVerifyOk=0},C.fail=function(a){C._fail?C._fail(a):D.state=-1};var a=C._completes;return a.push(function(){B.debug||m()}),C.complete=function(b){for(var c=0,d=a.length;d>c;++c)a[c](b);C._completes=[]},C}()),z.preVerifyStartTime=n()}),B.beta&&p()},ready:function(a){0!=D.state?a():(C._completes.push(a),!v&&B.debug&&a())},error:function(a){"6.0.2">y||(-1==D.state?a(D.res):C._fail=a)},checkJsApi:function(a){var b=function(a){var c,d,b=a.checkResult;for(c in b)d=r[c],d&&(b[d]=b[c],delete b[c]);return a};c("checkJsApi",{jsApiList:k(a.jsApiList)},function(){return a._complete=function(a){if(w){var c=a.checkResult;c&&(a.checkResult=JSON.parse(c))}a=b(a)},a}())},onMenuShareTimeline:function(a){d(q.onMenuShareTimeline,{complete:function(){c("shareTimeline",{title:a.title||t,desc:a.title||t,img_url:a.imgUrl,link:a.link||location.href},a)}},a)},onMenuShareAppMessage:function(a){d(q.onMenuShareAppMessage,{complete:function(){c("sendAppMessage",{title:a.title||t,desc:a.desc||"",link:a.link||location.href,img_url:a.imgUrl,type:a.type||"link",data_url:a.dataUrl||""},a)}},a)},onMenuShareQQ:function(a){d(q.onMenuShareQQ,{complete:function(){c("shareQQ",{title:a.title||t,desc:a.desc||"",img_url:a.imgUrl,link:a.link||location.href},a)}},a)},onMenuShareWeibo:function(a){d(q.onMenuShareWeibo,{complete:function(){c("shareWeiboApp",{title:a.title||t,desc:a.desc||"",img_url:a.imgUrl,link:a.link||location.href},a)}},a)},startRecord:function(a){c("startRecord",{},a)},stopRecord:function(a){c("stopRecord",{},a)},onVoiceRecordEnd:function(a){d("onVoiceRecordEnd",a)},playVoice:function(a){c("playVoice",{localId:a.localId},a)},pauseVoice:function(a){c("pauseVoice",{localId:a.localId},a)},stopVoice:function(a){c("stopVoice",{localId:a.localId},a)},onVoicePlayEnd:function(a){d("onVoicePlayEnd",a)},uploadVoice:function(a){c("uploadVoice",{localId:a.localId,isShowProgressTips:a.isShowProgressTips||1},a)},downloadVoice:function(a){c("downloadVoice",{serverId:a.serverId,isShowProgressTips:a.isShowProgressTips||1},a)},translateVoice:function(a){c("translateVoice",{localId:a.localId,isShowProgressTips:a.isShowProgressTips||1},a)},chooseImage:function(a){c("chooseImage",{scene:"1|2"},function(){return a._complete=function(a){if(w){var b=a.localIds;b&&(a.localIds=JSON.parse(b))}},a}())},previewImage:function(a){c(q.previewImage,{current:a.current,urls:a.urls},a)},uploadImage:function(a){c("uploadImage",{localId:a.localId,isShowProgressTips:a.isShowProgressTips||1},a)},downloadImage:function(a){c("downloadImage",{serverId:a.serverId,isShowProgressTips:a.isShowProgressTips||1},a)},getNetworkType:function(a){var b=function(a){var c,d,e,b=a.errMsg;if(a.errMsg="getNetworkType:ok",c=a.subtype,delete a.subtype,c)a.networkType=c;else switch(d=b.indexOf(":"),e=b.substring(d+1)){case"fail":case"permission denied":case"localparameters":a.errMsg="getNetworkType:fail";break;default:a.networkType=e}return a};c("getNetworkType",{},function(){return a._complete=function(a){a=b(a)},a}())},openLocation:function(a){c("openLocation",{latitude:a.latitude,longitude:a.longitude,name:a.name||"",address:a.address||"",scale:a.scale||28,infoUrl:a.infoUrl||""},a)},getLocation:function(a){c(q.getLocation,f(a,"jsapi_location"),a)},hideOptionMenu:function(a){c("hideOptionMenu",{},a)},showOptionMenu:function(a){c("showOptionMenu",{},a)},closeWindow:function(a){c("closeWindow",{immediate_close:a&&a.immediateClose||0},a)},hideMenuItems:function(a){c("hideMenuItems",{menuList:a.menuList},a)},showMenuItems:function(a){c("showMenuItems",{menuList:a.menuList},a)},hideAllNonBaseMenuItem:function(a){c("hideAllNonBaseMenuItem",{},a)},showAllNonBaseMenuItem:function(a){c("showAllNonBaseMenuItem",{},a)},scanQRCode:function(a){c("scanQRCode",{desc:a.desc,needResult:a.needResult||0,scanType:a.scanType||["qrCode","barCode"]},a)},openProductSpecificView:function(a){c(q.openProductSpecificView,{pid:a.productId,view_type:a.viewType||0},a)},addCard:function(a){var e,f,g,h,b=a.cardList,d=[];for(e=0,f=b.length;f>e;++e)g=b[e],h={card_id:g.cardId,card_ext:g.cardExt},d.push(h);c(q.addCard,{card_list:d},function(){return a._complete=function(a){var c,d,e,b=a.card_list;if(b){for(b=JSON.parse(b),c=0,d=b.length;d>c;++c)e=b[c],e.cardId=e.card_id,e.cardExt=e.card_ext,e.isSuccess=e.is_succ?!0:!1,delete e.card_id,delete e.card_ext,delete e.is_succ;a.cardList=b,delete a.card_list}},a}())},chooseCard:function(a){c("chooseCard",{app_id:B.appId,location_id:a.shopId||"",sign_type:"SHA1",card_id:a.cardId||"",card_type:a.cardType||"",card_sign:a.cardSign,time_stamp:a.timestamp+"",nonce_str:a.nonceStr},function(){return a._complete=function(a){a.cardList=a.choose_card_info,delete a.choose_card_info},a}())},openCard:function(a){var e,f,g,h,b=a.cardList,d=[];for(e=0,f=b.length;f>e;++e)g=b[e],h={card_id:g.cardId,code:g.code},d.push(h);c(q.openCard,{card_list:d},a)},chooseWXPay:function(a){c(q.chooseWXPay,g(a),a)}},b&&(a.wx=a.jWeixin=E),E});
//SHA1算法导入
var hexcase=0;var b64pad="";var chrsz=8;function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length*chrsz))}function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length*chrsz))}function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length*chrsz))}function hex_hmac_sha1(key,data){return binb2hex(core_hmac_sha1(key,data))}function b64_hmac_sha1(key,data){return binb2b64(core_hmac_sha1(key,data))}function str_hmac_sha1(key,data){return binb2str(core_hmac_sha1(key,data))}function sha1_vm_test(){return hex_sha1("abc")=="a9993e364706816aba3e25717850c26c9cd0d89d"}function core_sha1(x,len){x[len>>5]|=128<<(24-len%32);x[((len+64>>9)<<4)+15]=len;var w=Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;var olde=e;for(var j=0;j<80;j++){if(j<16){w[j]=x[i+j]}else{w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1)}var t=safe_add(safe_add(rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t}a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);e=safe_add(e,olde)}return Array(a,b,c,d,e)}function sha1_ft(t,b,c,d){if(t<20){return(b&c)|((~b)&d)}if(t<40){return b^c^d}if(t<60){return(b&c)|(b&d)|(c&d)}return b^c^d}function sha1_kt(t){return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514}function core_hmac_sha1(key,data){var bkey=str2binb(key);if(bkey.length>16){bkey=core_sha1(bkey,key.length*chrsz)}var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^909522486;opad[i]=bkey[i]^1549556828}var hash=core_sha1(ipad.concat(str2binb(data)),512+data.length*chrsz);return core_sha1(opad.concat(hash),512+160)}function safe_add(x,y){var lsw=(x&65535)+(y&65535);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&65535)}function rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt))}function str2binb(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz){bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(32-chrsz-i%32)}return bin}function binb2str(bin){var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz){str+=String.fromCharCode((bin[i>>5]>>>(32-chrsz-i%32))&mask)}return str}function binb2hex(binarray){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++){str+=hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8+4))&15)+hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8))&15)}return str}function binb2b64(binarray){var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";for(var i=0;i<binarray.length*4;i+=3){var triplet=(((binarray[i>>2]>>8*(3-i%4))&255)<<16)|(((binarray[i+1>>2]>>8*(3-(i+1)%4))&255)<<8)|((binarray[i+2>>2]>>8*(3-(i+2)%4))&255);for(var j=0;j<4;j++){if(i*8+j*6>binarray.length*32){str+=b64pad}else{str+=tab.charAt((triplet>>6*(3-j))&63)}}}return str};

//定义全局分享变量
var share_title;
var share_content;
var share_img_url;
var share_url;
var newVersionInitFinish=false; //新版授权是否就绪
   
//初始化新版分享授权
function initNewVersionShare(successCallback){
	var appId=window.app.appId;//在jsp页面定义
	var jsApiTicket=window.app.jsApiTicket;//在jsp页面定义
	var timestamp=new Date().getTime()+'';
	var nonceStr=timestamp+parseInt(Math.random()*100000)+'';
	var strSHA1=hex_sha1("jsapi_ticket="+jsApiTicket+"&noncestr="+nonceStr+"&timestamp="+timestamp+"&url="+share_url);//SHA1加密
	wx.config({
		debug: false,
	    appId: appId,
	    timestamp: timestamp,
	    nonceStr: nonceStr,
	    signature: strSHA1,
	    jsApiList: [
	      'checkJsApi',
	      'onMenuShareTimeline',
	      'onMenuShareAppMessage',
	      'onMenuShareQQ',
	      'onMenuShareWeibo',
	      'hideMenuItems',
	      'showMenuItems'
	    ]
	});
	wx.ready(function () {
		/*//判断当前版本是否支持指定 JS 接口
		wx.checkJsApi({
			jsApiList: [
			'getNetworkType',
			'previewImage'
		],
		success: function (res) {
			alert(JSON.stringify(res));
			}
		});*/
		//初始化新版分享接口
		newVersionInitFinish=true;
		initShareInfoNew(successCallback);
		//处理音频兼容
		try{
  		    media.media_init();
	    	$('#media')[0].play();			    		
    	}catch(e){			    		
    	}
	});
}

//新版initShareInfo方法
function initShareInfoNew(successCallback){
	wx.onMenuShareAppMessage({
	    title: share_title,
	    desc: share_content,
	    link: share_url,
	    imgUrl: share_img_url,
	    success: function (res) {
	    	 if(typeof successCallback=="function")
        		 successCallback();
	    },
	    cancel: function (res) {},
	    fail: function (res) {}
	});
	wx.onMenuShareTimeline({
	    title: share_title,
	    link: share_url,
	    imgUrl: share_img_url,
	    success: function (res) {
	    	 if(typeof successCallback=="function")
        		 successCallback();
	    },
	    cancel: function (res) {},
	    fail: function (res) {}
	});
	wx.onMenuShareQQ({
	    title: share_title,
	    desc:share_content,
	    link: share_url,
	    imgUrl: share_img_url,
	    complete: function (res) {},
	    success: function (res) {
	    	 if(typeof successCallback=="function")
        		 successCallback();
	    },
	    cancel: function (res) {},
	    fail: function (res) {}
	});
	wx.onMenuShareWeibo({
	    title: share_title,
	    desc: share_content,
	    link: share_url,
	    imgUrl: share_img_url,
	    complete: function (res) {},
	    success: function (res) {
	    	 if(typeof successCallback=="function")
        		 successCallback();
	    },
	    cancel: function (res) {},
	    fail: function (res) {}
	});
}


//全局initShareInfo方法（本js入口）
function initShareInfo(shareTitle, shareSummary, shareImgUrl, shareUrl,successCallback){
   
	share_title = shareTitle;
    share_content = shareSummary;
    share_img_url = shareImgUrl;
    share_url = shareUrl?shareUrl:window.location.href;
    
    //旧版分享信息
    var shareData = {
        img_url: share_img_url,
        img_width: '64',
        img_height: '64',
        link: share_url,
        desc: share_content,
        title: share_title,
        content: share_content,
        url: share_url
    };    
    function shareTimeline() {
         var title = shareData.title;
         if (title.indexOf(shareData.desc) == -1) {
             title += ":" + shareData.desc;
         }
         WeixinJSBridge.invoke("shareTimeline", {
             img_url: shareData.img_url,
             img_width: shareData.img_width,
             img_height: shareData.img_height,
             link: shareData.link,
             desc: shareData.desc,
             title: title
         },
         function(a) {
        	 if(typeof successCallback=="function")
        		 successCallback();
         });
     }    
     function shareFriend() {
         WeixinJSBridge.invoke("sendAppMessage", {
             img_url: shareData.img_url,
             img_width: shareData.img_width,
             img_height: shareData.img_height,
             link: shareData.link,
             desc: shareData.desc,
             title: shareData.title
         },
         function(a) {
        	 if(typeof successCallback=="function")
        		 successCallback();
         });
     }    
    document.addEventListener('WeixinJSBridgeReady',
       function onBridgeReady() {           
           WeixinJSBridge.on('menu:share:appmessage',
           function(argv) {
               shareFriend();
           });           
           WeixinJSBridge.on('menu:share:timeline',
           function(argv) {
               shareTimeline();
           });
    },false); 
    
    try{
    	//判断新版分享授权是否就绪
        if(newVersionInitFinish){
        	initShareInfoNew(successCallback);
        }else{
        	initNewVersionShare(successCallback);
        }
    }catch(e){
    	//do nothing
    }    
    
};