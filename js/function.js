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
	var wrap_session=$("<div class='wrap_session_content'></div>");
	var session_label = create_a_session_label();
	var close = create_a_close_button();
	var div_test = create_a_test();
	var div_run = create_a_run();
	var add = create_an_add();

	wrap_session.append(close);
	wrap_session.append(div_test);
	wrap_session.append(div_run);
	wrap_session.append(add);

	div_session.append(session_label);
	div_session.append(wrap_session);

	close.click(function(){
		remove_session(div_session);
	});

	return div_session;
}
function create_a_session_label(){
	var session_label =
		$("<div class='label_session'></div>");
	session_label.text("Session ");
	var label_num =
		$("<span class='session_num'></span>");
	label_num.text(get_session_num());

	session_label.append(label_num);

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
	var choice_with_check = create_a_choice_with_check();

	div_run.append(label);
	div_run.append(input);
	div_run.append(execute);
	div_run.append(choice_with_check);

	return div_run;
}
function create_an_add(){
	var add = $("<div class='div_add'></div>");
	var btn_add_a_RC_check =
		create_an_add_button("Add a RC check");
	var btn_add_a_message_check =
		create_an_add_button("Add a message check");

	add.append(btn_add_a_RC_check);
	add.append(btn_add_a_message_check);

	return add;
}
function create_an_add_button(add_what){
	var add_button = $("<p class='btn_add'></p>");
	add_button.text(add_what);

	return add_button;
}
function add_a_check_RC(block){
	var div_check = create_a_check();
	block.append(div_check);
}

function create_a_check_RC(){
	var div_check_rc = $("<div class='div_check_rc'></div>");

	return div_check_rc;
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
	 var btn = $("<div class='btn_execute'>" +
	 "<p>Execute</p></div>");
	return btn;
}
function create_a_choice_with_check(){
	var with_check = 	$("<div class='choice_with_check'>" +
	"<input type='checkbox' value='with_check' />" +
	"<p>With Check</p></div>");
	return with_check;
}
function create_a_close_button(){
	var close = $("<div class='div_close'>×</div>");

	return close;
}
function get_session_num(){
	return ++session_num;
}
function remove_session(session){
	//change session number
	session_num--;
	session.nextAll().each(function(){
		var label_num = parseInt($(this).children().first().children().text()) -1;
		$(this).children().first().children().text(label_num);
	});
	//remove session
	session.animate({height:'toggle',opacity:'0',margin:'0px'},800,function(){
		session.remove();
	});

}
