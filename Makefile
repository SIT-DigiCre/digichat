# 開発用DBのマイグレーション
migrate:
	pnpm prisma migrate dev

# 本番用DBのマイグレーション
migrate-prod:
	pnpm prisma migrate deploy

# テスト用DBのマイグレーション
migrate-test:
	pnpm migrate-test

# Prisma Studio
studio:
	pnpm prisma studio

# リポジトリ層のテスト
t-repo: test-repository
test-repository:
	pnpm jest-repository

# 開発用サーバーの起動
dev:
	pnpm dev

# コミット前のチェック
pre-commit:
	pnpm format
	pnpm lint
	pnpm stylelint
