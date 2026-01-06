import React from "react";
import "./Comment.css";

const Comments = () => {
  return (
    <div className="comments-overlay">
      <div className="comments-modal">

        {/* Header */}
        <div className="comments-header">
          <h3>Comments</h3>
          <span className="close-btn">×</span>
        </div>

        {/* Comment 1 */}
        <div className="comment-item">
          <div className="comment-top">
            <div>
              <p className="comment-name">Akshay Sharma</p>
              <span className="comment-time">1 hours ago</span>
            </div>
            <span className="comment-dots">⋯</span>
          </div>

          <p className="comment-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <span className="comment-emoji">🙂</span>
        </div>

        {/* Comment 2 */}
        <div className="comment-item">
          <div className="comment-top">
            <div>
              <p className="comment-name">Akshay Sharma</p>
              <span className="comment-time">1 hours ago</span>
            </div>
            <span className="comment-dots">⋯</span>
          </div>

          <p className="comment-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <span className="comment-emoji">🙂</span>
        </div>

        {/* Input Box */}
        <div className="comment-input-box">
          <input type="text" placeholder="Enter your comment..." />
          <span className="input-emoji">🙂</span>
          <button className="send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
