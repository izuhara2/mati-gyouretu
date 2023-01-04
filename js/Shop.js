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
        for (let i = 0; i < number; i++) this._registers.push(new Register(i));
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

        /**客移動メソッド */
        function move() {
            const regi_enter = { //客が窓口でサービスを受ける座標
                x: [60, 170, 280, 390, 500, 610, 720, 830, 940, 1050],
                y: [650, 650, 650, 650, 650, 650, 650, 650, 650]
            }
            document.querySelector('#customer' + register_id).style.left = `${regi_enter.x[register_id]}px`;;
            document.querySelector('#customer' + register_id).style.top = `${regi_enter.y[register_id]}px`;;
        }

        for (let register of this._registers.sort((r1, r2) => {
            return r1.remain < r2.remain ? -1 : 1
        })) {
            // レジが空いているか?
            if (register.remain <= 0) {
                // 待ち行列に客がいるか？
                if (this._list.getLength() > 0) {
                    // 客を移動（待ち行列→レジ）
                    //register.push(this._rew, this._list.shift());
                    /**追加プログラム */
                    let customer = this_list.shift();
                    customer.move(register.id)
                    this_list.move();
                    register.push(this_rew, customer);
                } else register.remain = 0;
            }
        }

        this._rew = this._list.process(time);
    }
}
