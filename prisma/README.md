# Prisma

TODO: 他のPRで`ts-node`が追加されるので、マージされ次第`package.json`の`seed`scriptコマンドを`node`から`ts-node`に変更し、`seed/init.mjs`を`seed/init.ts`にリネームする

## スキーマに変更を加えるとき

1. `schema.prisma`を変更する
2. `npx prisma migrate dev --name what_is_this_change`を実行する

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
