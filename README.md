# GritStandard 과제

## 0. 과제배경

- Grit Standard는 물류를 위한 다양하고 많은 정보들을 사용자들로 부터 입력받습니다.
- 준비한 과제의 내용은 기본적인 form과 관련된 내용을 준비하였습니다.
- Grit Standard의 FE개발자는 사용자의 입력을 받아서 관리하고 저장 / 삭제 / 수정 등의 기능을 구현할 수 있어야 합니다

## 1. 안내사항

- 과제는 필수 구현과 선택 구현으로 나뉘어 있습니다. 필수 구현은 반드시 구현해야 하는 기능이며, 선택 구현은 추가적인 기능을 구현할 수 있는 부분입니다.
- 필수 구현을 모두 구현한 경우 선택 구현을 통해 추가점수를 획득할 수 있습니다.
- 선택 구현을 구현하지 않은 경우에도 필수 구현만으로도 평가합니다.
- 해당 과제를 수행하면서 어려웠던 점, 구현하면서 고민했던 점, 추가하고 싶은 기능 등을 README.md에 작성해주세요.

## 1-1. 평가방법

- ui는 자유롭게 구현하셔도 좋습니다. (css framework 사용 가능)
- 필수구현을 모두 구현했을 경우, 선택구현을 통해 추가점수를 획득할 수 있습니다.
- 실제 실무를 하는 동료의 입장에서 코드의 가독성, 유지보수성, 확장성을 평가합니다.
- 폴더구조와 파일명, 변수명, 함수명 등이 명확하고 의미가 있는지를 평가합니다.

## 1-2. 필수 구현

- [ ] 사용자 정보를 table로 렌더링
  - 사용자의 이름 (firstName, lastName)
  - 사용자의 역할
  - 사용자의 이메일
  - 사용자의 전화번호
- [ ] table row를 클릭하면 해당 row의 정보를 form에 렌더링
- [ ] table의 row를 클릭하면 해당 row의 배경색이 변경되어야 함
- [ ] form에는 사용자의 이름, 이메일, 전화번호, 역할이 렌더링
- [ ] form의 적절한 input을 통해 사용자의 정보를 수정할 수 있어야 함
  - 이름은 input 2개로 나누어서 firstName, lastName으로 입력
  - 이메일은 input으로 입력
  - 전화번호는 input으로 입력
  - 역할은 select로 입력
- [ ] form의 수정 버튼이 있어서 수정된 정보를 table에 반영할 수 있어야 함

## 1-3. 선택구현

### 프로젝트 세팅

- [ ] eslint, prettier, husky, lint-staged를 사용하여 코드퀄리티를 관리할 수 있어야 함
- [ ] typescript를 사용하여 코드를 작성할 수 있어야 함

### 기능구현

- [ ] table 상단의 select를 통해 사용자의 역할을 필터링할 수 있어야 함
- [ ] 검색결과와 pagination 상태는 새로고침 후에도 유지되어야 함
- [ ] table의 row를 multi select하여 사용자의 role을 User로 변경할 수 있어야 함 (API 호출 필요)
- [ ] form의 전화번호 입력시 '-'를 자동으로 추가하여 렌더링할 수 있어야 함
- [ ] form의 각 항목은 validation을 통과해야만 수정 버튼이 활성화 되어야 함
  - 모든항목은 필수 입력사항이어야 함
  - firstName, lastName은 2글자 이상이어야 함
  - 이메일은 이메일 형식이어야 함
  - 전화번호는 숫자만 입력가능하고 10자리 이상이어야 함
  - 역할은 ADMIN, USER, GUEST 중 하나여야 함
- [ ] form이 수정 중일때는 뒤로가기, 다른페이지의 링크를 클릭하면 경고창을 띄울 수 있어야 함

## 1-4. 기타참고 라이브러리

- 라이브러리에 제한은 없으나 아래는 참고용으로 제공합니다.
- table : [tanstack-table](https://tanstack.com/table/latest/docs/introduction)

## 2. API 문서

### 기본 URL

모든 API 요청에 대한 기본 URL은 `/api` 입니다.

### 엔드포인트

#### 1. **GET `/users`**

사용자 역할에 따른 필터링 및 페이지네이션을 선택적으로 사용하여 사용자 목록을 검색합니다.

| 파라미터  | 타입 | 설명                                                     | 기본값 |
| --------- | ---- | -------------------------------------------------------- | ------ |
| `page`    | int  | 검색할 사용자 페이지를 지정합니다.                       | 1      |
| `perPage` | int  | 페이지당 사용자 수입니다.                                | 5      |
| `role`    | enum | 사용자의 역할 (`ADMIN`, `USER`, `GUEST`)로 필터링합니다. | 없음   |

##### 응답:

- **200 OK**
  - **내용:**
    ```json
    {
      "users": [
        {
          "id": "1",
          "firstName": "John",
          "lastName": "Doe",
          "email": "john.doe@example.com",
          "role": "USER",
          "telephone": "123-4567-8901"
        }
      ],
      "page": 1,
      "perPage": 5,
      "total": 20
    }
    ```
- **400 Bad Request**
  - **내용:** `{"message": "Validation errors"}` (오류 세부사항은 상황에 따라 다름)
- **500 Internal Server Error**
  - **내용:** `{"message": "Internal Server Error"}`

#### 2. **PATCH `/users/:id`**

ID로 식별된 특정 사용자의 상세 정보를 업데이트합니다.

| 파라미터 | 타입   | 설명                                   |
| -------- | ------ | -------------------------------------- |
| `id`     | string | 업데이트할 사용자의 고유 식별자입니다. |

##### 요청 본문:

- `PatchUserSchema`에 따라야 하며, 다음 테이블에 명시된 속성을 포함할 수 있습니다.

| 속성        | 타입   | 필수 여부 | 설명              |
| ----------- | ------ | --------- | ----------------- |
| `firstName` | string | 선택적    | 사용자의 이름     |
| `lastName`  | string | 선택적    | 사용자의 성       |
| `email`     | string | 선택적    | 사용자의 이메일   |
| `role`      | enum   | 선택적    | 사용자의 역할     |
| `telephone` | string | 선택적    | 사용자의 전화번호 |

##### 응답:

- **200 OK**
  - **내용:** 업데이트된 사용자 객체 (위 예제 참조)
- **400 Bad Request**
  - **내용:** `{"message": "Validation errors"}` (오류 세부사항은 상황에 따라 다름)
- **500 Internal Server Error**
  - **내용:** `{"message": "Internal Server Error"}`

#### 3. **POST `/users/change-role-user`**

지정된 사용자의 역할을 `USER`로 변경합니다.

##### 요청 본문:

- `PostUserRoleSchema`에 따라야 하며, 사용자 ID 배열(`ids`)을 포함해야 합니다.

| 속성  | 타입            | 필수 여부 | 설명                         |
| ----- | --------------- | --------- | ---------------------------- |
| `ids` | array of string | 필수      | 역할을 변경할 사용자 ID 배열 |

##### 응답:

- **200 OK**
  - **내용:** `{"message": "Success"}`
- **400 Bad Request**
  - **내용:** `{"message": "Validation errors"}` (오류 세부사항은 상황에 따라 다름)
- **500 Internal Server Error**
  - **내용:** `{"message": "Internal Server Error"}`

## 3. 제출방법

- node_modules를 제외한 소스코드를 담아 압축하여 담당자의 이메일로 보내주세요
- 필요하신 경우 제출하신 레포지토리에 README.md에 작성하신 고민한 점, 추가하고 싶은 기능 등을 작성해주세요.
