import { _decorator, Component, Vec3, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('rotate')
export class rotate extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    onLoad() {
        let rotateSpeed = 40;
        let angle = 0;
        setInterval(() => {
            const fruit = this.node;
            let newRotation = new Quat();
            let axis = new Vec3(0, 0, 1); // 确定绕着哪个轴旋转
            angle += 1
            let radian = angle * (Math.PI / 180); // 将角度转换为弧度制
            Quat.fromAxisAngle(newRotation, axis, radian);
            fruit.setRotation(newRotation);
        },rotateSpeed / 360)
    }
}

