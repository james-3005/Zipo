import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
const DoubleTap: FC<DoubleTapProps> = (props: DoubleTapProps) => {
  const [tap, setTap] = useState(0);
  let timeOut: any = null;
  const onResponderRelease = () => {
    props.onPress();
  };
  const onStartShouldSetResponder = (): boolean => {
    setTap(tap + 1 > 2 ? 2 : tap + 1);
    timeOut = setTimeout(() => {
      setTap(0);
      clearTimeout(timeOut);
    }, 500);
    if (tap + 1 === 2) return true;
    return false;
  };
  return (
    <View
      onStartShouldSetResponder={onStartShouldSetResponder}
      onResponderRelease={onResponderRelease}
    >
      {props.children}
    </View>
  );
};

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(DoubleTap);

export interface DoubleTapProps {
  $store: reduxState;
  children?: any;
  onPress: () => void;
}
