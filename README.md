# CLearning Enhancer

## 機能

- DateEnhancer
  課題一覧画面の日付表示に曜日を追加
- HighlightPage
  サイドバーに現在開いている講義をハイライト表示
- 🚧 EnterAttendance
  出席キー入力後にEnterキーで出席ボタンを押させる


## 開発

### 前提条件

- Node.js (24以上)
- pnpm

### セットアップ

1. 依存関係をインストール
```bash
pnpm install
```

2. ビルド
```bash
pnpm build
```

### Chrome拡張機能として読み込み

1. Chromeで `chrome://extensions/` を開く
2. 「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. プロジェクトの `dist` フォルダを選択

### 開発モードでの実行
```bash
pnpm dev
```

## ライセンス

MIT License
