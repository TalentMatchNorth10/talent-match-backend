# 才藝連連 Talent Match(後端)
## [正式環境Swagger](https://talent-match-backend.onrender.com/api-doc/)
## 專案架構
### 資料夾說明
* src
  * connections - 資料庫連線
  * controllers - 控制器
  * models - 模型
  * routes - 路由
  * services - 共用服務
  * swagger - swagger設定
### 專案技術
* Node v18.0.0
* Typescript v5.4.5
* Express v4.16.1
* Mongoose v8.2.1
* Nodemailer v6.9.13
* Swagger Autogen v2.23.7
* Validator v13.11.0
* Ecpay Aio Nodejs v1.2.2
* Jsonwebtoken v9.0.2
* Firebase Admin v12.1.0
### 安裝與啟動
talent-match-backend 專案至本地
```bash
git clone <remote-url>
```
安裝套件
```bash
npm install 
```
啟動專案
* 開發模式
```bash
npm run start:dev
```
* 生產模式
```
npm run start:production
```
### 環境變數說明
```env
PORT= #伺服器監聽的端口號。
DATABASE= #數據庫的名稱或連接字串。
DATABASE_PASSWORD= #用於連接數據庫的密碼。
EMAIL= #應用程序用來發送電子郵件的郵件地址。
GOOGLE_CLIENT_ID= #Google OAuth認證的客戶端ID，用於身份驗證。
GOOGLE_CLIENT_SECRET= #Google OAuth認證的客戶端密鑰。
GOOGLE_CLIENT_GMAIL_REFRESH_TOKEN= #用於刷新Google GMail API的權限令牌。
GOOGLE_REDIRECT_URL= #Google OAuth認證成功後的回調URL。
FRONT_REDIRECT_URL= #前端應用程序的重定向基本URL。
FRONT_RESETPASSWORD_PATH= #前端應用程序中重置密碼頁面的路徑。
JWT_SECRET= #用於簽名JWT（Json Web Tokens）的密鑰。
JWT_REFRESH_SECRET= #用於簽名刷新令牌的密鑰。
JWT_RESETPASSWORD_SECRET= #用於簽名重置密碼JWT的密鑰。
JWT_ACCESS_TOKEN_EXPIRES_IN= #JWT訪問令牌的過期時間。
JWT_REFRESH_TOKEN_EXPIRES_IN= #JWT刷新令牌的過期時間。
JWT_RESETPASSWORD_TOKEN_EXPIRES_IN= #JWT重置密碼令牌的過期時間。
FIREBASE_TYPE= #Firebase服務的類型。
FIREBASE_PROJECT_ID= #Firebase項目的ID。
FIREBASE_PRIVATE_KEY_ID= #Firebase私鑰的ID。
FIREBASE_PRIVATE_KEY= #Firebase服務的私鑰。
FIREBASE_CLIENT_EMAIL= #Firebase服務帳戶的電子郵件地址。
FIREBASE_CLIENT_ID= #Firebase客戶端ID。
FIREBASE_AUTH_URI= #Firebase身份驗證服務的URI。
FIREBASE_TOKEN_URI= #Firebase令牌交換的URI。
FIREBASE_AUTH_PROVIDER_X509_CERT_URL= #Firebase X509證書的URL。
FIREBASE_CLIENT_X509_CERT_URL= #Firebase客戶端X509證書的URL。
MERCHANTID= #商戶ID，用於支付處理。
HASHKEY= #用於加密或驗證的密鑰。
HASHIV= #用於加密或驗證的初始向量（IV）。
CLIENT_RETURN_URL= #客戶端支付完成後的返回URL。
RETURN_URL= #服務端支付完成後的返回URL。
```
## CI/CD 說明

本文檔描述了兩個 GitHub Actions 工作流程：一個用於部署，另一個用於執行代碼檢查。

### 工作流程一：Develop Branch Deploy

這個工作流程在對 `develop` 分支進行推送時觸發，目的是自動部署更新到生產環境。

#### 觸發條件

- **事件**: 推送（push）
- **分支**: `develop`

#### 工作流程詳情

##### Lint 工作

- **運行環境**: Ubuntu 最新版本
- **步驟**:
  1. 檢出代碼。
  2. 設定 Node.js (版本 18)。
  3. 安裝依賴。
  4. 執行 ESLint。

##### 部署

- **依賴**: `lint`
- **運行環境**: Ubuntu 最新版本
- **步驟**:
  1. 使用 `curl` 發送 POST 請求至 RENDER_DEPLOY_HOOK，使用 `RENDER_TOKEN` 進行身份驗證。

### 工作流程二：Develop Branch Pull Requests Check

這個工作流程在對 `develop` 分支發起 pull request 時觸發，旨在執行代碼檢查和 TypeScript 編譯檢查。

#### 觸發條件

- **事件**: 拉取請求（pull request）
- **分支**: `develop`

#### 工作流程詳情

##### Lint 工作

- **運行環境**: Ubuntu 最新版本
- **步驟**:
  1. 檢出代碼。
  2. 設定 Node.js (版本 18)。
  3. 安裝依賴。
  4. 執行 ESLint。

##### TypeScript 編譯檢查

- **運行環境**: Ubuntu 最新版本
- **步驟**:
  1. 檢出代碼。
  2. 設定 Node.js (版本 18)。
  3. 安裝依賴。
  4. 執行 `tsc --noEmit`，進行代碼類型檢查但不輸出文件。
## 聯絡開發人員
* Thomas [Github連結](https://github.com/th1230)
* Olive [Github連結](https://github.com/emmablur)
* 刺蝟 [Github連結](https://github.com/hedgehog-chien)
* Shiba0926 [Github連結](https://github.com/justine92415)