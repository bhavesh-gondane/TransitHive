import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PendingVendors from './PendingVendors';
import ActiveVendors from './ActiveVendors';
import SuspendedVendors from './SuspendedVendors';
import RejectedVendors from './RejectedVendors';

const VendorTabs = () => {
  return (
    <div className="p-4">
      <h2>Vendors Management</h2>
      <Tabs defaultActiveKey="pending" className="mb-3">
        <Tab eventKey="pending" title="Pending Requests">
          <PendingVendors />
        </Tab>
        <Tab eventKey="active" title="Active Vendors">
          <ActiveVendors />
        </Tab>
        <Tab eventKey="suspended" title="Suspended Vendors">
          <SuspendedVendors />
        </Tab>
        <Tab eventKey="Rejected" title="Rejected Vendors">
          <RejectedVendors />
        </Tab>
      </Tabs>
    </div>
  );
};

export default VendorTabs;