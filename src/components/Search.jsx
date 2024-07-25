import { useState,useEffect } from 'react'
import './Search.css'
import { IoIosAddCircle } from "react-icons/io";
const Search = () => {
    const [searchInput,setSearchInput]=useState('')
    const[accessToken,setAccessToken]=useState('')
    const[albums,setAlbums]=useState([])
    const[artists,setArtists]=useState([])
    const[tracks,setTracks]=useState([])
    const[albumSongs,setalbumSongs]=useState([])
    const[audio,setAudio]=useState([])
    const [albumImage, setAlbumImage] = useState('')
    const [artistSongs,setArtistSongs]=useState([])
    const[addingTrack,setAddingTrack]=useState()
    const[showSongs,setshowSongs]=useState(true);
    const[showArtists,setshowArtists]=useState(true);
    const[showAlbums,setshowAlbums]=useState(true);
    const handleChange=(e)=>{
        setSearchInput(capitalize(e.target.value))
        setshowAlbums(true)
        setshowArtists(true)
        setshowSongs(true)
    }
    var searchParameters={
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+accessToken
        }
    }
    const handleSong = (e) => {
        //changing target
        if (e.target.tagName === 'H3' || e.target.tagName === 'IMG') {
        e = e.target.parentElement;
        }
        tracks.map((track)=>{
            if(track.id ===e.id){
                setAudio (track.preview_url);
            }
        })
    }
    const handleArtistSong=(e)=>{
        //changing target
        if (e.target.tagName === 'H3' || e.target.tagName === 'IMG') {
            e = e.target.parentElement;
        }
        artistSongs.map((track)=>{
            if(track.id ===e.id){
                if(track.preview_url)setAudio (track.preview_url);
            }
        })
    }
    const handleAddSong=(title)=>{
        let p=JSON.parse(localStorage.getItem('Playlists'));
        p.map(playlist=>{
            console.log(playlist.title,title)
            if(playlist.title===title){
                var flag=true;
                playlist.songs.map((track)=>{
                    if(track.id==addingTrack.id)flag=false;
                })
                if(flag){
                    playlist.songs.push(addingTrack)
                localStorage.setItem('Playlists',JSON.stringify(p))
                }
            }
        })
    }
    const handleArtist=async (e)=>{
        //changing target
        if (e.target.tagName === 'H3' || e.target.tagName === 'IMG') {
            e = e.target.parentElement;
        }
        const artistId = e.id;
        setArtists([])
    
        await fetch('https://api.spotify.com/v1/artists/'+artistId+'/top-tracks',searchParameters)
        .then(response=>response.json())
        .then(data=>{
            const arr=[]
            data.tracks.map(track=>{
                if(track.preview_url!=null)arr.push(track)
            })
            if(arr.length>0)setArtistSongs(arr)
            else alert('top tracks not found for this artist please try another artist')
        })
    }
    const handleAlbumSong=(e)=>{
            //changing target
            if (e.target.tagName === 'H3' || e.target.tagName === 'IMG') {
                e = e.target.parentElement;
            }
            albumSongs.map((track)=>{
                if(track.id ===e.id){
                    setAudio (track.preview_url);
                }
            })
    }
    const handleAlbum =async (e)=>{
            //changing target
            if (e.target.tagName === 'H3' || e.target.tagName === 'IMG') {
                e = e.target.parentElement;
            }
            const albumId = e.id;
            //getting image url 
            await fetch('https://api.spotify.com/v1/albums/'+albumId,searchParameters)
            .then(response=>response.json())
            .then(data=>{
                setAlbumImage(data.images[0].url)
            })
            setAlbums([])
            const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
        
            await fetch(url,searchParameters)
            .then(response=>response.json())
            .then(data=>{
                setalbumSongs(data.items)
            })
    }
    function capitalize(s){
        s=s.split(" ");
        for(let i=0;i<s.length;i++){
            if(s[i].length>0 && s[i][0]!=' ')s[i] = s[i][0].toUpperCase() + s[i].substr(1);
        }
        return s.join(" ");
    }
    useEffect(()=>{
        const CLIENT_ID='3a759f612a204c85a1495e25ef1fee08'
        const CLIENT_SECRET='643237aa5ecc4e4aa8c222c1fbd83dc4'
        var authparameters={
            method:'POST',
            headers:{
                'Content-type':'application/x-www-form-urlencoded'
            },
            body:'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token',authparameters)
        .then(result=> result.json())
        .then(data=>setAccessToken(data.access_token))
    },[]);
    async function search(){
        //GET request using search to get arist ID
        var searchParameters={
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken
            }
        }
        //for tracks
        await fetch('https://api.spotify.com/v1/search?q='+searchInput+'&type=track&market=IN',searchParameters)
        .then(response=>response.json())
        .then(async (data)=>{
            let arr=[];
            data.tracks.items.map((track)=>{
                if(track.preview_url!=null && track.album.images!=null)arr.push(track)
            })
            setTracks(arr)
        })
        //for artists
        await fetch('https://api.spotify.com/v1/search?q='+searchInput+'&type=artist&market=IN',searchParameters)
            .then(response=>response.json())
            .then(data=>{
                let arr=[]
                data.artists.items.map(artist =>{
                    if(artist.images!=null)arr.push(artist)
                })
                setArtists(arr)
            })
        //for albums
        await fetch('https://api.spotify.com/v1/search?q='+searchInput+'&type=album&market=IN',searchParameters)
    .then(response=>response.json())
    .then(data=>{
            let arr=[]
            data.albums.items.map(album =>{
                if(album.images!=null)arr.push(album)
            })
            setAlbums(arr)
    })
    } 
    useEffect(() => {
        if (searchInput) {
            search();
        } else {
            setAlbums([])
            setArtists([])
            setTracks([])
            setalbumSongs([])
            setAlbumImage('')
            setArtistSongs([])
        }
    }, [searchInput]);
    return (
        <div id="main"> 
            <input type="text" placeholder='SEARCH SONGS' id='search'onChange={handleChange}/>
            <div id='searchcontainer'>
                <div className="searchComponent" id="SongComp">
                <h2>Songs</h2>
                {showSongs &&
                    tracks.map(track=>{ 
                        console.log(showSongs);
                        return (track && 
                            <div key={track.id} id ={track.id} className="component" onClick={handleSong} >
                                <h3>{track.name}</h3>
                                <button onClick={()=>{
                                    setshowSongs(false)
                                    setAddingTrack(track)
                                }} 
                                id='PlaylistButton'><IoIosAddCircle onClick={()=>{
                                    setshowSongs(false)
                                    setAddingTrack(track)   
                                }} style={{height:'25px',width:'25px'}}/></button>
                                <img src={track.album.images[0].url} alt={track.name} className="photo" />
                            </div>
                        )
                    })
                }
                {
                        !showSongs && JSON.parse(localStorage.getItem('Playlists')).length==0 &&
                        <h3>No playlists found, create one by clicking PLAYLISTS</h3>
                    }
                { !showSongs && JSON.parse(localStorage.getItem('Playlists')).length>0 &&
                    <>
                    <h3>select playlist to add song</h3>
                    {JSON.parse(localStorage.getItem('Playlists')).map(playlist=>{
                        return(
                            <div key={playlist.title} id='addingplaylist'>
                                <h3 onClick={()=>{
                                    handleAddSong(playlist.title)
                                    setshowSongs(true);
                                }}>{playlist.title}</h3>
                                <img  onClick={()=>{
                                    handleAddSong(playlist.title)
                                    setshowSongs(true);
                                }} src={playlist.img}></img>
                            </div>
                        )
                    })
                    }
                    </>
                }
                </div>
                <div className="searchComponent" id="ArtistComp">
                    <h2>Artists</h2>
                    {showArtists &&
                        artistSongs.map(tracks=>{
                            return(
                                <div key={tracks.id} className='component' id={tracks.id} onClick={handleArtistSong}>
                                    <h3>{tracks.name}</h3>
                                    <button onClick={()=>{
                                        setshowArtists(false)
                                        setAddingTrack(tracks)
                                    }} id='PlaylistButton'><IoIosAddCircle onClick={()=>{
                                        setshowArtists(false)
                                        setAddingTrack(tracks)
                                    }} style={{height:'25px',width:'25px'}}/></button>
                                    {tracks.album.images.length>0?<img src={tracks.album.images[0].url} alt={tracks.name} />:<></>}
                                </div>
                            )
                        })
                    }
                    {
                        !showArtists && JSON.parse(localStorage.getItem('Playlists')).length==0 &&
                        <h3>No playlists found, create one by clicking PLAYLISTS</h3>
                    }
                    { !showArtists && JSON.parse(localStorage.getItem('Playlists')).length>0 &&
                    <>
                    <h3>select playlist to add song</h3>
                    {JSON.parse(localStorage.getItem('Playlists')).map(playlist=>{
                        return(
                            <div key={playlist.title} id='addingplaylist'>
                                <h3 onClick={()=>{
                                    handleAddSong(playlist.title)
                                    setshowArtists(true);
                                }}>{playlist.title}</h3>
                                <img  onClick={()=>{
                                    handleAddSong(playlist.title)
                                    setshowArtists(true);
                                }} src={playlist.img}></img>
                            </div>
                        )
                    })
                    }
                    </>
                }
                    {showArtists &&
                        artists.map(artist=>{
                            return (

                                <div key={artist.id} id={artist.id} className="component" onClick={handleArtist}>
                                    <h3>{artist.name}</h3>
                                    {artist.images.length>0?<img src={artist.images[0].url} alt={artist.name}/>:<></>}
                                    
                                </div>
                            )
                        })
                    }
                </div>
                <div className="searchComponent" id="AlbumComp">
                    <h2>Albums</h2>
                    {showAlbums &&
                        albumSongs.map((track)=>{
                            return(
                                <div key={track.id} className='component' id={track.id} onClick={handleAlbumSong}>
                                    <h3>{track.name}</h3>
                                    <button onClick={()=>{
                                        setshowAlbums(false)
                                        setAddingTrack(track)
                                    }} id='PlaylistButton'><IoIosAddCircle onClick={()=>{
                                        setshowAlbums(false)
                                        setAddingTrack(track)
                                    }} style={{height:'25px',width:'25px'}}/></button>
                                    <img src={albumImage} alt={track.name} />
                                </div>
                            )
                        })
                    }
                    {
                        !showAlbums && JSON.parse(localStorage.getItem('Playlists')).length==0 &&
                        <h3>No playlists found, create one by clicking PLAYLISTS</h3>
                    }
                    {!showAlbums && JSON.parse(localStorage.getItem('Playlists')).length>0 &&
                    JSON.parse(localStorage.getItem('Playlists')).map(playlist=>{
                        return(
                            <div key={playlist.title} id='addingplaylist'>
                                <h3 onClick={()=>{
                                    handleAddSong(playlist.title)
                                    setshowAlbums(true);
                                }}>{playlist.title}</h3>
                                <img  onClick={()=>{
                                    handleAddSong(playlist.title)
                                    setshowAlbums(true);
                                }} src={playlist.img}></img>
                            </div>
                        )
                    })
                    }
                    {showAlbums &&
                    albums.map((album)=>{
                            return(
                                <div key={album.id} id={album.id} className="component" onClick={handleAlbum}>
                                    <h3 alt={album.name}>{album.name}</h3>
                                    {album.images.length>0?<img src={album.images[0].url} alt={album.name} />:<></>}
                                </div>
                            )
                    })}
                </div>
                <audio src={audio} controls autoPlay> </audio>
            </div>
        </div>
    )   
}
export default Search;