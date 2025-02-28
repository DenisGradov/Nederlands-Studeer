function saveToLocalStorage(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Ошибка при сохранении в localStorage:', error);
  }
}

function getFromLocalStorage(key) {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error('Ошибка при получении из localStorage:', error);
    return null;
  }
}

export {saveToLocalStorage, getFromLocalStorage};