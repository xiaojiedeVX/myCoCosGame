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
    player:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Integer)
    private jumpHeigth = 0;;
    @property(cc.Integer)
    private wallWidth = 80;;
    // onLoad () {}

    start () {
        this.setInputControl();
    }

    private setInputControl(){
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this)  //  键盘按下
        // cc.systemEvent.once(cc.SystemEvent.EventType.KEY_UP,this.keyUp,this)  //键盘松起
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_START,this.touchBegan,this)
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel,this)
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)
    }

    // private keyDown(){
    //     console.log('键盘被按下了')
    // }
    // private keyUp(){
    //     console.log('键盘被放开了')
    // }
    private touchBegan(e:cc.Event.EventTouch){
        let num :number = e.getLocationX();
        let midNumber:number = cc.winSize.width/2;
        if(num<=midNumber){
            this.playerMoveLeft();
        }else{
            this.playerMoveRight();
        }
    }

    private touchEnd(){
    }

    private touchCancel(){
        
    }

    private playerMoveRight(){
        console.log(this.node.width)
        let goRight = cc.moveTo(0.8,cc.v2(cc.winSize.width,this.player.y));
        this.player.runAction(goRight);
    }

    private playerMoveLeft(){
        console.log(this.node.width)
        let goLeft = cc.moveTo(0.8,cc.v2(-cc.winSize.width,this.player.y));
        this.player.runAction(goLeft);
    }

    // update (dt) {}
}
