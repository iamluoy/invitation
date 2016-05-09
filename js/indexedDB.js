//http://www.cnblogs.com/dolphinX/p/3416889.html
var myDB = {
	name: 'invitation',
	version: 1,
	db: null,
	openDB: function(name, version) {
		var version = version || 1;
		var request = window.indexedDB.open(name, version);
		request.onerror = function(e) {
			console.log(e.currentTarget.error.message);
		};
		request.onsuccess = function(e) {
			myDB.db = e.target.result;
		};
		request.onupgradeneeded = function(e) {
			var db = e.target.result;
			if (!db.objectStoreNames.contains(name)) {
				var store = db.createObjectStore(name, {
					autoIncrement: true //{keyPath:"id"}
				});
				store.createIndex('nameIndex','name',{unique:true}); 
                store.createIndex('ageIndex','age',{unique:false});
			} else {
				//db.deleteObjectStore(name); 
			}
			console.log('DB version changed to ' + version);
		};
	},
	closeDB: function(db) {
		db.close();
	},
	deleteDB: function(name) {
		indexedDB.deleteDatabase(name);
	},
	addData: function(db, storeName) {
		var transaction = db.transaction(storeName, 'readwrite');
		var store = transaction.objectStore(storeName);
		/*for(var i=0;i<window.app.data.length;i++){
		    store.add(window.app.data[i]);
		}*/
		store.add(window.app.data);
	},
	getDataByKey: function(db, storeName, value) {
		var transaction = db.transaction(storeName, 'readwrite');
		var store = transaction.objectStore(storeName);
		var request = store.get(value);
		request.onsuccess = function(e) {
			var student = e.target.result;
			console.log(student.name);
		};
	},
	updateDataByKey: function(db, storeName, value) {
		var transaction = db.transaction(storeName, 'readwrite');
		var store = transaction.objectStore(storeName);
		var request = store.get(value);
		request.onsuccess = function(e) {
			var student = e.target.result;
			student.age = 35;
			store.put(student);
		};
	},
	deleteDataByKey: function(db, storeName, value) {
		var transaction = db.transaction(storeName, 'readwrite');
		var store = transaction.objectStore(storeName);
		store.delete(value);
	},
	clearObjectStore: function(db, storeName) {
		var transaction = db.transaction(storeName, 'readwrite');
		var store = transaction.objectStore(storeName);
		store.clear();
	},fetchStoreByCursor:function(db,storeName){
        var transaction=db.transaction(storeName);
        var store=transaction.objectStore(storeName);
        var request=store.openCursor();
        request.onsuccess=function(e){
            var cursor=e.target.result;
            if(cursor){
                console.log(cursor.key);
                var currentStudent=cursor.value;
                console.log(currentStudent.name);
                cursor.continue();
            }
        };
    },getDataByIndex: function(db,storeName){//利用索引获取数据
       	var transaction = db.transaction(storeName);
		var store = transaction.objectStore(storeName);
		var index = store.index("ageIndex");
		index.get(26).onsuccess = function(e) {
			var student = e.target.result;
			console.log(student.id);
		}
    },getMultipleData: function(db,storeName){//index与游标结合
        var transaction=db.transaction(storeName);
        var store=transaction.objectStore(storeName);
        var index = store.index("nameIndex");
        var request=index.openCursor(null,IDBCursor.prev);
        request.onsuccess=function(e){
            var cursor=e.target.result;
            if(cursor){
                var student=cursor.value;
                console.log(student.name);
                cursor.continue();
            }
        }
    }
}
//初始化
$(function(){
	if("indexedDB" in window) {
	    // 支持
	    myDB.openDB(myDB.name, myDB.version);
		setTimeout(function() {
			myDB.addData(myDB.db, myDB.name);
		}, 1000);
	} else {
	    // 不支持
	}
});
