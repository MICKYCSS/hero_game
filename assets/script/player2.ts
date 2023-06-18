import {
    _decorator, Component, Node, systemEvent, SystemEvent, EventKeyboard, KeyCode, RigidBody2D,
    v3, Animation, BoxCollider2D, Contact2DType
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player2')
export class player2 extends Component {
    private collider: BoxCollider2D = null;
    private animationName: string = 'stand2'
    private animation: Animation = null
    private accLeft: boolean = false;
    private accRight: boolean = false;
    private xSpeed: number = 0;
    private maxSpeed: number = 500
    update(deltaTime: number) {
       this.move(deltaTime)

    }

    move(deltaTime: number){
        let animationName = this.animationName
        if (this.accLeft) {
            // 每帧更新速度
            this.xSpeed = -300;
            animationName = 'run2'
        } else if (this.accRight) {
            this.xSpeed = 300;
            animationName = 'run2'
        } else {
            this.xSpeed = 0
            animationName = 'stand2'
        }
        if (Math.abs(this.xSpeed) > this.maxSpeed) {
            this.xSpeed = this.maxSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        const pos = this.node.getPosition()
        pos.x += this.xSpeed * deltaTime
        this.node.setPosition(pos)
        this.setAnimation(animationName)
    }

    onLoad() {
        // 加速度开关
        this.accLeft = false
        this.accRight = false
        this.xSpeed = 0

        // 获得动画对象
        this.animation = this.node.getComponent(Animation)
        this.collider = this.node.getComponent(BoxCollider2D)
        console.log(this.collider, 'collider')
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //初始化键盘监听
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    onBeginContact(ev, self, other) {
        console.log(self)
        if (self._group === 4) {
        }
    }

    onKeyDown(event: EventKeyboard) {
        console.log('onKeyDown')
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
                break;
            case KeyCode.ARROW_LEFT:
                this.accLeft = true
                this.node.setScale(v3(-1, 1))
                break;
            case KeyCode.ARROW_RIGHT:
                this.accRight = true
                this.node.setScale(v3(1, 1))
                break;
            case KeyCode.SPACE:
                break
            default:
                break;
        }
    }

    onKeyUp() {
        this.accLeft = false
        this.accRight = false
        this.xSpeed = 0
    }

    // 切换动画
    setAnimation(animationName: string) {
        if (this.animationName === animationName) return
        this.animationName = animationName
        this.animation.play(animationName)
    }


}
