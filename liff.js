// LIFF初期化
liff.init({
  liffId: '2001059289-X2m74PYZ' // ご自身のLIFFアプリのIDに置き換えてください
})
  .then(() => {
    // LIFF初期化成功時に実行されるコード
    // IDトークンを取得
    return liff.getIDToken();
  })
  .then(idToken => {
    // IDトークンをGoogle Apps Scriptに送信
    return fetch('https://script.google.com/macros/s/AKfycbw4gh1ZhPeSlflX9LmIJQbY_PGIfuDgvY0Bt7NGISfNRCtrgNSCXcNfwLMkw8IevvYMag/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
  })
  .then(response => response.json())
  .then(result => {
    // Google Apps Scriptの処理結果をLIFFで表示
    if (result.success) {
      liff.sendMessages([
        {
          type: 'text',
          text: 'IDトークンの送信に成功しました。',
        },
      ])
        .then(() => {
          liff.closeWindow();
        });
    } else {
      liff.sendMessages([
        {
          type: 'text',
          text: 'IDトークンの送信に失敗しました。',
        },
      ])
        .then(() => {
          liff.closeWindow();
        });
    }
  })
  .catch(error => {
    console.error(error);
    // エラーが発生した場合の処理
  });

