## 課題5-1

JavaScriptやTypeScriptで書かれた任意のOSSライブラリを探して、そこに書かれているテストケースを覗いてみましょう。そこから新たに学んだことを最低でも3つ挙げてください。

OSSは基本的には対面での面識や、直接会話する機会がない人たちで開発するためテストは意思疎通に不可欠です。恐らくテストコードの書かれていない有名OSSを探す方が難しいのではないでしょうか。最近だとjest以外にもvitestで書かれている場合もあるかもしれませんが、基本的な記法は変わらないはずです。

OSSの探し方に迷ったら[GitHubのTrending](https://github.com/trending/typescript?since=daily)を覗いてみるのがオススメです。
最近旬なレポジトリを言語毎に教えてくれます。

### A

https://github.com/freeCodeCamp/freeCodeCamp/blob/main/api/src/utils/tokens.test.ts

- expectは多くて５つくらい
- describeで大枠のケースを分ける
- itを使う場合は文章にする
