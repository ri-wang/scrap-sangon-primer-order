var MAIN_TAB_ID = 'mainTabs';
function addTab(title,url){
	if($("#"+MAIN_TAB_ID).tabs('exists',title)){
		$("#"+MAIN_TAB_ID).tabs('select',title)
		$("#"+MAIN_TAB_ID).tabs('getSelected').panel('refresh');
	}else{
		$("#"+MAIN_TAB_ID).tabs('add',{    
		    title:title,
		    href:url,
		    closable:true
		});
	}
}

/* 
 * 功能:新增选项卡显示内容 
 */
function addTabShowContext(title,content){
	if($("#"+MAIN_TAB_ID).tabs('exists',title)){
		$("#"+MAIN_TAB_ID).tabs('select',title)
		$("#"+MAIN_TAB_ID).tabs('getSelected').panel('refresh');
	}else{
		$("#"+MAIN_TAB_ID).tabs('add',{    
		    title:title,
		    content:content,
		    closable:true
		});
	}
}

function getLikeValue(id){
	var value=$("#"+id).val();
	if(value==null||value==""||value=="undefined"){
		return "";
	}else{
		return "%" + value + "%";
	}
}

//[3.10]	是否为日期
function isDate(date){
	var reg = /^(\d{1,4})-(\d{1,2})-(\d{1,2})(?:\s(\d{1,2}):(\d{1,2}):(\d{1,2})(?:\.\d{1,3})?)?$/;
	var r = date.match(reg);
	if( r == null) return false;
	var d = new Date(r[1], --r[2], r[3], r[4]?r[4]:0, r[5]?r[5]:0, r[6]?r[6]:0);
	if(d.getFullYear() != r[1]) return false;
	if(d.getMonth() != r[2]) return false;
	if(d.getDate() != r[3]) return false;
	if(d.getHours() != r[4]?r[4]:0) return false;
	if(d.getMinutes() != r[5]?r[5]:0) return false;
	if(d.getSeconds() != r[6]?r[6]:0) return false;
	return true;
}

//[3.11]	是否为整数
function validateCount(src){
	if(!isPlusInt(src.value)){
		src.value = 1;
	}
}

//[3.2]	是否为数字
function isNumber(num){
	var pattern=/^(-|\+)?\d{0,8}$/;
   return pattern.test(num);
}

//[3.3]	包括整数和实数，正负数；
function isFloat(num){
	var pattern=/^(-|\+)?\d+(\.\d+)?$/;
   return pattern.test(num);
}

//[3.4]	包括正数和负数 
function isMoney(num){
	var pattern=/^(-|\+)?\d{0,8}(.)\d{0,6}$/;
   	return pattern.test(num);
}

//[3.5]	是否是科目格式
function isFinanceAccount(num){
	var pattern=/^\d{2,4}(\.\d{2,4})*$/;
   return pattern.test(num);
}

//[3.6]	判断是否正确的百分数
function isPercentage(num){
	var pattern=/^\d+(%)?$/;
   	return pattern.test(num);
}

//[3.7]	判断是否正整数 
function isPlusInt(num){
	var pattern=/^[0-9]*[1-9][0-9]*$/;
   	return pattern.test(num);
}

//[3.8]	判断是否正实数 
function isPlusFloat(num){
	var pattern=/^(\+)?\d+(\.\d+)?$/;
   	return pattern.test(num);
}

//[3.9]	是否为整数
function isInt(num){
   var pattern=/^[-]?\d+$/;
   return pattern.test(num);
}

function onlyNum(src) {
	if(event.keyCode == 8){
		return commDeleteAllUp(src);
	}else{
		if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39)){
			if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105))){
				event.returnValue=false;
			}
		}
	}
}

//验证输入框是否为空
function validateInput(id){
	var value = $("#"+id).val();
	return isEmpty(value);
}

//判断是否为空
function isEmpty(value){
	try{
   		return (typeof value=='undefined'||value == null||(typeof value =="string" && value==""));
   	}catch(e){
   		return true;	//如果异常，也表示空
   	}
}

//判断是否为手机号
function isMobNo(value){
	if(isEmpty(value)){
		return false;
	}
	var pattern=/^(?:13\d|14\d|15\d|16\d|17\d|18\d)\d{5}(\d{3}|\*{3})$/;
	return pattern.test(value);
}

//移除字符串中两边的空格符
function trim(str){
	if (typeof(str) != 'string') return str;
	return str.replace(/^\s+|\s+$/g,"");
}

/*
 * 描述：把js对象数组转换成Json数组，处理后直接返回json对象
 * 参数：arrays为待转换的js对象数组(Array[]),objectName为传给action的变量名(String)
*/
function convertArrToJson(arrays,objectName){
	var jsonString = "{";		//json格式字符串
	if(arrays != null && arrays != ""){
		for(var i=0;i<arrays.length;i++){		//遍历对象数组
			for(var name in arrays[i]){		//遍历对象属性
				jsonString += "\""+objectName+"["+i+"]"+"."+name+"\":\""+arrays[i][name]+"\",";
			}
			jsonString = jsonString.substring(0,jsonString.length-1);		//去掉每个对象最后一个","
			if(i<arrays.length-1){			//从第二个对象开始，每个前面添加一个","
				jsonString += ","
			}
		}
	}
	jsonString += "}";
	var jsonObject = jQuery.parseJSON(jsonString);		//处理后的json对象
	return jsonObject;
}

