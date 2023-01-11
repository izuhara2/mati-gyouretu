/**
 * 客を取り扱うクラス
 */
class Customer {
    /**
     * コンストラクタ
     * @param {number} delta - (客の)処理時間の平均値
     * @param {number} sigma - 処理時間の標準偏差
     */
    constructor(delta, sigma) {
        /**
         * 処理時間の残り
         * @type {number}
         */
        this._remain = Customer.gauss(delta, sigma); // 本当は平均時間とσから処理時間を計算する
        this.sigma = sigma;
        this.delta = delta;
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
        document.querySelector('#customer' + id).style.left = `${regi_enter.x[id]}px`;;
        document.querySelector('#customer' + id).style.top = `${regi_enter.y[id]}px`;;
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