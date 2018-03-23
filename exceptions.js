const util = require("util");

let exceptions = {
    '30':function(){
        this.name = "Error unknown";
        this.message = `Неизвестная ошибка`;
    },
    '100':function(){
        this.name = "Error key";
        this.message = `Ошибка авторизации, неверный ключ`;
    },
    '110':function(){
        this.name = "Error method";
        this.message = `Ошибочный метод`;
    },
    '200':function(){
        this.name = "Error count";
        this.message = `Ошибка кол-ва прокси, неверно указано кол-во, либо отсутствует`;
    },
    '210':function(){
        this.name = "Error period";
        this.message = `Ошибка периода, неверно указан период (кол-во дней), либо отсутствует`;
    },
    '220':function(){
        this.name = "Error country";
        this.message = `Ошибка страны, неверно указана страна (страны указываются в формате iso2), либо отсутствует`;
    },
    '230':function(){
        this.name = "Error ids";
        this.message = `Ошибка списка номеров прокси. Номера прокси должны быть указаны через запятую`;
    },
    '250':function(){
        this.name = "Error descr";
        this.message = `Ошибка технического комментария, неверно указан, либо отсутствует`;
    },
    '260':function(){
        this.name = "Error type";
        this.message = `Ошибка типа (протокола) прокси, неверно указан, либо отсутствует`;
    },
    '300':function(){
        this.name = "Error active proxy allow";
        this.message = `Ошибка кол-ва прокси. Возникает при попытке покупки большего кол-ва прокси, чем доступно на сервисе`;
    },
    '400':function(){
        this.name = "Error no money";
        this.message = `Ошибка баланса. На вашем балансе отсутствуют средства, либо их не хватает для покупки запрашиваемого кол-ва прокси`;
    },
    '404':function(){
        this.name = "Error not found";
        this.message = `Ошибка поиска. Возникает когда запрашиваемый элемент не найден`;
    },
    '410':function(){
        this.name = "Error price";
        this.message = `Ошибка расчета стоимости. Итоговая стоимость меньше, либо равна нулю`;
    },
};
Object.keys(exceptions).forEach((key,i)=>{
    util.inherits(exceptions[key], Error);
});

module.exports = exceptions;