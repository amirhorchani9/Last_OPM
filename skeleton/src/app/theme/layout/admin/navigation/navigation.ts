import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const adminNavigation = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'sample-page',
        title: 'Dashboard',
        type: 'item',
        url: '/main/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-grid'
      },
      {
        id: 'ListUser',
        title: 'Technician account', 
        type: 'item',
        url: '/main/test/listTechnician',
        classes: 'nav-item',
        icon: 'feather icon-users'
      },
      {
        id: 'listContrct',
        title: 'Client Folders',
        type: 'item',
        url: '/main/test/listContract',
        classes: 'nav-item',
        icon: 'feather icon-folder'
      },
      {
        id: 'listTypeSupport',
        title: 'Type Support',
        type: 'item',
        url: '/main/test/typesupports',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      { 
        id: 'CalnderAdmin',
        title: 'Calendar',
        type: 'item',
        url: '/main/test/clanderVisitepreventive',
        classes: 'nav-item',
        icon: 'feather icon-calendar'
        }, 
    ]
  },
]

const clientNavigation = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'sample-page',
        title: 'Dashboard',
        type: 'item',
        url: '/main/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-grid'
      },
      
      {
          id: 'clientListContract',
          title: 'List of customer contracts',
          type: 'item',
          url: '/main/clientMang/contract-List-Cli',
          classes: 'nav-item',
          icon: 'feather icon-file-text'
      },
   
    ]
  }
]

const technicianNavigation = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'sample-page',
        title: 'Dashboard',
        type: 'item',
        url: '/main/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-grid'
      },
      {
        id: 'listTypeSupport',
        title: 'Type Support',
        type: 'item',
        url: '/main/test/typesupports',
        classes: 'nav-item',
        icon: 'feather icon-users'
      },
      {
        id: 'ListUser',
        title: 'Technician account', 
        type: 'item',
        url: '/main/test/listTechnician',
        classes: 'nav-item',
        icon: 'feather icon-users'
      }, 
     
      
    ]
  }
]

@Injectable()
export class NavigationItem {
  get userRole() {
    return localStorage.getItem("AUTHORITY");
  }

  get() {
    if (this.userRole === 'admin') {
      return adminNavigation;
    }
    if (this.userRole === 'clientManger' || this.userRole === 'clientUser') {
      return clientNavigation;
    }
    if (this.userRole === 'technician') {
      return technicianNavigation;
    }
  }
}