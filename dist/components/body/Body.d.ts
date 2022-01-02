import React from 'react';
import { Message, User } from '../chat/Chat';
interface Props {
    messages: Message[];
    user: User;
    isTyping?: boolean;
    leftBubbleStyle?: object;
    rightBubbleStyle?: object;
    backgroundColor?: string;
    timestampStyle?: object;
}
declare const Body: React.FC<Props>;
export default Body;
