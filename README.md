# React 퍼블리싱 컴포넌트 가이드

TDS 디자인을 기반으로 공통 UI 22종의 모양과 사용 코드를 확인하는 사내 퍼블리싱 가이드입니다. React·TypeScript·Vite·SCSS Modules를 사용합니다.

## 실행

Node.js 지원 버전은 `package.json`의 `engines`를 따릅니다. 저장소를 내려받은 뒤 프로젝트 폴더에서 실행합니다.

```sh
npm ci
npm run dev
```

터미널에 표시된 주소로 접속합니다.

| 명령어                 | 용도                               |
| ---------------------- | ---------------------------------- |
| `npm run format`       | 소스 코드의 줄바꿈과 들여쓰기 정리 |
| `npm run format:check` | 소스 코드 형식 확인                |
| `npm run typecheck`    | TypeScript 타입 오류 확인          |
| `npm run build`        | 타입 검사 후 배포용 파일 생성      |
| `npm run preview`      | 빌드한 화면을 로컬에서 확인        |

## 가이드 사용

- **컴포넌트**: 이름 검색 → 모양·동작 확인 → 사용 코드 복사
- **화면 예제**: 입력창·버튼·바텀시트·모달을 함께 사용하는 신청 화면 확인
- **가져다 쓰기**: 다른 프로젝트에 복사할 파일과 공통 스타일 연결 방법 확인

옵션 표·파일 위치·내부 코드 설명은 필요한 항목을 펼쳐서 봅니다. 코드 복사 버튼은 코드를 펼치지 않고도 사용할 수 있습니다. 색상 변수는 컴포넌트 목록의 색상 안내에서 확인합니다. `?example=request`로 접속하면 신청 예제 화면만 열립니다.

## 폴더 구조

```text
src/
├─ components/          페이지에서 사용하는 UI 22종
│  └─ internal/         UI 내부의 보조 부품 5개
├─ hooks/               React에서 값·동작을 함께 쓰는 공통 함수
├─ utils/               클래스 조합 함수·공통 이미지 목록
├─ styles/              색상 변수·기본 스타일·폰트 로드
│  └─ mixins/           체크박스·라디오·스위치 공통 스타일
├─ assets/              아이콘·폰트·라이선스
├─ pages/               프로젝트 화면을 작성할 위치
└─ guide/               가이드 화면·사용 설명·실행 예제
```

화면과 컴포넌트는 `.tsx`, 일반 함수·데이터·타입은 `.ts`, 컴포넌트별 스타일은 `.module.scss`로 구분합니다.

`components/internal/`에는 ActionButtons·FieldFrame·InputBody·SelectionImages·TabList가 있습니다. 페이지에서는 Button·TextField·Tab 등 공개 컴포넌트를 사용하고, 내부 부품은 해당 컴포넌트에서 불러옵니다.

체크박스·라디오·스위치 공통 스타일은 `src/styles/mixins/_selection.scss`에 있습니다. 각 컴포넌트의 `module.scss`에서 포함하므로 페이지에서 따로 로드하지 않습니다.

## 다른 프로젝트에서 사용

1. `src/components/` 전체(`internal/` 포함), `src/hooks/`, `src/utils/`, `src/assets/icons/`, `src/assets/fonts/`를 같은 상대 경로로 복사합니다. 폰트 라이선스도 함께 가져갑니다.
2. `src/styles/main.scss`, `_base.scss`, `_component-fonts.scss`, `tokens/`, `mixins/`를 복사하고 프로젝트 진입 파일에서 스타일을 한 번 불러옵니다.
3. `src/pages/`에서 필요한 컴포넌트를 조립하고 입력값·클릭 동작을 연결합니다. 간단한 값은 페이지의 `useState`로 관리할 수 있습니다.

```tsx
// 프로젝트 진입 파일에서 한 번 로드
import './styles/main.scss';
```

기존 공통 스타일이 있는 프로젝트는 초기화·폰트 로드가 중복되지 않게 합칩니다. 필요한 컴포넌트만 복사할 경우 가이드의 **가져다 쓰기** 표에서 함께 필요한 파일을 확인합니다. Vite의 SVG 문자열 읽기(`?raw`)와 파일 목록 불러오기(`import.meta.glob`), SCSS Modules를 처리할 수 있는 환경이 필요합니다.

`src/guide/`는 가이드 실행용 코드입니다. UI를 가져다 사용하는 프로젝트에는 복사할 필요가 없습니다. 이 저장소의 가이드 자체를 실행하려면 현재 `App.tsx`가 불러오는 `src/guide/`를 유지합니다.

## 제공 범위

Button·FormButton·TextButton·BottomCTA·TextField·SearchField·SelectField·Checkbox·Radio·Switch·Tab·TabClip·SegmentedControl·Modal·BottomSheet·Toast·Tooltip·Badge·Icon·Header·Accordion·Keypad를 제공합니다.

공통 색상 토큰 77개와 로컬 Pretendard 400·500·600·700을 사용합니다. 기본 색상·모서리 둥글기·아이콘 크기·글자 크기·굵기는 `src/styles/tokens/_primitives.scss`에서 관리합니다. 용도별 색상은 `src/styles/tokens/_semantic-colors.scss`에서 기본 색상에 연결합니다. SCSS 구조 확인 범위는 Button·Icon·Checkbox·Radio입니다. 나머지 컴포넌트의 색상은 Sass 변수 적용 후 확인합니다. 기본 글자 크기는 16px을 기준으로 rem으로 관리합니다. 글자 크기·굵기 토큰은 기존 값에 맞춰 시범 적용했습니다. 행간과 간격은 각 컴포넌트에서 지정합니다. Card List·기기 상태바·JSP·인증·서버 연동은 제공 범위에 포함하지 않습니다. 입력 검사·인증 요청·시간 계산·데이터 저장·화면 이동은 사용하는 프로젝트에서 연결합니다.

## 문서의 역할

- `README.md`: 실행 방법·폴더 구조·사용 안내
- `AGENTS.md`: AI로 코드를 작성하거나 수정할 때 참고할 공통 작업 규칙

실제 사용 옵션과 복사 가능한 예제는 실행한 가이드에서 확인합니다.
