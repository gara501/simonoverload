import React from 'react';
import {Howl} from 'howler';
import intro from '../sounds/intro.wav';
import sound1 from '../sounds/jump1.mp3';
import sound2 from '../sounds/jump2.mp3';
import sound3 from '../sounds/jump3.mp3';
import sound4 from '../sounds/jump4.mp3';
import bl1 from '../sounds/bl1.mp3';
import bl2 from '../sounds/bl2.mp3';
import bl3 from '../sounds/bl3.mp3';
import bl4 from '../sounds/bl4.mp3';
import bl5 from '../sounds/bl5.mp3';
import bl6 from '../sounds/bl6.mp3';
import bl7 from '../sounds/bl7.mp3';
import bl8 from '../sounds/bl8.mp3';
import bl9 from '../sounds/bl9.mp3';
import back from '../sounds/back.wav';
import soundGameOver from '../sounds/gameover.wav';

class SoundsManager extends React.Component {
  constructor(){
    super();
    this.bgIntroSound =  new Howl({
      src: [intro],
      loop: true,
      onplayerror: function() {
        this.bgIntrosound.once('unlock', function() {
          this.bgIntrosound.play();
        });
      }
    });

    this.bgGameSound =  new Howl({
      src: [back],
      volume: 0.5,
      loop: true,
      onplayerror: function() {
        this.bgGameSound.once('unlock', function() {
          this.bgGameSound.play();
        });
      }
    });
  
    this.topLeftSound =  new Howl({ src: [sound1] });
    this.topRightSound =  new Howl({ src: [sound2] });
    this.bottomLeftSound =  new Howl({ src: [sound3] });
    this.bottomRightSound =  new Howl({ src: [sound4] });
    this.gameOverSound =  new Howl({ src: [soundGameOver] });
  
    // Extreme game sounds
    this.b1Sound =  new Howl({ src: [bl1] });
    this.b2Sound =  new Howl({ src: [bl2] });
    this.b3Sound =  new Howl({ src: [bl3] });
    this.b4Sound =  new Howl({ src: [bl4] });
    this.b5Sound =  new Howl({ src: [bl5] });
    this.b6Sound =  new Howl({ src: [bl6] });
    this.b7Sound =  new Howl({ src: [bl7] });
    this.b8Sound =  new Howl({ src: [bl8] });
    this.b9Sound =  new Howl({ src: [bl9] });
  }

  fadeSound(option, soundObject){
    console.log('fade SOUND', soundObject)
    let soundReference = soundObject.play();
    if (option) {
      soundObject.fade(0, 1, soundReference)
    } else {
      soundObject.stop();
    }
  }

  playSound(option, soundObject){
    console.log('PLAY SOUND', soundObject)
    if (option) {
      soundObject.play();
    } else {
      soundObject.stop();
    }
  }
}

export default SoundsManager;