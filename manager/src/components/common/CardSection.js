import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
      // react-native component's style prop can take an array object, and the right-most element will override the left-er one
      <View style={[styles.containerStyle, props.style]}>
          {props.children}
      </View>
  );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };