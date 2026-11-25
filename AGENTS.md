# AI 공통 작업 규칙

## 프로젝트 기준

- 이 저장소는 TDS 기반 React 퍼블리싱 컴포넌트와 사용 가이드를 제공합니다. 실행 방법은 `README.md`, 명령어와 패키지 버전은 `package.json`을 기준으로 합니다.
- React·TypeScript·Vite·SCSS Modules 구성을 유지합니다. 화면·컴포넌트는 `.tsx`, 일반 함수·데이터·타입은 `.ts`로 작성합니다. styled-components는 사용하지 않습니다.
- 기존 컴포넌트와 색상 변수를 먼저 확인하고 재사용합니다. 기존 props 이름·기본값·동작은 호환성을 유지하며 수정합니다.
- 디자인 자료는 확인용으로 사용하고 Figma 원본을 수정하지 않습니다. 지원 기기·폭·반응형·화면 이동·업무 동작은 프로젝트 요구사항을 기준으로 구현하며 정적 디자인만 보고 추가하지 않습니다.

## 폴더 역할

- `src/components/컴포넌트명/`: 페이지에서 직접 사용하는 UI. TSX와 해당 컴포넌트의 `module.scss`를 함께 둡니다.
- `src/components/internal/`: ActionButtons·FieldFrame·InputBody·SelectionImages·TabList 등 UI 내부 보조 부품. 페이지와 실행 예제에서는 공개 컴포넌트를 사용합니다.
- `src/hooks/`: React에서 값·동작을 공유하는 공통 훅. 화면 전용 훅은 해당 화면 옆에 둡니다.
- `src/utils/`: 일반 함수 `cx.ts`와 공통 이미지 목록 `assets.ts`. 컴포넌트 전용 타입은 사용처 옆에 둡니다.
- `src/assets/styles/`: 색상 변수·기본 초기화·폰트 로드. 체크박스·라디오·스위치 공통 스타일은 `mixins/_selection.scss`에 두고 각 `module.scss`에서 포함합니다.
- `src/pages/`: 실제 프로젝트 화면. `src/guide/`의 목록·사용 설명·실행 예제·문서 UI와 구분합니다.

## 코드와 스타일

- 전달받은 설정·기본값 → 상태와 HTML 요소 참조 → 표시 조건 → 실행할 함수 → JSX 순서로 읽기 쉽게 작성합니다. 긴 중첩 조건은 이름 있는 변수나 if문으로 풀고 여러 단계의 이벤트는 함수로 분리합니다.
- 간단한 값 전달까지 불필요하게 함수로 감싸거나 새 훅·파일로 나누지 않습니다. JSX 계층과 속성은 줄바꿈하고 SCSS는 속성별로 줄을 나눕니다.
- 전역 SCSS는 색상 변수·초기화·프로젝트 폰트에 사용합니다. 컴포넌트·레이아웃·페이지 스타일은 CSS Modules로 연결합니다.
- 다른 컴포넌트의 빌드된 클래스명을 직접 선택하거나 `:global`로 우회하지 않습니다. 화면에서 필요한 외부 배치는 공개 `className`으로 전달합니다. 기존에 공유하는 스타일은 연결된 사용처와 함께 확인합니다.
- 색상 변수는 기본값(`--gray-25`, `--brand-500`, `--white`)과 용도별 값(`--text-default`, `--bg-page` 등)의 역할을 유지합니다. `color` 접두사는 추가하지 않습니다. 색상 외 공통 글꼴·행간·간격·치수 변수를 임의로 추가하거나 컴포넌트의 개별 값을 공통 규칙으로 확대하지 않습니다.
- 제품 UI와 가이드 본문은 로컬 Pretendard 400·500·600·700을 사용합니다. 코드 표시의 고정폭 글꼴은 유지합니다. 폰트는 `src/assets/styles/_component-fonts.scss`에서 로드하며 원본 파일과 라이선스를 함께 보존합니다.

## 입력과 공통 동작

- TextField의 `kind`(basic·price·email·rrn·phone·code), `variant`(box·line), `label`, `helperText`는 독립적으로 조합합니다. 생략한 레이블·안내문구는 태그와 여백을 남기지 않습니다. 레이블을 생략하면 화면 읽기 프로그램이 읽을 이름을 `aria-label` 또는 `aria-labelledby`로 제공합니다.
- TextField·SearchField·SelectField는 `useId`와 FieldFrame의 `getFieldIds`로 입력창·레이블·설명·오류 연결 정보를 준비합니다. FieldFrame에는 입력 영역을 일반 children으로 넣습니다.
- 실제 input·label·select·datalist를 사용합니다. 체크박스·라디오·스위치의 checked·name·disabled·폼 제출, 탭의 키보드 이동·화면 읽기 프로그램용 연결·스크롤·드래그를 유지합니다. 검색의 한글 조합 Enter 처리와 지우기 후 입력창 포커스 복귀도 유지합니다.
- 입력 검사·오류 및 성공 판정·인증 요청·타이머·금액 계산·데이터 저장은 사용하는 화면에서 연결합니다. `onValueChange`·`onAction`·`onSearch`를 사용하며 주민등록번호 값이나 전체 숫자 예시를 기록하지 않습니다.
- `endAdornment`에 추가한 버튼의 disabled는 사용하는 화면에서 전달합니다. Modal·BottomSheet는 `useDialog`, 탭 계열은 TabList·`useHorizontalDrag`, 하단 버튼 묶음은 ActionButtons의 기존 연결을 유지합니다. 버튼 순서·닫기·키보드 선택 위치·배경 스크롤 잠금을 보존합니다.

## 아이콘과 이미지

- 아이콘 파일은 `ico_` 접두사와 소문자·밑줄을 사용합니다. 일반 SVG는 `src/assets/icons/`, 상태별 SVG는 `icons/selection/`, 입력용 기본 SVG는 `icons/fields/`에 둡니다.
- import 변수는 종류·크기·상태를 알 수 있는 camelCase 이름을 사용합니다. 순번만 있는 이름은 사용하지 않습니다. Icon의 기존 `name`과 원본 파일 연결을 유지하며 기본 `#222222`를 currentColor로 연결하는 규칙을 보존합니다.
- Checkbox·Radio·Switch의 SVG import와 상태별 목록은 `src/utils/assets.ts`에서 관리합니다. 다른 프로젝트로 가져갈 때는 이 파일과 참조하는 선택 상태 SVG 전체를 함께 포함합니다.
- 디자인에서 제공한 기본 SVG는 현재 사용 여부와 관계없이 보존합니다. 불필요한 import 정리와 원본 이미지 삭제를 구분합니다.

## 가이드와 문서

- 메뉴는 컴포넌트·화면 예제·가져다 쓰기로 구성합니다. 미리보기와 코드 복사를 우선하고 옵션·설정·내부 구현 설명은 접어서 제공합니다.
- 사용 예제는 실제 컴포넌트를 실행하고, 같은 TSX를 읽어 복사 코드를 표시합니다. 컴포넌트를 변경하면 가이드의 props 표·사용 예제·함께 복사할 파일·소스 경로를 현재 구현과 맞춥니다.
- 설명은 쉬운 한국어로 작성합니다. 체크박스·라디오·스위치는 이름을 직접 적고, 실행할 함수·안내를 여는 버튼·값을 관리하는 위치처럼 역할을 풀어 씁니다. 실제 props·함수명·파일 경로는 유지합니다.
- README에는 실행·사용 안내를, AGENTS에는 공통 작업 규칙을 작성합니다. 개인 요청·대화 내용·작업자 선호·날짜별 작업 일지·다른 프로젝트의 수정 지시는 기록하지 않습니다.

## 변경 확인

- 코드 변경 후 `npm run format:check`와 타입 검사를 포함한 `npm run build`를 확인합니다. 변경한 동작의 대표 조합을 검증하고 실제 확인한 환경·결과와 확인하지 못한 범위를 구분해 전달합니다.
- 문서만 변경한 경우 파일 경로·명령어·현재 코드와 설명의 일치 여부 및 문서 형식을 확인합니다.
