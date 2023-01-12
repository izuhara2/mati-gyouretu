/**
 * 全体制御のためのクラス
 */
class Shop {
    /**
     * コンストラクタ
     * @param {number} number - レジの数
     * @param {number} delta - (客の)処理時間の平均値
     * @param {number} sigma - 処理時間の標準偏差
     * @param {number} alpha - 客の流れ密度
     */
    constructor(number, delta, sigma, alpha) {
        /**
         * レジ全体
         * @type {Array}
         */
        this._registers = [];
        /**
         * 待ち行列
         * @type {List}
         */
        this._list = new List(delta, sigma, alpha);
        /**
         * ？
         * @type {number}
         */
        this._rew = 0;
        /**
         * 稼働しているレジの数
         * @type {number}
         */
        this._number = number;
        const regi_enter = { //客が窓口でサービスを受ける座標
            x: [60, 170, 280, 390, 500, 610, 720, 830, 940, 1050],
            y: [650, 650, 650, 650, 650, 650, 650, 650, 650]
        }
        for (let i = 0; i < number; i++) this._registers.push(new Register(i, `${regi_enter.x[i]}px`, `${regi_enter.y[i]}px`));

        let nl2 = new nylon();
        nl2.on('slider1', (key, value) => {
            this.delta = value.val;
            this._list.delta = this.delta;
        });
        nl2.on('slider2', (key, value) => {
            this.sigma = value.val;
            this._list._sigma = this.sigma;
        });
        nl2.on('slider3', (key, value) => {
            this.alpha = value.val;
            this._list._alpha = this.alpha;
        });
    }

    /**
     * 内部的に時間を進める
     * @param {number} time - 経過させる単位時間
     */
    process(time) {
        for (let register of this._registers) {
            if (register.isProgress()) {
                let remain = register.process(time);
                register.remain = remain;
            }
        }

        for (let register of this._registers.sort((r1, r2) => {
            return r1.remain < r2.remain ? -1 : 1
        })) {
            // レジが空いているか?
            //console.log({register});
            if (register.remain <= 0) {
                // 待ち行列に客がいるか？
                if (this._list.getLength() > 0) {
                    // 客を移動（待ち行列→レジ）
                    //register.push(this._rew, this._list.shift());
                    /**追加プログラム */
                    this._list.move_gyouretu(); // グラフィック的に列を詰める
                    let customer = this._list.shift(); // 列の先頭の客を取り出す
                    //customer.move(register._id); // グラフィック的に客をレジに移動
                    register.push(this._rew, customer); // 客をレジに移動
                } else register.remain = 0;
            }
        }

        this._rew = this._list.process(time);
    }
}
