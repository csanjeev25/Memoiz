import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Memoiz from './src/modules/memoiz';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Memoiz />
    </SafeAreaView>
  );
};

export default App;
