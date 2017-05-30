import React, {Component} from 'react';
import {Link} from 'react-router';

class SongsList extends Component {
    render() {
        // console.log(this.props)

        // We are using ES6 Object destructuring here. Since we know that this.props has properties called songs and selectSong,
        // We are extracting those from this.props and saving them into their own variables.
        // It is the equivalent of doing:
        // let songs = this.props.songs;
        // let selectSong = this.props.selectSong;
        let { songs, selectSong } = this.props;

        // Mapping the songs array to create our list.
        // we dynamically use the id of each song to generate the url for our Link components,
        // and also as the argument for our selectSong method.
        let songListJSX = songs.map((song,index) => {
            return (
            <li key={'song' + index}>
                <Link to={`songs/${song.id}`}>{song.title}</Link>
                <button onClick={() => selectSong(song.id)}>
                    <i className="fa fa-play"></i>
                </button>
            </li>
            )
        })

        return (
            <div>
                <h2>Song List</h2>
                <ol>
                    {songListJSX}
                </ol>
            </div>
        )
    }
}

export default SongsList;