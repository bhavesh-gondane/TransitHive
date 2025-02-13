import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaCalendarCheck, 
  FaChartLine
} from 'react-icons/fa';
import axios from 'axios';

const MetricCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className={`metric-card ${color}`}>
      <div className="metric-icon">
        <Icon size={24} />
      </div>
      <div className="metric-content">
        <h3 className="metric-value">{value}</h3>
        <p className="metric-title">{title}</p>
      </div>
    </div>
  );
};

const DashboardStats = () => {
  const [metrics, setMetrics] = useState({
    users: { total: 0 },
    bookings: { total: 0 },
    vendors: { total: 0 },
    revenue: { total: 0 },
    actualRevenue: { total: 0 }
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/dashboard/info`);
        console.log('Metrics:', response.data);
        const data = response.data;
        setMetrics({
          users: { total: data.users },
          bookings: { total: data.bookings },
          vendors: { total: data.vendors },
          revenue: { total: data.revenue },
          actualRevenue: { total: data.actualRevenue }
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };
  
    fetchMetrics();
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="dashboard-stats">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      
      <div className="metrics-grid">
        <MetricCard
          title="Total Users"
          value={formatNumber(metrics.users.total)}
          icon={FaUsers}
          color="blue"
        />
        
        <MetricCard
          title="Total Bookings"
          value={formatNumber(metrics.bookings.total)}
          icon={FaCalendarCheck}
          color="green"
        />
        
        <MetricCard
          title="Total Vendors"
          value={formatNumber(metrics.vendors.total)}
          icon={FaUsers}
          color="purple"
        />
        
        <MetricCard
          title="Total Amount of Booking"
          value={formatCurrency(metrics.revenue.total)}
          icon={FaChartLine}
          color="orange"
        />
        <MetricCard
          title="Actual Total Revenue"
          value={formatCurrency(metrics.actualRevenue.total)}
          icon={FaChartLine}
          color="orange"
        />
      </div>
    </div>
  );
};

export default DashboardStats;