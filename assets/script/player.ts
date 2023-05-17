import { _decorator, Component, Node,systemEvent,SystemEvent,EventKeyboard,KeyCode,RigidBody2D,
    v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player')
export class player extends Component {
    private _rigidBody: RigidBody2D = null;
    accLeft:boolean = false;
    accRight:boolean = false;
    xSpeed:number = 0;
    maxSpeed:number = 500

    update(deltaTime: number) {
    // 每帧更新速度
     if(this.accLeft){
        this.xSpeed = -300;
     }else if(this.accRight){
        this.xSpeed = 300;
     }else{
        this.xSpeed = 0
     }
     if(Math.abs(this.xSpeed)>this.maxSpeed){
        this.xSpeed = this.maxSpeed*this.xSpeed/Math.abs(this.xSpeed);
     }
     
     const pos = this.node.getPosition()
     pos.x += this.xSpeed*deltaTime
     this.node.setPosition(pos)
    }

    onLoad(){
        // 加速度开关
        this.accLeft = false
        this.accRight = false
        this.xSpeed = 0

        this._rigidBody = this.node.getComponent(RigidBody2D)

        //初始化键盘监听
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
                break;
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                this.accLeft = true
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this.accRight = true
                break;
            case KeyCode.SPACE:
                break
            default:
                break;
        }
    }

    onKeyUp(){
        this.accLeft = false
        this.accRight = false
        this.xSpeed = 0

    }

    onDestroy(){
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
}

