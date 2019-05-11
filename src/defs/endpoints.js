require('@babel/polyfill');

import DB from '../brokers/serverBroker';

export default {
  books: {
    path: '/books',
    name: 'books',
    singularDisplayName: 'book',
    fields: {
      title: {
        type: 'STRING',
        name: 'Title',
        menuKey: true, //must be the only field with menuKey
        displayOrder: 1,
      },
      category_id: {
        type: 'CUSTOM',
        name: 'Category',
        custom: true,
        displayOrder: 2,
      },
      content: {
        type: 'LONG_STRING',
        name: 'Content',
        custom: true,
        displayOrder: 3,
      },
      category_name: {
        type: 'NO_DISPLAY',
        name: 'Category Name',
      }
    },
  },
  bookCategories: {
    path: '/bookCategories',
    name: 'book categories',
    singularDisplayName: 'book category',
    fields: {
      name: {},
      color: {},
    },
  },
  servers: {
    path: '/servers',
    name: 'servers',
    singularDisplayName: 'server',
    fields: {
      name: {},
      url: {},
      port: {},
      access_level: {},
    },
  },
  communityConfig: {
    path: '/communityConfig',
    name: 'community config',
    singularDisplayName: 'community config',
    fields: {
      cfg_key: {
        type: 'STRING',
        readOnly: true,
        menuKey: true,
        displayOrder: 1,
      },
      cfg_value: {},
    },
  },
  permissions: {
    path: '/permissions',
    name: 'permissions',
    singularDisplayName: 'permission',
    fields: {
      name: {
        type: 'STRING',
        name: 'Name',
        menuKey: true, //must be the only field with menuKey
        displayOrder: 1,
      },
      description: {
        type: 'STRING',
        name: 'Description',
        displayOrder: 2,
      },
    },
  },
  users: {
    path: '/users',
    name: 'users',
    singularDisplayName: 'user',
    fields: {
      username: {
        name: 'Username',
        type: 'STRING',
        menuKey: true, //must be the only field with menuKey
        displayOrder: 1,
      },
      email: {
        name: 'Email',
        type: 'STRING',
        displayOrder: 2,
      },
      byond_key: {
        name: 'Byond Key',
        type: 'STRING',
        displayOrder: 3,
      },
      combinedPermissions: {
        type: 'CUSTOM',
        custom: true,
        name: 'Combined Permissions',
        displayOrder: 7,
      },
      permissions: {
        type: 'CUSTOM',
        name: 'Permissions:',
        custom: true,
        displayOrder: 5,
      },
      groups: {
        type: 'CUSTOM',
        name: 'Groups:',
        custom: true,
        displayOrder: 6,
      },
      password: {
        type: 'STRING',
        name: 'Password (enter new value to reset)',
        hideDisplay: true,
        postTransform: async (value) => {
          if(!value) {
            return null;
          }
          const db = new DB();

          return await db.encrypt(value);
        },
        displayOrder: 4,
      },
    },
  },
  currentUser: {
    path: '/currentUser',
    name: 'current user',
    singularDisplayName: 'current user',
    fields: {
    },
  },
  groups: {
    path: '/groups',
    name: 'groups',
    singularDisplayName: 'group',
    fields: {
      name: {
        type: 'STRING',
        name: 'Name',
        menuKey: true, //must be the only field with menuKey
        displayOrder: 1,
      },
      description: {
        type: 'STRING',
        name: 'Description',
        displayOrder: 2,
      },
      permissions: {
        type: 'CUSTOM',
        name: 'Group Permissions:',
        custom: true,
        displayOrder: 3,
      },
    },
  },
  userGroups: {
    path: '/userGroups',
    name: 'group members',
    singularDisplayName: 'group member',
    fields: {
      group_id: {},
      user_id: {
        filter: true,
      },
    },
  },
  jobs: {
    path: '/jobs',
    name: 'jobs',
    singularDisplayName: 'job',
    fields: {
      title: {
        type: 'STRING',
        name: 'Job Title',
        menuKey: true, //must be the only field with menuKey
        displayOrder: 1,
      },
      aggregate: {
        type: 'TOGGLE',
        name: 'Aggregate Job',
        displayOrder: 2,
      },
      antag: {
        type: 'TOGGLE',
        name: 'Antag Role',
        displayOrder: 3,
      },
      childJobIds: {
        type: 'CUSTOM',
        name: 'Child Jobs',
        custom: true,
        displayOrder: 4,
      }
    }
  },
  donationLevels: {
    path: '/donationLevels',
    name: 'donation levels',
    singularDisplayName: 'donation level',
    fields: {
      name: {
        type: 'STRING',
        name: 'Donation Level Name',
        menuKey: true, //must be the only field with menuKey
        displayOrder: 1,
      },
      cost: {
        type: 'STRING',
        name: 'Cost',
        prefix: '$',
        displayOrder: 2,
      },
      hide_cost: {
        type: 'TOGGLE',
        name: 'Hide Cost (for using cost to place a value on the slider without an associated dollar amount)',
        displayOrder: 3,
      },
      slider_name: {
        type: 'STRING',
        name: 'Display name on slider (optional)',
        displayOrder: 4,
      },
      description_name: {
        type: 'STRING',
        name: 'Display name on description title (optional)',
        displayOrder: 5,
      },
      style: {
        type: 'LONG_STRING',
        name: '(Advanced use only) JSON JSX style object applied to the slider label (optional)',
        displayOrder: 6,
      },
    }
  },
  auditLogs: {
    path: '/auditLogs',
    name: 'auditLogs',
    singularDisplayName: 'audit log',
    fields: {
      user_id: {
        type: 'NO_DISPLAY',
        name: 'User ID'
      },
      user_name: {
        type: 'STRING',
        name: 'Username',
        displayOrder: 1,
      },
      timestamp: {
        type: 'STRING',
        name: 'Timestamp',
        displayOrder: 2,
      },
      action: {
        type: 'STRING',
        name: 'Action',
        displayOrder: 3,
      },
      endpoint: {
        type: 'STRING',
        name: 'Endpoint',
        displayOrder: 4,
      },
      failed: {
        type: 'TOGGLE',
        name: 'Action Failed',
        displayOrder: 5,
      },
      value: {
        type: 'LONG_STRING',
        name: 'Data',
        displayOrder: 6,
      },
    }
  },
  bans: {
    path: '/bans',
    name: 'bans',
    singularDisplayName: 'ban',
    fields: {
      byond_key: {
        type: 'STRING',
        name: 'BYOND CKey',
        menuKey: true,
        displayOrder: 1,
      },
      reason: {
        type: 'LONG_STRING',
        name: 'Ban Reason',
        displayOrder: 2,
      },
      expiration_date: {
        type: 'STRING',
        name: 'Ban Expiration Date',
        displayOrder: 3,
      },
      ip: {
        type: 'STRING',
        name: 'IP',
        displayOrder: 4,
      },
      computer_id: {
        type: 'STRING',
        name: 'Computer ID',
        displayOrder: 5,
      },
      issuer_id: {
        type: 'NO_DISPLAY',
        name: 'Ban Issuer User ID'
      },
      jobs: {
        type: 'NO_DISPLAY', //TODO: Display this with a custom tag thing
        name: 'Job Bans',
      }
    }
  },
  userThemes: {
    path: '/users/:userId/theme',
    name: 'User Theme',
    singularDisplayName: 'Preference',
    params: {
      userId: {
        matchIndex: 1,
      }
    },
    fields: {
      theme_name: {
        type: 'STRING_READONLY', //TODO: Add this type
        name: 'Preference',
        menuKey: true,
        displayOrder: 1,
      },
      description: {
        type: 'STRING',
        name: 'Description',
        displayOrder: 2,
      },
      theme_value: {
        type: 'LONG_STRING',
        name: 'Value',
        editHelpText: '(leave blank for default)',
        displayOrder: 3,
      }
    }
  },
  themes: {
    path: '/themes',
    name: 'User Preferences',
    singularDisplayName: 'Preference',
    fields: {
      theme_name: {
        type: 'STRING',
        name: 'Theme Name',
        menuKey: true,
        displayOrder: 1,
      },
      description: {
        type: 'STRING',
        name: 'Description',
        displayOrder: 2,
      },
      default_value: {
        type: 'LONG_STRING',
        name: 'Default Value',
        displayOrder: 3,
      }
    }
  }

}