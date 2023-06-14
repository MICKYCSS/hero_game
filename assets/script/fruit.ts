import { _decorator, Component, Node, Sprite, resources, SpriteFrame, assetManager } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('fruit')
export class fruit extends Component {
    private fruitSprites = []
    private images = ['apple','banana','peach','sandia','basaha','boom']
    generateFruit(fruitSprites){
        let fruit = new Node('fruit')
        this.node.addChild(fruit)
        let sprite = fruit.addComponent(Sprite)
        let index = Math.floor(Math.random())*fruitSprites.length;
        sprite.spriteFrame = fruitSprites[index]

    }
    start() {

    }

    update(deltaTime: number) {
        
    }
    loadImage(){
        // resources.load('apple/spriteFrame',SpriteFrame,(err)=>{
        //     if(err){
        //         console.error(err.message)
        //         return
        //     }
        //     console.log(resources)

        // })
        const images = this.images
        for(let i=0;i<images.length;i++){
            let imagePath = 'fruit/'+ images[i]+'/spriteFrame';
            console.log(imagePath,'imagePath')
            resources.load(imagePath,SpriteFrame,null,(err,spriteFrame)=>{
                if (err) {
                    console.error(err.message || err);
                    return;
                }
                this.fruitSprites.push(spriteFrame)
                this.generateFruit(this.fruitSprites)
            })

        }
       
    }
    onLoad(){
        this.loadImage()
    }
}

