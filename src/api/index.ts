const head: string = '/api';

const api: {
    [key: string]: string
} = {
    'login': head + '/user/token post',
    
    'vipList': head + '/vip/list get',
    'vipAddEdit': head + '/vip/edit post',
    'vipDelete': head + '/vip/del delete',
    'vipRecharge': head + '/vip/recharge post'
}

export default api