export default class TapBPM {
    constructor() {
        this.prevTime = 0;
        this.countClicks = 0;
        this.currentTime = 0;
        this.bpm = 0;
        this.timeDifference = 0;
        this.bpmTotal = 0;
        this.bpmFinal = 0;
    }

    showCurrentBPM() {
        if (this.prevTime === 0) {
            this.prevTime = Date.now();
        } else if ((Date.now() - this.prevTime) > 2200) {
            this.resetBpm();
        } else {
            this.currentTime = Date.now();
            this.timeDifference = this.currentTime - this.prevTime;
            this.prevTime = this.currentTime;
            this.bpm = 60 / this.timeDifference;
            this.bpmTotal = this.bpmTotal + this.bpm;
            this.countClicks++;
            this.bpmFinal = (this.bpmTotal / this.countClicks) * 1000;
            return +this.bpmFinal.toFixed(0)
        }
    }

    resetBpm() {
        this.prevTime = 0;
        this.bpm = 0;
        this.bpmTotal = 0;
        this.bpmFinal = 0;
        this.countClicks = 0;
    }
}

