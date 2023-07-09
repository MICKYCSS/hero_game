import { _decorator, Component, Node, Label, director, systemEvent, SystemEvent, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    private player1 = { step: 0, node: null }
    private player2 = { step: 0, node: null }
    private round: number = 1;// 1为player1的回合，2为player2的回合
    private positionX: number = 542.567;//右上角横坐标
    private positionY: number = 332.467;//右上角纵坐标
    private moveX: number = 100;
    private moveY: number = 85;
    private label: Label = null
    private interval: number = 0.1 // 定时器的更新间隔时间，单位为秒
    private question: Node = null;
    private map = {
        supermarket: [6, 14, 25, 33] as number[],
        ground: [
            { step: [1, 5], diamond: 3, price: 400 },
            { step: [7, 8], diamond: 1, price: 300 },
            { step: [10, 13], diamond: 2, price: 700 },
            { step: [15], diamond: 1, price: 0 },
            { step: [16, 18], diamond: 0, price: 1000 },
            { step: [20, 24], diamond: 2, price: 1200 },
            { step: [26, 27], diamond: 0, price: 800 },
            { step: [29, 32], diamond: 5, price: 0 },
            { step: [34, 36], diamond: 2, price: 600 },
            { step: [37], diamond: 0, price: 500 },
        ]
    }
    start() {

    }

    restart() {
        director.loadScene('scene-2')
    }

    back() {
        director.loadScene('scene')
    }

    update(deltaTime: number) {
    }

    onQuestion(){
        const label =  this.question.getComponent(Label)
        label.string = '是否购买钻石？花费200'
    }


    onMove(player, step) {
        const node = player.node
        const { x, y } = node.getPosition()
        console.log(x, y, 'xx')
        if (player.step >= 38) {
            player.step = 0
        }
        if (player.step > 33) {
            node.setPosition(this.positionX + (player.step - 11 - 33) * this.moveX, this.positionY)
            return
        }
        if (player.step <= 6) {
            node.setPosition(x + step * this.moveX, y)
        } else if (player.step > 25) {
            node.setPosition(-557.433, this.positionY + (player.step - 8 - 25) * this.moveY)

        } else if (player.step > 14) {
            node.setPosition(this.positionX - (player.step - 14) * this.moveX, -347.533)
            console.log(x - step * this.moveX, y)
        } else if (player.step > 6) {
            node.setPosition(this.positionX, this.positionY - (player.step - 6) * this.moveY)
        }


    }

    onKeyDown(event: EventKeyboard) {
        const step = +this.label.string
        const round = this.node.getChildByName('round').getComponent(Label)
        if (this.round === 1 && event.keyCode === KeyCode.KEY_W) {
            this.stopAction();
            this.player1.step += step
            this.onMove(this.player1, step)
            if(this.map.supermarket.includes(this.player1.step)){
                this.onQuestion()
            }
            this.round = 2
            setTimeout(() => {
                this.schedule(this.updateTimer, this.interval)
                round.string = '玩家2'
            }, 1000)
        }
        if (this.round === 2 && event.keyCode === KeyCode.ARROW_UP) {
            this.stopAction();
            this.player2.step += step
            this.onMove(this.player2, step)
            this.round = 1
            round.string = '玩家1'
            setTimeout(() => {
                this.schedule(this.updateTimer, this.interval)
            }, 1000)
        }
    }

    onLoad() {
        const player1 = this.node.getChildByName('player1')
        const player2 = this.node.getChildByName('player2')
        this.question = this.node.getChildByName('question')
        this.player1.node = player1
        this.player2.node = player2
        const label = this.node.addComponent(Label)
        label.string = ''
        this.label = label
        // 启动定时器
        this.schedule(this.updateTimer, this.interval);
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

    }
    updateTimer(dt) {
        const random = Math.ceil(Math.random() * 6)
        this.label.string = `${random}`
    }

    stopAction() {
        // 停止动作或执行相应的逻辑
        console.log("动作已达到时间限制");
        // 取消定时器
        this.unschedule(this.updateTimer);
    }


    onDestroy() {
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

    }
}

