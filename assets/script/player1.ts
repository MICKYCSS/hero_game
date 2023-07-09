import {
    _decorator, Component, Node, systemEvent, SystemEvent, EventKeyboard, KeyCode, RigidBody2D,
    v3, BoxCollider2D, Contact2DType
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player1')
export class player1 extends Component {
    private collider: BoxCollider2D = null;
    private movement:number = 30;
    onLoad() {
        // 获得动画对象
        this.collider = this.node.getComponent(BoxCollider2D)
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //初始化键盘监听
        // systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact(ev, self, other) {
        console.log(self)
        if (self._group === 4) {
        }
    }

    onKeyDown(event: EventKeyboard) {
        const pos = this.node.getPosition()
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.node.setPosition(pos.x ,pos.y+this.movement)
                break;
            case KeyCode.KEY_A:
                this.node.setPosition(pos.x - this.movement,pos.y)
                this.node.setScale(v3(-1, 1))
                break;
            case KeyCode.KEY_D:
                this.node.setPosition(pos.x + this.movement,pos.y)
                this.node.setScale(v3(1, 1))
                break;
            case KeyCode.KEY_S:
                this.node.setPosition(pos.x ,pos.y-this.movement)
                break
            default:
                break;
        }
    }

}

