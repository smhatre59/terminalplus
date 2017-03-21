import React, { Component } from 'react';
import Dashboard from '../components/Dashboard';
import DockerVNC from '../components/DockerVNC';
import TerminalAccess from '../components/TerminalAccess';
import MysqlMonitoring from '../components/MysqlMonitoring';
module.exports = [
  { path: '/',
    exact: true,
    sidebar:Dashboard,
    main:Dashboard
  },
  { path: '/terminalaccess',
    sidebar: () => <div>Terminal access</div>,
    main:TerminalAccess
  },
  { path: '/vncaccess',
    sidebar: () => <div>VNC access</div>,
    main:DockerVNC
  },
  {
    path: '/mysqlmonitoring',
    sidebar: () => <div>VNC access</div>,
    main:MysqlMonitoring
  }
]