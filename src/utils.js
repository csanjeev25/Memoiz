import { ToastAndroid } from "react-native";

const utils = {
  getAlphabetArray(start) {
    return new Array(8).fill(1).map((_, i) => {
      return {id: start + i, letter: String.fromCharCode(start + i).toUpperCase()};
    });
  },

  getShuffledData() {
    let cardsArray = this.getAlphabetArray(65).concat(this.getAlphabetArray(97));
    var i = cardsArray.length,
      j,
      temp;
    if (i == 0) return cardsArray;
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      temp = cardsArray[i];
      cardsArray[i] = cardsArray[j];
      cardsArray[j] = temp;
    }
    return cardsArray;
  },
  showToast(text){
    ToastAndroid.show(text, ToastAndroid.SHORT);
  }
};

export default utils;
