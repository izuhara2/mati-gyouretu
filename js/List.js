/**
 * 待ち行列を扱うクラス
 */
class List {
    /**
     * コンストラクタ
     * @param {number} delta - (客の)処理時間の平均値
     * @param {number} sigma - 処理時間の標準偏差
     * @param {number} alpha - 客の流れ密度
     */
    constructor(delta, sigma, alpha) {
        this._list = [];
        this._average = delta;
        this._sigma = sigma;
        this._alpha = alpha;
        this._next = 0;
    }

    /**
     * レジ数を返す
     * @returns {number}
     */
    getLength() {
        return this._list.length;
    }

    /**
     * 待ち行列の先頭を取り除く
     * @returns {Customer} - 先頭の客
     */
    shift() {
        if (this._list.length == 0) throw new RangeError('待ち行列に客がいません');
        return this._list.shift();
    }

     /**
     * 行列を移動させる
     * @param {number}  - 
     */
     move_gyouretu(){
        let xxx = this._list;
        console.log({xxx});
        for( let i=this._list.length-1; i>0; i-- ) {
            this._list[i].img.style.left = this._list[i-1].img.style.left;
        }
        // const retu_location = {
        //     x: [610, 610, 680, 750, 820, 890, 970, 1040, 1110, 1170, 1240, 1310, 1380, 1450, 1520, 1590, 1660, 1730, 1800, 1870],
        //     y: [580, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500]
        // }
        // document.querySelector('#customer' + id + 1).style.left = `${retu_location.x[id]}px`;;
        // document.querySelector('#customer' + id + 1).style.top = `${retu_location.y[id]}px`;;
    }

    /**
     * 内部的に時間を進める
     * @param {number} time - 経過させる単位時間
     */
    process(time) {
        let rew = this._next -= time;
        if (this._next <= 0) {
            this._list.push( new Customer( this._average, this._sigma, this._list.length, 500 ) );
            this._next += this.poison(); // 次の客が来るまでの時間を設定

            return rew;
        }
        return 0;
    }

    /**
     * 次の客が来るまでの時間を設定
     * @returns {number} 次の客が来るまでの時間
     */
    poison() {
        return -Math.log( Math.random() ) / this._alpha;
    }
}