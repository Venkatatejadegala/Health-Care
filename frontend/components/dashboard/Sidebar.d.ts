import React from 'react';
interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}
declare const Sidebar: React.FC<SidebarProps>;
export default Sidebar;
