import { Howl } from 'howler';
import moveSelfMP3 from './sounds/move-self.mp3';
import captureMP3 from './sounds/capture.mp3';

const moveSelf = new Howl({
    src: [moveSelfMP3]
})

export function soundMoveSelf() {
    moveSelf.play();
}

const capture = new Howl({
    src: [captureMP3]
})

export function soundCapture() {
    capture.play();
}