# digichat

芝浦工業大学デジクリのサークル内SNS「digichat」

## 環境設定の手順

### .envの用意

`.env.example`をベースに`.env`を用意する。

```bash
cp .env.sample .env
```

### VSCodeでDevContainerを使用する場合

画面左下の青いところをクリック。
![](docs/images/readme-1.png)

その後、`コンテナーで開く`を選択。しばらく待つとDevContainerが自動で立ち上がる。

### 依存関係のインストール

pnpmでインストールをする

```bash
pnpm install
```

### マイグレーション

データベースのマイグレーションを行う

```bash
pnpm prisma migrate dev
```
### seedデータの適用

マイグレーションが終わったらseedデータを適用する

```bash
pnpm seed
```

### 開発サーバーの起動

devを実行することでサイトが表示される。

```bash
pnpm dev
```

実行後、`localhost:3000`で開発サーバーが起動する

## frontend dependencies

- TypeScript
- Next.js App Router
- Mantine
- ESLint
- Prettier
- Stylelint
