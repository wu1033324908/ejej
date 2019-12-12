/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 14:46:41
 * @LastEditTime: 2019-12-12 16:38:53
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    perms: ['GET /aaa','POST /bbb']     will control the page perms (you can set multiple perms)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '工作台', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   path: '/product',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'productManage',
  //   meta: {
  //     title: '系统管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'excavator',
  //       component: () => import('@/views/product/excavator'),
  //       name: 'excavator',
  //       meta: {
  //         perms: ['POST /admin/good/getGoodList'],
  //         title: '角色管理',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'user',
  //       component: () => import('@/views/user/user'),
  //       name: 'user',
  //       meta: {
  //         perms: ['POST /admin/category/list'],
  //         title: '系统用户管理',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/product',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'productManage',
  //   meta: {
  //     title: '产品库',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'excavator',
  //       component: () => import('@/views/product/excavator'),
  //       name: 'excavator',
  //       meta: {
  //         perms: ['POST /admin/good/getGoodList'],
  //         title: '挖掘机产品库',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'excavatorCreate',
  //       component: () => import('@/views/product/excavatorCreate'),
  //       name: 'excavatorCreate',
  //       meta: {
  //         perms: ['POST /admin/good/create'],
  //         title: '挖掘机新增',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'excavatorEdit',
  //       component: () => import('@/views/product/excavatorEdit'),
  //       name: 'excavatorEdit',
  //       meta: {
  //         perms: ['POST /admin/good/update', 'POST /admin/good/getGoodDetails'],
  //         title: '挖掘机编辑',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'accessoriesList',
  //       component: () => import('@/views/product/accessories'),
  //       name: 'accessoriesList',
  //       meta: {
  //         perms: ['POST /admin/category/list'],
  //         title: '配件产品库',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'accessoriesCreate',
  //       component: () => import('@/views/product/accessoriesCreate'),
  //       name: 'accessoriesCreate',
  //       meta: {
  //         perms: ['POST /admin/category/create'],
  //         title: '配件新增',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'accessoriesEdit',
  //       component: () => import('@/views/product/accessoriesEdit'),
  //       name: 'accessoriesEdit',
  //       meta: {
  //         perms: ['POST /admin//category/update', '/POST /admin/category/read'],
  //         title: '配件编辑',
  //         noCache: true
  //       },
  //       hidden: true
  //     }
  //   ]
  // },
  // {
  //   path: '/informationPublish',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'InformationPublish',
  //   meta: {
  //     title: '信息发布管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '二手机列表',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'oldExcavatorCreate',
  //       component: () => import('@/views/informationPublish/oldExcavatorCreate'),
  //       name: 'oldExcavatorCreate',
  //       meta: {
  //         perms: ['POST /admin/oldGood/create'],
  //         title: '二手机新增',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'oldExcavatorEdit',
  //       component: () => import('@/views/informationPublish/oldExcavatorEdit'),
  //       name: 'oldExcavatorEdit',
  //       meta: {
  //         perms: ['POST /admin/oldGood/update', 'POST /admin/oldGood/getOldDetails'],
  //         title: '二手机编辑',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'jobWantedList',
  //       component: () => import('@/views/informationPublish/jobWantedList'),
  //       name: 'jobWantedList',
  //       meta: {
  //         perms: ['POST /admin/labourWork/findLabourWorkList'],
  //         title: '求职信息',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'jobWantedCreate',
  //       component: () => import('@/views/informationPublish/jobWantedCreate'),
  //       name: 'jobWantedCreate',
  //       meta: {
  //         perms: ['POST /admin/labourWork/saveLabourWork'],
  //         title: '求职新增',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'jobWantedEdit',
  //       component: () => import('@/views/informationPublish/jobWantedEdit'),
  //       name: 'jobWantedEdit',
  //       meta: {
  //         perms: ['POST /admin/labourWork/updateLabourWork', 'POST /admin/labourWork/findLabourWorkDetail'],
  //         title: '求职编辑',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'employmentList',
  //       component: () => import('@/views/informationPublish/employmentList'),
  //       name: 'employmentList',
  //       meta: {
  //         perms: ['POST /admin/labourRelease/findLabourReleaseList'],
  //         title: '招聘信息',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'employmentCreate',
  //       component: () => import('@/views/informationPublish/employmentCreate'),
  //       name: 'employmentCreate',
  //       meta: {
  //         perms: ['POST /admin/labourRelease/saveLabourRelease'],
  //         title: '招聘新增',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'employmentEdit',
  //       component: () => import('@/views/informationPublish/employmentEdit'),
  //       name: 'employmentEdit',
  //       meta: {
  //         perms: ['POST /admin/labourRelease/updateLabourRelease', 'POST /admin/labourRelease/findLabourReleaseDetail'],
  //         title: '招聘编辑',
  //         noCache: true
  //       },
  //       hidden: true
  //     }
  //   ]
  // },
  // gai
  {
    path: '/individualAccount',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'IndividualAccount',
    meta: {
      title: '个人账户',
      icon: 'chart'
    },
    children: [
      {
        path: 'information',
        component: () => import('@/views/individualAccount/information'),
        name: 'information',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '个人信息',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/designer',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'designer',
    meta: {
      title: '设计师管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/designer/list'),
        name: 'designerList',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '设计师列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/designer/create'),
        name: 'designerCreate',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '新增设计师',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'detail',
        component: () => import('@/views/designer/detail'),
        name: 'designerDetail',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '设计师详情',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'edit',
        component: () => import('@/views/designer/edit'),
        name: 'designerEdit',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '设计师编辑',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/worker',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'worker',
    meta: {
      title: '零工管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/worker/list'),
        name: 'workerList',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '零工列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/worker/create'),
        name: 'workerCreate',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '新增零工',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'edit',
        component: () => import('@/views/worker/edit'),
        name: 'workerEdit',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '编辑零工',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'detail',
        component: () => import('@/views/worker/detail'),
        name: 'workerDetail',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '零工详情',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/productManager',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'productManager',
    meta: {
      title: '项目经理管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/productManager/list'),
        name: 'productManagerList',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '项目经理列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/productManager/create'),
        name: 'productManagerCreate',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '新增项目经理',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'edit',
        component: () => import('@/views/productManager/edit'),
        name: 'productManagerEdit',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '编辑项目经理',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'detail',
        component: () => import('@/views/productManager/detail'),
        name: 'productManagerDetail',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '项目经理详情',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/decorationCompany',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'decorationCompany',
    meta: {
      title: '装修公司管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/decorationCompany/list'),
        name: 'decorationCompanyList',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '装修公司列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/decorationCompany/create'),
        name: 'decorationCompanyCreate',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '新增装修公司',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'edit',
        component: () => import('@/views/decorationCompany/edit'),
        name: 'decorationCompanyEdit',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '编辑公司列表',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'detail',
        component: () => import('@/views/decorationCompany/detail'),
        name: 'decorationCompanyDetail',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '装修公司详情',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/serviceOrder',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'serviceOrder',
    meta: {
      title: '服务订单管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/serviceOrder/list'),
        name: 'serviceOrderList',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '服务订单列表',
          noCache: true
        }
      }
    ]
  },

  {
    path: '/comment',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'comment',
    meta: {
      title: '评论管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/comment/list'),
        name: 'CommentList',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '评论列表',
          noCache: true
        }
      },
      {
        path: 'detail',
        component: () => import('@/views/comment/detail'),
        name: 'CommentDetail',
        meta: {
          perms: ['POST /admin/comment/look'],
          title: '评论详情',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/case',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'case',
    meta: {
      title: '案例管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/case/list'),
        name: 'caseList',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '案例列表',
          noCache: true
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/case/edit'),
        name: 'caseEdit',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '修改案例',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'create',
        component: () => import('@/views/case/create'),
        name: 'caseCreate',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '新增案例',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'details',
        component: () => import('@/views/case/details'),
        name: 'caseDetails',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '案例详情',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'goods',
    meta: {
      title: '商品管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/goods/list'),
        name: 'goodsList',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '商品列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/goods/create'),
        name: 'create',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '新增商品',
          noCache: true
        }
        // hidden:true
      },
      {
        path: 'edit',
        component: () => import('@/views/goods/edit'),
        name: 'edit',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '修改商品',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'detail',
        component: () => import('@/views/goods/detail'),
        name: 'detail',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '商品详情',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  // {
  //   path: '/SKU',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'SKU',
  //   meta: {
  //     title: 'SKU管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'SKUList',
  //       component: () => import('@/views/SKU/SKUList'),
  //       name: 'SKUList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: 'SKU列表',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/informationPublish',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'informationPublish',
  //   meta: {
  //     title: '商品订单管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '订单列表',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/informationPublish',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'informationPublish',
  //   meta: {
  //     title: '商品售后管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '售后列表',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '退款列表',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/informationPublish',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'informationPublish',
  //   meta: {
  //     title: '资金流水',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '流水列表',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/category',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'category',
    meta: {
      title: '分类管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'firstClassClassificationList',
        component: () => import('@/views/category/firstClassClassification/list'),
        name: 'firstClassClassificationList',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '一级分类',
          noCache: true
        }
      },
      {
        path: 'secondClassClassificationList',
        component: () => import('@/views/category/secondClassClassification/list'),
        name: 'secondClassClassificationList',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '二级分类',
          noCache: true
        }
      },
      {
        path: 'thirdClassClassificationList',
        component: () => import('@/views/category/thirdClassClassification/list'),
        name: 'thirdClassClassificationList',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '三级分类',
          noCache: true
        }
      }
    ]
  },
  // {
  //   path: '/informationPublish',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'informationPublish',
  //   meta: {
  //     title: '推荐管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '首页广告位推荐管理',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '服务商推荐模块管理',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '搜索推荐模块管理',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/informationPublish',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'informationPublish',
  //   meta: {
  //     title: '卡劵管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '卡劵管理',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '卡劵发放',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '卡劵发放历史',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'oldExcavatorList',
  //       component: () => import('@/views/informationPublish/oldExcavatorList'),
  //       name: 'oldExcavatorList',
  //       meta: {
  //         perms: ['POST /admin/oldGood/getOldPageList'],
  //         title: '卡劵使用历史',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  {
    path: '/label',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'label',
    meta: {
      title: '标签管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'goodsLabel',
        component: () => import('@/views/label/goodsLabel'),
        name: 'goodsLabel',
        meta: {
          perms: ['POST /admin/goodsLabel/list'],
          title: '商品标签管理',
          noCache: true
        }
      },
      {
        path: 'createGoodsLabel',
        component: () => import('@/views/label/createGoodsLabel'),
        name: 'createGoodsLabel',
        meta: {
          perms: ['POST /admin/goodsLabel/add'],
          title: '新增商品标签',
          noCache: true
        },
        hidden: true

      },
      {
        path: 'goodsLabelEdit',
        component: () => import('@/views/label/goodsLabelEdit'),
        name: 'goodsLabelEdit',
        meta: {
          perms: ['POST /admin/goodsLabel/update'],
          title: '编辑商品标签',
          noCache: true
        },
        hidden: true

      },
      {
        path: 'serviceLabel',
        component: () => import('@/views/label/serviceLabel'),
        name: 'serviceLabel',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '服务商标签管理',
          noCache: true
        }
      },
      {
        path: 'serviceLabelEdit',
        component: () => import('@/views/label/serviceLabelEdit'),
        name: 'serviceLabelEdit',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '编辑服务商标签',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'createServiceLabel',
        component: () => import('@/views/label/createServiceLabel'),
        name: 'createServiceLabel',
        meta: {
          perms: ['POST /admin/oldGood/getOldPageList'],
          title: '新增服务商标签',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'message',
    meta: {
      title: '消息管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/message/list'),
        name: 'list',
        meta: {
          perms: ['POST /admin/msg/list'],
          title: '消息列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/message/create'),
        name: 'MessagesCreate',
        meta: {
          perms: ['POST /admin/msg/save'],
          title: '消息设置',
          noCache: true
        },
        hidden: true
      }
      // {
      //   path: 'edit',
      //   component: () => import('@/views/message/edit'),
      //   name: 'edit',
      //   meta: {
      //     perms: ['POST /admin/push/update', 'POST /admin/push/read'],
      //     title: '消息编辑',
      //     noCache: true
      //   },
      //   hidden: true
      // }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'order',
    meta: {
      title: '订单管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/list'),
        name: 'orderList',
        meta: {
          perms: ['POST /admin/order/list'],
          title: '订单列表',
          noCache: true
        }
      }
    ]
  },
  // {
  //   path: '/appManage',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'appManage',
  //   meta: {
  //     title: 'APP管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'appIndexBanner',
  //       component: () => import('@/views/appManage/appIndexBanner'),
  //       name: 'AppIndexBanner',
  //       meta: {
  //         perms: ['POST /admin/advertisement/list'],
  //         title: '页面配置管理',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'appIndexBannerCreate',
  //       component: () => import('@/views/appManage/appIndexBannerCreate'),
  //       name: 'AppIndexBannerCreate',
  //       meta: {
  //         perms: ['POST /admin/advertisement/create'],
  //         title: '页面配置新增',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'appIndexBannerEdit',
  //       component: () => import('@/views/appManage/appIndexBannerEdit'),
  //       name: 'AppIndexBannerEdit',
  //       meta: {
  //         perms: ['POST /admin/advertisement/update'],
  //         title: '页面配置编辑',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'userFeedback',
  //       component: () => import('@/views/appManage/userFeedback'),
  //       name: 'userFeedback',
  //       meta: {
  //         perms: ['POST /admin/feedback/list'],
  //         title: '用户反馈',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'appVersion',
  //       component: () => import('@/views/appManage/appVersion'),
  //       name: 'appVersion',
  //       meta: {
  //         perms: ['POST /admin/update/getUpdateList'],
  //         title: 'APP管理',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'appVersionCreate',
  //       component: () => import('@/views/appManage/appVersionCreate'),
  //       name: 'appVersionCreate',
  //       meta: {
  //         perms: ['POST /admin/update/save'],
  //         title: '版本新增',
  //         noCache: true
  //       },
  //       hidden: true
  //     }
  //     // {
  //     //   path: 'appVersionEdit',
  //     //   component: () => import('@/views/appManage/appVersionEdit'),
  //     //   name: 'appVersionEdit',
  //     //   meta: {
  //     //     perms: ['POST /admin/feedback/list'],
  //     //     title: '版本编辑',
  //     //     noCache: true
  //     //   },
  //     //   hidden: true
  //     // }
  //   ]
  // },
  {
    path: '/userManage',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'userManage',
    meta: {
      title: '用户管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'preSalManageList',
        component: () => import('@/views/userManage/preSalManageList'),
        name: 'preSalManageList',
        meta: {
          perms: ['POST /admin/msg/findMsg'],
          title: '售前咨询',
          noCache: true
        }
      },
      {
        path: 'userList',
        component: () => import('@/views/userManage/userList'),
        name: 'userList',
        meta: {
          perms: ['POST /admin/user/list', 'POST /admin/user/blockUp', 'POST /admin/user/delete'],
          title: '用户账号',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/coupon',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'Coupon',
    meta: {
      title: '卡券管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'CouponList',
        component: () => import('@/views/coupon/list'),
        name: 'CouponList',
        meta: {
          perms: ['POST /admin/coupon/list'],
          title: '卡券列表',
          noCache: true
        }
      },
      {
        path: 'couponCreate',
        component: () => import('@/views/coupon/create'),
        name: 'CouponCreate',
        meta: {
          perms: ['POST /admin/coupon/create'],
          title: '卡券设置',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'couponRuleList',
        component: () => import('@/views/coupon/couponRuleList'),
        name: 'CouponRuleList',
        meta: {
          perms: ['POST /admin/couponRule/list'],
          title: '卡券规则列表',
          noCache: true
        }
      },
      {
        path: 'couponRuleCreate',
        component: () => import('@/views/coupon/couponRuleCreate'),
        name: 'CouponRuleCreate',
        meta: {
          perms: ['POST /admin/couponRule/create'],
          title: '卡券规则设置',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/productOrder',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'ProductOrder',
    meta: {
      title: '商品订单管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'ProductOrderList',
        component: () => import('@/views/productOrder/list'),
        name: 'ProductOrderList',
        meta: {
          perms: ['POST /admin/order/list'],
          title: '商品订单列表',
          noCache: true
        }
      },
      {
        path: 'ProductOrderDetail',
        component: () => import('@/views/productOrder/detail'),
        name: 'ProductOrderDetail',
        meta: {
          perms: ['POST /admin/order/detail'],
          title: '商品订单详情',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/memberUser',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'MemberUser',
    meta: {
      title: '会员管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'MemberUserList',
        component: () => import('@/views/MemberUser/list'),
        name: 'memberUserList',
        meta: {
          perms: ['POST /admin/AppUser/list'],
          title: '会员管理列表',
          noCache: true
        }
      },
      {
        path: 'memberUserDetail',
        component: () => import('@/views/MemberUser/detail'),
        name: 'MemberUserDetail',
        meta: {
          perms: ['POST /admin/AppUser/detail'],
          title: '会员管理详情',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/afterSaleManagement',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'AfterSaleManagement',
    meta: {
      title: '商品售后管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/afterSaleManagement/list'),
        name: 'AfterSaleManagementList',
        meta: {
          perms: ['POST /admin/orderWater/list'],
          title: '商品售后列表',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/afterSalesServiceOrder',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'AfterSalesServiceOrder',
    meta: {
      title: '服务售后管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/afterSalesServiceOrder/list'),
        name: 'AfterSalesServiceOrderList',
        meta: {
          perms: ['POST /admin/serviceOrder/list'],
          title: '订单列表',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/dayToDayAccount',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'DayToDayAccount',
    meta: {
      title: '资金流水管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'dayToDayAccountList',
        component: () => import('@/views/dayToDayAccount/list'),
        name: 'DayToDayAccountList',
        meta: {
          perms: ['POST /admin/orderWater/list'],
          title: '资金流水列表',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/recommend',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'Recommend',
    meta: {
      title: '推荐管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'indexRecommendList',
        component: () => import('@/views/recommend/list'),
        name: 'IndexRecommendList',
        meta: {
          perms: ['POST /admin/homeAd/list'],
          title: '首页广告位推荐管理',
          noCache: true
        }
      },
      {
        path: 'indexRecommendCreate',
        component: () => import('@/views/recommend/create'),
        name: 'IndexRecommendCreate',
        meta: {
          perms: ['POST /admin/AppUser/detail'],
          title: '首页推荐设置',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'serverRecommendList',
        component: () => import('@/views/recommend/serverList'),
        name: 'ServerRecommendList',
        meta: {
          perms: ['POST /admin/recommend/list'],
          title: '服务商推荐管理',
          noCache: true
        }
      },
      {
        path: 'serverRecommendCreate',
        component: () => import('@/views/recommend/serverCreate'),
        name: 'ServerRecommendCreate',
        meta: {
          perms: ['POST /admin/recommend/add'],
          title: '服务商推荐设置',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'serverRecommendDetail',
        component: () => import('@/views/recommend/serverDetail'),
        name: 'ServerRecommendDetail',
        meta: {
          perms: ['POST /admin/recommend/recommendList'],
          title: '推荐详情',
          noCache: true
        },
        hidden: true
      }
      // ,
      // {
      //   path: 'recommendSearch',
      //   component: () => import('@/views/recommend/recommendSearch'),
      //   name: 'RecommendSearch',
      //   meta: {
      //     perms: ['POST /admin/recommend/recommendList'],
      //     title: '搜索推荐模块位管理',
      //     noCache: true
      //   },
      //   hidden: true
      // }
    ]
  },
  // {
  //   path: '/orderDetail',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'OrderDetail',
  //   meta: {
  //     title: '订单详情管理',
  //     icon: 'chart'
  //   },
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'ProductorderDetailPage',
  //       component: () => import('@/views/orderDetail/list'),
  //       name: 'ProductorderDetailPage',
  //       meta: {
  //         perms: ['POST /admin/order/detail'],
  //         title: '订单详情',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/platformAccountManage',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'platformAccount',
  //   meta: {
  //     title: '平台管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'platformAccountList',
  //       component: () => import('@/views/platformAccountManage/platformAccountList'),
  //       name: 'platformAccountList',
  //       meta: {
  //         perms: ['POST /admin/msg/findMsg'],
  //         title: '平台账号',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/platformAccountManage/role'),
  //       name: 'role',
  //       meta: {
  //         perms: ['POST /admin/order/list'],
  //         title: '角色权限',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'userManage',
  //   meta: {
  //     title: '用户管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'user',
  //       component: () => import('@/views/user/user'),
  //       name: 'user',
  //       meta: {
  //         perms: ['GET /admin/user/list'],
  //         title: '会员管理',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'address',
  //       component: () => import('@/views/user/address'),
  //       name: 'address',
  //       meta: {
  //         perms: ['GET /admin/address/list'],
  //         title: '收货地址',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'collect',
  //       component: () => import('@/views/user/collect'),
  //       name: 'collect',
  //       meta: {
  //         perms: ['GET /admin/collect/list'],
  //         title: '会员收藏',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'footprint',
  //       component: () => import('@/views/user/footprint'),
  //       name: 'footprint',
  //       meta: {
  //         perms: ['GET /admin/footprint/list'],
  //         title: '会员足迹',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'history',
  //       component: () => import('@/views/user/history'),
  //       name: 'history',
  //       meta: {
  //         perms: ['GET /admin/history/list'],
  //         title: '搜索历史',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'feedback',
  //       component: () => import('@/views/user/feedback'),
  //       name: 'feedback',
  //       meta: {
  //         perms: ['GET /admin/feedback/list'],
  //         title: '意见反馈',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/mall',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'mallManage',
  //   meta: {
  //     title: '商场管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'region',
  //       component: () => import('@/views/mall/region'),
  //       name: 'region',
  //       meta: {
  //         title: '行政区域',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'brand',
  //       component: () => import('@/views/mall/brand'),
  //       name: 'brand',
  //       meta: {
  //         perms: ['GET /admin/brand/list', 'POST /admin/brand/create', 'GET /admin/brand/read', 'POST /admin/brand/update', 'POST /admin/brand/delete'],
  //         title: '品牌制造商',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'category',
  //       component: () => import('@/views/mall/category'),
  //       name: 'category',
  //       meta: {
  //         perms: ['GET /admin/category/list', 'POST /admin/category/create', 'GET /admin/category/read', 'POST /admin/category/update', 'POST /admin/category/delete'],
  //         title: '商品类目',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'order',
  //       component: () => import('@/views/mall/order'),
  //       name: 'order',
  //       meta: {
  //         perms: ['GET /admin/order/list', 'GET /admin/order/detail', 'POST /admin/order/ordership', 'POST /admin/order/orderrefund', 'POST /admin/order/orderreply'],
  //         title: '订单管理',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'issue',
  //       component: () => import('@/views/mall/issue'),
  //       name: 'issue',
  //       meta: {
  //         perms: ['GET /admin/issue/list', 'POST /admin/issue/create', 'GET /admin/issue/read', 'POST /admin/issue/update', 'POST /admin/issue/delete'],
  //         title: '通用问题',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'keyword',
  //       component: () => import('@/views/mall/keyword'),
  //       name: 'keyword',
  //       meta: {
  //         perms: ['GET /admin/keyword/list', 'POST /admin/keyword/create', 'GET /admin/keyword/read', 'POST /admin/keyword/update', 'POST /admin/keyword/delete'],
  //         title: '关键词',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/goods',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'goodsManage',
  //   meta: {
  //     title: '商品管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       component: () => import('@/views/goods/list'),
  //       name: 'goodsList',
  //       meta: {
  //         perms: ['GET /admin/goods/list', 'POST /admin/goods/delete'],
  //         title: '商品列表',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'create',
  //       component: () => import('@/views/goods/create'),
  //       name: 'goodsCreate',
  //       meta: {
  //         perms: ['POST /admin/goods/create'],
  //         title: '商品上架',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'edit',
  //       component: () => import('@/views/goods/edit'),
  //       name: 'goodsEdit',
  //       meta: {
  //         perms: ['GET /admin/goods/detail', 'POST /admin/goods/update', 'POST /admin/goods/catAndBrand'],
  //         title: '商品编辑',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'comment',
  //       component: () => import('@/views/goods/comment'),
  //       name: 'goodsComment',
  //       meta: {
  //         perms: ['GET /admin/comment/list', 'POST /admin/comment/delete'],
  //         title: '商品评论',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/promotion',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'promotionManage',
  //   meta: {
  //     title: '推广管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'ad',
  //       component: () => import('@/views/promotion/ad'),
  //       name: 'ad',
  //       meta: {
  //         perms: ['GET /admin/ad/list', 'POST /admin/ad/create', 'GET /admin/ad/read', 'POST /admin/ad/update', 'POST /admin/ad/delete'],
  //         title: '广告管理',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'coupon',
  //       component: () => import('@/views/promotion/coupon'),
  //       name: 'coupon',
  //       meta: {
  //         perms: ['GET /admin/coupon/list', 'POST /admin/coupon/create', 'POST /admin/coupon/update', 'POST /admin/coupon/delete'],
  //         title: '优惠券管理',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'couponDetail',
  //       component: () => import('@/views/promotion/couponDetail'),
  //       name: 'couponDetail',
  //       meta: {
  //         perms: ['GET /admin/coupon/list', 'GET /admin/coupon/listuser'],
  //         title: '优惠券详情',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'topic',
  //       component: () => import('@/views/promotion/topic'),
  //       name: 'topic',
  //       meta: {
  //         perms: ['GET /admin/topic/list', 'POST /admin/topic/create', 'GET /admin/topic/read', 'POST /admin/topic/update', 'POST /admin/topic/delete'],
  //         title: '专题管理',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'topic-create',
  //       component: () => import('@/views/promotion/topicCreate'),
  //       name: 'topicCreate',
  //       meta: {
  //         perms: ['POST /admin/topic/create'],
  //         title: '专题创建',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'topic-edit',
  //       component: () => import('@/views/promotion/topicEdit'),
  //       name: 'topicEdit',
  //       meta: {
  //         perms: ['GET /admin/topic/read', 'POST /admin/topic/update'],
  //         title: '专题编辑',
  //         noCache: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: 'groupon-rule',
  //       component: () => import('@/views/promotion/grouponRule'),
  //       name: 'grouponRule',
  //       meta: {
  //         perms: ['GET /admin/groupon/list', 'POST /admin/groupon/create', 'POST /admin/groupon/update', 'POST /admin/groupon/delete'],
  //         title: '团购规则',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'groupon-activity',
  //       component: () => import('@/views/promotion/grouponActivity'),
  //       name: 'grouponActivity',
  //       meta: {
  //         perms: ['GET /admin/groupon/listRecord'],
  //         title: '团购活动',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },

  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'sysManage',
    meta: {
      title: '平台管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'admin',
        component: () => import('@/views/sys/admin'),
        name: 'admin',
        meta: {
          perms: ['GET /admin/admin/list', 'POST /admin/admin/create', 'POST /admin/admin/update', 'POST /admin/admin/delete'],
          title: '平台账号',
          noCache: true
        }
      },
      {
        path: 'log',
        component: () => import('@/views/sys/log'),
        name: 'log',
        meta: {
          perms: ['GET /admin/log/list'],
          title: '操作日志',
          noCache: true
        }
      },
      {
        path: 'role',
        component: () => import('@/views/sys/role'),
        name: 'role',
        meta: {
          perms: ['GET /admin/role/list', 'POST /admin/role/create', 'POST /admin/role/update', 'POST /admin/role/delete', 'GET /admin/role/permissions', 'POST /admin/role/permissions'],
          title: '角色权限',
          noCache: true
        }
      }
      // {
      //   path: 'os',
      //   component: () => import('@/views/sys/os'),
      //   name: 'os',
      //   meta: {
      //     perms: ['GET /admin/storage/list', 'POST /admin/storage/create', 'POST /admin/storage/update', 'POST /admin/storage/delete'],
      //     title: '对象存储',
      //     noCache: true
      //   }
      // }
    ]
  },

  // {
  //   path: '/config',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'configManage',
  //   meta: {
  //     title: '配置管理',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'mall',
  //       component: () => import('@/views/config/mall'),
  //       name: 'configMall',
  //       meta: {
  //         perms: ['GET /admin/config/mall', 'POST /admin/config/mall'],
  //         title: '商场配置',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'express',
  //       component: () => import('@/views/config/express'),
  //       name: 'configExpress',
  //       meta: {
  //         perms: ['GET /admin/config/express', 'POST /admin/config/express'],
  //         title: '运费配置',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'order',
  //       component: () => import('@/views/config/order'),
  //       name: 'configOrder',
  //       meta: {
  //         perms: ['GET /admin/config/order', 'POST /admin/config/order'],
  //         title: '订单配置',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'wx',
  //       component: () => import('@/views/config/wx'),
  //       name: 'configWx',
  //       meta: {
  //         perms: ['GET /admin/config/wx', 'POST /admin/config/wx'],
  //         title: '小程序配置',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/stat',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'statManage',
  //   meta: {
  //     title: '统计报表',
  //     icon: 'chart'
  //   },
  //   children: [
  //     {
  //       path: 'user',
  //       component: () => import('@/views/stat/user'),
  //       name: 'statUser',
  //       meta: {
  //         perms: ['GET /admin/stat/user'],
  //         title: '用户统计',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'order',
  //       component: () => import('@/views/stat/order'),
  //       name: 'statOrder',
  //       meta: {
  //         perms: ['GET /admin/stat/order'],
  //         title: '订单统计',
  //         noCache: true
  //       }
  //     },
  //     {
  //       path: 'goods',
  //       component: () => import('@/views/stat/goods'),
  //       name: 'statGoods',
  //       meta: {
  //         perms: ['GET /admin/stat/goods'],
  //         title: '商品统计',
  //         noCache: true
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   name: 'externalLink',
  //   meta: {
  //     title: '外链',
  //     icon: 'link'
  //   },
  //   children: [
  //     {
  //       path: 'https://cloud.tencent.com/product/cos',
  //       meta: { title: '腾讯云存储', icon: 'link' }
  //     },
  //     {
  //       path: 'https://cloud.tencent.com/product/sms',
  //       meta: { title: '腾讯云短信', icon: 'link' }
  //     },
  //     {
  //       path: 'https://pay.weixin.qq.com/index.php/core/home/login',
  //       meta: { title: '微信支付', icon: 'link' }
  //     },
  //     {
  //       path: 'https://mpkf.weixin.qq.com/',
  //       meta: { title: '小程序客服', icon: 'link' }
  //     },
  //     {
  //       path: 'https://www.alibabacloud.com/zh/product/oss',
  //       meta: { title: '阿里云存储', icon: 'link' }
  //     },
  //     {
  //       path: 'https://www.qiniu.com/products/kodo',
  //       meta: { title: '七牛云存储', icon: 'link' }
  //     },
  //     {
  //       path: 'http://www.kdniao.com/api-track',
  //       meta: { title: '快递鸟', icon: 'link' }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    children: [
      {
        path: 'password',
        component: () => import('@/views/profile/password'),
        name: 'password',
        meta: { title: '修改密码', noCache: true }
      }
    ],
    hidden: true
  },

  { path: '*', redirect: '/404', hidden: true }
]
