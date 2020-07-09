import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentDelBTN = document.querySelector("li .commentDBTN");
const commentNumber = document.getElementById("jsCommentNumber");

function decreaseNumber() {
	commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

const deleteComment = (comment, commentId) => {
	comment.parentNode.remove();
	decreaseNumber();
};

const sendDeleteComment = async (event) => {
	const comment = event.target;
	const commentId = document.getElementById("viewCommentId").innerHTML;
	console.log(comment);
	deleteComment(comment, commentId);
	const response = await axios({
		url: `/api/${commentId}/delete-comment`,
		method: "POST",
	});
};

if (commentDelBTN) {
	const commentLi = commentList.querySelectorAll("li");

	commentDelBTN.addEventListener("click", sendDeleteComment);
}
