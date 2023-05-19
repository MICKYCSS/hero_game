import {
    _decorator, Component, Node, Prefab, instantiate, v3, RigidBody2D, ERigidBody2DType,
    BoxCollider2D, Contact2DType, Size, tween, Label, Color,Animation, AudioSource,AudioClip,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('star')
export class star extends Component {
    @property(AudioClip)
    public audioClip: AudioClip = null; // 音效

    @property(AudioClip)
    public boomAudioClip: AudioClip = null; // 爆炸

    @property(Prefab)
    public itemPrefab: Prefab = null; // 物品预制体

    @property(Label)
    private countdownLabel: Label = null; //倒计时
    @property(Node)
    private countdownNode: Node = null

    @property
    private itemInterval: number = 1; // 物品的生成间隔时间

    private timer: number = 0; // 计时器
    private label: Label = null; // 分数文案
    private score: number = 0; // 分数
    private targetScore: number = 5 // 目标分数
    private pass: boolean = false; // 是否通关
    private countdownNum: number = 4;
    private countdownInterval: number = 1000;
    private countdownTimer: number = null;
    private gameStart:boolean = false

    start() {

    }

    update(deltaTime: number) {
        if(!this.gameStart)return
        if (this.pass) return
        this.timer += deltaTime;
        if (this.timer >= this.itemInterval) {
            this.timer = 0;
            // 复制克隆一份
            const item = instantiate(this.itemPrefab);
            const collider = item.getComponent(BoxCollider2D)
            const rigidBody = item.getComponent(RigidBody2D)
            const starItem = item.getChildByName('starItem')
            const animation = starItem.getComponent(Animation)
            const soundEffect = starItem.getComponent(AudioSource)
            rigidBody.gravityScale = Math.random() * 1.2 + 0.2
          
            collider.on(Contact2DType.BEGIN_CONTACT, (ev, other) => {
                const position = item.getPosition()
                    if (position.y>-450&& this.targetScore > this.score && other.node._name === 'player') {
                        this.score = this.score + 1
                        soundEffect.clip = this.audioClip
                        soundEffect.play()
                        if(animation&&animation.isValid){
                            animation.play('disappear')
                            animation.on('finished' as any,()=>{
                                setTimeout(() => {
                                    item.destroy()
                                }, 200);
                            })
                        }
                    }else if(other.node._name === 'ground'){
                        soundEffect.clip = this.boomAudioClip
                        soundEffect.volume = 0.2
                        soundEffect.play()
                        animation.play('blow')
                        animation.on('finished' as any,()=>{
                            setTimeout(() => {
                                item.destroy()
                            }, 200);
                        })
                    }
                    this.label.string = `目标分数：${this.targetScore} 当前得分：${this.score}`
                  
                    if (this.targetScore === this.score && !this.pass) {
                        this.pass = true
                        const node = new Node()
                        node.setPosition(285, -250)
                        node.setScale(0,0)
                        this.node.addChild(node)
                        const passLabel = node.addComponent(Label)
                        passLabel.string = '目标达成'
                        passLabel.fontSize = 36
                        passLabel.color = Color.GREEN
                        tween(node).to(.3,{scale:v3(1,1)}).start()
                    }
                    // setTimeout(() => {
                    //     item.setScale(v3(0,0))
                    //     item.destroy()
                    // }, 1000);
                    // setTimeout(() => {
                    //     
                    // }, 100);
                    // tween(item)
                    // .to(.5, {scale:v3(0,0) })
                    // .call(() => {
                    // })
                    // .start();
                    
            })
            // 添加刚体组件
            // const rigidBody = item.addComponent(RigidBody2D)
            // rigidBody.type = ERigidBody2DType.Dynamic
            // rigidBody.gravityScale = 1; // 设置重力缩放因子
            // rigidBody.linearDamping = 0.5; // 设置线性阻尼，控制速度逐渐减慢
            // rigidBody.angularDamping = 0.5; // 设置角度阻尼，控制旋转逐渐减慢

            // // 添加碰撞体组件
            // const collider =  item.addComponent(BoxCollider2D)
            // collider.group = 2
            // collider.size = new Size(40,40)
            // collider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,item);
            // 随机设置物品的位置
            const x = Math.random() * 600 - 300;
            item.setPosition(v3(x, 500, 0));
            this.node.addChild(item);

        }
    }

    onLoad() {
        this.label = this.node.getComponent(Label)
        this.label.string = `目标分数：${this.targetScore} 当前得分：${this.score}`

        const node = new Node('countdownLabel')
        node.setPosition(285, -250)
        this.node.addChild(node)
        const label =  node.addComponent(Label)
        label.fontSize = 36
        label.string = '游戏即将开始'
        this.countdownLabel = label
        this.countdownNode = node
        setTimeout(() => {
            this.startCountdown()
        }, 2000);

    }
    onDestroy(){
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
            this.countdownTimer = null;
        }
    }

    startCountdown(){
        this.countdownTimer = setInterval(()=>{
            this.countdownNum--;
            if (this.countdownNum >= 1) {
                this.countdownLabel.string = this.countdownNum.toString();
            } else {
                this.countdownLabel.string = "Go!";
                clearInterval(this.countdownTimer);
                this.countdownTimer = null;
                this.scheduleOnce(() => {
                    // 倒计时结束后的逻辑
                    this.countdownNode.destroy()
                    this.gameStart = true
                }, 1);
            }
        },this.countdownInterval)
    }

}

