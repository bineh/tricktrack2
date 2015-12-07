function login() {
	var username = document.getElementById("usernamelogin").value,
		password = document.getElementById("passwordlogin").value,
		xmlhttp =  new XMLHttpRequest(),
		pwhash;
	
	if (password.trim() != ""){
		pwhash = CryptoJS.MD5(password).toString();
	} 

	xmlhttp.open("POST", "php/login.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send("&user="+JSON.stringify({username:username, password:pwhash}));
	xmlhttp.onreadystatechange = function(){

		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			var user = xmlhttp.responseText;

			if (user === "-1"){
				alert("Something went wrong while login user! Please enter username and password field");
			} else if (user === "true") {
				alert("Something went wrong while login user! Wrong password?");
			} else {
				var userobj = JSON.parse(xmlhttp.responseText);

				localStorage.setItem("username",userobj.username);
				localStorage.setItem("isAdmin", userobj.isAdmin);
				if (user.isAdmin === "true"){
					document.getElementById("admin").style.display = "inline";
				}
				document.getElementById("loginform").style.display = "none";
				document.getElementById("container").style.display = "none";
				document.getElementById("login").style.display = "none";
				document.getElementById("logout").style.display = "inline";
				document.getElementById("add_issue").style.display = "inline";
				location.reload();
			} 
		}
	}
}

function registerUser(){
	var firstname = document.getElementById("firstname").value,
		lastname = document.getElementById("lastname").value,
		username = document.getElementById("usernameregister").value,
		email = document.getElementById("emailregister").value,
		password = document.getElementById("passwordregister").value,
		xmlhttp =  new XMLHttpRequest(),
		pwhash = CryptoJS.MD5(password).toString();
		
	localStorage.setItem("username",username);

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
				case 'true':
					localStorage.setItem("username", username);
					//set new registered user per default to false
					document.getElementById("registerform").style.display = "none";
					document.getElementById("container").style.display = "none";	
					document.getElementById("login").style.display = "none";
					document.getElementById("logout").style.display = "inline";
					document.getElementById("add_issue").style.display = "inline";
					break;
				default:
					alert("Something went wrong while registering user: "+xmlhttp.responseText);	
			}
		}
	}
}

function createIssue(){
	var title = document.getElementById("issuetitle").value,
		description = document.getElementById("description").value,
		priority = document.getElementById("priority").value,
		assigned_to = document.getElementById("assigned_to").value,
		category = document.getElementById("category").value,
		reporter = localStorage.getItem("username"),
		xmlhttp =  new XMLHttpRequest();
		
	xmlhttp.open("POST", "php/createissue.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send("&issue="+JSON.stringify({title:title,description:description,priority:priority,assigned_to:assigned_to, category:category, reporter:reporter}));
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			var response = xmlhttp.responseText;
			alert(response);
			if(response !== "true"){
				if (response === "-1") {
					alert("Issue ist leer und kann nicht angelegt werden!");
				} else if (response === "-2"){
					alert("Bitte gib einen Titel an!");
				} else {
					alert("Beim Einfügen in die Datenbank ist etwas fehlgeschlagen");
				}
			} else {
				document.getElementById("createissueform").style.display = "none";
				document.getElementById("container").style.display = "none";
				location.reload(); 
			}
		}
	}
}

function updateIssue(){
	var issue_id = document.getElementById("hidden_id").value,
		priority = document.getElementById("priority_update").value,
		assigned_to = document.getElementById("assigned_to_update").value,
		category = document.getElementById("category_update").value,
		xmlhttp =  new XMLHttpRequest();
		
	xmlhttp.open("POST", "php/updateissue.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send("&issue="+JSON.stringify({issue_id:issue_id,priority:priority,assigned_to:assigned_to, category:category}));
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			var response = xmlhttp.responseText;
			if(response !== "true"){
				alert("Issueupdate fehlgeschlagen!");
			} else {
				document.getElementById("updateissueform").style.display = "none";
				document.getElementById("container").style.display = "none";
				location.reload();
			}
		}
	}
}

function saveIssueState(issue_id, newstate){
	var xmlhttp = new XMLHttpRequest();
		
	xmlhttp.open("POST", "php/updateissue.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send("issue_id="+issue_id+"&newstate="+newstate);
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			var response = xmlhttp.responseText;
			if(response !== "true"){
				alert("Issue update fehlgeschlagen!");
			}
		}
	}
}

