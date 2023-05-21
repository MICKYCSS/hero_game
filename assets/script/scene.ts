import { _decorator, Component, Node,SceneAsset,Director } from 'cc';
const { ccclass, property, } = _decorator;

@ccclass('scene')
export class scene extends Component {
    @property({ type: SceneAsset })
    private targetScene: SceneAsset = null;

    public goToScene2() {
        if (this.targetScene) {
            Director.instance.loadScene(this.targetScene.name);
        }
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}

