import Cookies from 'js-cookie';
import axios from 'axios';
import { Notification } from 'element-ui';
import Common from "@/utils/common";

const req = {};

const service = axios.create({
    timeout: 50000,
    maxRedirects: 0,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
});

req.redirectToSso = () => {
    if (window.location.href.indexOf('#/signin') > -1) {
        return;
    }
    Cookies.set('urlBeforeSso', window.location.href);
    window.location.href = window.location.origin + window.location.pathname + '#/signin';
};

service.interceptors.request.use(
    config => {
        config.headers['x-requested-with'] = 'XMLHttpRequest';

        const accessToken = Cookies.get('access-token') || localStorage.getItem('session');
        if (!Common.validString(accessToken)) {
            req.redirectToSso();
            return Promise.reject(new Error('请重新登录!'));
        }
        config.headers['access-token'] = accessToken;
        return config;
    },
    err => Promise.reject(err)
);

// http response 拦截器
service.interceptors.response.use(
    res => {
        const code = res.data.code;
        if (code !== 0) {
            Notification.error({
                message: res.data.message
            });
            if (code === -2) {
                Cookies.remove('access-token');
                localStorage.setItem('session', null);
                req.redirectToSso();
            }
        }
        return res.data;
    },
    err => {
        if (err && err.response) {
            Notification.error({
                message: err.response.statusText
            });
            if (err.response.status === 401) {
                Cookies.remove('access-token');
                localStorage.setItem('session', null);
                req.redirectToSso();
            }
        }
        return Promise.reject(err);
    }
);

req.get = (url, params, cb) => {
    if (cb === undefined) {
        cb = params;
        params = undefined;
    }
    if (params !== undefined) {
        url = url + '?' + Common.toQuery(params);
    }
    return service.get(url).then(res => {
        cb(res.data);
        return res.data;
    });
};

req.post = (url, params, cb) => service.post(url, params).then(res => {
    cb(res.data);
    return res.data;
});

req.put = (url, params, cb) => service.put(url, params).then(res => {
    cb(res.data);
    return res.data;
});

req.patch = (url, params, cb) => service.patch(url, params).then(res => {
    cb(res.data);
    return res.data;
});

req.delete = (url, cb) => service.delete(url).then(res => {
    cb(res.data);
    return res.data;
});

req.service = service;
req.axios = axios;
export default req;