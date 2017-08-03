# browserify とか babel とか webpack とか phantomjs とか使ってみるメモ

```sh
npm -g install babel-cli phantomjs webpack browserify babel-watch
npm install --save-dev babel-preset-es2015
npm install --save-dev babelify
npm install --save-dev webpack babel-loader expose-loader
```

## メモ

- babelify はプロジェクトローカルの node_modules に入れないと効かない？
- webpack の loader はプロジェクトローカルの node_modules に入れないと効かない？
- babel の --watch は cifs だと効かない
    - babel-watch なら --use-polling で cifs でも効かせられる
- webpack がグローバルとローカルの両方に入っているけどダメな気がする
    - ローカルの webpack を実行すべき？
    - グローバルには webpack-cli を入れるべき？

## babel

```sh
echo '{ "presets": ["es2015"] }' > .babelrc

# ビルド
babel src/ -d lib/

# 監視して実行
babel-watch src/ --use-polling
```

## browserify

```sh
# app.js -> main.js の順番に実行される
browserify lib/*.js -o dist/bundle.js

# main.js -> app.js の順番に実行される
browserify -e lib/app.js lib/main.js -o dist/bundle.js

# require('/lib/app.js') で参照できるようになる
browserify -r ./lib/app.js lib/main.js -o dist/bundle.js

# window.App で参照できるようになる
browserify lib/app.js -s App -o dist/bundle.js

# babelify
browserify src/app.js -s App -o dist/bundle.js -t babelify
```

- `-e` の意味がわからない
    - 実行順が変わるだけでオプション未指定でファイルを指定するのと同じ？
- 他スクリプトから参照するには `-r` と `-s` が使える
    - `-r` は browserify で複数の `bundle.js` を作るときに使えるっぽい
    - `-s` はクライアントサイドのライブラリとしてまとめるときに使うと良さそう
- `-s` は複数のファイルがビルド対象になっていると最後のファイルのモジュールが公開される
    - 単一のファイルだけを指定するのが基本っぽい

## phantomjs

```sh
phantomjs phantom.js
```

- コマンドラインで指定するコードから phantomjs でページを開く
    - このコードがブラウザのコンテキストで実行されるわけではない
- グローバルコンテキストでエラーになるとコンソールに表示される
    - それ以外のコンテキストだと表示されない
    - window.onerror -> console.log -> page.onConsoleMessage みたいな仕込みが必要？

## webpack

```sh
webpack --progress --watch --watch-poll
```

- v1 と v2 でちょっと書き方が違うっぽい
    - `use` とかあるのが v2 の書き方
