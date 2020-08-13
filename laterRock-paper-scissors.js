const startButton = document.getElementById('startButton');
const shoutText = document.getElementById('shoutText');
const shoutImage = document.getElementById('shoutImage');
const jankenArea = document.getElementById('janken-area');

const images = ['https://tsukatte.com/wp-content/uploads/2019/03/janken_gu.png', // ぐーの画像
'https://tsukatte.com/wp-content/uploads/2019/03/janken_choki.png', // ちょきの画像
'https://tsukatte.com/wp-content/uploads/2019/03/janken_pa.png']; // ぱーの画像

startButton.onclick = () => {
  const title = document.getElementById('title');

  title.remove();
  startButton.remove();

  jankenBattle();

};

// 最初はグー
function jankenBattle() {
  shoutText.innerText = '最初はぐー';
  const Img = document.createElement('img');
  Img.src = "https://tsukatte.com/wp-content/uploads/2019/03/janken_gu.png";
  Img.width = "350";
  Img.height = "350";
  shoutImage.appendChild(Img);

  const firstChangeShout = () => {
    shoutText.innerText = 'じゃんけん';
  }

  setTimeout(firstChangeShout, 1500);

  const secondChangeShout = () => {
    shoutText.innerText = 'ぽん';
    const imageNo = Math.floor(Math.random() * images.length)
    Img.src = images[imageNo];
    shoutImage.appendChild(Img);

    for (let i = 0; i < images.length; i++) {
      document.write(images[i]);
    }
  }

  setTimeout(secondChangeShout, 2500);



};
