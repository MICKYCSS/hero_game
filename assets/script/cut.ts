import {
    _decorator, Component, Node, Graphics, Color, Canvas, UITransform, systemEvent, SystemEvent, v3,
    v2, Camera, director, CameraComponent
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('cut')
export class cut extends Component {
    private startPos = null // 划动开始位置
    private endPos = null // 划动结束位置
    private lineNode = null // 划动轨迹效果
    private lineGraphics: Graphics = null // 划动轨迹的绘制组件

    onTouchStart(event) {
        console.log('onTouchStart')
        this.startPos = event.getLocation() // 划动开始位置
        this.lineNode = new Node() // 新建一个节点，作为划动轨迹效果
        this.node.addChild(this.lineNode) // 添加到场景节点
        this.lineGraphics = this.lineNode.addComponent(Graphics) // 添加绘制组件
    }

    onTouchMove(event) {
        console.log('onTouchMove', event, event)
        let pos = event.getLocation() // 当前的触摸位置
        // let deltaX = pos.x - this.startPos.x // X轴位移
        // let deltaY = pos.y - this.startPos.y // Y轴位移
        // if (deltaY < -100) { // 处理向上划动时不生成轨迹效果
        //     if (this.lineGraphics) {
        //         this.lineGraphics.clear()
        //         this.lineNode.removeFromParent()
        //     }
        //     return
        // }
        // if (deltaX > 200 || deltaX < -200) { // 处理左右位移过大时不生成轨迹效果
        //     if (this.lineGraphics) {
        //         this.lineGraphics.clear()
        //         this.lineNode.removeFromParent()
        //     }
        //     return
        // }
        if (!this.lineGraphics) { // 如果绘制组件为空，创建一个
            this.lineGraphics = this.node.parent.addComponent(Graphics)
        }
        this.lineGraphics.lineWidth = 10 // 设置轨迹的宽度
        this.lineGraphics.strokeColor = Color.RED; // 设置轨迹颜色以及不透明度
        const uiTransform = this.lineNode.getComponent(UITransform)
        let startPoint = uiTransform.convertToNodeSpaceAR(v3(this.startPos.x, this.startPos.y, 0)) // 节点空间转化
        let endPoint = uiTransform.convertToNodeSpaceAR(v3(pos.x, pos.y, 0)) // 节点空间转化
        const getPos = (point) => {
            const { x, y } = this.node.parent.getPosition()
            return [
                (point.x - x) / 2,
                (point.y - y) / 2,
            ]

        }
        const [startX, startY] = getPos(startPoint)
        const [endX, endY] = getPos(endPoint)
        this.lineGraphics.moveTo(startX, startY) // 移动到起始点
        this.lineGraphics.lineTo(endX, endY) // 划动到结束点
        this.lineGraphics.stroke();
        this.startPos = pos
    }

    onTouchEnd(event) {
        console.log('onTouchEnd')
        this.endPos = event.getLocation() // 划动结束位置
        let lineHeight = this.endPos.y - this.startPos.y
        let lineWidth = this.endPos.x - this.startPos.x
        this.lineGraphics.clear()
        if (!this.lineNode) {
            return
        }
        if (lineHeight > 50 || lineHeight < -50) { // 处理上下位移过大时不切水果
            this.lineNode.removeFromParent()
            this.lineNode = null
            return
        }
        if (lineWidth > 200 || lineWidth < -200) { // 处理左右位移过大时不切水果
            this.lineNode.removeFromParent()
            this.lineNode = null
            return
        }
        // let fruits = this.fruits.getChildren() // 获取当前界面中的所有水果节点
        // for (let i = 0; i < fruits.length; i++) {
        //     let fruit = fruits[i]
        //     if (!fruit.activeInHierarchy) continue // 如果水果已移除，则跳过
        //     let boundBox = fruit.getBoundingBox() // 水果节点的包围盒
        //     let pos = this.fruits.convertToWorldSpaceAR(fruit.position) // 将节点位置转换为屏幕坐标
        //     let pos1 = this.node.convertToNodeSpaceAR(pos) // 节点坐标
        //     if (lineBoxIntersect(boundBox, pos1)) { // 判断水果是否和轨迹有重叠
        //         fruit.getComponent(Fruit).splitFruit(pos1, lineNode) // 切水果
        //     }
        // }
    }
    onLoad() {
        systemEvent.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this)
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this)
        systemEvent.on(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this)

    }

    start() {

    }

    update(deltaTime: number) {

    }
}


