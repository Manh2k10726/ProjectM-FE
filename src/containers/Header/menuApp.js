export const adminMenu = [
  {
    //Quản lý người dùng
    name: "menu.system.admin.manage-user",
    menus: [
      // {
      //     name: 'menu.system.admin.crud',link : '/system/user-manage'
      // },
      {
        name: "menu.system.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.system.admin.manage-doctor",
        link: "/system/manage-doctor",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

        // ]
      },
      {
        name: "menu.system.admin.manage-admin",
        link: "/system/user-admin",
      },
      {
        //Quản lý ke hoach kham benh

        name: "menu.system.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        //Quản lý benh nhan

        name: "menu.system.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },

      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },
  {
    //Quản lý phòng khám
    name: "menu.system.admin.clinic",
    menus: [
      {
        name: "menu.system.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //Quản lý chuyên khoa
    name: "menu.system.admin.specialty",
    menus: [
      {
        name: "menu.system.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //Quản lý cẩm nang
    name: "menu.system.admin.handbook",
    menus: [
      {
        name: "menu.system.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];
export const doctorMenu = [
  {
    name: "menu.system.admin.manage-user",
    menus: [
      {
        //Quản lý ke hoach kham benh

        name: "menu.system.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        //Quản lý benh nhan

        name: "menu.system.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
