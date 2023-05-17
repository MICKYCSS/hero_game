import { _decorator, Component, Node,systemEvent,SystemEvent,EventKeyboard,KeyCode,RigidBody2D,
    v3,Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player')
export class player extends Component {
    animationName:string = 'stand'
    animation:Animation = null
    accLeft:boolean = false;
    accRight:boolean = false;
    xSpeed:number = 0;
    maxSpeed:number = 500

    update(deltaTime: number) {
    let animationName = this.animationName
    // 每帧更新速度
     if(this.accLeft){
        this.xSpeed = -300;
        animationName = 'run'
     }else if(this.accRight){
        this.xSpeed = 300;
        animationName = 'run'
     }else{
        this.xSpeed = 0
        animationName = 'stand'
     }
     if(Math.abs(this.xSpeed)>this.maxSpeed){
        this.xSpeed = this.maxSpeed*this.xSpeed/Math.abs(this.xSpeed);
     }
     
     const pos = this.node.getPosition()
     pos.x += this.xSpeed*deltaTime
     this.node.setPosition(pos)
     this.setAnimation(animationName)
    }

    onLoad(){
        // 加速度开关
        this.accLeft = false
        this.accRight = false
        this.xSpeed = 0

        // 获得动画对象
        this.animation = this.node.getComponent(Animation)


        //初始化键盘监听
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy(){
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
                break;
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                this.accLeft = true
                this.node.setScale(v3(-1,1))
                break;
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this.accRight = true
                this.node.setScale(v3(1,1))
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

    // 切换动画
    setAnimation(animationName:string){
        if(this.animationName === animationName)return
        this.animationName = animationName
        this.animation.play(animationName)
    }

  
}

