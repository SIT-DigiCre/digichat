# Prisma

TODO: 他のPRで`ts-node`が追加されるので、マージされ次第`package.json`の`seed`scriptコマンドを`node`から`ts-node`に変更し、`seed/init.mjs`を`seed/init.ts`にリネームする

## スキーマに変更を加えるとき

1. `schema.prisma`を変更する
2. `npx prisma migrate dev`を実行する
3. 以下のようなメッセージが表示されるので、適切な名前を入力する

```bash
✔ Enter a name for the new migration:
# 例: add_user_table
```

## データベースをリセットするとき

```bash
npx prisma migrate reset
```

## データベースに初期データを入れるとき

```bash
pnpm run seed
```

## データベースの状態を確認するとき

```bash
npx prisma studio
```
