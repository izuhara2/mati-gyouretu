/**
 * レジ（単独）を取り扱うクラス
 */
class Register {
    /**
     * コンストラクタ
     * @param {number} id - レジID
     * @param {string} x - レジの客の座標
     * @param {string} y - レジの客の座標
     */
    constructor(id, x, y) {
        /**
         * レジID
         * @type {number}
         */
        this._id = id;
        /**
         * レジが活動中か？ true: 活動中, false: 休止中
         * @type {Boolean}
         */
        this._open = true;
        /**
         * 接客中の客の情報，待ち状態ならnull
         * @type {Customer}
         */
        this._progress = null;
        /**
         * 
         */
        this.x = x;
        this.y = y;
        this.remain = 0;
    }

    /**
     * 内部的に時間を進める
     * @param {number} time - 経過させる単位時間
     */
    process(time) {
        if (this._progress != null) {
            let remain = this._progress.process(time);
            if (remain <= 0) {
                let xxx = this._progress;
                console.log({xxx});
                this._progress.img.top = '1000px';
                this._progress = null;
                return remain;
            }
        }
    }

    /**
     * 客に対応中か？
     * @returns {boolean} - 対応中: true, 空き状態: false
     */
    isProgress() {
        return this._progress != null;
    }

    /**
     * レジに客を誘導して処理を開始する
     * @param {number} rew - 調整する時間
     * @param {Customer} customer - 客
     */
    push(rew, customer) {
        if (this.remain < 0) customer.process(-this.remain);
        else customer.process(-rew);
        this._progress = customer;
        customer.img.style.left = this.x;
        customer.img.style.top = this.y;
    }
}