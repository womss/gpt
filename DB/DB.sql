create database sample;
use sample;

CREATE TABLE Login (
  user_id             VARCHAR(50)  NOT NULL COMMENT '아이디(기본키)',
  password            VARCHAR(255) NOT NULL COMMENT '비밀번호',
  username            VARCHAR(100) NOT NULL COMMENT '닉네임',
  phone               VARCHAR(20)  NOT NULL COMMENT '전화번호',
  email               VARCHAR(100) NOT NULL COMMENT '이메일',
  grade               INT          NOT NULL COMMENT '구독 등급',
  created_signup_time TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '회원가입 시간',
  PRIMARY KEY (user_id)
) COMMENT='회원 테이블';


INSERT INTO Login (user_id, password, username, phone, email, grade, created_signup_time)
VALUES ('user123', 'password1234', '홍길동', '010-1234-5678', 'hong@example.com', 1, NOW());



CREATE TABLE Categories (
  category_id           INT          NOT NULL AUTO_INCREMENT COMMENT '카테고리 번호(기본키)',
  user_id               VARCHAR(50)  NOT NULL COMMENT '아이디(외래키)',
  category_name         VARCHAR(100) NOT NULL COMMENT '카테고리 이름',
  created_category_time TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP COMMENT '카테고리 생성 시간',
  PRIMARY KEY (category_id),
  CONSTRAINT FK_Login_TO_Categories FOREIGN KEY (user_id) REFERENCES Login (user_id)
) COMMENT='카테고리';

select * from Categories;




CREATE TABLE Elements_name (
  elements_name_id INT          NOT NULL AUTO_INCREMENT COMMENT '요소 이름 (기본키)',
  category_id      INT          NOT NULL COMMENT '카테고리 번호(외래키)',
  elements_name    VARCHAR(100) NOT NULL COMMENT '요소 이름',
  elements_price   INT          NOT NULL COMMENT '요소 가격',
  elements_image   VARCHAR(255) NOT NULL COMMENT '이미지 주소',
  PRIMARY KEY (elements_name_id),
  CONSTRAINT FK_Categories_TO_Elements_name
    FOREIGN KEY (category_id)
    REFERENCES Categories (category_id)
    ON DELETE CASCADE
) COMMENT='카테고리 요소 헤더';



CREATE TABLE Elements_data (
  elements_id      INT          NOT NULL AUTO_INCREMENT COMMENT '요소 번호(기본키)',
  elements_name_id INT          NOT NULL COMMENT '요소 이름(외래키)',
  key_name         VARCHAR(100) NOT NULL COMMENT '키 이름',
  value_name       VARCHAR(255) NOT NULL COMMENT '값 이름',
  PRIMARY KEY (elements_id),
  CONSTRAINT FK_Elements_name_TO_Elements_data 
    FOREIGN KEY (elements_name_id) 
    REFERENCES Elements_name (elements_name_id)
    ON DELETE CASCADE
) COMMENT='요소';


CREATE TABLE Bill (
  Bill_id           INT          NOT NULL AUTO_INCREMENT COMMENT '계산서(기본키)',
  user_id           VARCHAR(50)  NOT NULL COMMENT '아이디(외래키)',
  elements_id       INT          NOT NULL COMMENT '요소 기본키(외래키)',
  Bill_name         VARCHAR(100) NOT NULL COMMENT '계산서 이름',
  created_bill_time TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '계산서 생성 시간',
  PRIMARY KEY (Bill_id),
  CONSTRAINT FK_Login_TO_Bill FOREIGN KEY (user_id) REFERENCES Login (user_id),
  CONSTRAINT FK_Elements_name_TO_Bill FOREIGN KEY (elements_id) REFERENCES Elements_name (elements_name_id)
) COMMENT='계산서';

CREATE TABLE Sorter (
  sorter_id   INT          NOT NULL AUTO_INCREMENT COMMENT '정렬자(기본키)',
  user_id     VARCHAR(50)  NOT NULL COMMENT '아이디(외래키)',
  elements_id INT          NULL COMMENT '들어온 요소(외래키)',
  sorter_name VARCHAR(100) NOT NULL COMMENT '정렬자 이름',
  PRIMARY KEY (sorter_id),
  CONSTRAINT FK_Login_TO_Sorter FOREIGN KEY (user_id) REFERENCES Login (user_id)

) COMMENT='정렬자';

drop table Sorter;

select * from categories;



select * from elements_name;
drop table elements_name;
select * from Elements_data;