/*
 * 描述：功能类似上面函数，不同是只把js对象数组的id属性转换成json数组
*/
function convertArrToJsonID(arrays,objectName){
	var jsonString = "{";		//json格式字符串
	if(arrays != null && arrays != ""){
		for(var i=0;i<arrays.length;i++){		//遍历对象数组
			for(var name in arrays[i]){		//遍历对象属性
				if(name == "id"){
					jsonString += "\""+objectName+"["+i+"]"+"."+name+"\":\""+arrays[i][name]+"\",";
				}
			}
			jsonString = jsonString.substring(0,jsonString.length-1);		//去掉每个对象最后一个","
			if(i<arrays.length-1){			//从第二个对象开始，每个前面添加一个","
				jsonString += ","
			}
		}
	}
	jsonString += "}";
	var jsonObject = jQuery.parseJSON(jsonString);		//处理后的json对象
	return jsonObject;
}

function convertArrToMap(arrays,objectName,keyName){
	var jsonString = "{";		//json格式字符串
	if(arrays != null && arrays != ""){
		for(var i=0;i<arrays.length;i++){		//遍历对象数组
			for(var name in arrays[i]){		//遍历对象属性
				jsonString += "\""+objectName+"['"+keyName+"']["+i+"]"+"."+name+"\":\""+arrays[i][name]+"\",";
			}
			jsonString = jsonString.substring(0,jsonString.length-1);		//去掉每个对象最后一个","
			if(i<arrays.length-1){			//从第二个对象开始，每个前面添加一个","
				jsonString += ","
			}
		}
	}
	jsonString += "}";
	var jsonObject = jQuery.parseJSON(jsonString);		//处理后的json对象
	return jsonObject;
}


/*
 * 功能：把js对象转换成某种格式的json对象，例如：selectRow对象的id属性(selectRow.id)转换为{"cxOrder.id":selectRow.id}
 * 作用:当选中列表一条记录进行修改时，把选中记录直接传给编辑页面的表单中。也就是修改选中记录时，把数据加载到form中.
 * 参数:jsonPrefixName对应"cxOrder",转换成格式 "jsonPrefixName:id",object为需要转换的js对象			--tongjian
*/
function convertJsToJson(object, jsonPrefixName) {
	return jQuery.parseJSON("{" + objectToSingleJson(object, jsonPrefixName).substring(1) + "}");
}

function objectToSingleJson(object, prefix) {
	var jsonString = "";
	switch ($.type(object)) {
	case "regexp" :
	case "boolean" :
	case "date" :
	case "number" :
	case "string" :
		jsonString += ",\"" + prefix + "\":\"" + object + "\"";
		break;
	case "object" :
		for (var i in object) {
			jsonString += objectToSingleJson(object[i], prefix + "." + i);
		}
		break;
	case "array" :
		for (var i = 0; i < object.length; i++) {
			jsonString += objectToSingleJson(object[i], prefix + "[" + i + "]");
		}
		break;
	case "function" :
		break;
	case "null" :
	case "undefined" :
		break;
	case "error" :
		alert("\"" + object + "\" is error !");
		break;
	default :
		alert("\"" + object + "\" is invalid !");
	}
	return jsonString;
}

/* 
 * 功能：输出指定格式日期  			--tongjian
 */
function dateFormat(value,row,index){
	if(typeof(value) == "string"){
		if(value.indexOf("T")>0){	//把“T”字符替换为空格
			return value.replace("T"," ");
		}else{
			return value.substring(0,19);
		}
	}else{
		return value;
	}
}	

/*
 * 功能：表格中输出对象的name属性			--tongjian
 */
function outputNameFormat(value,row,index){
	if(value != null){
		return value.name;				
	}
}

/*
 * 功能：表格中输出UserInfo的userName属性 	--tongjian
 */
function outputUserNameFormat(value,row,index){
	if(value != null){
		return value.userName;				
	}
}

/*
 * 功能：鼠标移动到tr上改变行背景颜色			--tongjian
*/
function overTableTr(src){
	 $(src).attr("style","background-color:#e6f0fc");
}

/*
 * 功能：鼠标移开tr上改变行背景颜色			--tongjian
*/
function outTableTr(src){
	 $(src).attr("style","background-color:white");
}

/*
 * 功能：页面上删除表格一行
*/
function deleteRow(rows){
	$(rows).parent("td").parent("tr").remove(); 
}

/* --------- 操作cookie --------- */
//读取cookies 
function getCookie(name) 
{ 
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

  if(arr=document.cookie.match(reg))
      return unescape(arr[2]); 
  else 
      return null; 
} 

//删除cookies 
function delCookie(name) 
{ 
  var exp = new Date(); 
  exp.setTime(exp.getTime() - 1); 
  var cval=getCookie(name); 
  if(cval!=null) 
      document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
}

