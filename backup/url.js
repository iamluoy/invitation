//上传图片的标识前缀
var UPLOAD_PREFIX='[upload]';

//获取正确的全路径
function getUrl(url,type){
	type=type?type:PATH_TYPE_IMG;
	if(!url) return "";
	if(url.indexOf('#')==0) return url;
	if(url.indexOf('http://')==0 || url.indexOf('https://')==0){
		return url;
	}else if(url.indexOf(UPLOAD_PREFIX)==0){
		url=url.replace(UPLOAD_PREFIX,'');
		if(type==PATH_TYPE_IMG){
			url = window.parent.app.basePath+'img'+url.substr(url.lastIndexOf('/'));
			return url;
			//return window.parent.app.uploadImgPath+url;
		}else if(type==PATH_TYPE_MUSIC){
			return window.parent.app.uploadMusicPath+url;
		}else if(type==PATH_TYPE_VIDEO){
			return window.parent.app.uploadVideoPath+url;
		}
		return url;
	}else{
		return window.parent.app.basePath+url;
	}
}

/*function getValiteStr(str){
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
}*/