function showIssueDetails(issue_id){
	var priorityArray = ["high", "medium", "low"],
		categoryArray = ["category1", "category2", "category3"],
		xmlhttp =  new XMLHttpRequest();
	
		
	xmlhttp.open("POST", "php/getissuebyid.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send("issue_id="+issue_id);
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {		
			var issue = JSON.parse(xmlhttp.responseText);

			openForm("updateissueform");
			document.getElementById("hidden_id").value = issue_id;
			document.getElementById("title_update").innerHTML = issue.title;
			document.getElementById("description_update").innerHTML = issue.description;
			var assign_to = document.getElementById("assigned_to_update");
			//add ***me*** as first option
			var me = localStorage.getItem("username");
			var firstOptionMe = document.createElement("option");
				firstOptionMe.text = "*** me ***";
				firstOptionMe.value = me;
				assign_to.options[0] = firstOptionMe;		
			for(var i = 0; i < issue.users.length; i++){
				var option = document.createElement("option");
				option.text = issue.users[i].username;
				option.value = issue.users[i].username;
				//select user whose this issue assigned_to
				if(issue.users[i].username === issue.assigned_to){
					option.selected = true;
				}
				assign_to.options[i+1] = option;
			}
			var indexPrio = priorityArray.indexOf(issue.priority);
			document.getElementById("priority_update").selectedIndex = indexPrio;
			var indexCat = categoryArray.indexOf(issue.category);
			document.getElementById("category_update").selectedIndex = indexCat;

			if (issue.state === "done") {
				document.getElementById("deleteissue").setAttribute("onclick", "deleteIssue('"+issue_id+"')");
				document.getElementById("deleteissue").style.display = "inline";
			} else {
				document.getElementById("deleteissue").style.display = "none";
			}

			document.getElementById("updateissueform").className = "form updateform_"+issue.priority;
		}
	}	
}

//getting issues by state when loading window
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
				var result = JSON.parse(xmlhttp.responseText);

				//create tickets
				for (var i = 0; i < result.length; i++){
						
					var li = document.createElement("li");
					var outerdiv = document.createElement("div");
					var spanid = document.createElement("span");
					var divtitle = document.createElement("div");
					var a = document.createElement("a");
					var textnode = document.createTextNode(result[i]._id);
					
					var textuname = document.createTextNode(result[i].assigned_to);
					var texttitle = document.createTextNode(result[i].title);
					a.id = result[i]._id;
					li.id = result[i]._id+"_li";
					var span = document.createElement("span");
					
					li.setAttribute("class", result[i].priority);
					divtitle.setAttribute("class", "issue_title");
						
					span.setAttribute("class", "ticket_uname");
					if(localStorage.getItem("username") !== null){
						a.setAttribute("onclick", "showIssueDetails('"+result[i]._id+"')");
					}
					outerdiv.setAttribute("class", "issue_outerdiv");
						
					divtitle.appendChild(texttitle);
					span.appendChild(textuname);
					a.appendChild(textnode);
					spanid.appendChild(a);
					li.appendChild(outerdiv);
					outerdiv.appendChild(spanid);
					outerdiv.appendChild(span);
					outerdiv.appendChild(divtitle);
					
					list.appendChild(li);
					
					if ((state !== "done") && (localStorage.getItem("username") !== null)){
						li.setAttribute('draggable', 'true');
					} else if (state === "done"){
						 spanid.setAttribute("class", "line_through");
					}
					a.setAttribute('href', '#');
					li.addEventListener('dragstart', function(e){
						e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
						e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
					});
				}
				
				document.getElementById("num_"+state).innerHTML = result.length;
			}
		}
	}
}

//get user list for select boxes -> create and update issue
function openNewIssueForm() {
	var xmlhttp =  new XMLHttpRequest();
	xmlhttp.open("POST", "php/getusers.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xmlhttp.send();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			var response = JSON.parse(xmlhttp.responseText);
			
			var forms = document.getElementsByClassName("form");
			for (var i = 0; i < forms.length; i++) {
				forms[i].style.display = "none";
			}
			document.getElementById("updateissueform").style.display = "none";

			document.getElementById("container").style.display = "block";

			var assign_to = document.getElementById("assigned_to");
			
			//add ***me*** as first option
			var me = localStorage.getItem("username");
			var firstOptionMe = document.createElement("option");
				firstOptionMe.text = "*** me ***";
				firstOptionMe.value = me;				
				assign_to.options[0] = firstOptionMe;
			for(var i = 0; i < response.length; i++){
				var option = document.createElement("option");
				option.text = response[i].username;
				option.value = response[i].username;
				assign_to.options[i+1] = option;
			}
			
			document.getElementById("createissueform").style.display = "block";
		}
	}
}

function deleteIssue(issue_id){
	var deleteIssue = confirm('Willst du diese Task wirklich löschen?');
	if (deleteIssue) {
		saveIssueState(issue_id, "deleted");
		cancelform("updateissueform");
		location.reload();
	}
}

