import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  Text,
  TouchableWithoutFeedback,
  BackHandler
} from 'react-native';
import constants from '../../../constants';
import utils from '../../../utils';
import PlayState from './PlayState';
import Card from './Card';

function Memoiz() {
  const [cards, setCards] = useState(() => utils.getShuffledData());
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const timeout = useRef(null);
  const shouldExit = useRef(false)

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === (cards.length/2)) {
      Alert.alert("Congrats! You have a great memory")
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].letter === cards[second].letter) {
      setClearedCards((prev) => ({ ...prev, [cards[first].letter]: true }));
      setOpenCards([]);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 200);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  const handleBackPress = () => {
      if (shouldExit.current) {
        return false;
      }
      shouldExit.current = true;
      utils.showToast("Press back again to exit");
      setTimeout(() => {
        shouldExit.current = false;
      }, 2000);
      return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, [])

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 200);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.letter]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(utils.getShuffledData());
  };

  return (
    <View style={styles.container}>
      <PlayState
        matches={Object.keys(clearedCards).length}
        tries={moves}
        onRestartPress={handleRestart}
      />
      <FlatList
        style={styles.listStyle}
        showsVerticalScrollIndicator={false}
        data={cards}
        keyExtractor={card => {
          return card.id;
        }}
        contentContainerStyle={{paddingBottom: constants.dimens.grid_6}}
        bounces={false}
        numColumns={4}
        renderItem={({item, index}) => {
          return (
            <View style={styles.cardStyle}>
              <Card
                key={index}
                card={item}
                index={index}
                isDisabled={shouldDisableAllCards}
                isInactive={checkIsInactive(item)}
                isFlipped={checkIsFlipped(index)}
                onCardPress={handleCardClick}
                isCleared={clearedCards[cards[index].letter]}
              />
            </View>
          );
        }}
      />
      <TouchableWithoutFeedback onPress={handleRestart}>
        <View style={styles.buttonView}>
          <Text style={styles.buttonTextStyle}>Restart</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'oldlace',
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'coral',
    width: '100%',
    height: constants.dimens.grid_5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listStyle: {
    flex: 1,
    paddingVertical: constants.dimens.grid_2,
    borderRadius: 4,
    borderColor: 'red',
  },
  buttonTextStyle: {
    fontFamily: constants.fonts.LatoRegular,
    color: '#fff',
    textAlign: 'center',
    fontSize: constants.fonts.h1,
  },
  cardStyle: {
    flex: 1,
    paddingVertical: constants.dimens.grid_2,
    paddingHorizontal: constants.dimens.grid_2
  }
});

export default Memoiz;
