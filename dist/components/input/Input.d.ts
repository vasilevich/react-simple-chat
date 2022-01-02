import React from 'react';
import { Message, User } from '../chat/Chat';
interface Props {
    onSend?: (message: Message) => void;
    user: User;
    onInputTextChanged?: (value: string) => void;
    inputToolbarStyle?: object;
    inputStyle?: object;
    sendIcon?: string;
}
declare const Input: React.FC<Props>;
export default Input;
