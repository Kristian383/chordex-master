
export default class TapBPM {
    constructor() {
        this._bpm = 0;
        this._taps = [];
        this._precision = 5;
    }

    assignEvents() {
        this._taps.push(Date.now());
        this.calcBPM();
    }

    calcBPM() {
        let current_bpm = 0;
        let ticks = [];

        if (this._taps.length >= 2) {

            for (let i = 0; i < this._taps.length; i++) {
                if (i >= 1) {
                    // calc bpm between last two taps
                    ticks.push(Math.round(60 / (this._taps[i] / 1000 - this._taps[i - 1] / 1000) * 100) / 100);
                }
            }
        }

        if (this._taps.length >= 14) {
            this._taps.shift();
        }

        if (ticks.length >= 2) {
            current_bpm = this.getAverage(ticks, this._precision);
            this._bpm = current_bpm;
        }
    }

    getAverage(Values, Precision) {
        let ticks = Values;
        let n = 0;

        for (let i = ticks.length - 1; i >= 0; i--) {
            n += ticks[i];
            if (ticks.length - i >= Precision) break;
        }

        return n / this._precision;
    }

    showCurrentBPM() {
        let currentBpm = Math.round(this._bpm);
        return currentBpm >= 250 ? 250 : currentBpm;
    }

    resetBpm() {
        this._bpm = 0;
        this._taps = [];
    }
}






