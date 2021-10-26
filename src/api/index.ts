const head: string = '/api';

const api: {
    [key: string]: string
} = {
    'login': head + '/user/token post',
    
    'vipList': head + '/vip/list get'
}

export default api