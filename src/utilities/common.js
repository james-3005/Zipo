import moment from 'moment';

export const JSON_PRETTY = (data) => JSON.stringify(data, null, 2);

export const TO_MOMENT = (item) => {
  const date = moment(
    new Date(item.seconds * 1000 + item.nanoseconds / 1000000),
  );
  const isSameDay = date.isSame(moment(Date.now()), 'day');
  return isSameDay ? date.format('HH:mm') : date.format('D/M HH:mm');
};

export const EMOTION = [
  'picture',
  'folderPicture',
  'angry',
  'blink',
  'love',
  'no',
  'smile',
  'lazy',
];
export const GET_REQUIRE = (type) => {
  switch (type) {
    case 'angry':
      return require('../../assets/lottie/emotion/angry.json');
    case 'lazy':
      return require('../../assets/lottie/emotion/lazy.json');
    case 'blink':
      return require('../../assets/lottie/emotion/blink.json');
    case 'smile':
      return require('../../assets/lottie/emotion/smile.json');
    case 'no':
      return require('../../assets/lottie/emotion/no.json');
    default:
      return require('../../assets/lottie/emotion/love.json');
  }
};
