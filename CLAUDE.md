# CLAUDE.md

above the clouds(Tylerのワンオペ映像制作。ファッション/インタビュー/PR映像が主力)のサイト。ビルドなしの静的HTML/CSS/JS。観光思い出映像はPhase 2で未公開。目標は2月の出産までに事業を安定させること(大規模な作り直しより着実な前進)。

## ルール

- 日本語、結論先、1文45字以内の「です・ます」。挨拶・前置き不要。専門用語は説明を添える
- 資料にない数字・実績・固有名詞を書かない。分からないことは「分からない」と言う
- 大きい作業は先に案を出して合意を取る。既存ファイルは確認なしに削除・上書きしない
- **push/デプロイは毎回Tylerの明示OKを取ってから**
- 文章は見出し・装飾コピーは最小限。ただし経歴・実績など信頼に関わる本文は事実の範囲でしっかり書く
- 動画は元のアスペクト比を守る(`.media-frame`に`style="aspect-ratio: W / H"`を付け、切り抜かない)。ヒーロー動画は全画面表示用なので対象外

## 運用

- プレビュー: `python3 -m http.server 5173`
- デプロイ(手動。Vercel自動連携は未設定): `git push origin main` → `npx --yes vercel --prod --yes`
- 本番 https://above-the-clouds-site.vercel.app / GitHub tairahd12-ui/above-the-clouds-site(公開リポジトリ)
- CSS/JSは`?v=YYYYMMDD`付き。変更したら全HTMLの版番号を上げる。手順の詳細は`../.claude/skills/website-ops/SKILL.md`

## 構成

- 5ページ(index/about/works/service/contact)。ヘッダー・フッターは各ページに手書きで重複しているため、変更時は全ファイル更新
- 英語版は`en/`に同じ5ページ。パスは`../`始まり。日本語版の内容(実績・料金など)を変えたら英語版も更新
- `js/main.js`はJP/EN共通。`HERO_CLIPS`(TOPのヒーロー動画リスト)のパスは`/assets/...`のルート相対にする(相対だと`en/`で壊れる)。問い合わせフォームは`mailto:`方式(宛先は`CONTACT_EMAIL`)
- `css/style.css`はCSS変数ベースでモノクロ方針。彩度の高い色を足さない。スマホ調整はファイル末尾の「mobile」ブロック
- `assets/`はページ別(top/works/about)。動画には同名の`.jpg`ポスターを置き、Works/Aboutは`preload="none"`

## 動画の追加手順

1. ffmpegで圧縮: H.264、`-crf 23〜27`、長辺1280〜1600px、`+faststart`。ヒーロー/背景のみ`-an`(Worksは音声を残す)
2. ポスター抽出: `ffmpeg -ss <t> -i out.mp4 -frames:v 1 out.jpg`
3. `assets/<section>/`に配置して参照

元素材は外付けドライブ(`/Volumes/2025videos/exported video/`)。ffmpegが無ければ、Homebrewは壊れているので使い捨てPython venvで`pip install imageio-ffmpeg`し`get_ffmpeg_exe()`で取得する。

## コンテンツ

- `about.html`のエデンさんのプロフィールはコメントアウトで残してある。本人の公開OKが出るまで触らない
