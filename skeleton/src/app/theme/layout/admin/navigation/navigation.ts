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
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'ListUser',
        title: 'Technician account', 
        type: 'item',
        url: '/test/listTechnician',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'listContrct',
        title: 'Client Folders',
        type: 'item',
        url: '/test/listContract',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'listTypeSupport',
        title: 'Type Support',
        type: 'item',
        url: '/test/typesupports',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'CalnderAdmin',
        title: 'Calendar',
        type: 'item',
        url: '/test/clanderVisitepreventive',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
        },
        {
          id: 'clientListContract',
          title: 'List of customer contracts',
          type: 'item',
          url: '/clientMang/contract-List-Cli',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
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
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      
        {
          id: 'clientListContract',
          title: 'List of customer contracts',
          type: 'item',
          url: '/clientMang/contract-List-Cli',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
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
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'ListUser',
        title: 'Technician account', 
        type: 'item',
        url: '/test/listTechnician',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },  {
        id: 'listTypeSupport',
        title: 'Type Support',
        type: 'item',
        url: '/test/typesupports',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      
    ]
  }
]

@Injectable()
export class NavigationItem {
  get userRole() {
    return sessionStorage.getItem("authority")
  }

  get() {
    if (this.userRole === 'admin') return adminNavigation
    if (this.userRole === 'clientManger') return clientNavigation
    return technicianNavigation;
  }
}
