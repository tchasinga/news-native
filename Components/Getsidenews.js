import React from 'react';
import { View, Text, Platform } from 'react-native';

const MyComponent = () => (
  <View>
    <Text>
      {Platform.os === 'ios' ? 'Hello, iOS!' : 'Hello, Android!'}
    </Text>
  </View>
);

export default MyComponent;
