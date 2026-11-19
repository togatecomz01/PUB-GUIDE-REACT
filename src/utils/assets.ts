import checkboxSquareSmallOn from '../assets/icons/selection/ico_checkbox_square_s_on.svg';
import checkboxSquareSmallOff from '../assets/icons/selection/ico_checkbox_square_s_off.svg';
import checkboxSquareSmallOffDisabled from '../assets/icons/selection/ico_checkbox_square_s_off_disabled.svg';
import checkboxSquareMediumOn from '../assets/icons/selection/ico_checkbox_square_m_on.svg';
import checkboxSquareMediumOff from '../assets/icons/selection/ico_checkbox_square_m_off.svg';
import checkboxSquareMediumOffDisabled from '../assets/icons/selection/ico_checkbox_square_m_off_disabled.svg';
import checkboxLineSmallOn from '../assets/icons/selection/ico_checkbox_line_s_on.svg';
import checkboxLineSmallOnDisabled from '../assets/icons/selection/ico_checkbox_line_s_on_disabled.svg';
import checkboxLineSmallOff from '../assets/icons/selection/ico_checkbox_line_s_off.svg';
import checkboxLineSmallOffDisabled from '../assets/icons/selection/ico_checkbox_line_s_off_disabled.svg';
import checkboxLineMediumOn from '../assets/icons/selection/ico_checkbox_line_m_on.svg';
import checkboxLineMediumOnDisabled from '../assets/icons/selection/ico_checkbox_line_m_on_disabled.svg';
import checkboxLineMediumOff from '../assets/icons/selection/ico_checkbox_line_m_off.svg';
import checkboxLineMediumOffDisabled from '../assets/icons/selection/ico_checkbox_line_m_off_disabled.svg';
import radioSmallOn from '../assets/icons/selection/ico_radio_s_on.svg';
import radioSmallOnDisabled from '../assets/icons/selection/ico_radio_s_on_disabled.svg';
import radioSmallOff from '../assets/icons/selection/ico_radio_s_off.svg';
import radioSmallOffDisabled from '../assets/icons/selection/ico_radio_s_off_disabled.svg';
import radioMediumOn from '../assets/icons/selection/ico_radio_m_on.svg';
import radioMediumOnDisabled from '../assets/icons/selection/ico_radio_m_on_disabled.svg';
import radioMediumOff from '../assets/icons/selection/ico_radio_m_off.svg';
import radioMediumOffDisabled from '../assets/icons/selection/ico_radio_m_off_disabled.svg';
import switchMediumOn from '../assets/icons/selection/ico_switch_m_on.svg';
import switchMediumOnDisabled from '../assets/icons/selection/ico_switch_m_on_disabled.svg';
import switchMediumOff from '../assets/icons/selection/ico_switch_m_off.svg';
import switchMediumOffDisabled from '../assets/icons/selection/ico_switch_m_off_disabled.svg';
import switchSmallOn from '../assets/icons/selection/ico_switch_s_on.svg';
import switchSmallOnDisabled from '../assets/icons/selection/ico_switch_s_on_disabled.svg';
import switchSmallOff from '../assets/icons/selection/ico_switch_s_off.svg';
import switchSmallOffDisabled from '../assets/icons/selection/ico_switch_s_off_disabled.svg';

// 선택 컨트롤의 크기·상태별 아이콘 목록입니다.
export const checkboxImages = {
  square: {
    s: {
      off: checkboxSquareSmallOff,
      on: checkboxSquareSmallOn,
      offDisabled: checkboxSquareSmallOffDisabled,
      onDisabled: checkboxSquareSmallOn,
    },
    m: {
      off: checkboxSquareMediumOff,
      on: checkboxSquareMediumOn,
      offDisabled: checkboxSquareMediumOffDisabled,
      onDisabled: checkboxSquareMediumOn,
    },
  },
  line: {
    s: {
      off: checkboxLineSmallOff,
      on: checkboxLineSmallOn,
      offDisabled: checkboxLineSmallOffDisabled,
      onDisabled: checkboxLineSmallOnDisabled,
    },
    m: {
      off: checkboxLineMediumOff,
      on: checkboxLineMediumOn,
      offDisabled: checkboxLineMediumOffDisabled,
      onDisabled: checkboxLineMediumOnDisabled,
    },
  },
};

export const radioImages = {
  s: {
    off: radioSmallOff,
    on: radioSmallOn,
    offDisabled: radioSmallOffDisabled,
    onDisabled: radioSmallOnDisabled,
  },
  m: {
    off: radioMediumOff,
    on: radioMediumOn,
    offDisabled: radioMediumOffDisabled,
    onDisabled: radioMediumOnDisabled,
  },
};

export const switchImages = {
  s: {
    off: switchSmallOff,
    on: switchSmallOn,
    offDisabled: switchSmallOffDisabled,
    onDisabled: switchSmallOnDisabled,
  },
  m: {
    off: switchMediumOff,
    on: switchMediumOn,
    offDisabled: switchMediumOffDisabled,
    onDisabled: switchMediumOnDisabled,
  },
};
