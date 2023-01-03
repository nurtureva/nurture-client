import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Select, Space } from 'antd';
import { useState } from 'react';
import './FilterDropdown.css';
export default function DropdownWrapper({ menu, body, active }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleVisibleChange = (flag) => {
    setMenuVisible(flag);
  };

  const className = 'filters-dropdown' + (active ? ' active' : '');
  return (
    <Dropdown
      overlay={menu}
      visible={menuVisible}
      onVisibleChange={handleVisibleChange}
      className={className}
      placement="bottomRight">
      {body}
    </Dropdown>
  );
}
