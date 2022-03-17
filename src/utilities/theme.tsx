export const LIGHT_THEME = {
  type: 'LIGHT_THEME',
  THEME: '#FFFFFF',
  FONT_COLOR: '#0F1828',
  STROKE_ICON: '#0F1828',
  INPUT_COLOR: '#F7F7FC',
  PLACE_HOLDER: '#ADB5BD',
};

export const DARK_THEME = {
  type: 'DARK_THEME',
  THEME: '#0F1828',
  FONT_COLOR: '#F7F7FC',
  STROKE_ICON: '#F7F7FC',
  INPUT_COLOR: '#152033',
  PLACE_HOLDER: '#ADB5BD',
};

export interface THEME {
  type: String;
  THEM: String;
  FONT_COLOR: String;
  STROKE_ICON: String;
  INPUT_COLOR: String;
  PLACE_HOLDER: String;
}
