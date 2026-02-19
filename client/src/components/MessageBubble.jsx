
import React from 'react';

const MessageBubble = ({ message, isUser }) => {
    return (
        <div className={`p-4 rounded-2xl max-w-[80%] ${isUser
                ? 'bg-blue-600 text-white rounded-br-none ml-auto'
                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
            }`}>
            {message}
        </div>
    );
};

export default MessageBubble;
