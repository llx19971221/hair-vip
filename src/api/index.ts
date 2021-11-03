const head: string = '/api';

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
    'goodsDelete': head + '/consume/del delete'
}

export default api