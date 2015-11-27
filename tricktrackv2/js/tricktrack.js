//load issues of different states
window.addEventListener("load", function(){
	getIssuesByState("todo");
	getIssuesByState("in_progress");
	getIssuesByState("done");
});

//buttons
document.getElementById("login").addEventListener("click", function(){openForm("loginform")});
document.getElementById("logout").addEventListener("click", logout);
document.getElementById("register").addEventListener("click", function(){openForm("registerform")});
//document.getElementById("add_issue").addEventListener("click", function(){openForm("createissueform")});
document.getElementById("add_issue").addEventListener("click", openNewIssueForm);

document.getElementById("sendloginform").addEventListener("click", login);	
document.getElementById("registeruser").addEventListener("click", registerUser);

document.getElementById("createissue").addEventListener("click", createIssue);
document.getElementById("updateissue").addEventListener("click", updateIssue);


var cancelbuttons = document.getElementsByClassName("cancel");
for (var i = 0; i < cancelbuttons.length; i++) {
    cancelbuttons[i].addEventListener("click", cancelform);
}

//drag and drop
var bin_progress = document.querySelector('#bin_progress');
var in_progress_list = document.querySelector('#in_progress_list');
var bin_done = document.querySelector('#bin_done');
var done_list = document.querySelector('#done_list');


bin_done.addEventListener('dragover', function (e) {
	if (e.preventDefault) e.preventDefault(); // allows us to drop
	e.dataTransfer.dropEffect = 'copy';
	return false;
});

bin_done.addEventListener('drop', function (e) {
	if (e.stopPropagation) e.stopPropagation();
	e.preventDefault();
	
	var el = document.getElementById(e.dataTransfer.getData('Text'));
	el.parentNode.removeChild(el);
	done_list.appendChild(el);

	var issue_id = el.id.replace("_li","");
	//save new state
	saveIssueState(issue_id, "done");
	return false;
});
		  
bin_progress.addEventListener('dragover', function (e) {
	if (e.preventDefault) e.preventDefault(); // allows us to drop
	e.dataTransfer.dropEffect = 'copy';
	return false;
});

bin_progress.addEventListener('drop', function (e) {
	if (e.stopPropagation) e.stopPropagation();
	e.preventDefault();

	var el = document.getElementById(e.dataTransfer.getData('Text'));
	el.parentNode.removeChild(el);	
	in_progress_list.appendChild(el);
			
	var issue_id = el.id.replace("_li","");
	//save new state
	saveIssueState(issue_id, "in_progress");
	return false;
});	


// HELPER
function openForm(formId){
	var forms = document.getElementsByClassName("form");
	for (var i = 0; i < forms.length; i++) {
		forms[i].style.display = "none";
	}

	document.getElementById("container").style.display = "block";
	document.getElementById(formId).style.display = "block";

	//document.getElementById("footer").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}

function cancelform(){
	var forms = document.getElementsByClassName("form");
	for (var i = 0; i < forms.length; i++) {
		forms[i].style.display = "none";
	}
	document.getElementById("container").style.display = "none";
	//document.getElementById("footer").style.backgroundColor = "#ffffcc";		
}

function logout(){
	localStorage.clear();
}
