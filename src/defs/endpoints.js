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
  config: {
    path: '/config',
    name: 'config',
    singularDisplayName: 'config',
    fields: {
      cfg_key: {},
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
      nickname: {
        name: 'Nickname',
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
      permissions: {
        type: 'CUSTOM',
        name: 'Permissions:',
        custom: true,
        displayOrder: 4,
      },
      groups: {
        type: 'CUSTOM',
        name: 'Groups:',
        custom: true,
        displayOrder: 5,
      }
    },
  },
  userPermissions: {
    path: '/userPermissions',
    name: 'user permissions',
    singularDisplayName: 'user permission',
    fields: {
      permission_id: {},
      user_id: {
        filter: true,
      },
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
  groupPermissions: {
    path: '/groupPermissions',
    name: 'group permissions',
    singularDisplayName: 'group permission',
    fields: [
      {
        name: 'permission_id',
      },
      {
        name: 'group_id',
      },
    ],
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
        type: 'NO_DISPLAY',
        name: 'Aggregate Group',
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