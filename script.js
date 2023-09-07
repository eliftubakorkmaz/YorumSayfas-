document.addEventListener("DOMContentLoaded", function () {
    const commentList = document.getElementById("comment-list");
    const commentInput = document.getElementById("comment-input");
    const addCommentButton = document.getElementById("add-comment-button");

    const jsonData = {
        "comments": []
    };

    function renderComments(comments) {
        commentList.innerHTML = "";

        function renderComment(commentData, level = 0) {
            const commentDiv = document.createElement("div");
            commentDiv.className = "comment";
            commentDiv.style.marginLeft = level * 20 + "px";

            const titleDiv = document.createElement("div");
            titleDiv.className = "comment-title";
            titleDiv.textContent = commentData.title;

            const contentDiv = document.createElement("div");
            contentDiv.className = "comment-content";
            contentDiv.textContent = commentData.content;

            const replyButton = document.createElement("button");
            replyButton.textContent = "Yanıtla";
            replyButton.addEventListener("click", function () {
                const replyText = prompt("Yanıtınızı girin:");
                if (replyText) {
                    const newReply = {
                        "id": commentData.replies.length + 1,
                        "title": "Yanıt",
                        "content": replyText,
                        "replies": []
                    };
                    commentData.replies.push(newReply);
                    renderComments(jsonData.comments);
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Sil";
            deleteButton.addEventListener("click", function () {
                const confirmDelete = confirm("Bu yorumu silmek istediğinizden emin misiniz?");
                if (confirmDelete) {
                    comments.splice(comments.indexOf(commentData), 1);
                    renderComments(jsonData.comments);
                }
            });

            commentDiv.appendChild(titleDiv);
            commentDiv.appendChild(contentDiv);
            commentDiv.appendChild(replyButton);
            commentDiv.appendChild(deleteButton);

            if (commentData.replies && commentData.replies.length > 0) {
                commentData.replies.forEach(reply => {
                    renderComment(reply, level + 1);
                });
            }

            commentList.appendChild(commentDiv);
        }

        comments.forEach(commentData => {
            renderComment(commentData);
        });
    }

    function addComment() {
        const commentText = commentInput.value.trim();
        if (commentText !== "") {
            const newComment = {
                "id": jsonData.comments.length + 1,
                "title": "Yeni Yorum",
                "content": commentText,
                "replies": []
            };
            jsonData.comments.push(newComment);
            renderComments(jsonData.comments);
            commentInput.value = "";
        }
    }

    addCommentButton.addEventListener("click", addComment);

    renderComments(jsonData.comments);
});
