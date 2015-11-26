//buttons
document.getElementById("login").addEventListener("click", function(){openForm("loginform")});
document.getElementById("logout").addEventListener("click", logout);
document.getElementById("register").addEventListener("click", function(){openForm("registerform")});
document.getElementById("add_issue").addEventListener("click", function(){openForm("createissueform")});

var cancelbuttons = document.getElementsByClassName("cancel");
for (var i = 0; i < cancelbuttons.length; i++) {
    cancelbuttons[i].addEventListener("click", cancelform);
}

		
document.getElementById("loginsubmit").addEventListener("click",function(){
	var email = document.getElementById("emaillogin").value,
	password = document.getElementById("passwordlogin").value
	var xmlhttp =  new XMLHttpRequest();
		
	var pwhash = CryptoJS.MD5(password).toString();
	//................................USE USERNAME??? 
	localStorage.setItem("username",email);

	xmlhttp.open("POST", "php/login.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send("&user="+JSON.stringify({email:email, password:pwhash}));
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			//alert(xmlhttp.responseText);
			document.getElementById("loginform").style.display = "none";
			document.getElementById("container").style.display = "none";
		}
	}
});
	
	
//@TODO: work on response codes...................
document.getElementById("registersubmit").addEventListener("click",function(){
	var firstname = document.getElementById("firstname").value,
		lastname = document.getElementById("lastname").value,
		username = document.getElementById("usernameregister").value,
		email = document.getElementById("emailregister").value,
		password = document.getElementById("passwordregister").value,
		xmlhttp =  new XMLHttpRequest(),
		pwhash = CryptoJS.MD5(password).toString();
		
	//................................USE USERNAME??? 
	localStorage.setItem("username",email);

	xmlhttp.open("POST", "php/register.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send("&user="+JSON.stringify({firstname:firstname,lastname:lastname,username:username,email:email, password:pwhash}));
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {

			switch (xmlhttp.responseText) {
				case '-2':
					alert("registrierung fehlgeschlagen: username exists");
					break;
				case '-3':
					alert("registrierung fehlgeschlagen: email exists");
					break;
				case '1':
					document.getElementById("registerform").style.display = "none";
					document.getElementById("container").style.display = "none";				
					break;
				default:
					alert("something went wrong: "+xmlhttp.responseText);	
			}
		}
	}
});


document.getElementById("createissue").addEventListener("click",function(){
	var title = document.getElementById("issuetitle").value,
		description = document.getElementById("description").value,
		priority = document.getElementById("priority").value,
		assigned_to = document.getElementById("assigned_to").value,
		category = document.getElementById("category").value,
		reporter = localStorage.getItem("username"), //@TODO get stuff from localStorage
		xmlhttp =  new XMLHttpRequest();
		

	xmlhttp.open("POST", "php/createissue.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send("&issue="+JSON.stringify({title:title,description:description,priority:priority,assigned_to:assigned_to, category:category, reporter:reporter}));
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {

			if(xmlhttp.responseText === "-1"){
				alert("issue anlegen fehlgeschlagen");
			} else {
				document.getElementById("createissueform").style.display = "none";
				document.getElementById("container").style.display = "none";
				location.reload(); 
			}
		}
	}
});


function logout(){
	localStorage.clear();
}




function saveIssueState(issue_id, newstate){
	var xmlhttp =  new XMLHttpRequest();
		
	xmlhttp.open("POST", "php/updateissue.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send("issue_id="+issue_id+"&newstate="+newstate);
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {

			if(xmlhttp.responseText === "-1"){
				alert("issue upate fehlgeschlagen");
			} else {
				alert("update erfolgreich");
			}
		}
	}	
}


function showIssueDetails(issue_id){
	var priorityArray = ["high", "medium", "low"];
	var categoryArray = ["category1", "category2", "category3"];
	var xmlhttp =  new XMLHttpRequest();
		
	xmlhttp.open("POST", "php/getissuebyid.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send("issue_id="+issue_id);
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			var issue = JSON.parse(xmlhttp.responseText);
			openForm("updateissueform");
			document.getElementById("title_update").innerHTML = issue.title;
			document.getElementById("description_update").innerHTML = issue.description;
			var indexPrio = priorityArray.indexOf(issue.priority);
			document.getElementById("priority_update").selectedIndex = indexPrio;
			var indexCat = categoryArray.indexOf(issue.category);
			document.getElementById("category_update").selectedIndex = indexCat;
		}
	}	
}

