import React from 'react';
import { Message } from '../chat/Chat';
export declare type Position = 'left' | 'right';
interface Props {
    message: Message;
    position: Position;
    style?: object;
}
declare const Bubble: React.FC<Props>;
export default Bubble;