String.prototype.replaceAll = function (AFindText,ARepText){
  raRegExp = new RegExp(AFindText,"g");
  return this.replace(raRegExp,ARepText)
}

function getParameter(key){
	var param = window.location.search;
	if(param!=null&&param.length>0){
		param = param.substr(1);
		var ps = param.split("&");
		for(var i=0;ps!=null&&i<ps.length;i++)
			if(ps[i].indexOf(key+"=")==0)
				return ps[i].substr((key+"=").length);
	}
}

/**
 * @功能: 精确计算 Number
 * @说明: 提供精确的 加,减,乘,除 运算功能
 */
$.extend(Number.prototype, {
	add : function (v) {
		var v1 = this, v2 = v;
		var s1 = v1.toString(), s2 = v2.toString();
		var r1 = s1.indexOf(".") > 0 ? s1.split(".")[1].length : 0, r2 = s2.indexOf(".") > 0 ? s2.split(".")[1].length : 0;
		var m = Math.pow(10, Math.max(r1, r2));
		return (v1 * m + v2 * m) / m;
	},
	sub : function (v) {
		return this.add(-v);
	},
	mul : function (v) {
		var v1 = this, v2 = v;
		var s1 = v1.toString(), s2 = v2.toString();
		var r1 = s1.indexOf(".") > 0 ? s1.split(".")[1].length : 0, r2 = s2.indexOf(".") > 0 ? s2.split(".")[1].length : 0;
		var m = Math.pow(10, r1 + r2);
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / m;
	},
	div : function (v) {
		var v1 = this, v2 = v;
		var s1 = v1.toString(), s2 = v2.toString();
		var r1 = s1.indexOf(".") > 0 ? s1.split(".")[1].length : 0, r2 = s2.indexOf(".") > 0 ? s2.split(".")[1].length : 0;
		var m = Math.pow(10, r2 - r1);
		return Number(s1.replace(".", "")) / Number(s2.replace(".", "")) * m;
	}
});


/* ---------- tongjian --------------- */
/* 功能：把对象数组转换成特定格式的json对象，让ognl可以直接解析并赋值给List等集合对象	--tongjian
说明 ：arrays为要转换的对象数组，objectName为传递到后台对应的变量名 。
转换格式:'objectName[i].name:arrays[i][name]' */	
function convertArrayToJson(arrays,objectName){
var json = "{";
if(arrays != null && arrays != ""){
for(var i=0;i<arrays.length;i++){
	for(var name in arrays[i]){
		json += "\""+objectName+"["+i+"]"+"."+name+"\":\""+arrays[i][name]+"\",";
	}
	json = json.substring(0,json.length-1);		//去掉每个对象最后一个","
	if(i<arrays.length-1){			//从第二个对象开始，每个前面添加一个","
		json += ","
	}
}
}
json += "}";
return json;
}

/* 功能：方法作用同上。		---tongjian
* 说明：区别是，只转换id属性
*/
function convertArrayToJsonById(arrays,objectName){
var json = "{";
if(arrays != null && arrays != ""){
for(var i=0;i<arrays.length;i++){
	for(var name in arrays[i]){
		if(name == "id"){
			json += "\""+objectName+"["+i+"]"+"."+name+"\":\""+arrays[i][name]+"\",";
		}
	}
	json = json.substring(0,json.length-1);		//去掉每个对象最后一个","
	if(i<arrays.length-1){			//从第二个对象开始，每个前面添加一个","
		json += ","
	}
}
}
json += "}";
return json;
}

function changeInput(src,defaultValue){
	if(src.value == defaultValue){
		$(src).val("");
		$(src).css("color","#222");
	}else if(isEmpty(src.value)){
		$(src).css("color","#999999");
		src.value = defaultValue;
	}
}

//对Date的扩展，将 Date 转化为指定格式的String 
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function(fmt) 
{ //author: meizz 
	var o = { 
		 "M+" : this.getMonth()+1,                 //月份 
		 "d+" : this.getDate(),                    //日 
		 "h+" : this.getHours(),                   //小时 
		 "m+" : this.getMinutes(),                 //分 
		 "s+" : this.getSeconds(),                 //秒 
		 "q+" : Math.floor((this.getMonth()+3)/3), //季度 
		 "S"  : this.getMilliseconds()             //毫秒 
	}; 
	if(/(y+)/.test(fmt)) 
	 fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	for(var k in o) 
	 if(new RegExp("("+ k +")").test(fmt)) 
	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	return fmt; 
}

$(document).ready(function() {
	if(typeof(leftMoudle) == 'undefined'){
		return;
	}
	$("[id^='leftMoudle_']").each(function(){
		$(this).attr("class","lk_1");
	});
	$("#"+leftMoudle).attr("class","lk_5");
});


function getDefaultValue(value,reValue){
	if(isEmpty(value)){
		return reValue;
	}
	return value;
}

function isEmptyObject(e) {  
    var t = true;  
    if(e == null || e == undefined) return true;
    if(isEmpty(e)) return true;
    for (t in e)  {
        return false;; 
    }
    return true;  
} 

