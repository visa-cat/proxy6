"use strict";

const rp = require('request-promise');
const ex = require('./exceptions');

class Proxy6{
    constructor(key){
        if(!key) throw new Error(`Invalid Key`);
        this._baseurl = 'https://proxy6.net';

        this._key = key;
    }

    /**
     * Получение информации о сумме заказа
     * @param count - Кол-во прокси;
     * @param period - Период - кол-во дней;
     * @param [version=6] - Версия прокси: 4 - IPv4, 3 - IPv4 Shared, 6 - IPv6 (по-умолчанию).
     * @returns {Promise}
     */
    getPrice(count,period,version=6){
        if(count<=0) throw new Error(`Invalid count. Must be >= 1`);
        if(period<=0) throw new Error(`Invalid period. Must be >= 1`);
        if(![3,4,6].includes(version)) throw new Error(`Invalid version: ${version}. Available: 4 - IPv4, 3 - IPv4 Shared, 6 - IPv6`);
        return this.request.call(this,'getprice',{count,period,version},"GET")
    }

    /**
     * Получение информации о доступном кол-ве прокси для конкретной страны;
     * @param country - Код страны в формате iso2;
     * @param [version] - Версия прокси: 4 - IPv4, 3 - IPv4 Shared, 6 - IPv6 (по-умолчанию).
     * @returns {Promise}
     */
    getCount(country,version=6){
        if(!country) throw new Error(`Invalid country`);
        if(![3,4,6].includes(version)) throw new Error(`Invalid version: ${version}. Available: 4 - IPv4, 3 - IPv4 Shared, 6 - IPv6`);
        return this.getCountry()
        .then(countries=>{
            if(!countries.includes(country)) throw new Error(`Invalid country selected: ${country}. Available: ${countries.join()}`);
            return this.request.call(this,'getcount',{country,version},"GET")
        })
        .then(response=>response.count)
    }

    /**
     * Получение списка доступных стран;
     * @param [version=6] - Версия прокси: 4 - IPv4, 3 - IPv4 Shared, 6 - IPv6 (по-умолчанию).
     * @returns {Promise}
     */
    getCountry(version=6){
        if(![3,4,6].includes(version)) throw new Error(`Invalid version: ${version}. Available: 4 - IPv4, 3 - IPv4 Shared, 6 - IPv6`);
        return this.request.call(this,'getcountry',{version},"GET")
        .then(response=>response.list)
    }

    /**
     * Получение списка ваших прокси;
     * @param [state] - Состояние возвращаемых прокси. Доступные значения: active - Активные, expired - Неактивные, expiring - Заканчивающиеся, all - Все (по-умолчанию);
     * @param [descr] - Технический комментарий, который вы указывали при покупке прокси. Если данный параметр присутствует, то будут выбраны только те прокси, у которых присутствует данный комментарий, если же данный параметр не задан, то будут выбраны все прокси.
     * @returns {Promise}
     */
    getProxy(state='all',descr){
        if(!['active','expired','expiring','all'].includes(state)) throw new Error(`Invalid state: ${state}. Available: active,expired,expiring,all`);
        if(descr && typeof descr !== 'string') throw new Error(`Invalid descr type: ${typeof descr}. Must me string`);
        return this.request.call(this,'getproxy',{state,descr},"GET")
        .then(response=>response.list)
    }

    /**
     * Изменение типа (протокола) прокси;
     * @param ids - Перечень внутренних номеров прокси в нашей системе, через запятую;
     * @param type - Устанавливаемый тип (протокол): http - HTTPS, либо socks - SOCKS5.
     * @returns {Promise}
     */
    setType(ids,type){
        if(!ids) throw new Error(`Invalid ids`);
        if(typeof ids === 'number') ids = [ids.toString()];
        if(!Array.isArray(ids)) ids = ids.split(',');
        if(!['http','socks'].includes(type)) throw new Error(`Invalid type: ${type}. Available: http,socks`);
        return this.request.call(this,'settype',{ids:ids.join(),type},"GET")
        .return(true)
    }

    /**
     * Обновление технического комментария;
     * @param _new - Технический комментарий, на который нужно изменить. Максимальная длина 50 символов;
     * @param [old] - Технический комментарий, который нужно изменить;
     * @param [ids] - Перечень внутренних номеров прокси в нашей системе, через запятую;
     * @returns {Promise}
     */
    setDescr(_new,old,ids){
        if(!_new) throw new Error(`New is not defined`);
        if(_new.length > 50) throw new Error(`New is too long: ${_new.length}. Max: 50`);
        if(!old && !ids) throw new Error(`Ids or old are required for this method`);
        if(ids && typeof ids === 'number') ids = [ids.toString()];
        if(ids && !Array.isArray(ids)) ids = ids.split(',');

        return this.request.call(this,'setdescr',{new:_new,old,ids:ids.join()},"GET")
    }

