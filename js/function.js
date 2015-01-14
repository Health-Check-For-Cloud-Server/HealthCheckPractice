var session_num = 0;
var flag = 0;

function event_bind(){
	$("#btn_add_a_new_session").click(function(){
		add_a_new_session($("#wrap_page_content"));
	});
}

function add_a_new_session(block){
	var div_session = create_a_new_session();
	div_session.hide();

	block.append(div_session);

	div_session.fadeIn(800);
}

function create_a_new_session(){
	var div_session=$("<div class='div_session'></div>");
	var session_label = create_a_session_label();
	var div_test = create_a_test();
	var div_run = create_a_run();

	div_session.append(session_label);
	div_session.append(div_test);
	div_session.append(div_run);

	return div_session;
}
function create_a_session_label(){
	var session_label = $("<div class='label_session'></div>");
	session_label.text("Session "+get_session_num());
	return session_label;
}
function create_a_test(){
	var div_test = $("<div class='div_test'></div>");
	var label =  create_a_label("Test");
	var input = create_a_input("Input code to test.");
	var execute = create_an_execute_button();

	div_test.append(label);
	div_test.append(input);
	div_test.append(execute);

	return div_test;
}
function create_a_run(){
	var div_run = $("<div class='div_run'></div>");
	var label =  create_a_label("Run");
	var input = create_a_input("Input code to run.");
	var execute = create_an_execute_button();

	div_run.append(label);
	div_run.append(input);
	div_run.append(execute);

	return div_run;
}
function create_an_add_button(add_what){
	var add_button = $("<p class='btn_add'></p>");
}
function add_a_check_RC(block){
	var div_check = create_a_check();
	block.append(div_check);
}

function create_a_check_RC(){

}
function add_a_check_message(block){

}
function create_a_check_message(){

}
function create_a_input(tip_for_input){
	var input = $("<input type='text' class='input' />");
	input.attr("placeholder",tip_for_input);
	return input;
}
function create_a_label(label_content){
	var label = $("<div class='label'></div>");
	label.text(label_content);
	return label;
}
function create_an_execute_button(){
	 var btn = $("<p class='btn_execute'>Execute</p>");
	return btn;
}
function get_session_num(){
	return ++session_num;
}

