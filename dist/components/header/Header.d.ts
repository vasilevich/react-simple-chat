import React from 'react';
interface Props {
    title?: string;
    minimize: () => void;
    headerAvatar?: string;
    headerStyle?: object;
    titleColor?: string;
    minimizeIcon?: string;
}
declare const Header: React.FC<Props>;
export default Header;
