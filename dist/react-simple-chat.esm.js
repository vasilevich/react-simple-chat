import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Moment from 'react-moment';

var defaultMinimizeIcon = 'data:image/png;base64, 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';

var Header = function Header(_ref) {
  var title = _ref.title,
      minimize = _ref.minimize,
      headerAvatar = _ref.headerAvatar,
      headerStyle = _ref.headerStyle,
      titleColor = _ref.titleColor,
      minimizeIcon = _ref.minimizeIcon;
  return React.createElement("header", {
    className: "chat-header",
    style: headerStyle
  }, React.createElement("div", {
    className: "d-flex align-items-center"
  }, headerAvatar && React.createElement("div", {
    className: "chat-header__avatar"
  }, React.createElement("img", {
    src: headerAvatar,
    alt: "avatar"
  })), React.createElement("div", {
    className: "chat-header__title",
    style: {
      color: titleColor
    }
  }, title ? title : 'Chat Demo')), React.createElement("img", {
    src: minimizeIcon ? minimizeIcon : defaultMinimizeIcon,
    alt: "minimize",
    className: "chat-header__minimize",
    onClick: minimize
  }));
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var Bubble = function Bubble(_ref) {
  var message = _ref.message,
      position = _ref.position,
      style = _ref.style;
  return React.createElement("div", {
    className: position === 'left' ? 'chat-bubble__wrapper chat-bubble--left' : 'chat-bubble__wrapper chat-bubble--right'
  }, React.createElement("div", {
    className: "chat-bubble__content",
    style: style
  }, message.text));
};

var Timestamp = function Timestamp(_ref) {
  var date = _ref.date,
      style = _ref.style;
  return React.createElement("div", {
    className: "chat-timestamp",
    style: style
  }, React.createElement(Moment, {
    format: "dd. o HH:mm"
  }, moment(date)));
};

var Avatar = function Avatar(_ref) {
  var source = _ref.source;
  return React.createElement("div", {
    className: "chat-message__avatar"
  }, React.createElement("img", {
    src: source,
    alt: "avatar"
  }));
};

var TypingIndicator = function TypingIndicator() {
  return React.createElement("div", {
    className: "chat__typing-indicator"
  }, React.createElement("div", {
    className: "chat__typing-indicator__content"
  }, React.createElement("div", {
    className: "dot"
  }), React.createElement("div", {
    className: "dot"
  }), React.createElement("div", {
    className: "dot"
  })));
};

var Body = function Body(_ref) {
  var messages = _ref.messages,
      user = _ref.user,
      isTyping = _ref.isTyping,
      leftBubbleStyle = _ref.leftBubbleStyle,
      rightBubbleStyle = _ref.rightBubbleStyle,
      backgroundColor = _ref.backgroundColor,
      timestampStyle = _ref.timestampStyle;
  var el = React.useRef();

  var _useState = useState(),
      typingUserAvatar = _useState[0],
      setTypingUserAvatar = _useState[1];

  useEffect(function () {
    var _messages$find;

    setTypingUserAvatar((_messages$find = messages.find(function (message) {
      return message.user.id !== user.id;
    })) == null ? void 0 : _messages$find.user.avatar);
  }, [messages, user]);

  var setStylesForBubbles = function setStylesForBubbles(messages, i, position) {
    var currentMessage = messages[i];
    var previousMessage = messages[i - 1];
    var nextMessage = messages[i + 1];
    var corner1 = '0px';
    var corner2 = '0px';
    var corner3 = '0px';
    var corner4 = '0px';
    var topTimestamp = previousMessage && moment(currentMessage.createdAt).diff(moment(previousMessage.createdAt), 'minutes') > 5 ? true : false;
    var bottomTimestamp = nextMessage && moment(nextMessage.createdAt).diff(moment(currentMessage.createdAt), 'minutes') > 5 ? true : false;

    if (!topTimestamp) {
      topTimestamp = !previousMessage ? true : false;
    }

    if (topTimestamp && !previousMessage) {
      corner1 = '15px';
      corner2 = '15px';
    }

    if (bottomTimestamp) {
      corner3 = '15px';
      corner4 = '15px';
    }

    if (topTimestamp) {
      corner1 = '15px';
      corner2 = '15px';
    }

    if (currentMessage.user.id !== (previousMessage == null ? void 0 : previousMessage.user.id)) {
      corner1 = '15px';
      corner2 = '15px';
    }

    if (!nextMessage) {
      corner3 = '15px';
      corner4 = '15px';
    }

    if (currentMessage.user.id !== (nextMessage == null ? void 0 : nextMessage.user.id)) {
      corner3 = '15px';
      corner4 = '15px';
    }

    if (currentMessage.user.id === (previousMessage == null ? void 0 : previousMessage.user.id)) {
      corner2 = '15px';
    }

    if (currentMessage.user.id === (nextMessage == null ? void 0 : nextMessage.user.id)) {
      corner3 = '15px';
    }

    if (position === 'left') {
      return {
        borderRadius: corner1 + " " + corner2 + " " + corner3 + " " + corner4
      };
    }

    return {
      borderRadius: corner2 + " " + corner1 + " " + corner4 + " " + corner3
    };
  };

  return React.createElement("div", {
    className: "chat-body",
    style: {
      background: backgroundColor
    }
  }, messages.map(function (message, i) {
    var previousMessage = messages[i - 1];
    var nextMessage = messages[i + 1];
    var position = 'left';
    var style;
    /* set style curves for bubbles */

    if (message.user.id === user.id) {
      position = 'right';
      style = setStylesForBubbles(messages, i, 'right');
    } else {
      style = setStylesForBubbles(messages, i, 'left');
    }
    /* check if timestamp is needed */


    var isTimeStamp = true;

    if (previousMessage) {
      var diff = moment(message.createdAt).diff(moment(previousMessage.createdAt), 'minutes');

      if (diff < 5) {
        isTimeStamp = false;
      }
    }
    /* check if render avatar */


    var isAvatarVisible = false;

    if (position === 'left' && (nextMessage && message.user.id !== nextMessage.user.id || nextMessage && moment(nextMessage.createdAt).diff(moment(message.createdAt), 'minutes') > 5 || !nextMessage) && message.user.avatar) {
      isAvatarVisible = true;
    }

    return React.createElement("div", {
      key: i,
      style: nextMessage ? message.user.id !== nextMessage.user.id ? {
        marginBottom: '8px'
      } : {} : {
        marginBottom: '8px'
      }
    }, isTimeStamp && message.createdAt ? React.createElement(Timestamp, {
      date: message.createdAt,
      style: timestampStyle
    }) : null, React.createElement("div", {
      className: "chat-body__message"
    }, message.user.avatar && isAvatarVisible && React.createElement(Avatar, {
      source: message.user.avatar
    }), message.user.avatar && !isAvatarVisible && React.createElement("div", {
      style: {
        marginLeft: '30px'
      }
    }), React.createElement(Bubble, {
      message: message,
      position: position,
      style: _extends({}, style, position === 'left' ? leftBubbleStyle : rightBubbleStyle)
    })));
  }), isTyping && React.createElement("div", {
    className: "chat-body__typing-indicator"
  }, typingUserAvatar !== undefined && React.createElement(Avatar, {
    source: typingUserAvatar
  }), React.createElement(TypingIndicator, null)), React.createElement("div", {
    ref: el
  }));
};

var defaultSendIcon = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALdSURBVFiFxZfNa1RXGMZ/7z3nznXuTALdiCkIlsYIIVHB7tyoBNy5KNo/oLiwCKLiJsQYxCRFdFEIGT+yCVZ3Im1XbmytWEtppUYiKDOGIAQRJcYkJpOZe+/bRTJjk5I6n8mzu4f3Oc+Pw/l4r6gq6ylnXdMBC9D/nL2RckSEUCL+FmG4s5nXawEg59J6QODHFeMLwE0HBjub+b2uAL1pfQK0/k/NIxVSoc+Nnibmag7Ql9YJhU9LqH0nwnAUcOn0Np7VDKA3rX8CX5ThUYQ7QKrlc346BGE1AA7Cz2V6BKUD5VY6w3h/mu6z42yqFED60rpf4XalEywpD9xCSXVt5V5ZABdGNLHg8xZwq4QoaFQhFeb4vqeV2Y8CqCq9Ge4L7K4RQEEzAtdCuNTdzJPVihZvwvL3QSlqUDjqwGhvhrv9Gb66+vC/q1xYgT0Cv9QBYkUaL1GGiLja1cJEEWAggzcNU8CGukMsKlDlfLiVM1J4Dfsy3AH2rREAAArf2sJHR3Iu/5mXL8kYKtyd9RnLVXdwBA4WAabfz+wam86WZhSYCbI8mjFVAcQcs6UIcP2dZ+aC6iYsV3Fj/rIAx/6YbJyX6JO1ChagMRb7bfPOxj0WIIh7X2t2vu7B1nGipHXvu8acTLX7D2GpI8qH0Zf1DPatnYpbO9yUT3b17FzeU1iAhSjcUetQR0ST1o661um+3N6wsuP6APDNg9mNWRs01irYMybrW/cH38jx79oSrz5WbyXpHNbSTt+qEiDhui/ijrmY2pEcKMdrcxoeqDTYFSdMWPdX13VOpNoSjyuZwy4EQVu5Jt/YyXjMHWoyiTM9reQqCS4ChKolPUCOiDZYO+IZ2zm4PVFtB/UBQEQCYNUr0DNmPmHtTeKcvNLS8KZWwUWApOtenAzDrn8PLm2qcd+6/YPt/lCtQ5dlqSpHR9+fmsuFJ1SiyBMzEjPeqYH22NN6Bi8DWE+t+9/xP1kh8hlyxqRXAAAAAElFTkSuQmCC';

var Input = function Input(_ref) {
  var user = _ref.user,
      onSend = _ref.onSend,
      onInputTextChanged = _ref.onInputTextChanged,
      inputToolbarStyle = _ref.inputToolbarStyle,
      inputStyle = _ref.inputStyle,
      sendIcon = _ref.sendIcon;

  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = useState(),
      message = _useState2[0],
      setMessage = _useState2[1];

  var el = useRef();
  useEffect(function () {
    onInputTextChanged && onInputTextChanged(value);
    setMessage({
      text: value,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      user: user
    });
  }, [value, onInputTextChanged]);

  var send = function send() {
    if (message && onSend) {
      onSend(message);
    }

    setValue('');
    el.current.focus();
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (e.key === 'Enter') {
      send();
    }
  };

  return React.createElement("div", {
    className: "chat-input",
    style: inputToolbarStyle
  }, React.createElement("input", {
    type: "text",
    placeholder: "Type a message...",
    value: value,
    onChange: function onChange(e) {
      return setValue(e.target.value);
    },
    onKeyDown: handleKeyDown,
    ref: el,
    style: inputStyle
  }), value.length > 0 && React.createElement("img", {
    src: sendIcon ? sendIcon : defaultSendIcon,
    alt: "send",
    onClick: send
  }));
};

var defaultChatIcon = 'data:image/png;base64, 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';

var Widget = function Widget(_ref) {
  var onClick = _ref.onClick,
      icon = _ref.icon,
      style = _ref.style;
  return React.createElement("img", {
    src: icon ? icon : defaultChatIcon,
    alt: "chat",
    className: "chat-widget",
    onClick: onClick,
    style: style
  });
};

var Chat = function Chat(_ref) {
  var title = _ref.title,
      minimized = _ref.minimized,
      messages = _ref.messages,
      user = _ref.user,
      onSend = _ref.onSend,
      isTyping = _ref.isTyping,
      onInputTextChanged = _ref.onInputTextChanged,
      headerAvatar = _ref.headerAvatar,
      headerStyle = _ref.headerStyle,
      titleColor = _ref.titleColor,
      minimizeIcon = _ref.minimizeIcon,
      leftBubbleStyle = _ref.leftBubbleStyle,
      rightBubbleStyle = _ref.rightBubbleStyle,
      backgroundColor = _ref.backgroundColor,
      timestampStyle = _ref.timestampStyle,
      inputToolbarStyle = _ref.inputToolbarStyle,
      inputStyle = _ref.inputStyle,
      sendIcon = _ref.sendIcon,
      chatIcon = _ref.chatIcon,
      containerStyle = _ref.containerStyle,
      widgetStyle = _ref.widgetStyle;

  var _useState = useState(minimized),
      isMinimized = _useState[0],
      setIsMinimized = _useState[1];

  return React.createElement(React.Fragment, null, isMinimized ? React.createElement(Widget, {
    onClick: function onClick() {
      return setIsMinimized(false);
    },
    icon: chatIcon,
    style: widgetStyle
  }) : React.createElement("div", {
    className: "chat-container",
    style: containerStyle
  }, React.createElement(Header, {
    title: title,
    minimize: function minimize() {
      return setIsMinimized(true);
    },
    headerAvatar: headerAvatar,
    headerStyle: headerStyle,
    titleColor: titleColor,
    minimizeIcon: minimizeIcon
  }), React.createElement(Body, {
    user: user,
    messages: messages,
    isTyping: isTyping,
    leftBubbleStyle: leftBubbleStyle,
    rightBubbleStyle: rightBubbleStyle,
    backgroundColor: backgroundColor,
    timestampStyle: timestampStyle
  }), React.createElement(Input, {
    user: user,
    onSend: onSend,
    onInputTextChanged: onInputTextChanged,
    inputToolbarStyle: inputToolbarStyle,
    inputStyle: inputStyle,
    sendIcon: sendIcon
  })));
};

export default Chat;
//# sourceMappingURL=react-simple-chat.esm.js.map
