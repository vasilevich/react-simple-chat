import React from 'react';
export interface User {
    id: number | string;
    name?: string;
    avatar?: string;
}
export interface Message {
    id?: number | string;
    text: string;
    createdAt?: string;
    user: User;
}
interface Props {
    title?: string;
    minimized?: boolean;
    messages: Message[];
    user: User;
    onSend?: (message: Message) => void;
    isTyping?: boolean;
    onInputTextChanged?: (value: string) => void;
    headerAvatar?: string;
    headerStyle?: object;
    titleColor?: string;
    minimizeIcon?: string;
    leftBubbleStyle?: object;
    rightBubbleStyle?: object;
    backgroundColor?: string;
    timestampStyle?: object;
    inputToolbarStyle?: object;
    inputStyle?: object;
    sendIcon?: string;
    chatIcon?: string;
    containerStyle?: object;
    widgetStyle?: object;
}
declare const Chat: React.FC<Props>;
export default Chat;
