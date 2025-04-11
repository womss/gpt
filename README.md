이 문서는 Sortic 백엔드(Java), 프론트엔드(React) 개발을 위한 IntelliJ 환경 설정 가이드입니다.
프로젝트 클론 후 반드시 1회 설정하세요.

🧩 1. 공통 개발 환경
항목            버전
IntelliJ IDEA	2022.3 이상
Java SDK        17
Node.js         18 이상
Gradle          Wrapper 사용 (./gradlew)
Lombok          플러그인 설치 + annotation processing 활성화

☕ 2. 백엔드 (Java + Spring Boot)
✅ 필수 IntelliJ 설정
1) JDK 설정
File > Project Structure > Project
    - Project SDK → Java 17
Modules 탭에서도 각 모듈마다 SDK가 Java 17인지 확인

2) Lombok 플러그인 설치
Settings > Plugins > Marketplace
    - Lombok 검색 후 설치
    - IntelliJ 재시작

3) Annotation Processing 활성화
Settings > Build, Execution, Deployment > Compiler > Annotation Processors
    - ✅ Enable annotation processing 체크

4) Gradle 설정 (최소한 한 번은 확인)
Settings > Build Tools > Gradle
    - Build and run using → Gradle
    - Run tests using → Gradle
    - Gradle JVM → Java 17

⚛️ 3. 프론트엔드 (React)
✅ 실행 방법
///// bash /////
cd frontend
npm install
npm start
    - node_modules/는 Git에 포함되지 않으므로, 클론 후 반드시 npm install 필요

🔐 4. 환경 변수 (.env)
.env는 개인 개발 환경에 따라 달라지므로 직접 작성해야 합니다.
.env.example 참고해서 작성하세요:
///// bash /////
cp .env.example .env

🧹 5. Git 관련 정리 (.gitignore 기준)
Git에 포함하지 않아야 할 것들:
    node_modules/
    .idea/
    *.iml
    .env
    /build, /dist, target/, .gradle/
위 파일들은 커밋하지 않도록 .gitignore로 차단되어 있음

💡 6. 실무 팁
상황	해야 할 것
백엔드 실행 안 됨	Java 버전 확인, Lombok/annotation 설정 확인
프론트 안 됨	npm install 했는지, public/index.html 있는지 확인
커밋 충돌 자주 남	.idea 공유 여부 확인 / .gitignore 재확인