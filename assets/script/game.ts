import { _decorator, Component, Node, Label,director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {
    private player1: Node = null
    private player2: Node = null
    private playerWidth: number = 26;
    private playerHeight: number = 26;
    start() {

    }

    restart(){
        director.loadScene('scene-2')
    }

    back(){
        director.loadScene('scene')
    }

    update(deltaTime: number) {
        const pos1 = this.player1.getPosition()
        const pos2 = this.player2.getPosition()
        // console.log(pos1, pos2)
        const { x: x1, y: y1 } = pos1
        const { x: x2, y: y2 } = pos2
        console.log(Math.abs(x1-x2),Math.abs(y1-y2),'math')
        if (Math.abs(x1-x2)<=this.playerWidth
        &&Math.abs(y1-y2)<=this.playerHeight
        ) {
            const gameOver = this.node.getChildByName('gameover')
            gameOver.setScale(1,1)
        }
    }

    onLoad() {
        const player1 = this.node.getChildByName('player1')
        const player2 = this.node.getChildByName('player2')
        this.player1 = player1
        this.player2 = player2
        console.log(player1, player2)
    }
}

