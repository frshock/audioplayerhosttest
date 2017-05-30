import React, { Component } from 'react';
import { Link } from 'react-router';

class SongDetails extends Component {
    render() {
        // console.log(this.props)

        // using destructuring to grab the relevant props
        let { songs, selectSong } = this.props;
        // getting the id of the song using the routeParams, then getting the relevant song info using that id
        let songId = (this.props.routeParams.id);
        let song = songs[songId]

        // Display the title and description of the song, and also use the selectSong method from the props to add a play button
        return (
            <div>
                <Link to="/songs"><button>Back</button></Link>
                <h2>Song Details</h2>
                <h3>
                    {song.title}  
                    <button onClick={() => selectSong(song.id)}><i className="fa fa-play"></i></button> 
                </h3>
                <p>{song.description}</p>     
            </div>
        )
    }
}

export default SongDetails;