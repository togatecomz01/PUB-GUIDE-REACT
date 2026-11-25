export const foundationFiles = [
  'src/assets/styles/main.scss',
  'src/assets/styles/_base.scss',
  'src/assets/styles/_component-fonts.scss',
  'src/assets/styles/mixins/_selection.scss',
  'src/assets/styles/tokens/_primitives.scss',
  'src/assets/styles/tokens/_semantic-colors.scss',
  'src/assets/fonts/Pretendard-Regular.woff',
  'src/assets/fonts/Pretendard-Medium.woff',
  'src/assets/fonts/Pretendard-SemiBold.woff',
  'src/assets/fonts/Pretendard-Bold.woff',
  'src/assets/fonts/Pretendard-LICENSE.txt',
];
export const allComponentsTree = `src/
├─ components/
│  ├─ Button/·TextField/·Tab/…  페이지에서 쓰는 UI 22종
│  └─ internal/                UI 내부의 보조 부품 5개
│     ├─ ActionButtons/       하단 버튼 묶음
│     ├─ FieldFrame/          레이블·안내문구 틀
│     ├─ InputBody/           입력 종류별 내용
│     ├─ SelectionImages/     선택 상태 SVG 출력
│     └─ TabList/             탭 선택·키보드 이동
├─ hooks/                      값 관리·다이얼로그·가로 드래그
├─ utils/                      cx.ts·assets.ts (일반 함수·공통 이미지 목록)
└─ assets/
   ├─ icons/
   │  ├─ ico_*.svg             일반 66 + Header 전용 5 SVG
   │  ├─ selection/            체크박스·라디오·스위치·계좌형 바텀시트 상태 SVG
   │  └─ fields/               입력창 아이콘과 추가 구현용 SVG
   ├─ fonts/                   Pretendard 400·500·600·700 + 라이선스
   └─ styles/                  공통 SCSS
      ├─ main.scss
      ├─ _base.scss
      ├─ _component-fonts.scss
      ├─ mixins/
      │  └─ _selection.scss   체크박스·라디오·스위치 공통 스타일
      └─ tokens/
         ├─ _primitives.scss      기본 색상·치수·글자
         └─ _semantic-colors.scss 용도별 색상`;
export const existingStyleEntry = `// 기존 main.scss가 있으면 assets/styles/pub-guide.scss로 추가합니다.
@use './base';
@use './component-fonts';`;
export const existingEntryImports = `// src/main.tsx에 한 번 추가합니다.
import './assets/styles/pub-guide.scss';`;
export const dependencyRows = [
  {
    component: 'Button / Badge / FormButton',
    folders: '사용할 컴포넌트 폴더 + utils/cx.ts',
    extra: '공통 SCSS·로컬 Pretendard',
  },
  {
    component: 'Icon',
    folders: 'Icon/ + utils/cx.ts',
    extra: 'assets/icons/의 ico_*.svg. SVG raw import 및 import.meta.glob 지원 필요',
  },
  {
    component: 'TextButton / Toast / Header / Accordion',
    folders: '사용할 컴포넌트 폴더 + Icon/ + utils/cx.ts',
    extra: 'assets/icons/의 ico_*.svg',
  },
  {
    component: 'Modal',
    folders: 'Modal/ + Button/ + TextButton/ + Icon/ + utils/cx.ts + hooks/useDialog.ts',
    extra: 'assets/icons/의 ico_*.svg',
  },
  {
    component: 'BottomCTA',
    folders: 'BottomCTA/ + Button/ + internal/ActionButtons/ + utils/cx.ts',
    extra: '공통 SCSS·로컬 Pretendard',
  },
  {
    component: 'BottomSheet',
    folders: 'BottomSheet/ + Button/ + internal/ActionButtons/ + hooks/useDialog.ts + utils/cx.ts',
    extra:
      'assets/icons/selection/의 ico_account_selected.svg·ico_account_inactive.svg. 계좌·은행 로고는 SheetOptions의 image로 전달',
  },
  {
    component: 'Tooltip',
    folders: 'Tooltip/ + Icon/ + utils/cx.ts',
    extra: 'assets/icons/의 ico_*.svg',
  },
  {
    component: 'Keypad',
    folders: 'Keypad/ + FormButton/ + Icon/ + utils/cx.ts',
    extra: 'assets/icons/의 ico_*.svg',
  },
  {
    component: 'Checkbox / Radio / Switch',
    folders: '선택할 컴포넌트 + internal/SelectionImages/ + utils/cx.ts + utils/assets.ts',
    extra:
      'assets/styles/mixins/_selection.scss + utils/assets.ts가 참조하는 체크박스·라디오·스위치 SVG 30개',
  },
  {
    component: 'TextField',
    folders:
      'TextField/ + internal/InputBody/ + FormButton/ + Icon/ + internal/FieldFrame/ + utils/cx.ts + hooks/useValue.ts',
    extra:
      'assets/icons/의 ico_*.svg와 assets/icons/fields/ico_input_clear_focus.svg. endAdornment에 쓰는 컴포넌트도 함께 복사',
  },
  {
    component: 'SelectField',
    folders:
      'SelectField/ + TextField/TextField.module.scss + Icon/ + internal/FieldFrame/ + utils/cx.ts + hooks/useValue.ts',
    extra: 'assets/icons/의 ico_*.svg. TextField.tsx·InputBody·FormButton은 불필요',
  },
  {
    component: 'SearchField',
    folders: 'SearchField/ + Icon/ + internal/FieldFrame/ + utils/cx.ts + hooks/useValue.ts',
    extra: 'assets/icons/의 ico_*.svg와 assets/icons/fields/ico_input_clear_focus.svg',
  },
  {
    component: 'Tab / TabClip / SegmentedControl',
    folders:
      '사용할 Tab/·TabClip/·SegmentedControl/ + internal/TabList/ + utils/cx.ts + hooks/useValue.ts + hooks/useHorizontalDrag.ts',
    extra:
      'SegmentedControl에만 Icon/ + assets/icons/의 ico_*.svg 추가. Tab·TabClip은 SVG 파일이 필요하지 않음',
  },
];

