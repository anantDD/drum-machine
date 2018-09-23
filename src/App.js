import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";

const drumSounds = [
  {
    keycode: 81,
    keyboardLetter: "Q",
    name: "Cello",
    url:
      "https://res.cloudinary.com/dvsnoxmcd/video/upload/v1529735972/cello_keb9jr.wav"
  },
  {
    keycode: 87,
    keyboardLetter: "W",
    name: "arpeggio slow",
    url:
      "https://res.cloudinary.com/dvsnoxmcd/video/upload/v1529735972/arpeggioSlow_uvk5cx.wav"
  },
  {
    keycode: 69,
    keyboardLetter: "E",
    name: "arpeggio fast",
    url:
      "https://res.cloudinary.com/dvsnoxmcd/video/upload/v1529735971/arpeggioFast_cd1or7.wav"
  },
  {
    keycode: 65,
    keyboardLetter: "A",
    name: "Kick Resonate",
    url:
      "https://res.cloudinary.com/dvsnoxmcd/video/upload/v1529735971/kick_iemzss.wav"
  },
  {
    keycode: 83,
    keyboardLetter: "S",
    name: "Snare",
    url:
      "https://res.cloudinary.com/dvsnoxmcd/video/upload/v1529735971/snare_inpgde.wav"
  },
  {
    keycode: 68,
    keyboardLetter: "D",
    name: "Open Hat",
    url:
      "https://res.cloudinary.com/dvsnoxmcd/video/upload/v1529735971/openHat_wsiwlq.wav"
  },
  {
    keycode: 90,
    keyboardLetter: "Z",
    name: "Clap",
    url:
      "https://res.cloudinary.com/dvsnoxmcd/video/upload/v1529735971/clap_yo8tug.wav"
  },
  {
    keycode: 88,
    keyboardLetter: "X",
    name: "Kick Drum",
    url:
      "https://res.cloudinary.com/dvsnoxmcd/video/upload/v1529735971/kickDrum_beoqe6.wav"
  },
  {
    keycode: 67,
    keyboardLetter: "C",
    name: "Closed Hat",
    url:
      "https://res.cloudinary.com/dvsnoxmcd/video/upload/v1529735970/closedHat_sit0l1.wav"
  }
];

const Display = props => {
  return <div id="display">{props.display}</div>;
};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeypress);
  }

  componenWillUnmount() {
    document.removeEventListener("keydown", this.handleKeypress);
  }

  handleKeypress(event) {
    if (event.keyCode === this.props.keycode) {
      this.playSound(event);
    }
  }

  playSound(e) {
    const sound = document.getElementById(this.props.keyboardLetter);
    console.log(sound);
    sound.currentTime = 0;
    sound.play();
    this.props.changeDisplay(this.props.name);
  }

  render() {
    return (
      <div className="drum-pad" id={this.props.name} onClick={this.playSound}>
        <audio
          className="clip"
          id={this.props.keyboardLetter}
          src={this.props.url}
        />
        {this.props.keyboardLetter}
      </div>
    );
  }
}

class AllDrums extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const btnList = this.props.soundBank.map((elem, i, soundArr) => {
      return (
        <DrumPad
          key={soundArr[i].keyboardLetter}
          keyboardLetter={soundArr[i].keyboardLetter}
          url={soundArr[i].url}
          keycode={soundArr[i].keycode}
          name={soundArr[i].name}
          changeDisplay={this.props.changeDisplay}
        />
      );
    });

    return <div>{btnList}</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      soundBank: drumSounds,
      display: ""
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(name) {
    this.setState({
      display: name
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <AllDrums
          soundBank={this.state.soundBank}
          changeDisplay={this.changeDisplay}
        />
        <Display display={this.state.display} />
      </div>
    );
  }
}

//Mistakes I made
// this.playSound = this.playSound(this);   Forgot to add bind here. It kept running playsound everytime it was rendered without calling it. Spent atleast 2.5 hours on this.
// this.handeKeyPress = this.handleKeypress.bind(this);   I named it incorrectly, spent another half an hour on this.
// Didn't set sound.currentTime to 0.

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
