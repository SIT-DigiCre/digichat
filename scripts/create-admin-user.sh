#!/bin/bash

# 環境変数の確認
if [ -z "$ADMIN_EMAIL" ]; then
    echo "❌エラー: 環境変数`ADMIN_EMAIL`が設定されていません"
    exit 1
fi

# ユーザー名とスラッグの生成
ADMIN_NAME="Admin User"
ADMIN_SLUG=$(echo $ADMIN_EMAIL | cut -d@ -f1)

# APIリクエストの実行
curl -X POST http://localhost:3000/api/ext/users/create \
  -H "Content-Type: application/json" \
  -H "Authorization: ${EXT_API_SECRET}" \
  -d "{
    \"name\": \"${ADMIN_NAME}\",
    \"email\": \"${ADMIN_EMAIL}\",
    \"slug\": \"${ADMIN_SLUG}\"
  }"

echo "✅テスト用管理者ユーザーの作成が完了しました" 
