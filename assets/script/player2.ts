import {
    _decorator, Component, Node, systemEvent, SystemEvent, EventKeyboard, KeyCode, RigidBody2D,
    v3, Animation, BoxCollider2D, Contact2DType
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player2')
export class player2 extends Component {
    private collider: BoxCollider2D = null;
    private movement: number = 30;
    onLoad() {
        this.collider = this.node.getComponent(BoxCollider2D)
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //初始化键盘监听
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
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
            case KeyCode.ARROW_UP:
                this.node.setPosition(pos.x, pos.y + this.movement)
                break;
            case KeyCode.ARROW_LEFT:
                this.node.setPosition(pos.x - this.movement, pos.y)
                this.node.setScale(v3(-1, 1))
                break;
            case KeyCode.ARROW_RIGHT:
                this.node.setPosition(pos.x + this.movement, pos.y)
                this.node.setScale(v3(1, 1))
                break;
            case KeyCode.ARROW_DOWN:
                this.node.setPosition(pos.x, pos.y - this.movement)
            default:
                break;
        }
    }


}

