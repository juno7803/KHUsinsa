# 👔 KHUSINSA

**KHUSINSA : 쇼핑몰 재고 관리 서비스**

본 서비스는 쇼핑몰 재고 관리를 위한 KHUSINSA 입니다!   
웹으로 구현하였으며, `python`을 이용하여 크롤링 하여 초기 데이터를 쌓을 수 있습니다.   
인기 쇼핑몰 MUSINSA의 전체 랭킹 페이지를 크롤링 하는 크롤러를 통해   
전체 1부터 100페이지 중 한 페이지를 선택하고, 원하는 순위를 입력하면 크롤러가 데이터를 csv 파일로 만들어줍니다!   
그 이후 자바스크립트를 기반으로 한 `react`와 `node.js`를 이용하여 구현한 웹을 통해   
불러온 재고를 조회, 수정, 추가, 삭제 할 수 있습니다.

## 🔖 프로그램 구조

`KHUSINSA-CLIENT`

- `components` : 재사용이 가능한 component들을 모아놓았습니다.
- `pages` : 기능별 화면을 모아놓은 라우팅 페이지들 입니다.
- `lib` : 서버 통신에 필요한 api 함수들을 모아놓았습니다.

`KHUSINSA-SERVER`

- `controllers` : client에게 줄 데이터를 가공하는 모듈들 입니다.
- `models` : 데이터베이스와 직접 연관된 부분으로, 쿼리문을 통해 db와 connection을 합니다.
- `modules` : 효율적인 개발을 위해 필요한 모듈들을 모아놓았습니다.
- `routes` : api의 라우팅을 담당하고 있습니다.

`KHUSINSA-SCRAPPER`

- `khusinsa.py` : 쇼핑몰 재고 관리 서비스의 초기 데이터 주입을 위한 크롤러 입니다.

## 🌏 개발환경 및 사용 언어

`KHUSINSA-CLIENT`

- Visual Studio Code
- React.js

`KHUSINSA-SERVER`

- Visual Studio Code
- node.js + express
- mysql (aws rds)

`KHUSINSA-SCRAPPER`

- python
(dependency)
- beautifulsoup4
- requests


## 🔎 사용 방법

**Local에서 동작하는 방법을 소개합니다.**
> db만 aws의 RDS를 사용하고 있고, 따로 배포 할 예정은 없습니다.

1. repository clone 하기
    > 원하는 디렉토리에서 khusinsa 를 클론해옵니다.

    ```jsx
    git clone https://github.com/juno7803/KHUsinsa.git
    ```

2. package 파일 설치하기
    > 빌드를 위한 패키지 모듈들을 설치합니다.

    ```jsx
    cd khusina-server
    yarn

    cd khusina-client
    yarn
    ```

3. application 실행하기
    > `yarn start` 로 실행 후 [`localhost:3000`](http://localhost:3000) 으로 접속하여 테스트 할 수 있습니다!

    ```jsx
    cd khusinsa-server
    yarn start
    https://localhost:8000

    cd khusinsa-client
    yarn start
    https://localhost:3000
    ```

## ⭐️ 데모

**웹 크롤러**
![크롤러]

1. 크롤링 하고 싶은 페이지의 넘버를 입력합니다.(무신사엔 1~100 페이지 존재)
2. 크롤링 하고 싶은 랭킹을 "1 20" 과 같은 형태로 입력합니다.(category 부분이 각각의 product 페이지로 들어가야 볼 수 있어서, 크롤링 시간이 오래걸립니다.)
3. 생성된 "khusinsa.csv" 파일을 확인합니다.

![생성된 csv 파일]

**데이터베이스 데이터 삽입**
![db에 데이터 삽입]
- workbench에서 데이터를 추가할 테이블을 우클릭 후 "Table data Import Wizard" 를 통해 csv 파일을 db에 삽입할 수 있습니다.

**웹 페이지**
![초기 화면]

**데이터 조회**
- `GET` 을 이용한 통신
![쿠신사 R]

**데이터 추가**
- `POST` 를 이용한 통신
![쿠신사 C]

**데이터 수정**
- `PUT` 을 이용한 통신

**데이터 삭제**
- `DELETE` 를 이용한 통신


1. db를 비워둔 상태에서의 웹 초기화면은 다음과 같습니다.
2. db에 크롤링한 데이터를 삽입한 뒤 새로고침 하면, 데이터가 성공적으로 추가된 모습을 볼 수 있습니다.
3. 데이터 조회, 수정, 추가, 삭제를 구현한 모습입니다.


## © License
MIT License Copyright(c) [JunHo Lee]   

## ☎️ Contact
Email: junolee7803@gmail.com
