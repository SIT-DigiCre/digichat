# Prisma

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
