import getUserPermissions from '../sql/get/userPermissions.sql';
import getUserGroups from '../sql/get/userGroups.sql';
import editUserPermissions from '../sql/update/userPermissions.sql';

export default {
  books: {
    path: '/books',
    name: 'books',
    singularDisplayName: 'book',
    table: 'books',
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
        omit: true,
      }
    },
    overrideGetSql: 'SELECT books.id, books.title, books.content, books.category_id, book_categories.name AS category_name FROM books LEFT JOIN book_categories ON books.category_id = book_categories.id;',
  },
  bookCategories: {
    path: '/bookCategories',
    name: 'book categories',
    singularDisplayName: 'book category',
    table: 'book_categories',
    fields: {
      name: {},
      color: {},
    },
  },
  servers: {
    path: '/servers',
    name: 'servers',
    singularDisplayName: 'server',
    table: 'servers',
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
    table: 'config',
    fields: {
      cfg_key: {},
      cfg_value: {},
    },
    postFetch: (data) => {
      return data.reduce((output, { cfg_key, cfg_value }) => ({
        ...output,
        [cfg_key]: cfg_value
      }), {});
    },
  },
  permissions: {
    path: '/permissions',
    name: 'permissions',
    singularDisplayName: 'permission',
    table: 'permissions',
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
    table: 'users',
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
        omit: true,
        displayOrder: 4,
        saveHandler: (db, values, params = []) => {
          db.upsert('userPermissions', values, params);
        },
      },
      groups: {
        type: 'CUSTOM',
        name: 'Groups:',
        custom: true,
        omit: true,
        displayOrder: 5,
        saveHandler: (db, values, params = []) => {
          console.log('saving', values);
          db.upsert('userGroups', values, params);
        },
      }
    },
  },
  userPermissions: {
    path: '/userPermissions',
    postPath: '/users/([0-9]+)/permissions',
    uiPath: '/userPermissions',
    uiPostPath: '/users/:userId/permissions',
    name: 'user permissions',
    singularDisplayName: 'user permission',
    table: 'user_permissions',
    fields: {
      permission_id: {},
      user_id: {
        filter: true,
      },
    },
    params: {
      userId: {
        type: 'numeric',
        // tableRef: 'user_permissions',
        keyRef: 'user_id',
        // foreignTable: 'users',
        // foreignKey: 'id',
        matchIndex: 1,
      }
    },
    overrideGetSql: getUserPermissions,
    postTransform: (objects) => objects.map(permission_id => ({ permission_id })),
    bulkUpdate: true, //must have a SINGLE filter field to work (and a SINGLE matcher in the path)
  },
  groups: {
    path: '/groups',
    name: 'groups',
    singularDisplayName: 'group',
    table: 'user_groups',
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
  userGroups: {
    path: '/userGroups',
    postPath: '/users/([0-9]+)/groups',
    uiPath: '/userGroups',
    uiPostPath: '/users/:userId/groups',
    name: 'group members',
    singularDisplayName: 'group member',
    table: 'user_group_members',
    fields: {
      group_id: {},
      user_id: {
        filter: true,
      },
    },
    params: {
      userId: {
        type: 'numeric',
        // tableRef: 'user_permissions',
        keyRef: 'user_id',
        // foreignTable: 'users',
        // foreignKey: 'id',
        matchIndex: 1,
      }
    },
    overrideGetSql: getUserGroups,
    postTransform: (objects) => objects.map(group_id => ({ group_id })),
    bulkUpdate: true, //must have a SINGLE filter field to work (and a SINGLE matcher in the path)
  },
  groupPermissions: {
    path: '/groupPermissions',
    name: 'group permissions',
    singularDisplayName: 'group permission',
    table: 'user_group_permissions',
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