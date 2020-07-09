"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var commentList = document.getElementById("jsCommentList");
var commentDelBTN = document.querySelector("li .commentDBTN");
var commentNumber = document.getElementById("jsCommentNumber");

function decreaseNumber() {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
}

var deleteComment = function deleteComment(comment, commentId) {
  comment.parentNode.remove();
  decreaseNumber();
};

var sendDeleteComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var comment, commentId, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            comment = event.target;
            commentId = document.getElementById("viewCommentId").innerHTML;
            console.log(comment);
            deleteComment(comment, commentId);
            _context.next = 6;
            return (0, _axios["default"])({
              url: "/api/".concat(commentId, "/delete-comment"),
              method: "POST"
            });

          case 6:
            response = _context.sent;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function sendDeleteComment(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (commentDelBTN) {
  var commentLi = commentList.querySelectorAll("li");
  commentDelBTN.addEventListener("click", sendDeleteComment);
}