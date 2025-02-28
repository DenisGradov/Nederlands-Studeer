import ua from "../localization/ua.js";
import { getFromLocalStorage } from "./locale.js";

//перевод текста
const getText = (text) => {
  if (!text || getFromLocalStorage("isOnlyNederland")) return text;

  if (ua[text]) {
    if (getFromLocalStorage("isOnlyNederland")) return ua[text];
    return ua[text];
  }

  const clearText = text.replace(/\s+|["\-,]/g, '').toLowerCase();
  if (ua[clearText]) {
    if (getFromLocalStorage("isOnlyNederland")) return ua[clearText];
    return ua[clearText];
  }

  return text;
};

//Получаем список правил из списка артиклей
const getLidwoordenRules = array =>{
  const result = {};

  for (const article in array) {
    result[article] = {};

    for (const rule in array[article]) {
      result[article][rule] = true;
    }
  }
  return result;
}

//обновляем список правил. Аргументы: список правил, ключ (либо true если все) правила, значение новое
const updateLidwoordenRules = (rules, key, value) => {
  for (const article in rules) {
    if (key === true) {
      for (const rule in rules[article]) {
        rules[article][rule] = value;
      }
    } else if (article === key) {
      for (const rule in rules[article]) {
        rules[article][rule] = value;
      }
    } else if (typeof rules[article][key] !== "undefined") {
      rules[article][key] = value;
    }
  }
  return rules;
};


export { getText, getLidwoordenRules, updateLidwoordenRules };
