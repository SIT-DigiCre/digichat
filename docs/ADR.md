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
- [ADR-002: DevContainer, Docker](#adr-002)
- [ADR-001: Next.js App Router, TypeScript, pnpm](#adr-001)

<h2 id="adr-010">ADR-010: emoji-mart</h2>

### Date

2025-02-23

### Context

emoji-martは、React用の絵文字ピッカーコンポーネントであり、ユーザーが絵文字を簡単に選択できるようにするためのライブラリである。
Mattermostがemoji-martを採用しているため、同じライブラリを選定した。

<h2 id="adr-009">ADR-009: tiptap</h2>

### Date

2025-02-23

### Context

tiptapは、React用のWYSIWYGエディタであり、リッチテキストエディタを簡単に実装するためのライブラリである。
tiptapは、カスタマイズ性が高く、プラグインを使用して機能を拡張することができる。

<h2 id="adr-008">ADR-008: unified</h2>

### Date

2025-02-23

### Context

unifiedは、MarkdownやHTMLなどの異なるフォーマットを統一的に扱うためのライブラリである。

本プロジェクトでは単純なテキストをMarkdownだけでなくTeXやReactコンポーネントに変換する必要があり、高度なカスタム変換が必要になるため、拡張性の高いunifiedやremark, rehypeを採用することにした。

<h2 id="adr-007">ADR-007: Jest</h2>

### Date

2025-12-14

### Context

Jestは、JavaScriptのテストフレームワークであり、ユニットテストや統合テストを簡単に実行することができる。

よりモダンなライブラリであるVitestを検討したが、メンバーにJestの経験者がいることや、Prismaのモックライブラリが存在することからJestを採用することにした。

<h2 id="adr-006">ADR-006: ESLint, Prettier, Stylelint</h2>

### Date

2024-12-14

### Context

ESLintは、JavaScriptの静的コード解析ツールであり、コードの品質を向上させるために使用される。
Prettierは、コードフォーマッターであり、コードのスタイルを統一するために使用される。
Stylelintは、CSSの静的コード解析ツールであり、CSSの品質を向上させるために使用される。

代替としてBiomeを検討したが、カスタムルールの作成に対応していないことや、まだ採用実績が少ないことから見送った。

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

ORMとしてPrismaを採用することで、データベースの操作を簡素化することができる。Prismaはマイグレーション機能が充実しており、データベースのスキーマ変更を簡単に行うことができる。Prisma以外のORMも検討したが、エコシステムの充実度や採用実績を考慮し、Prismaを選択した。

Auth.jsは認証ライブラリであり、Google認証をはじめとするOAuth認証を簡単に実装することができる。

<h2 id="adr-002">ADR-002: DevContainer, Docker</h2>

### Date

2024-12-14

### Context

開発環境をDevContainerで提供することにした。これにより、開発環境の構築が容易になり、メンバー間での環境差異を減らすことができる。
また、Dockerを使用することで、開発環境を簡単に再現できるため、新しいメンバーが参加した際の学習コストを削減できる。
さらに、Dockerを使用することで、開発環境を本番環境に近づけることができるため、デプロイ時のトラブルを減らすことができる。

<h2 id="adr-001">ADR-001: Next.js App Router, TypeScript, pnpm</h2>

### Date

2024-12-14

### Context

Next.jsはReactのフレームワークであり、サーバーサイドレンダリングやファイルベースのルーティングなどの機能を提供している。

現段階においてサークル内にWebアプリケーションの開発経験があるメンバーが少ない。バックエンドにGoを採用することも検討したが、今後のメンバーの学習コストを考慮し、なるべく少ない技術領域で実装できるようフロント・バックともNext.jsで完結させることにした。

また、TypeScriptを採用することで、型安全性を確保し、開発効率を向上させることができる。

pnpmはNode.jsのパッケージマネージャーである。npmよりパッケージのインストール速度が速く、yarnのようにバージョンごとの破壊的変更がないため、pnpmを採用することにした。Bunの採用も検討したが、数は少ないながらも対応しているライブラリがあり、大規模プロジェクトにおける採用には不安が残るため見送った。
