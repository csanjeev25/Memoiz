import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Text} from 'react-native';
import constants from '../../../constants';

function Card(cardProps) {

  const onCardPressed = () => {
    !cardProps.isFlipped &&
      !cardProps.isDisabled &&
      cardProps.onCardPress(cardProps.index);
  };

  return (
    <TouchableWithoutFeedback onPress={onCardPressed}>
      <View style={styles.container}>
        <Text style={styles.cardStyle}>
          {cardProps.isFlipped || cardProps.isCleared ? cardProps.card.letter : '?'}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    width: constants.dimens.size_70,
    aspectRatio: 9/16
  },
  cardStyle: {
    fontFamily: constants.fonts.LatoBold,
    fontSize: constants.fonts.font_size_42,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

});

export default Card;
