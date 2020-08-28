'use strict';
const title = document.getElementById('title');
const numberOfTimes = document.getElementById('number-of-times');
const startButton = document.getElementById('start-button');
const ruleArea = document.getElementById('rule-area');
const signalTextArea = document.getElementById('signal-text-area');
const signalImageArea = document.getElementById('signal-image-area');
const judgmentArea = document.getElementById('judgment-area');
const jankenArea = document.getElementById('janken-area');
const restartButton = document.getElementById('restart-button');


// 関数外は二行、関数内は一行の改行


let count = 0; // 勝負数をカウントする変数
let wins = 0; // 勝った回数をカウントする変数


// ぐー、ちょき、ぱーの画像
const images = [
  './img/gu.png',    // ぐーの画像
  './img/pa.png',    // ぱーの画像
  './img/choki.png'  // ちょきの画像
];


// 画像の配列の添え字を格納している配列
const num = [0, 1, 2];


// CPU 側のじゃんけん表示エリアを作成
const opponentImage = document.createElement('img');


/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素 
 */
function removeAllChildren(element) {
  setTimeout(() => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }, 1000); // 要素を視認できるよう1秒後に処理
};


// じゃんけんゲームのメインの関数
function serectAndJudgment() {

  // inputの入力数値を number に変換
  let nOT = parseFloat(numberOfTimes.value);

  // 勝負の結果報告
  if (count === nOT) {
    setTimeout(() => {
      alert(`${nOT}回勝負中${wins}回勝利しました！\n「タイトルへ」をクリックしてください。`);
      signalTextArea.innerText = 'GAME OVER\n豆知識：GAME OVERは実はゲーム終了という意味合いが強い';
      startButton.innerText = 'タイトルへ';
      restartButton.appendChild(startButton);
      restartButton.onclick = () => {
        location.reload(); // リロードでタイトルへ戻る
      }
    }, 1000);
    return;
  }

  // 「じゃんけん」の呼びかけ
  setTimeout(() => {
    signalTextArea.innerText = 'じゃんけん';
  }, 1500);

  // この関数のメイン処理
  setTimeout(() => {
    // 相手側の表示の処理
    let imageNo = Math.floor(Math.random() * images.length); // 画像表示時の添え字をランダムで生成
    signalTextArea.innerText = 'ぽん';
    opponentImage.src = images[imageNo]; // 生成した添え字で画像を表示
    signalImageArea.appendChild(opponentImage);

    // 正解「〇」不正解「✕」の判定画像の表示エリアを作成
    const judgment = document.createElement('img');
    judgment.width = "300";
    judgment.height = "300";
    judgment.style.display = 'none';
    judgmentArea.appendChild(judgment);

    let startTime = Date.now(); // 開始時の時刻をメモ

    // じゃんけんのメインエリアの作成
    for (let i = num.length - 1; i >= 0; i--) {
      let serect = document.createElement('input');
      let rand = Math.floor(Math.random() * (i + 1));
      [num[i], num[rand]] = [num[rand], num[i]]; // シャッフル
      serect.width = "300";
      serect.height = "300";
      serect.type = "image";
      serect.src = images[num[i]]; // num[i]を添え字として画像をランダム表示
      jankenArea.appendChild(serect);
      serect.onclick = () => {
        count++; // 勝負数をカウント
        jankenArea.children[0].disabled = true; // ぐーを一回限りのボタンに
        jankenArea.children[1].disabled = true; // ぱーを一回限りのボタンに
        jankenArea.children[2].disabled = true; // ちょきを一回限りのボタンに
        if ((Date.now() - startTime) > 1000) { // 1秒以内に押せないなら時間切れ
          judgment.style.display = '';
          judgment.src = './img/time.png'; // 時間切れ
        } else if (imageNo === num[i]) {
          judgment.style.display = '';
          judgment.src = './img/aiko.png'; // あいこ
        } else if (imageNo === 0 && num[i] === 1 || imageNo === 1 && num[i] === 2 || imageNo === 2 && num[i] === 0) {
          wins++; // 勝った数を記録
          judgment.style.display = '';
          judgment.src = './img/maru.png'; // 勝ち
        } else {
          judgment.style.display = '';
          judgment.src = './img/batu.png'; // 負け
        }
        signalTextArea.innerText = "次！";
        removeAllChildren(jankenArea); // じゃんけんカードを削除
        removeAllChildren(judgmentArea); // 判定画像を削除
        removeAllChildren(signalImageArea); // 相手用のじゃんけんカードを削除
        serectAndJudgment();
      }
    };
  }, 2500);
};


// 関数のトリガー
startButton.onclick = () => {

  let inputNumber = numberOfTimes.value;
  if (inputNumber.length === 0 || inputNumber === '0') {
    return // 入力値が半角数字と0だった場合は処理を中断
  }

  title.remove(); // タイトルを削除
  ruleArea.remove(); // ルール文を削除
  startButton.remove(); // スタートボタンを削除
  numberOfTimes.remove(); // インプットエリアを削除

  //「最初はぐーじゃんけん」の呼びかけの処理
  signalTextArea.innerText = '最初はぐー';
  opponentImage.src = images[0]; // ぐーを固定化
  opponentImage.width = "300";
  opponentImage.height = "300";
  signalImageArea.appendChild(opponentImage);

  // メインの関数を実行
  serectAndJudgment();
};


// 入力欄でEnterキーが押されてもゲームを実行
numberOfTimes.onkeydown = event => {
  if (event.key === 'Enter') {
    startButton.onclick();
  }
};
