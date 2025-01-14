'use client'

import Tab from '../Tab'
import SalesManager from '../shop/SalesManager';
// import InventoryManager from '../InventoryManager';
import ReturnsManager from '../ReturnsManager';
import EmployeeManager from '../EmployeeManager';

export default function Home() {
  return (
    <Tab>
      {(activeTab: any) => {
        switch (activeTab) {
          case 'sales':
            return <SalesManager />;
          // case 'inventory':
          //   return <InventoryManager />;
          case 'returns':
            return <ReturnsManager />;
          case 'employees':
            return <EmployeeManager />;
          default:
            return <div>Tab không tồn tại</div>;
        }
      }}
    </Tab>
  );
}
