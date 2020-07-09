import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const loggedUserName = document.getElementById("jsGetName");
const increaseNumber = () => {
	commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
	const li = document.createElement("li");
	const span = document.createElement("span");
	const commentDBTN = document.createElement("button");
	const name = document.createElement("b");
	name.innerHTML = loggedUserName.innerHTML;
	span.innerHTML = comment;
	commentDBTN.innerHTML = "x";
	li.appendChild(name).classList.add("commentCreator");
	li.appendChild(span);
	li.appendChild(commentDBTN).classList.add("commentDBTN");
	commentList.prepend(li);
	increaseNumber();
};

const sendComment = async (comment) => {
	const videoId = window.location.href.split("/videos/")[1];
	const response = await axios({
		url: `/api/${videoId}/comment`,
		method: "POST",
		data: {
			comment,
		},
	});
	if (response.status === 200) {
		addComment(comment);
	}
};

const handleSubmit = (event) => {
	event.preventDefault();
	const commentInput = addCommentForm.querySelector("input");
	const comment = commentInput.value;
	sendComment(comment);
	commentInput.value = "";
};

function init() {
	addCommentForm.addEventListener("submit", handleSubmit);
}
if (addCommentForm) {
	init();
}
