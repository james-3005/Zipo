import React, { FC, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../scss/AvatarSheet.scss';
import { useSelector, connect } from 'react-redux';
import { reduxState } from '../../redux/reducer';
import BottomSheet from 'reanimated-bottom-sheet';
import 'react-native-gesture-handler';
import { uploadImage } from '../../utilities/firebase';
import { captureImage, chooseImage } from '../../utilities/common';
import { DARK_THEME, LIGHT_THEME } from '../../utilities/theme';

const AvatarSheet: FC<AvatarSheetProps> = (props: AvatarSheetProps) => {
  const [store] = useState<reduxState>(
    useSelector((state) => state) as reduxState,
  );

  const [image, setImage] = useState('');

  useEffect(() => {
    image && uploadImage(image, props.setImage);
  }, [image]);

  const renderContent = () => (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.$store.theme
            ? DARK_THEME.THEME
            : LIGHT_THEME.THEME,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          captureImage(setImage);
        }}
      >
        <Text
          style={[
            styles.textButton,
            {
              color: props.$store.theme
                ? DARK_THEME.FONT_COLOR
                : LIGHT_THEME.FONT_COLOR,
            },
          ]}
        >
          Camera
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          chooseImage(setImage);
        }}
      >
        <Text
          style={[
            styles.textButton,
            {
              color: props.$store.theme
                ? DARK_THEME.FONT_COLOR
                : LIGHT_THEME.FONT_COLOR,
            },
          ]}
        >
          Gallery
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.sheetRef.current?.snapTo(1);
        }}
      >
        <Text
          style={[
            styles.textButton,
            {
              color: props.$store.theme
                ? DARK_THEME.FONT_COLOR
                : LIGHT_THEME.FONT_COLOR,
            },
          ]}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BottomSheet
      ref={props.sheetRef}
      snapPoints={[200, 0]}
      initialSnap={1}
      borderRadius={13}
      renderContent={renderContent}
      enabledGestureInteraction={true}
    />
  );
};

function mapStateToProps(state: reduxState) {
  return {
    $store: state,
  };
}

export default connect(mapStateToProps)(AvatarSheet);

export interface AvatarSheetProps {
  $store: reduxState;
  user: any;
  sheetRef: any;
  setImage: any;
}

interface AvatarSheetState {}
