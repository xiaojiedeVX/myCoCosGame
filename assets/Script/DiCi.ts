// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import temPlaer from './Player'
// let temPlayer = require('Player');

@ccclass
export default class NewClass extends cc.Component {



    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.inPutControl();
    }

    start () {
        this.inPutControl();
    }


    private inPutControl(){
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_START,this.touchBegan,this)
    }

    private touchBegan(){
        let goAction = cc.moveBy(0.2,cc.v2(0,140));
        this.node.runAction(goAction);
    }
    private noteBox(){
        return this.node.getBoundingBoxToWorld();
    }

    update (dt) {
        cc.director.preloadScene('Over')
        let player = cc.find("Canvas/player").getComponent(temPlaer);
        console.log()
        if(cc.Intersection.rectRect(player.node.getBoundingBoxToWorld(),this.noteBox())){
            cc.director.loadScene('Over')
        }
        // if(cc.intersectsRect()){}
    }
}
