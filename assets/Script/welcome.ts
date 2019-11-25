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

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    start_btn: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.LoginScale();
        cc.director.preloadScene('Main')
        this.start_btn.on('touchstart',()=>{
            cc.director.loadScene('Main')
        })
    }

    private LoginScale():void {  //欢迎界面的开始按钮动效
        let scaleTo = cc.scaleTo(0.8,0.9);
        let scalleRe = cc.scaleTo(0.8,1.0)
        let seq = cc.sequence(scaleTo,scalleRe);
        let repeat = cc.repeatForever(seq);
        this.start_btn.runAction(repeat);
    }

    // update (dt) {}
}
