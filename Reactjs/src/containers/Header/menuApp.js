
//su dung menu de loc cho tung nguoi dung duoc phan quyen
export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user', menus: [
            // {
            //     name: 'menu.admin.crud', link: '/system/user-manage'
            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            
        ]
    },
    { //quản lý phòng khám
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
            
        ]
    },
    { //quản lý chuyên khoa
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
            
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    }
]