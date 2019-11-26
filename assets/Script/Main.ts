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
    private jumpHeigth =60;

    @property(cc.Integer)
    private diciCount = 0;

    @property(cc.Integer)
    private wallWidth = 80;

    @property(cc.Label)
    scoreLabel:cc.Label = null;

    @property(cc.Integer)
    private score = 0;

    @property(cc.Label)
    timeLabel:cc.Label = null;

    @property(cc.Integer)
    private gameTime = 520;


    @property(cc.Integer)
    private diciDuration = 140;;

    @property(cc.Prefab)
    diChi:cc.Prefab = null;

    @property(cc.Texture2D)
    bgAudio:cc.Texture2D = null; 

    @property(cc.Texture2D)
    jumpAudio:cc.Texture2D = null; 


    onLoad () {
        this.setInputControl();
        cc.audioEngine.playMusic(this.bgAudio,true);
        cc.audioEngine.setEffectsVolume(0.2);
        this.player.setPosition(-this.node.width/2+this.wallWidth,this.node.height/2-175);
        for(let i =0;i<=8;i++){
            this.newDici();
        }
        cc.director.preloadScene('Over')
        this.schedule(()=>{
            this.gameTime--;
            console.log(this.gameTime)
            this.timeLabel.string = `倒计时:${this.gameTime}`
            if(this.gameTime<=0){
                cc.director.loadScene('Over')
            }
        },1)
    }

    // start () {
     
    //     this.
    // }

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

    // 生成地刺

    private newDici(){
        this.diciCount+=1;
        let newDiCi = cc.instantiate(this.diChi);
        this.node.addChild(newDiCi);
        let randD = Math.random();
        newDiCi.scale = randD>=0.5?-1:1
        newDiCi.setPosition(this.diciPosition(randD))
    }

    private diciPosition(randD){
        let randX = 0;
        let randY = 0;
        let rightP = this.node.width/2-this.wallWidth;
        randX =  randD>0.5?rightP:-rightP
        if(this.diciCount<9){
            randY = this.node.height/2-(this.diciDuration*this.diciCount)-this.diciDuration*1
        }else{
            randY = this.node.height/2-(this.diciDuration*8)-this.diciDuration*1
        }
        return cc.v2(randX,randY)
    }

    private touchBegan(e:cc.Event.EventTouch){
        cc.audioEngine.playEffect(this.jumpAudio,false);
        let num :number = e.getLocationX();
        let midNumber:number = cc.winSize.width/2;
        if(num<=midNumber&&this.player.x){
            this.playerMoveLeft();
        }else{
            this.playerMoveRight();
        };
        this.score+=1;
        this.scoreLabel.string =this.score.toString();
        cc.sys.localStorage.setItem('globalScore',this.score)
        this.newDici();
    }

    private touchEnd(){
    }

    private touchCancel(){
        
    }

    private playerMoveRight(){  //向右移动
        let rightP = this.node.width/2-this.wallWidth;
        let goRight = cc.moveTo(0.2,cc.v2(rightP,this.player.y));
        let goC1 = cc.moveTo(0.1,cc.v2(rightP-this.jumpHeigth,this.player.y)) 
        let goC2 = cc.moveTo(0.1,cc.v2(rightP,this.player.y)) ;
        let seq = cc.sequence(goC1,goC2);
        if(this.player.scale == -1){
            this.player.runAction(seq);
        }else{
            this.player.runAction(goRight);
        }
        this.player.scale = -1;
    }

    private playerMoveLeft(){  // 向左移动
        let rightP = -this.node.width/2+this.wallWidth;
        let goLeft = cc.moveTo(0.2,cc.v2(rightP,this.player.y));
        let goC1 = cc.moveTo(0.1,cc.v2(rightP+this.jumpHeigth,this.player.y)) 
        let goC2 = cc.moveTo(0.1,cc.v2(rightP,this.player.y)) ;
        let seq = cc.sequence(goC1,goC2);
        if(this.player.scale == 1){
            this.player.runAction(seq);
        }else{
            this.player.runAction(goLeft);
        }
        this.player.scale = 1;
    }

    // update (dt) {}
}
