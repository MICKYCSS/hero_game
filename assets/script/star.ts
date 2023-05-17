import { _decorator, Component, Node,Prefab,instantiate,v3,RigidBody2D,ERigidBody2DType,
BoxCollider2D,Contact2DType,Size} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('star')
export class star extends Component {
    @property(Prefab)
    public itemPrefab: Prefab = null; // 物品预制体

    @property
    public itemSpeed: number = 2; // 物品的下落速度

    @property
    public itemInterval: number = 2; // 物品的生成间隔时间

    private timer: number = 0; // 计时器
    start() {

    }

    update(deltaTime: number) {
        this.timer += deltaTime;
        if (this.timer >= this.itemInterval) {
            this.timer = 0;
            // 复制克隆一份
            const item = instantiate(this.itemPrefab);
            const collider = item.getComponent(BoxCollider2D)
            collider.on(Contact2DType.BEGIN_CONTACT,(ev,other)=>{
                setTimeout(() => {
                    item.destroy()
                }, 300);
               
                // if(other.node._name === 'ground'){
                //     item.destroy()
                // }
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

}

