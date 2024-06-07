const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const Base = {
  0: '#FFFFFF', 5: '#F3F3F3', 10: '#DDDDDD', 20: '#C6C6C6', 30: '#B0B0B0',
  40: '#9B9B9B', 50: '#868686', 60: '#727272', 70: '#5E5E5E',
  80: '#4B4B4B', 90: '#393939',
}

const Red = {
  5: '#FCF1F4', 10: '#F5D4DF', 20: '#ECB9CA', 30: '#DF9EB5',
  40: '#D085A1', 50: '#BD6E8C', 60: '#A75978', 70: '#8F4764',
  80: '#753750', 90: '#592A3D',
}

const Green = {
  5: '#E8F7F1', 10: '#BAE6D5', 20: '#8DD5BB', 30: '#5FC2A2',
  40: '#2CAE8A', 50: '#009A74', 60: '#008560', 70: '#006F4E',
  80: '#005A3D', 90: '#00442E',
}

const Blue = {
  5: '#F1F3FF', 10: '#D3DCFF', 20: '#B5C5FC', 30: '#97AFF5',
  40: '#7999EA', 50: '#5B84DA', 60: '#4170C5', 70: '#2B5DAB',
  80: '#1C4A8D', 90: '#17386C',
}

const Beige = {
  5: '#F8F3ED', 10: '#EADACA', 20: '#DAC3A9', 30: '#C9AC8B',
  40: '#B69670', 50: '#A18158', 60: '#8C6C44', 70: '#765934',
  80: '#5F4727', 90: '#49361D',
}

export default {
  light: {
    base: Base,
    red: Red,
    green: Green,
    blue: Blue,
    beige: Beige,
  },
  dark: {
    base: Base,
    red: Red,
    green: Green,
    blue: Blue,
    beige: Beige,
  },
};

