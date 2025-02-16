# wanted-pre-onboarding-challenge-fe-27

<div>
  <img width="500" alt="image" src="https://github.com/user-attachments/assets/a64f239f-7c06-4004-ba85-a6801adec212">
</div>

## 실행 방법

### 1. 백엔드 실행

백엔드 코드는 [해당 레포지토리](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)를 클론하여 실행할 수 있습니다.

### 2. 프론트엔드 실행

프론트엔드 코드는 아래 명령어를 실행한 후, http://localhost:4173 에서 확인할 수 있습니다.

```bash
npm install
npm run build
npm run preview
```

## 기술 스택

- 언어: TypeScript
- 라이브러리: React
- 상태관리: TanStack Query
- 폼 상태 관리: react-hook-form, zod
- 스타일: Tailwind CSS, shadcn

## 디렉토리 구조

```
📁 api
  📁 users (도메인 별로 분리)
    📄 users.api.ts (API 호출 함수)
    📄 users.dto.ts (Request, Response 타입 정의)
  📁 todos
📁 components
  📁 common (공통으로 사용하는 커스텀 UI 컴포넌트)
  📁 feature (기능별 컴포넌트)
  📁 ui (공통으로 사용하는 UI 컴포넌트)
📁 constants
📁 context
📁 hooks
📁 layouts (공통 레이아웃)
📁 lib
📁 routes
  📁 outlets
  📁 pages
  📄 index.tsx (router 객체 작성 및 return RouterProvider)
📁 schemas (유효성 검증 스키마)
📄 main.tsx
```

## 기능

### 로그인 / 회원가입

- Context API로 사용자 인증 상태를 관리하며, 라우팅 가드를 구현하여 페이지 접근 제어를 관리합니다.
- 폼 상태 관리를 위해 react-hook-form을 사용했으며, zod 스키마로 유효성 검사를 적용했습니다.
  Todo

### Todo

- initialValues를 통해 수정 시 기존 데이터를 반영하고, 등록 시 초기화된 폼을 제공하여 하나의 컴포넌트에서 할 일 등록과 수정을 처리할 수 있도록 구현했습니다.
- ErrorBoundary와 QueryErrorResetBoundary를 활용하여 네트워크 요청 중 발생하는 에러를 안전하게 처리합니다.
