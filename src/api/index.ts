const head: string = process.env.NODE_ENV === 'development' ? '/api' : 'http://106.14.126.114:8080';

const api: {
    [key: string]: string
} = {
    'login': head + '/user/token post',
    
    'vipList': head + '/vip/list get',
    'vipDetail': head + '/vip/detail get',
    'vipAddEdit': head + '/vip/edit post',
    'vipDelete': head + '/vip/del delete',
    'vipRecharge': head + '/vip/recharge post',
    'vipConsume': head + '/vip/consume post',

    'integralAdd': head + '/vip/integral/add post',
    'integralDelete': head + '/vip/integral/del delete',

    'goodsAdd': head + '/consume/set post',
    'goodsList': head + '/consume/list get',
    'goodsModify': head + '/consume/modify post',
    'goodsDelete': head + '/consume/del delete',

    'achievementList': head + '/achievement/list get',
    'achievementDetail': head + '/achievement/detail get',

    'backups': head + '/data/backups get'
}

export default api