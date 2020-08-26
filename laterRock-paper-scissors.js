'use strci';
const title = document.getElementById('title');
const startButton = document.getElementById('start-button');
const signalText = document.getElementById('signal-text');
const signalImage = document.getElementById('signal-image');
const judgmentArea = document.getElementById('judgment-area');
const scoreArea = document.getElementById('score-area');
const jankenArea = document.getElementById('janken-area');

// ぐー、ちょき、ぱーの画像
const images = [
  './img/gu.png',    // ぐーの画像
  './img/pa.png',    // ぱーの画像
  './img/choki.png'  // ちょきの画像
];

// 配列の添え字を格納する入れる
const num = [0, 1, 2];

// CPU 側のじゃんけん表示エリアを作成
const opponentImage = document.createElement('img');

// 関数のトリガー
startButton.onclick = () => {

  title.remove();
  startButton.remove();
  //scoreArea.innerText = '0 勝';

  //「最初はぐーじゃんけん」の呼びかけの処理
  signalText.innerText = '最初はぐー';
  opponentImage.src = images[0]; // ぐーを固定化
  opponentImage.width = "300";
  opponentImage.height = "300";
  signalImage.appendChild(opponentImage);

  serectedAndJudgment();
};


// 「ぽん」の呼びかけと遊びの本体の処理
function serectedAndJudgment() {

  setTimeout(() => {
    signalText.innerText = 'じゃんけん';
  }, 1500);

  setTimeout(() => {
    // 相手側の表示の処理
    let imageNo = Math.floor(Math.random() * images.length); // 画像表示時の添え字をランダムで生成
    signalText.innerText = 'ぽん';
    opponentImage.src = images[imageNo]; // 生成した添え字で画像を表示
    signalImage.appendChild(opponentImage);

    // 正解「〇」不正解「✕」の判定画像の表示エリアを作成
    const judgment = document.createElement('img');
    judgment.width = "300";
    judgment.height = "300";
    judgmentArea.appendChild(judgment);
    judgment.style.display = 'none';

    // 開始時の時刻をメモ
    let startTime = Date.now();

    // じゃんけんメインエリアの作成
    for (let i = num.length - 1; i >= 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      [num[i], num[rand]] = [num[rand], num[i]]
      let serect = document.createElement('input');
      jankenArea.appendChild(serect);
      serect.type = "image";
      serect.src = images[num[i]]; // iを添え字として画像を表示
      serect.width = "300";
      serect.height = "300";
      serect.onclick = () => {
        jankenArea.children[0].disabled = true; // ぐーを一回限りのボタンに
        jankenArea.children[1].disabled = true; // ぱーを一回限りのボタンに
        jankenArea.children[2].disabled = true; // ちょきを一回限りのボタンに
        if ((Date.now() - startTime) > 1000) { // 2秒以内に押せないなら時間切れ
          judgment.style.display = '';
          judgment.src = './img/time.png'; // 時間切れ
        } else if (imageNo === num[i]) {
          judgment.style.display = '';
          judgment.src = './img/aiko.png'; // あいこ
          // scoreArea.innerText = 
        } else if (imageNo === 0 && num[i] === 1 || imageNo === 1 && num[i] === 2 || imageNo === 2 && num[i] === 0) {
          judgment.style.display = '';
          judgment.src = './img/maru.png';
          //scoreArea.innerText = `${score} 勝`; // 勝ち
        } else {
          judgment.style.display = '';
          judgment.src = './img/batu.png';
          //scoreArea.innerText = '負け'; // 負け
        }
        signalText.innerText = "次！";
        removeAllChildren(jankenArea);
        removeAllChildren(judgmentArea);
        serectedAndJudgment();
      }
    };
  }, 2500);
};


/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素 
 */
function removeAllChildren(element) {
  setTimeout(() => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }, 1000);
};