// *** DRAG AND DROP ***
//load issues of different states
window.addEventListener("load", function(){
	getIssuesByState("todo");
	getIssuesByState("in_progress");
	getIssuesByState("done");
});
			
		
	//all lis get draggable attribute ************************** REMOVE THIS AFTER TESTS
	//var links = document.querySelectorAll('li > a'), el = null;
	var links = document.querySelectorAll('li'), el = null;
	for (var i = 0; i < links.length; i++) {
		el = links[i];
		  
		el.setAttribute('draggable', 'true');
		el.addEventListener('dragstart', function(e){
			e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
			e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
		});
	}
		  
	var bin_progress = document.querySelector('#bin_progress');
	var in_progress_list = document.querySelector('#in_progress_list');
	var bin_done = document.querySelector('#bin_done');
	var done_list = document.querySelector('#done_list');
		 
	bin_done.addEventListener('dragover', function (e) {
		if (e.preventDefault) e.preventDefault(); // allows us to drop
		//this.className = 'over';
		e.dataTransfer.dropEffect = 'copy';
		return false;
	});
		  

	bin_done.addEventListener('drop', function (e) {
		if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
			e.preventDefault();
			//var el = document.getElementById(e.dataTransfer.getData('Text')+"_li");
			var el = document.getElementById(e.dataTransfer.getData('Text'));
			//removes issue from list
			el.parentNode.removeChild(el);

			done_list.appendChild(el);

			var issue_id = el.id.replace("_li","");
			//save new state
			saveIssueState(issue_id, "done");
			return false;
		});
		  
	bin_progress.addEventListener('dragover', function (e) {
		if (e.preventDefault) e.preventDefault(); // allows us to drop
		//this.className = 'over';
		e.dataTransfer.dropEffect = 'copy';
		return false;
	});
		  

	bin_progress.addEventListener('drop', function (e) {
		if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
		e.preventDefault();
		//var el = document.getElementById(e.dataTransfer.getData('Text')+"_li");
		var el = document.getElementById(e.dataTransfer.getData('Text'));
		//removes issue from list
		el.parentNode.removeChild(el);
			
		in_progress_list.appendChild(el);
			
		var issue_id = el.id.replace("_li","");
		//save new state
		saveIssueState(issue_id, "in_progress");
		return false;
	});	


//*** helper ****
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

//getting issues by state
function getIssuesByState(state){
	var xmlhttp =  new XMLHttpRequest();
	var list = document.getElementById(state+"_list");

	xmlhttp.open("POST", "php/getissues.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send("state="+state);
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {

			if(xmlhttp.responseText === "-1"){
				alert("no issues");
			} else {
				//getting array of issues here
				//alert(xmlhttp.responseText);
				var result = JSON.parse(xmlhttp.responseText);
				//create tickets
				for (var i = 0; i < result.length; i++){
						
					var li = document.createElement("li");
					var div = document.createElement("div");
					var divtitle = document.createElement("div");
					var a = document.createElement("a");
					var textnode = document.createTextNode(result[i]._id);
					var textuname = document.createTextNode("user name");
					var texttitle = document.createTextNode("issue title");
					a.id = result[i]._id;
					li.id = result[i]._id+"_li";
					var span = document.createElement("span");
						
					span.setAttribute("class", "ticket_uname");
					a.setAttribute("onclick", "showIssueDetails('"+result[i]._id+"')");
						
					divtitle.appendChild(texttitle);
					span.appendChild(textuname);
					a.appendChild(textnode);
					div.appendChild(a);
					div.appendChild(span);
					li.appendChild(div);
					li.appendChild(divtitle);
					//li.appendChild(a);
					list.appendChild(li);
						
					li.setAttribute('draggable', 'true');
					a.setAttribute('href', '#');
					li.addEventListener('dragstart', function(e){
						e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
						e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
					});
				}
			}
		}
	}
}
