#Tavif AVIF/WEBP Converter App

このプロジェクトは、**Rustの[Tauriフレームワーク](https://tauri.app/)**と**[Next.js](https://nextjs.org/)**を使用して開発された、軽量かつ高速なAVIF/WEBP形式の画像変換デスクトップアプリケーションです。

## 特徴

- **軽量**: Tauriを使用することで、アプリのバイナリサイズを最小限に抑えています。
- **高速**: Rustのパフォーマンスを活かし、高速な画像変換処理を実現しています。
- **直感的なUI**: Next.jsを活用したシンプルで使いやすいユーザーインターフェース。
- **AVIFとWEBPへの変換**: JPG,PNG,WEBP形式の画像をAVIF形式とWEBP形式に変換することををサポートしています。

## スクリーンショット

![screenshot](https://github.com/user-attachments/assets/f76f478f-1467-4c7a-a123-e3f9f74a62bb)

## インストール

以下の手順でアプリケーションをインストールできます：

### 1. このリポジトリをクローンします：
   ```bash
   git clone https://github.com/harumiWeb/tavif.git
   cd tavif
   ```

### 2. 依存関係をインストールします：

  #### Next.jsの依存関係
  - 必要なパッケージをインストールします。
   ```bash
   npm install
   ```

### 3. 開発サーバーを起動します：
   ```bash
   npm run tauri dev
   ```

## ビルド

  リリースビルドを作成するには、以下のコマンドを実行します：

   ```bash
   npm run tauri build
   ```

   - ビルドが完了したら、`src-tauri/target/release/`ディレクトリに生成されます。

## 使用方法

1. アプリケーションを起動します。
2. 変換したい画像ファイルをドラッグ＆ドロップで追加します。
3. 出力フォーマット（AVIFまたはWEBP）を選択します。
4. 「変換」ボタンをクリックして画像を変換します。

## 開発環境

- フロントエンド: Next.js
- バックエンド: Tauri（Rust）
- 言語: TypeScript（フロントエンド）、Rust（バックエンド）

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)で提供されています。

## 開発者

- 開発者: harumiWeb
- メール: [halpost](https://www.halpost.tech/contact)
- GitHub: [harumiWeb](https://github.com/harumiWeb)
- X: [@HarumiWebDesign](https://x.com/HarumiWebDesign)

ご質問やフィードバックがあれば、気軽にIssueを作成してください！