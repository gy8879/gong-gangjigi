# GapGenie Pro - CNU 공강 시간 추천 서비스

충남대학교 학생들을 위한 공강 시간 활용 추천 서비스입니다.

## 🚀 주요 기능

- **AI 기반 추천**: 관심사와 공강 시간에 맞춘 맞춤형 활동 추천
- **캠퍼스 맵**: 공강 시간 활용을 위한 추천 장소 안내
- **일정 관리**: 공강 시간 체계적 관리 및 알림
- **개인화**: 사용자 관심사 기반 맞춤 서비스

## 📱 화면 구성

- **🏠 홈**: 환영 메시지, 관심사 선택, AI 추천
- **💡 추천**: AI 기반 맞춤형 활동 추천
- **📅 캘린더**: 공강 일정 관리 및 계획
- **👤 프로필**: 사용자 정보 및 설정
- **🗺️ 맵**: 캠퍼스 내 추천 장소 안내

## 🛠️ 기술 스택

- **프레임워크**: Expo + React Native
- **라우팅**: Expo Router
- **언어**: TypeScript
- **상태 관리**: Zustand
- **지도**: react-native-maps
- **위치**: expo-location
- **알림**: expo-notifications

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn
- Expo CLI
- Expo Go 앱 (모바일 테스트용)

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/사용자명/gongangjigi.git
cd gongangjigi
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 시작**
```bash
npx expo start
```

4. **모바일에서 테스트**
- Expo Go 앱 설치
- QR 코드 스캔

## 👥 협업 가이드

### 브랜치 전략
- **main**: 프로덕션 브랜치
- **develop**: 개발 브랜치
- **feature/기능명**: 새로운 기능 개발
- **hotfix/버그명**: 긴급 버그 수정

### 커밋 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드 추가
chore: 빌드 업무 또는 보조 도구 변경
```

### 작업 흐름
1. **feature 브랜치 생성**
```bash
git checkout -b feature/새로운기능
```

2. **개발 및 커밋**
```bash
git add .
git commit -m "feat: 새로운 기능 추가"
```

3. **develop 브랜치에 머지**
```bash
git checkout develop
git merge feature/새로운기능
```

4. **main 브랜치에 배포**
```bash
git checkout main
git merge develop
git push origin main
```

## 📁 프로젝트 구조

```
gongangjigi/
├── app/                    # Expo Router 페이지
│   ├── (tabs)/            # 탭 네비게이션
│   │   ├── index.tsx      # 홈 화면
│   │   ├── two.tsx        # 추천 화면
│   │   ├── calendar.tsx   # 캘린더 화면
│   │   ├── profile.tsx    # 프로필 화면
│   │   └── map.tsx        # 맵 화면
│   └── _layout.tsx        # 루트 레이아웃
├── components/             # 재사용 컴포넌트
├── lib/                    # 유틸리티 함수
├── data/                   # Mock 데이터
├── assets/                 # 이미지, 폰트 등
└── package.json            # 프로젝트 설정
```

## 🔧 개발 환경 설정

### VS Code 확장 프로그램
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **TypeScript Importer**

### 환경 변수
`.env.local` 파일 생성:
```env
EXPO_PUBLIC_API_URL=your_api_url_here
```

## 📱 빌드 및 배포

### Android APK 빌드
```bash
npx expo build:android
```

### iOS 빌드
```bash
npx expo build:ios
```

## 🤝 기여하기

1. 이 저장소를 Fork
2. feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**GapGenie Pro**와 함께 공강 시간을 더욱 의미있게 만들어보세요! 🎉

