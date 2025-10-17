const MessageSkeleton = () => {
  return (
    <div className="message-skeleton-container">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className={`message-skeleton-row ${
            i % 2 === 0 ? "received" : "sent"
          }`}
        >
          {i % 2 === 0 && <div className="skeleton-avatar"></div>}
          <div className="skeleton-bubble-group">
            <div
              className={`skeleton-bubble ${
                i % 2 === 0
                  ? ["short", "long", "medium"][i % 3]
                  : ["medium", "short", "long"][i % 3]
              }`}
            ></div>
            <div
              className={`skeleton-timestamp ${
                i % 2 === 0 ? "left" : "right"
              }`}
            ></div>
          </div>
          {i % 2 !== 0 && <div className="skeleton-avatar"></div>}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
