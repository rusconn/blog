---
layout: "@/layout/PostLayout.astro"
title: 開発環境構築メモ
description: Docker や VS Code を使った開発環境構築方法を模索したのでメモしておく
date: 2021-09-19T05:50:00.000Z
tags: ["docker", "git", "vscode"]
---

開発環境の設定を場当たり的に行い収拾がつかなくなること数知れず。ついに重い腰を上げて設定を作り込むことにした。試行錯誤の結果、いい感じの設定が見えてきたのでメモを残しておく。

大雑把にいうと、Docker でポータブルな開発環境としてのコンテナを作成し、VS Code でコンテナへ入り作業する。コンテナ内へ dotfiles をインストールすることで使い慣れた環境を再現する。ホストへのスイッチを減らしたいので git も使えるようにしておく。

### Dotfiles

- シェルやエディタ等の各種設定ファイルを git 管理する
- いつでもクローン出来るようにホスティングサービスで公開する
- 設定を自動で適用出来るようにインストールスクリプトを用意する

[作った dotfiles リポジトリ](https://github.com/rusconn/dotfiles)

### Docker

- ベースイメージは基本的に slim を使う
- OS に入っていないツールはイメージに含めておく
- コンテナの管理は docker-compose を使う
- 環境毎の設定は [Compose ファイルのオーバーライド](https://docs.docker.jp/compose/extends.html) を使う
- コンテナ内の個人設定は 上記 dotfiles をクローンして適用する

### Git

- 認証情報の管理は [Git Credential Manager Core](https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials-in-git#git-credential-manager) を使う
- 各種グローバル設定はデフォルトの ~/.config/git/\* を使う
- 個人的に無視したいファイルは .git/info/exclude へ追記する

### VS Code

- ホストで dotfiles をクローン＆適用し、VS Code の設定を済ませる
- [Remote - Containers 拡張](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) でコンテナに入り作業する
- dotfiles 系の設定がされていれば、コンテナに dotfiles が自動でクローン＆インストールされる

#### settings.json の設定例

```json
{
  "dotfiles.repository": "https://github.com/rusconn/dotfiles.git",
  "dotfiles.targetPath": "~/dotfiles",
  "dotfiles.installCommand": "~/dotfiles/install.sh"
}
```
