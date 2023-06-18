import { _decorator, Component, systemEvent,SystemEvent,director, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onMouseDown(){
        director.loadScene('scene-2')
    }

    // onLoad(){
    //     systemEvent.on(SystemEvent.EventType.MOUSE_DOWN, this.onMouseDown, this);
    // }

    // onDestroy(){
    //     systemEvent.off(SystemEvent.EventType.MOUSE_DOWN, this.onMouseDown, this);
    // }
}

