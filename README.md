# 스룸 FE

## 들어가기

1. **`node` 및 `npm` 설치하기**

   ```bash
    brew install node@18
    ```

2. **vs code 설치하기**
  [Download Visual Studio Code](https://code.visualstudio.com/)

3. **끝😎**

<br>

## 시작하기

**❗️❗️매우 중요❗️❗️**

### 1. 라이브러리 설치

새로운 라이브러리가 추가되었을 수 있기 때문에, **새로 pull 받을 때마다** 아래 명령어를 꼭 실행해서 `node_modules`를 업데이트 해주세요!

```bash
npm install
```

<br>

### 2. 환경변수

gitignore 되어있는 환경변수 파일을 가장 상위(./sroom-fe)에 위치시킨 후, 실행 환경에 맞춰 script를 실행합니다

#### 개발 환경

**개발 환경**에서 열기 위해서는 아래 코드를 실행해주세요 😊
*(개발 환경에서는 Postman Mock Server만 사용)*

```bash
npm run dev
```

❗️ **만약 개발 환경에서 Mock Server 대신 [로컬 백엔드 서버](http://localhost:8080)를 이용하고 싶다면, 아래 코드로 구동해주시면 됩니다**

```bash
npm run dev:local
```

<br>

#### 테스트 환경

**테스트 환경**에서 열기 위해서는 아래 코드를 실행해주세요 😊
*(테스트 환경에서는 Postman Mock Server만 사용)*

```bash
npm run test
```

<br>

#### 프로덕션 환경

**프로덕션 환경**에서 열기 위해서는 아래 스크립트를 실행해주세요 😊
*(프로덕션 환경에서는 실제 백엔드 API만 사용)*

최초, 혹은 pull 받았을 때는 먼저 **빌드**를 해야합니다! 아래 스크립트를 먼저 실행해주세요

```bash
npm run build
```

이후에는 다음과 같이 실행해주시면 됩니다!

```bash
npm run start
```

스크립트 실행 이후, 브라우저에서 [http://localhost:3000](http://localhost:3000)를 실행하면 됩니다!

<br>

## 참고 자료

Next.js에 대해 더 알아보고 싶다면:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js 공식 문서
