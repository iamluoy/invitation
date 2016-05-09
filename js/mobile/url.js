//上传图片的标识前缀
var UPLOAD_PREFIX = '[upload]';

//获取正确的全路径
function getUrl(url, type) {
	type = type ? type : PATH_TYPE_IMG;
	if (!url) return "";
	if (url.indexOf('#') == 0) return url;
	if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) {
		return url;
	} else if (url.indexOf(UPLOAD_PREFIX) == 0) {
		url = url.replace(UPLOAD_PREFIX, '');
		if (type == PATH_TYPE_IMG) {
			url = 'img' + url.substr(url.lastIndexOf('/'));
			/*var img = new Image();
			img.src = window.app.basePath + url + '?' + Date.parse(new Date());
			img.onload = function() {
				getBase64Image(img);
			};*/
			console.count(url);
			return url;
		} else if (type == PATH_TYPE_MUSIC) {
			return window.app.uploadMusicPath + url;
		} else if (type == PATH_TYPE_VIDEO) {
			return window.app.uploadVideoPath + url;
		}
	} else {
		return window.app.basePath + url;
	}
}

/*function InitAjax() {
	var ajax = false;
	try {
		ajax = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			ajax = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			ajax = false;
		}
	}
	if (!ajax && typeof XMLHttpRequest != 'undefined') {
		ajax = new XMLHttpRequest();
	}
	return ajax;
}*/

/*function getImg1(u) {
	var ajax = InitAjax();
	ajax.open("GET", u, false);
	ajax.setRequestHeader('Referer', 'http://www.weikecj.cn/myapp/action-edit/action-edit.jsp?activity_id=197812');
	ajax.send();
	alert(ajax.responseText);
	$.ajax({
		url: u,
		type: 'get',
//		"headers: {
//			"Referer": "http://www.weikecj.cn" // 有些浏览器不允许修改该请求头
//		},
		dataType: "jsonp",
		jsonp: "callback",
		success: function(res) {
	
		},
		error: function(res) {
	
		}
	});
	if (self.fetch) {
		// run my fetch request 
		fetch(u, {
			method: 'get',
			headers: {
				"Referer": "http://www.weikecj.cn"
			},
			mode: 'cors',
			cache: 'default'
			//credentials: 'include',
			//body: toQueryString(arguments)
		}).then(function(response) {
			console.log(response);
			//response.headers.get("content-type") === "application/json"
			if (response.ok) {
				response.json().then(function(jsonObj) {
					// process your JSON further
					//callback(jsonObj);
				});
			} else {
				console.log("Oops, we haven't got JSON!");
			}
		},function(e) {
			console.log("Error submitting form!");
		});
	}
}
*/
/*function getImg(url){
	var xhr = new XMLHttpRequest();
	xhr.open("get", url, true);
	xhr.responseType = "blob";
	//xhr.setRequestHeader("Referer", '');
	xhr.onload = function() {
		if (this.readyState == 4 && this.status == 200) {
			var blob = this.response;
			var img = document.createElement("img");
			img.onload = function(e) {
				window.URL.revokeObjectURL(img.src);
			};
			img.src = window.URL.createObjectURL(blob);　　　　　
		}
	}
	xhr.send();
}*/

function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height);
	var ext = img.src.substring(img.src.lastIndexOf(".") + 1, img.src.lastIndexOf("?")).toLowerCase();
	var dataURL = canvas.toDataURL("image/" + ext);
	return dataURL;
}

/*function showImg(url) { 
	var imgid = new Date().getTime();
	var frameid = 'frameimg' + imgid; 
	window['img'+imgid] = '<img id="img" src="'+url+'?kilobug" /><script>function getBase64Image(img) { var canvas = document.createElement(\'canvas\');canvas.width = img.width; canvas.height = img.height;var ctx = canvas.getContext(\'2d\');ctx.drawImage(img, 0, 0, img.width, img.height);var ext = img.src.substring(img.src.lastIndexOf(\'.\')+1,img.src.lastIndexOf(\'?\')).toLowerCase(); var dataURL = canvas.toDataURL(\'image/\'+ext);return dataURL;}window.onload = function() { parent.document.getElementById(\''+frameid+"\').height = document.getElementById(\'img\').height+\'px\';var imgObj = document.getElementById(\'img\');var image = new Image();image.setAttribute(\'crossOrigin\', \'anonymous\');image.src = imgObj.currentSrc;var imageSrc = '';image.onload = function(){imageSrc = getBase64Image(imgObj);} }<"+'/script>';
	//
	$('<iframe id="'+frameid+'" src="javascript:parent[\'img'+imgid+'\'];" frameBorder="0" scrolling="no" width="100%" style="display: none;"></iframe>').appendTo('body');
	document.getElementById(frameid).onload = function() {
		var obj = this.contentDocument;
//		console.log(obj.imageSrc)
		//document.body.appendChild(imgObj);
	};
}*/