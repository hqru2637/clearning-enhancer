# CLearning Enhancer

## 機能

- DateEnhancer  
  課題一覧画面の日付表示に曜日を追加
- HighlightPage  
  サイドバーに現在開いている講義をハイライト表示
- EnterAttendance  
  出席キー入力後にEnterキーで出席ボタンを押させる
- MarkAsRead  
  講義ページに「全て既読にする」ボタンを追加
- ShowPDFTitle  
  PDFファイルのタブ名に正しいタイトルを表示


## インストール
- [リリースページ](https://github.com/hqru2637/clearning-enhancer/releases)から最新のzipファイルをダウンロードし、任意の場所に展開
- `chrome://extensions/` を開き、右上の「デベロッパーモード」を有効にする
- 「パッケージ化されていない拡張機能を読み込む」をクリック
- 展開したフォルダを選択
- 完了

> [!WARNING]
> chromeはフォルダを直接参照して拡張機能を読み込むため、はじめに展開したフォルダの移動・削除は行わないでください。

## 開発

### 前提条件

- Node.js (24以上)
- Bun

### セットアップ

1. 依存関係をインストール
```bash
bun i
```

2. ビルド
```bash
bun run build
```

### Chrome拡張機能として読み込み

1. Chromeで `chrome://extensions/` を開く
2. 「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. プロジェクトの `dist` フォルダを選択

### 開発モードでの実行
```bash
bun dev
```

## ライセンス

MIT License
