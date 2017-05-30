import React, { Component } from 'react';

class App extends Component {
    state = {
        index: 0,
        playing: false,
        duration: 0,
        currentTime: 0,
        cheatcode: [],
        wincode: ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a', 'start', 'select'],
        youwin: false
    }

    //Binding the methods that need access to 'this'
    // this.tick = this.tick.bind(this);

    componentDidMount() {
        const player = this.refs.player;
        player.volume = .6;
        //This adds an event listener to the duration change event, which updates the duration a change in duration is detected (whenever the song changes)
        //We need to check for NaN, since duration will be NaN while the player is loading the next song.
        //If this syntax is unfamiliar, it is the plain JavaScript equivalent of the jQuery event Listener methods.
        //For example, player.onclick = function is just like $(player).click(function)
        // player.ondurationchange = () => {
        //     if (!isNaN(player.duration)) {
        //         this.setState({
        //             duration: player.duration
        //         })
        //     }
        // }

        //This starts a timer that will call our 'this.tick' method every 100ms.
        // this.timer = setInterval(this.tick, 100);
    }
    componentWillUnmount() {
        //remove the timer when component unmounts, so that it doesn't keep going when our component is unneeded
        // clearInterval(this.timer);
    }
    componentDidUpdate(prevProps, prevState) {
        const player = this.refs.player

        if (JSON.stringify(this.state.cheatcode) === JSON.stringify(this.state.wincode) && this.state.youwin === false) {
            console.log('EASTER EGG UNLOCKED');
            this.setState({
                youwin: true
            })
        }
        //Whenever the index is changed(aka the song has changed), reset the current time to 0.
        // if (prevState.index !== this.state.index) {
        //     this.setState({
        //         currentTime: 0
        //     })
        // }

        //If the state indicates that the audio should be playing, 
        //we play the audio and add an event listener that automatically plays the next song when this one ends
        //If a song should not be playing, we pause the player.
        if (this.state.playing) {
            player.play();
            player.onended = () => {
                this.changeSong(1);
            }
        } else {
            player.pause();
        }
    }
    // Here we have our methods for changing and playing songs. 
    // Note that these methods are fairly simple, just making changes to our App component's state.
    // Instead of manipulating the audio player directly inside these methods, we change our state,
    // and let the component lifecycle methods (like componentDidUpdate) handle what to do when the state changes.
    // This makes sure that our state is the 'source of truth' for our component,
    // instead of making changes that are not represented in our App's state
    changeSong = (num) => {
        const songs = this.props.route.songs;
        //We use modulus here to automatically loop the index around when we reach the beginning or end of the song list.
        //This can handle changes in both directions, so we only need one function for both next and previous.
        //We just call the function with either '1' or '-1' to tell the function which change to make.
        let newIndex = (this.state.index + songs.length + num) % songs.length
        this.setState({
            index: newIndex
        })
    }

    nextSong = (num) => {
        const songs = this.props.route.songs;
        let newIndex = (this.state.index + songs.length + num) % songs.length
        this.setState({
            index: newIndex,
            cheatcode: this.state.cheatcode.concat(['right'])
        })
    }

    prevSong = (num) => {
        const songs = this.props.route.songs;
        let newIndex = (this.state.index + songs.length + num) % songs.length
        this.setState({
            index: newIndex,
            cheatcode: this.state.cheatcode.concat(['left'])
        })
    }

    playSong = () => {
        this.setState({
            playing: true,
            cheatcode: this.state.cheatcode.concat(['a'])
        })
    }

    pauseSong = () => {
        this.setState({
            playing: false,
            cheatcode: this.state.cheatcode.concat(['b'])
        })
    }

    startButton = () => {
        this.setState({
            cheatcode: this.state.cheatcode.concat(['start'])
        })
        console.log('start button');
    }

    selectButton = () => {
        this.setState({
            cheatcode: this.state.cheatcode.concat(['select'])
        })
        console.log('select button');
    }

    upButton = () => {
        const player = this.refs.player
        player.volume += .2;
        this.setState({
            cheatcode: this.state.cheatcode.concat(['up'])
        })
    }

    downButton = () => {
        const player = this.refs.player
        player.volume -= .2;
        this.setState({
            cheatcode: this.state.cheatcode.concat(['down'])
        })
    }

    togglePlay = () => {

        this.setState({
            playing: !this.state.playing
        })

    }
    selectSong = (num) => {
        this.setState({
            index: num,
            playing: true
        })
    }

    resetGame = () => {
        this.setState({
            playing: false,
            cheatcode: [],
            youwin: false
        })
    }

    //This method gets called every 0.1s.
    //if a song is currently playing, it updates the currentTime of the song
    // tick() {
    //     if (this.state.playing) {
    //         this.setState({ currentTime: this.refs.player.currentTime })
    //     }
    // }
    //This method simply converts a time in seconds into a string format with MM:SS for display.
    //Note that since we don't need access to 'this' in this method, it doesn't necessarily have to be bound in the constructor.
    displayTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return `${minutes}:${seconds}`
    }
    render() {
        const songs = this.props.route.songs;
        let winAnimation;

        if (this.state.youwin) {
            winAnimation = (
                <div className="space">
                    <div className="ship">
                        <div className="ship-rotate">
                            <div className="pod"></div>
                            <div className="fuselage"></div>
                        </div>
                    </div>
                    <div className="ship-shadow"></div>
                    <div className="mars">
                        <div className="tentacle"></div>
                        <div className="flag">
                            <div className="small-tentacle"></div>
                        </div>
                        <div className="planet">
                            <div className="surface"></div>
                            <div className="crater1"></div>
                            <div className="crater2"></div>
                            <div className="crater3"></div>
                        </div>
                    </div>
                    <div className="test"></div>
                    <button onClick={this.resetGame}>Go Back</button>
                </div>
            )
        }
        else if (!this.state.youwin) {
            winAnimation = (
                <div>
                    <figure id="nespad">
                        <div className="cord"></div>
                        <section className="dpad-pane">
                            <div className="dpad-hole"></div>
                            <div id="dpad">
                                <canvas height="150" id="dpad-body" width="150"></canvas><button onClick={this.upButton} className="button" id="up"></button><button onClick={() => { this.nextSong(1) } } className="button" id="right"></button><button onClick={this.downButton} className="button" id="down"></button><button onClick={() => { this.prevSong(-1) } } className="button" id="left"></button>
                            </div>
                        </section>
                        <section className="menu-pane">
                            <div className="labels">
                                <label className="select">Select</label><label className="start" >Start</label>
                            </div>
                            <div className="buttons">
                                <button className="button select" onClick={this.selectButton} id="select">Select</button><button onClick={this.startButton} className="button start" id="start">Start</button>
                            </div>
                        </section>
                        <section className="action-pane">
                            <div className="logo">
                                Nintendo
                        </div>
                            <div className="buttons">
                                <label className="label">B<button onClick={this.pauseSong} className="button" id="b"></button></label><label className="label">A<button onClick={this.playSong} className="button" id="a"></button></label>
                            </div>
                        </section>
                    </figure>
                    <button className="resetButton" onClick={this.resetGame}>Start Over</button>
                </div>
            )
        }

        return (
            <div className="App">

                {/*React.cloneElement(this.props.children, { songs, selectSong })*/}

                <audio ref="player" src={songs[this.state.index].source} ></audio>
                {winAnimation}
                <h1 className="gomid">Now Playing: {songs[this.state.index].title}</h1>
            </div>
        );
    }
}

export default App;
