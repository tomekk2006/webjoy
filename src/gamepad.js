class Gamepad {
    
    constructor () {
        console.log('Ready for controllers');   
        this.mainloop = setInterval(()=>{
            navigator.getGamepads().forEach((gamepad)=>{
                if (gamepad === null) return;
                gamepad.buttons.forEach((button, index)=> {
                    if (button.pressed) {
                        console.log('Pressed button '+index+' '+button.value*100+'%')
                    }
                });
            });
        },1);
        // events
        window.addEventListener('gamepadconnected', (ev) => {
            console.log('Gamepad connected: '+ev.gamepad.id);
            console.log(ev.gamepad.mapping);
        });
        window.addEventListener('gamepaddisconnected', (ev) => {
            console.log('Gamepad disconnected: '+ev.gamepad.id);
        });
    }
    stop() {
        clearInterval(this.mainloop);
        this.connectedGamepads.clear()
    }

}
gamepad = new Gamepad();