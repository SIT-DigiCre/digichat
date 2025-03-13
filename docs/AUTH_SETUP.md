# 認証のセットアップ(暫定対応)

1. `.env` ファイルを更新 (メンテナーに聞いてください)
2. 開発サーバを起動する
3. Postman等を使用してAPIを叩き、ユーザーを仮登録する(下記参照)
4. Prisma Studioを起動、User テーブルを開き verifiedAt が null のユーザーデータが作成されていることを確認
5. `http://localhost:3000/login` にアクセス
6. 大学Googleアカウントを選択してログイン
7. ログインに成功した場合、 localhost:3000/joined に移行する
   失敗した場合は 3. からやり直す
   (この時点では /channels 等のページを開こうとしても /joined にリダイレクトされるようになっている)
8. Joinedページの手順を全て完了し、「Digichatをはじめる」ボタンを押す
9. /channels 下など、他ページを開けることを確認
10. Prisma Studioを開き、先ほどの User の verifiedAt に本登録を行った日時が書き込まれていることを確認

## リクエスト形式

- URL: `http://localhost:3000/api/ext/users/create`
- Method: `POST`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: {EXT_API_SECRET}`
- Body:
  ```json
  {
    "name": "テストユーザー",
    "email": "(大学メールアドレス)",
    "slug": "(一意な文字列)"
  }
  ```
