import React from 'react';
import {Howl} from 'howler';
import sound1 from '../sounds/jump1.mp3';
import sound2 from '../sounds/jump2.mp3';
import sound3 from '../sounds/jump3.mp3';
import sound4 from '../sounds/jump4.mp3';
import bl1 from '../sounds/bl1.wav';
import bl2 from '../sounds/bl2.wav';
import bl3 from '../sounds/bl3.wav';
import bl4 from '../sounds/bl4.wav';
import bl5 from '../sounds/bl5.wav';
import bl6 from '../sounds/bl6.wav';
import bgmusic from '../sounds/bgmusic.mp3';
import intromusic from '../sounds/intromusic.mp3';
import soundGameOver from '../sounds/gameover.wav';

class SoundsManager extends React.Component {
  constructor(){
    super();
    this.bgIntroSound =  new Howl({
      src: [intromusic],
      loop: true,
      onplayerror: function() {
        this.bgIntrosound.once('unlock', function() {
          console.log('ON ERror')
          this.bgIntrosound.play();
        });
      }
    });

    this.bgGameSound =  new Howl({
      src: [bgmusic],
      volume: 0.4,
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
  }

  fadeSound(option, soundObject){
    let soundReference = soundObject.play();
    if (option) {
      soundObject.fade(0, 1, soundReference)
      console.log('Sound Play Fade')
    } else {
      soundObject.stop();
    }
  }

  playSound(option, soundObject){
    console.log('playSound', option, soundObject)
    if (option) {
      soundObject.play();
      console.log('Sound Play')
    } else {
      soundObject.stop();
    }
  }

  stopAllSounds() {
    console.log('STOP ALL SOUNDS');
    this.bgIntroSound.stop();
    this.bgGameSound.stop();
  }
}

export default SoundsManager;