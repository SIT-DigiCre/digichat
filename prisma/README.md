# Prisma

## データベースに初期データを入れるとき

同時にデータベースのリセットが行われます。

```bash
pnpm seed
```

## データベースの状態を確認するとき

Web UIでデータベースに投入されているデータを確認することができます。

```bash
npx prisma studio
```

## スキーマに変更を加えるとき

1. `schema.prisma`を変更する
2. `npx prisma migrate dev`を実行する
3. 以下のようなメッセージが表示されるので、適切な名前を入力する

```bash
✔ Enter a name for the new migration:
# 例: add_user_table
```

### ER図の生成

`prisma generate`を実行することで、ER図を生成することができます。

## データベースをリセットするとき

```bash
npx prisma migrate reset
```
