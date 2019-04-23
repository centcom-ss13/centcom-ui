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
}