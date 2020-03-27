/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 14:46:41
 * @LastEditTime: 2020-03-11 15:57:54
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
          perms: ['POST /admin/managerUser/userList'],
          title: '设计师列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/designer/create'),
        name: 'designerCreate',
        meta: {
          perms: ['POST /admin/managerUser/addUser'],
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
          perms: ['POST /admin/managerUser/userListOne'],
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
          perms: ['POST /admin/managerUser/update'],
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
          perms: ['POST /admin/managerUser/userList'],
          title: '零工列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/worker/create'),
        name: 'workerCreate',
        meta: {
          perms: ['POST /admin/managerUser/addUser'],
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
          perms: ['POST /admin/managerUser/update'],
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
          perms: ['POST /admin/managerUser/userListOne'],
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
          perms: ['POST /admin/managerUser/userList'],
          title: '项目经理列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/productManager/create'),
        name: 'productManagerCreate',
        meta: {
          perms: ['POST /admin/managerUser/addUser'],
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
          perms: ['POST /admin/managerUser/update'],
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
          perms: ['POST /admin/managerUser/userListOne'],
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
          perms: ['POST /admin/depart/departList'],
          title: '装修公司列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/decorationCompany/create'),
        name: 'decorationCompanyCreate',
        meta: {
          perms: ['POST /admin/depart/addDepart'],
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
          perms: ['POST /admin/depart/update'],
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
          perms: ['POST /admin/depart/departOne'],
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
        name: 'ServiceOrderList',
        meta: {
          perms: ['POST /admin/serviceOrder/list'],
          title: '服务订单列表',
          noCache: true
        }
      },
      {
        path: '/serviceOrder/detail',
        component: () => import('@/views/serviceOrder/detail'),
        name: 'ServiceOrderDetail',
        meta: {
          perms: ['POST /admin/serviceOrder/detail'],
          title: '服务订单列表',
          noCache: true
        },
        hidden: true
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
          perms: ['POST /admin/comment/list'],
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
          perms: ['POST /admin/managerExample/list'],
          title: '案例列表',
          noCache: true
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/case/edit'),
        name: 'caseEdit',
        meta: {
          perms: ['POST /admin/managerExample/update'],
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
          perms: ['POST /admin/managerExample/save'],
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
          perms: ['POST /admin/managerExample/detail'],
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
          perms: ['POST /admin/goods/list'],
          title: '商品列表',
          noCache: true
        }
      },
      {
        path: 'create',
        component: () => import('@/views/goods/create'),
        name: 'create',
        meta: {
          perms: ['POST /admin/goods/create'],
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
          perms: ['POST /admin/goods/update'],
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
          perms: ['POST /admin/goods/detail'],
          title: '商品详情',
          noCache: true
        },
        hidden: true
      }
    ]
  },
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
          perms: ['POST /admin/category/l'],
          title: '一级分类',
          noCache: true
        }
      },
      {
        path: 'secondClassClassificationList',
        component: () => import('@/views/category/secondClassClassification/list'),
        name: 'secondClassClassificationList',
        meta: {
          perms: ['POST /admin/category/l'],
          title: '二级分类',
          noCache: true
        }
      },
      {
        path: 'thirdClassClassificationList',
        component: () => import('@/views/category/thirdClassClassification/list'),
        name: 'thirdClassClassificationList',
        meta: {
          perms: ['POST /admin/category/l'],
          title: '三级分类',
          noCache: true
        }
      }
    ]
  },
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
          perms: ['POST /admin/service/list'],
          title: '服务商标签管理',
          noCache: true
        }
      },
      {
        path: 'serviceLabelEdit',
        component: () => import('@/views/label/serviceLabelEdit'),
        name: 'serviceLabelEdit',
        meta: {
          perms: ['POST /admin/service/update'],
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
          perms: ['POST /admin/service/add'],
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
          perms: ['POST /admin/orderAfter/list'],
          title: '商品售后列表',
          noCache: true
        }
      },
      {
        path: 'tklist',
        component: () => import('@/views/afterSaleManagement/tklist'),
        name: 'AfterSaleManagementtkList',
        meta: {
          perms: ['POST /admin/orderAfter/list'],
          title: '商品退款列表',
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
    path: '/merchants',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'Merchants',
    meta: {
      title: '招商管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'MerchantsList',
        component: () => import('@/views/merchants/list'),
        name: 'merchantsList',
        meta: {
          perms: ['POST /admin/merchants/list'],
          title: '招商列表',
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
    path: '/caseProject',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'CaseProject',
    meta: {
      title: '案列方案管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/caseProject/list'),
        name: 'CaseProjectList',
        meta: {
          perms: ['POST /admin/exampleData/list'],
          title: '案列方案列表',
          noCache: true
        }
      },
      {
        path: 'checkHistoryList',
        component: () => import('@/views/caseProject/checkHistoryList'),
        name: 'CheckHistoryList',
        meta: {
          perms: ['POST /admin/exampleData/listHistoryExampleData'],
          title: '审核历史',
          noCache: true
        }
      },
      {
        path: 'sellList',
        component: () => import('@/views/caseProject/sellList'),
        name: 'SellList',
        meta: {
          perms: ['POST /admin/exampleData/listExampleDataOrder'],
          title: '销售记录',
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
    ]
  },

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
    ]
  },
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
