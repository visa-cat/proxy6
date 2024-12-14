export = Proxy6;
declare class Proxy6 {
    constructor(key: any, url?: string);
    _baseurl: string;
    _key: any;
    /**
     * Получение информации о сумме заказа
     * @param count - Кол-во прокси;
     * @param period - Период - кол-во дней;
     * @param [version=6] - Версия прокси: 4 - IPv4, 3 - IPv4 Shared, 6 - IPv6 (по-умолчанию).
     * @returns {Promise}
     */
    getPrice(count: any, period: any, version?: number | undefined): Promise<any>;
    /**
     * Получение информации о доступном кол-ве прокси для конкретной страны;
     * @param country - Код страны в формате iso2;
     * @param [version] - Версия прокси: 4 - IPv4, 3 - IPv4 Shared, 6 - IPv6 (по-умолчанию).
     * @returns {Promise}
     */
    getCount(country: any, version?: number | undefined): Promise<any>;
    /**
     * Получение списка доступных стран;
     * @param [version=6] - Версия прокси: 4 - IPv4, 3 - IPv4 Shared, 6 - IPv6 (по-умолчанию).
     * @returns {Promise}
     */
    getCountry(version?: number | undefined): Promise<any>;
    /**
     * Получение списка ваших прокси;
     * @param [state] - Состояние возвращаемых прокси. Доступные значения: active - Активные, expired - Неактивные, expiring - Заканчивающиеся, all - Все (по-умолчанию);
     * @param [descr] - Технический комментарий, который вы указывали при покупке прокси. Если данный параметр присутствует, то будут выбраны только те прокси, у которых присутствует данный комментарий, если же данный параметр не задан, то будут выбраны все прокси.
     * @returns {Promise}
     */
    getProxy(state?: string | undefined, descr?: any): Promise<any>;
    /**
     * Изменение типа (протокола) прокси;
     * @param ids - Перечень внутренних номеров прокси в нашей системе, через запятую;
     * @param type - Устанавливаемый тип (протокол): http - HTTPS, либо socks - SOCKS5.
     * @returns {Promise}
     */
    setType(ids: any, type: any): Promise<any>;
    /**
     * Обновление технического комментария;
     * @param _new - Технический комментарий, на который нужно изменить. Максимальная длина 50 символов;
     * @param [old] - Технический комментарий, который нужно изменить;
     * @param [ids] - Перечень внутренних номеров прокси в нашей системе, через запятую;
     * @returns {Promise}
     */
    setDescr(_new: any, old?: any, ids?: any): Promise<any>;
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
    buy(count: any, period: any, country: any, descr?: string | undefined, version?: number | undefined, type?: string | undefined): Promise<any>;
    /**
     * Продление списка прокси;
     * @param period - Период продления - кол-во дней;
     * @param ids - Перечень внутренних номеров прокси в нашей системе, через запятую;
     * @returns {Promise}
     */
    prolong(period: any, ids: any): Promise<any>;
    /**
     * Удаление прокси;
     * @param ids - Перечень внутренних номеров прокси в нашей системе, через запятую;
     * @param descr
     * @returns {Promise}
     */
    deleteProxy(ids: any, descr: any): Promise<any>;
    /**
     * Проверка валидности прокси.
     * @param ids - Перечень внутренних номеров прокси в нашей системе, через запятую;
     * @returns {Promise}
     */
    check(ids: any): Promise<any>;
    getUserInfo(): Promise<any>;
    request(endpoint: any, params?: {}, method?: string): any;
    user: {
        userId: any;
        balance: any;
        currency: any;
    } | undefined;
}
