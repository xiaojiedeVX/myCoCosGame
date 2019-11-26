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
    reStartBtn:cc.Node =null

    @property(cc.Label)
    ScoreLabel:cc.Label = null;

    @property(cc.Label)
    mylove:cc.Label = null;



    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.btnScale();
        this.getGlobalScore();
        cc.audioEngine.stopMusic();
        cc.director.preloadScene('Main');
        cc.log(this.node.children[0])
        this.reStartBtn.on('touchstart',()=>{
            cc.director.loadScene('Main')
        })
    }

    private getGlobalScore(){
        let tem = cc.sys.localStorage.getItem('globalScore');
        this.ScoreLabel.string = `最终得分:${tem}`;
        let num = Number(tem)
        if(num<52){
            this.mylove.string = `亲爱的陈，如果你玩到52分，你将会看到我对你说的话喔`
        }else if(num>=52&&num<100){
            this.mylove.string = "傻逼，你真玩到啦，你可以试试玩到100分，我还有话对你说喔"
        }else {
            this.mylove.string = "陈宝贝 我爱你"
        }
    }

    private btnScale(){
        let scaleTo = cc.scaleTo(0.9,0.9);
        let scalleRe = cc.scaleTo(0.9,1.0)
        let seq = cc.sequence(scaleTo,scalleRe);
        let repeat = cc.repeatForever(seq);
        this.reStartBtn.runAction(repeat);
    }
    

    // start () {

    // }

    // update (dt) {}
}