    /**
     * Покупка прокси;
     * @param count - Кол-во прокси для покупки;
     * @param period - Период на который покупаются прокси - кол-во дней;
     * @param country - Страна в формате iso2;
     * @param [descr] - Технический комментарий для списка прокси, максимальная длина 50 символов. Указание данного параметра позволит вам делать выборку списка прокси про этому параметру через метод getproxy
     * @param [version=6] - Версия прокси: 4 - IPv4, 3 - IPv4 Shared, 6 - IPv6 (по-умолчанию).
     * @param [type=http] - Устанавливаемый тип (протокол): http - HTTPS, либо socks - SOCKS5.
     * @returns {Promise}
     */
    buy(count,period,country,descr='',version=6,type='http'){
        if(count<=0) throw new Error(`Invalid count. Must be >= 1`);
        if(period<=0) throw new Error(`Invalid period. Must be >= 1`);
        if(!country) throw new Error(`Invalid country`);
        if(descr && typeof descr !== 'string') throw new Error(`Invalid descr type: ${typeof descr}. Must me string`);
        if(!['http','socks'].includes(type)) throw new Error(`Invalid type: ${type}. Available: http,socks`);
        if(![3,4,6].includes(version)) throw new Error(`Invalid version: ${version}. Available: 4 - IPv4, 3 - IPv4 Shared, 6 - IPv6`);
        return this.getCount(country,version)
        .then(available=>{
            if(available<count) throw new Error(`Not enought proxies available. Required: ${count}, available: ${available}`);
            return this.request.call(this,'buy',{count,period,country,descr,version,type},"GET")
        })
        .then(data=>{
            let proxies = Object.values(data.list);
            delete data.list;
            return {
                payload:data,
                proxies
            }
        })
    }

    /**
     * Продление списка прокси;
     * @param period - Период продления - кол-во дней;
     * @param ids - Перечень внутренних номеров прокси в нашей системе, через запятую;
     * @returns {Promise}
     */
    prolong(period,ids){
        if(period<=0) throw new Error(`Invalid period. Must be >= 1`);
        if(!ids) throw new Error(`Invalid ids`);
        if(typeof ids === 'number') ids = [ids.toString()];
        if(!Array.isArray(ids)) ids = ids.split(',');
        return this.request.call(this,'prolong',{period,ids:ids.join()},"GET")
        .then(data=>{
            let proxies = Object.values(data.list);
            delete data.list;
            return {
                payload:data,
                proxies
            }
        })
    }

    /**
     * Удаление прокси;
     * @param ids - Перечень внутренних номеров прокси в нашей системе, через запятую;
     * @param descr
     * @returns {Promise}
     */
    deleteProxy(ids,descr){
        if(!descr && !ids) throw new Error(`Ids or descr are required for this method`);
        if(descr && typeof descr !== 'string') throw new Error(`Invalid descr type: ${typeof descr}. Must me string`);
        if(ids && typeof ids === 'number') ids = [ids.toString()];
        if(ids && !Array.isArray(ids)) ids = ids.split(',');
        return this.request.call(this,'delete',{ids:ids.join(),descr},"GET")
    }

    /**
     * Проверка валидности прокси.
     * @param ids - Перечень внутренних номеров прокси в нашей системе, через запятую;
     * @returns {Promise}
     */
    check(ids){
        if(!ids) throw new Error(`Invalid ids`);
        if(typeof ids === 'number') ids = [ids.toString()];
        if(!Array.isArray(ids)) ids = ids.split(',');
        return this.request.call(this,'check',{ids:ids.join()},"GET")
        .then(response=>response.proxy_status)
    }

    getUserInfo(){
        return new Promise(res=>{
            if(!this.user){
                return this.getCountry().then(()=>{res(this.user)})
            }else{
                res(this.user)
            }
        })
    }

    request(endpoint,params={},method='GET'){
        let options = {
            url:`${this._baseurl}/api/${this._key}/${endpoint}`,
            method:method,
            json:true
        };
        if(method==="GET"){
            options.qs = params;
        }else{
            options.form = params;
        }
        if(this.proxy){
            options.rejectUnauthorized = false;
            options.proxy = this.proxy;
        }
        let startedAt;
        if(this.debug){
            startedAt = Date.now();
            console.info(`Proxy6: ${method} ${endpoint} >>> ${JSON.stringify(params)}`);
        }
        return rp(options)
        .then(body=>{
            if(this.debug) console.info(`Proxy6: ${method} ${endpoint} <<< ${JSON.stringify(body)} <<< ${Date.now() - startedAt} ms`);
            if(body.status === 'yes'){
                this.user = {userId:body.user_id,balance:body.balance,currency:body.currency};
                delete body.status;
                delete body.user_id;
                delete body.balance;
                delete body.currency;
                return body;
            }else{
                if(ex[body.error_id]){
                    throw new ex[body.error_id]();
                }else{
                    throw new Error(`Error #${body.error_id}: ${body.error}`);
                }
            }
        })
    }
}

module.exports = Proxy6;