export const commonCodeRows = [
  {
    file: 'utils/cx.ts',
    when: '여러 클래스나 조건부 클래스를 합칠 때. 페이지에서도 직접 사용할 수 있습니다.',
    usedBy: 'FormButton·Checkbox 등 여러 컴포넌트',
    note: '기본 클래스와 페이지에서 전달한 className을 합칩니다. false·undefined는 제외합니다. 클래스 하나면 cx 없이 작성해도 됩니다.',
    code: "import { cx } from '../../utils/cx.ts';\n\n// FormButton.tsx 내부: styles는 SCSS Modules, className은 전달받은 속성입니다.\n<button className={cx(styles.button, className)}>확인</button>\n\n// cx('button', undefined) → 'button'\n// cx('button', 'wide') → 'button wide'",
  },
  {
    file: 'utils/assets.ts',
    when: '체크박스·라디오·스위치의 크기·상태별 SVG 연결을 확인하거나 수정할 때.',
    usedBy: 'Checkbox·Radio·Switch 내부',
    note: '페이지에서는 Checkbox·Radio·Switch를 사용합니다. 일반 아이콘 추가 방법은 아이콘 안내를 참고하세요.',
    code: "import { checkboxImages } from '../../utils/assets.ts';\n\n// Checkbox.tsx에서 사용하는 작은 사각형 체크박스의 이미지 목록\nconst images = checkboxImages.square.s;\n// images.off / images.on / images.offDisabled / images.onDisabled",
  },
  {
    file: 'hooks/useValue.ts',
    when: '새 입력·선택 컴포넌트가 문자열 값을 내부에서 관리하거나 외부 value·실행할 함수로 받게 할 때.',
    usedBy: 'TextField·SearchField·SelectField·TabList 내부',
    note: 'value를 전달하면 페이지가 관리하는 값을 보여 줍니다. 생략하면 컴포넌트 안에서 defaultValue부터 값을 관리합니다. ID와 레이블 연결은 useId·getFieldIds가 준비합니다. 간단한 페이지의 값은 useState로 관리하면 됩니다.',
    code: 'import { useValue } from \'../../hooks/useValue.ts\';\n\n// 새 입력 컴포넌트 함수 내부. 아래 세 인자는 해당 컴포넌트의 props입니다.\nconst [current, update] = useValue(value, defaultValue, onValueChange);\n\n<input\n  aria-label="이름"\n  value={current}\n  onChange={(event) => update(event.target.value)}\n/>',
  },
  {
    file: 'hooks/useDialog.ts',
    when: '새 dialog 기반 컴포넌트의 열기·닫기와 배경 스크롤 잠금을 연결할 때.',
    usedBy: 'Modal·BottomSheet 내부',
    note: '기존 Modal·BottomSheet를 쓰는 페이지는 open·onClose만 전달합니다. 직접 만들 때는 제목 연결·취소 처리·포커스도 함께 구현해야 합니다.',
    code: "import { useDialog } from '../../hooks/useDialog.ts';\n\n// Modal.tsx 함수 내부. open은 전달받은 열림 상태입니다.\nconst modalRef = useDialog(open);\n// 반환된 ref를 <dialog ref={modalRef}>에 연결합니다.\n// 제목·취소·포커스 처리를 포함한 전체 구현은 components/Modal/을 참고하세요.",
  },
  {
    file: 'hooks/useHorizontalDrag.ts',
    when: '새 가로 목록에 넘침 감지와 마우스 드래그를 붙일 때.',
    usedBy: 'TabList 내부 → Tab·TabClip·SegmentedControl에서 사용',
    note: '기존 탭 컴포넌트에는 이미 연결되어 있습니다. 직접 쓰면 가로 스크롤 CSS와 data-scrollable·data-dragging에 따른 커서를 함께 작성합니다. 키보드 탭 선택은 TabList가 별도로 처리합니다.',
    code: "import { useHorizontalDrag } from '../../../hooks/useHorizontalDrag.ts';\n\n// TabList.tsx 함수 내부. items는 목록 항목 배열입니다.\nconst drag = useHorizontalDrag(items);\n\n// drag에는 ref·포인터 이벤트·넘침/드래그 상태 속성이 들어 있습니다.\n<div {...drag} className={styles.list}>목록 내용</div>",
  },
];
