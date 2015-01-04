//定义全局变量
var widget_unit_array = new Array();
var obj = new Object();
obj.widget_unit_array=widget_unit_array;
obj.widget_unit_num = 0;
var mid_code;

//响应生成按钮的点击事件
function gen(){
	var widget_unit = get_object_from_choice();
	gen_widget(widget_unit);
	mid_code = object_to_json(obj);
	write_to_div(mid_code);
}
//获取多选框的选择信息
//生成javascript对象
function get_object_from_choice(){
	var widget_unit = new Object();
	var widgets = new Array();
	$("[name='widget_choice']").each(function(){
		if($(this).attr("checked")){
			widgets.push($(this).val());
		}	
	});
	//alert(widget.length);

	widget_unit.widgets = widgets;
	widget_unit.widget_num = widgets.length;
	obj.widget_unit_array.push(widget_unit);
	obj.widget_unit_num+=1;
	return widget_unit;
}

//将object转为json字符串返回
function object_to_json(object){
	return JSON.stringify(object);
}
//将json字符串转为对象
function json_to_object(json_string){
	return JSON.parse(json_string);
}
//在中间代码层上显示格式化的mid_code
function write_to_div(string){
	var output_str = string;
	output_str.replace(/widget/g,"a");
	$("#middle_code").text(output_str);
}

//根据widget_unit对象生成控件，添加到lab_implementation层中
function gen_widget(widget_unit){
	var widgets = widget_unit.widgets;
	
	var div = $('<div></div>');
	var form = $('<form></form>');
	
	for(var i = 0 ; i < widgets.length ; i++){
		if(widgets[i]=='input_text'){
			add_input_text(form);
		}
		if(widgets[i]=='single_choice'){
			add_single_choice(form);
		}
		if(widgets[i]=='multiple_choice'){
			add_multiple_choice(form);
		}
		if(widgets[i]=='button'){
			add_button(form);
		}
	}
	div.append(form);
	$("#lab_implementation").append(div);
}
// 添加输入框到block中
function add_input_text(block){
	var input = $("<input type='text' placeholder='文本信息' />");
	$(block).append(input);
}
// 添加单选框到block中
function add_single_choice(block){
	var div = $("<div class='radio'></div>");
	var radio1 = $("<input type='radio' name='a' value='左' checked='checked' >左</input>");
	var radio2 = $("<input type='radio' name='a' value='右' >右</input>");
	$(div).append(radio1);
	$(div).append(radio2);
	$(block).append(div);
}
// 添加多选框到block中
function add_multiple_choice(block){
	var div = $("<div class='checkbox'></div>");
	var checkbox1 = $("<input type='checkbox' name='b' value='第一个' >第一个</input>");
	var checkbox2 = $("<input type='checkbox' name='b' value='第一个' >第二个</input>");
	$(div).append(checkbox1);
	$(div).append(checkbox2);
	$(block).append(div);
}
// 添加多选框到block中
function add_button(block){
	var button = $("<input type='button' value='提交' />");
	$(block).append(button);
	$(button).click(function(){			//绑定button的点击事件,传入的block为按钮所在的表单
		widget_unit_submit(block);
	});
}
//响应控件单元内按钮的点击事件：
//1.将控件中的信息转为json字符串
//2.将字符串传给服务器
function widget_unit_submit(block){
	var message_to_server = new Object();
	var multiple_choice = new Array();
	$(block).find("input").each(function(){
		if($(this).attr("type")=="text"){
			message_to_server.text = $(this).val();
		}
		if($(this).attr("type")=="radio"){
			if($(this).attr("checked")){
				message_to_server.single_choice = $(this).val();		
			}
		}
		if($(this).attr("type")=="checkbox"){
			if($(this).attr("checked")){
				multiple_choice.push($(this).val());
			}
		}
	});
	
	if(multiple_choice.length!=0){
		message_to_server.multiple_choice = multiple_choice;
	}
	//alert(object_to_json(message_to_server));
	send_message_to_server(object_to_json(message_to_server));
}
//获取xmlhttp对象
function getXmlHttpObject(){
	var xmlhttp;
	if (window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}
//将表单信息发给服务器
function send_message_to_server(json_string){
	var xmlhttp=getXmlHttpObject();
	var url="./dispose_message.php";
	url+="?message="+json_string;
	xmlhttp.onreadystatechange=stateChanged;
	xmlhttp.open("GET",url,false)
	xmlhttp.send();
	alert(xmlhttp.responseText);
}

function stateChanged(){
	if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
	{
	}
}

//保存控件
function save(){
	var xmlhttp = getXmlHttpObject();
	var url="./save.php";
	url+="?mid_code="+mid_code;								//设置发送给服务器的信息 mid_code=mid_code
	xmlhttp.onreadystatechange=stateChanged;
	xmlhttp.open("GET",url,false)							//发送请求到服务器
	xmlhttp.send();
	alert(xmlhttp.responseText);							//弹出返回信息
}
//加载控件
function reload(){
	var xmlhttp = getXmlHttpObject();						//得到xmlHttp对象
	var url="./reload.php";										//设置url
	xmlhttp.onreadystatechange=stateChanged;	//readyState 改变时，就会触发 onreadystatechange 事件，详见w3school AJAX XHR readyState
	xmlhttp.open("GET",url,false)							//发送请求到服务器
	xmlhttp.send();
	var string = xmlhttp.responseText;						//获取服务器返回信息，设置mid_code
	if(string==""){
		alert("文件为空或不存在");
	}else{
		mid_code=string;
		write_to_div(mid_code);										//将mid_code显示在页面上
		obj=json_to_object(mid_code);							//解析json字符串，得到对象，存入obj
		//alert(obj.widget_unit_array.length);
		
		clear_div();																				//根据obj生成控件
		for(var i=0 ; i<obj.widget_unit_array.length ; i++){
			gen_widget(obj.widget_unit_array[i]);
		}	
	}
}
//清除当前控件
function clear_widget(){
	while(obj.widget_unit_array.length!=0){
		obj.widget_unit_array.pop();
	}
	obj.widget_unit_num=0;
	mid_code = object_to_json(obj);
	write_to_div(mid_code);
	clear_div();
}
//清除lab_implementation层中所有内容
function clear_div(){
	$("#lab_implementation").children().remove();
}
//中间代码层的隐藏和显示
function mid_code_display(){
	if($("#middle_code").is(":hidden")){
		$("#middle_code").show(300);
		$("#mid_code_display").text("隐藏中间代码");	
	}else{
		$("#middle_code").hide(300);
		$("#mid_code_display").text("显示中间代码");	
	}
}
