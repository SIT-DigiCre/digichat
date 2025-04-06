# Architecture Decision Record (ADR)

## 目次

- [ADR-010: emoji-mart](#adr-010)
- [ADR-009: tiptap](#adr-009)
- [ADR-008: unified](#adr-008)
- [ADR-007: Jest](#adr-007)
- [ADR-006: ESLint, Prettier, Stylelint](#adr-006)
- [ADR-005: CSS Modules](#adr-005)
- [ADR-004: Mantine](#adr-004)
- [ADR-003: PostgreSQL, Prisma, Auth.js](#adr-003)
- [ADR-002: DevContainer](#adr-002)
- [ADR-001: Next.js App Router, TypeScript, pnpm](#adr-001)

<h2 id="adr-010">ADR-010: emoji-mart</h2>

### Date

2025-02-23

### Context

emoji-martは、React用の絵文字ピッカーコンポーネントであり、ユーザーが絵文字を簡単に選択できるようにするためのライブラリです。
emoji-martは、絵文字の検索やフィルタリング機能を提供しており、ユーザーが必要な絵文字を迅速に見つけることができます。

<h2 id="adr-009">ADR-009: tiptap</h2>

### Date

2025-02-23

### Context

tiptapは、React用のWYSIWYGエディタであり、リッチテキストエディタを簡単に実装するためのライブラリです。
tiptapは、カスタマイズ性が高く、プラグインを使用して機能を拡張することができます。

<h2 id="adr-008">ADR-008: unified</h2>

### Date

2025-02-23

### Context

unifiedは、MarkdownやHTMLなどの異なるフォーマットを統一的に扱うためのライブラリです。
unifiedは、MarkdownをHTMLに変換するためのプラグインを提供しており、Markdownのパースや変換を柔軟に行うことができます。

<h2 id="adr-007">ADR-007: Jest</h2>

### Date

2025-12-14

### Context

Jestは、JavaScriptのテストフレームワークであり、ユニットテストや統合テストを簡単に実行することができます。

<h2 id="adr-006">ADR-006: ESLint, Prettier, Stylelint</h2>

### Date

2024-12-14

### Context

ESLintは、JavaScriptの静的コード解析ツールであり、コードの品質を向上させるために使用されます。
Prettierは、コードフォーマッターであり、コードのスタイルを統一するために使用されます。
Stylelintは、CSSの静的コード解析ツールであり、CSSの品質を向上させるために使用されます。

<h2 id="adr-005">ADR-005: CSS Modules</h2>

### Date

2024-12-14

### Context

CSS Modulesは、CSSのスコープをコンポーネント単位で管理するための技術であり、スタイルの衝突を防ぐことができる。
Tailwind CSSの導入も検討したが、複雑なUIを構築する場合、Tailwind CSSのユーティリティクラスが多くなり、可読性が低下する可能性があるため、CSS Modulesを採用することにした。

<h2 id="adr-004">ADR-004: Mantine</h2>

### Date

2024-12-14

### Context

MantineはReactのUIコンポーネントライブラリであり、デザインシステムを構築するためのコンポーネントやスタイルを提供している。
コンポーネントやhooksの多さ、リリース頻度、React Server Componentへの対応などを考慮し、開発スピード向上とデザインの統一感を得るために採用することにした。

<h2 id="adr-003">ADR-003: PostgreSQL, Prisma, Auth.js</h2>

### Date

2024-12-14

### Context

既存の部内システムではMySQLを使用することが多かったが、拡張性の観点からPostgreSQLを採用することにした。

また、ORMとしてPrismaを採用することで、データベースの操作を簡素化し、開発効率を向上させることができる。
PrismaはTypeScriptとの相性が良く、型安全なクエリを生成することができるため、開発者の生産性を向上させることができる。
Prismaはマイグレーション機能が充実しており、データベースのスキーマ変更を簡単に行うことができるため、開発チームの生産性を向上させることができる。

Auth.jsは認証ライブラリであり、Google認証を簡単に実装することができる。

<h2 id="adr-002">ADR-002: DevContainer</h2>

### Date

2024-12-14

### Context

開発環境をDockerで構築することにした。これにより、開発環境の構築が容易になり、メンバー間での環境差異を減らすことができる。
また、Dockerを使用することで、開発環境を簡単に再現できるため、新しいメンバーが参加した際の学習コストを削減できる。
さらに、Dockerを使用することで、開発環境を本番環境に近づけることができるため、デプロイ時のトラブルを減らすことができる。

<h2 id="adr-001">ADR-001: Next.js App Router, TypeScript, pnpm</h2>

### Date

2024-12-14

### Context

現段階においてサークル内にWebアプリケーションの開発経験があるメンバーが少ない。バックエンドにGoを採用することも検討したが、今後のメンバーの学習コストを考慮し、フロントエンドにNext.jsを採用することにした。

Next.jsはサーバーサイドレンダリングや静的サイト生成などの機能が充実しているため、機能拡張性が高い。

また、TypeScriptを採用することで、型安全性を確保し、開発効率を向上させることができる。

pnpmはNode.jsのパッケージマネージャーであり、依存関係の管理が容易であるため、開発効率を向上させることができる。
pnpmはパッケージのインストール速度が速く、ディスクスペースの使用量が少ないため、開発環境の構築が容易になる。
