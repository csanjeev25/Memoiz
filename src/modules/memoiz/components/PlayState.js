import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text} from 'react-native';
import constants from '../../../constants';

function PlayState({matches, tries}) {
  return (
    <View style={{paddingTop: constants.dimens.grid_2}}>
      <View style={styles.playContainer}>
        <Text style={styles.textStyle}>Play Memoiz</Text>
        <Text
          style={[
            {
              paddingTop: constants.dimens.grid_1_half,
            },
            styles.textStyle,
          ]}>
          Select same two cards
        </Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text
          style={[
            styles.textStyle,
            styles.matchStyle,
          ]}>{`Matches: ${matches}`}</Text>
        <Text
          style={[
            styles.textStyle,
            styles.triesStyle,
          ]}>{`Tries: ${tries}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playContainer: {
    alignItems: 'center',
    paddingBottom: constants.dimens.grid_2,
  },
  scoreContainer: {
    width: '100%',
    alignSelf: 'baseline',
    paddingHorizontal: constants.dimens.grid_2,
    paddingVertical: constants.dimens.grid_2,
    flexDirection: 'row',
  },
  matchStyle: {
    color: 'black',
    paddingStart: constants.dimens.grid_2,
    position: 'absolute',
    left: 0,
  },
  textStyle: {
    fontFamily: constants.fonts.LatoRegular,
    fontSize: constants.fonts.h3,
  },
  triesStyle: {
    alignSelf: 'flex-end',
    paddingEnd: constants.dimens.grid_2,
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
  },
});

export default PlayState;
