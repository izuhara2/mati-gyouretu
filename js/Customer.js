/**
 * 客を取り扱うクラス
 */
class Customer {
    /**
     * コンストラクタ
     * @param {number} delta - (客の)処理時間の平均値
     * @param {number} sigma - 処理時間の標準偏差
     * @param {number} number - 待ち行列内の順序
     * @param {number} y - 待ち行列のY座乗
     */
    constructor(delta, sigma, number, y) {
        /**
         * 処理時間の残り
         * @type {number}
         */
        this._remain = Customer.gauss(delta, sigma); // 本当は平均時間とσから処理時間を計算する
        this.sigma = sigma;
        this.delta = delta;

        // img要素を生成(客のimgを生成)
       this.img = document.createElement('img');
        // 画像パスを追加
        this.img.src = "./img/customer_man.jpg";
        // 指定した要素にimg要素を挿入
        let content_area = document.querySelector("#animation");
        content_area.appendChild(this.img);
        this.img.classList.add('customer');
        this.img.style.left = `${450 + number * 70}px`;
        this.img.style.top = '500px';
    }
    /**
     * 客をレジの前に移動させる
     * @param {number} id - レジ番号
     */
    move(id) {
        const regi_enter = { //客が窓口でサービスを受ける座標
            x: [60, 170, 280, 390, 500, 610, 720, 830, 940, 1050],
            y: [650, 650, 650, 650, 650, 650, 650, 650, 650]
        }
        this._img.style.left = `${regi_enter.x[id]}px`;;
        this._img.style.top = `${regi_enter.y[id]}px`;;
    }


    /**
     * 内部的に時間を進める
     * @param {number} time - 経過させる単位時間
     */
    process(time) {
        this._remain -= time;
        return this._remain;
    }

    /**
     * 客の処理時間を設定する
     * @param delta (客の)処理時間の平均値
     * @param sigma 処理時間の標準偏差
     * @returns {number} - 処理時間
     */
    static gauss(delta, sigma) {
        let del = 0.0;
        for( let p=0; p<12; p++ ) {
            del += Math.random();
        }
        return delta + sigma * (del - 6.0);
    }
}