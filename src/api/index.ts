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

    'integralAdd': head + '/vip/integral/add post',
    'integralDelete': head + '/vip/integral/del delete'
}

export default api