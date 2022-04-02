import React, { FC, useState } from 'react';
import { View } from 'react-native';
import styles from '../../scss/CallingScreen.scss';
import { useSelector, connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
const CallingScreen: FC<CallingScreenProps> = (props: CallingScreenProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );

  return <View style={styles.container}></View>;
};

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(CallingScreen);

export interface CallingScreenProps {
  $store: reduxState;
}

interface CallingScreenState {}
