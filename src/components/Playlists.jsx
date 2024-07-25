import {useState} from 'react'
import './Playlist.css'
const Playlists = () => {
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [showSongs,setShowSongs]=useState(false);
  const [audio,setAudio]=useState([])
  const [title,setTitle]=useState('')
  const[play,setPlay]=useState()
  const[showPlaylists,setShowPlaylists]=useState(true);
  const [img,setImg]=useState('');
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('Playlists')));
  //handle delete re render 
  const handleTitleChangeInput=(e)=>{
    setTitle(e.target.value)
  }
  const handleImgChangeInput=(e)=>{
    setImg(e.target.value)
  }
  const handleCreatePlaylist=()=>{
    setShowCreateForm(false);
  }
  const handleSavePlaylist=()=>{
    setShowCreateForm(false);
    const newPlaylistObj={
      title:title,
      img:img,
      songs:[]
    };
    var flag=true;
    if(JSON.parse(localStorage.getItem('Playlists'))!=null){
      JSON.parse(localStorage.getItem('Playlists')).map(playlist=>{
        if(playlist.title===title){
          flag=false;
        }
      })
    }
    if(!flag){
      alert('Playlist title already exists');
    }
    let var_playlist=JSON.parse(localStorage.getItem('Playlists'));
    if(flag && var_playlist==null){
      localStorage.setItem('Playlists',JSON.stringify([newPlaylistObj]));
      setItems(JSON.parse(localStorage.getItem('Playlists')));
    }
    else if(flag){
      var_playlist.push(newPlaylistObj);
      localStorage.setItem('Playlists',JSON.stringify(var_playlist));
      setItems(JSON.parse(localStorage.getItem('Playlists')));
    }
    setShowPlaylists(true);
    setShowCreateForm(true);
  }
  return (
    <div id='playlist'>
      {showCreateForm && !showSongs &&
        <button id="CreatePlaylist" onClick={handleCreatePlaylist}>
          CREATE NEW PLAYLIST
        </button>
      }
      {!showCreateForm && !showSongs &&
      <>
         <h4>ENTER THE DETAILS</h4>
         <input
            placeholder='TITLE'
            type='text'
            name='title'
            onChange={handleTitleChangeInput}
          />
          <input
            placeholder='IMG URL(OPTIONAL)'
            type='url'
            name='img'
            onChange={handleImgChangeInput}
          />
          <button onClick={handleSavePlaylist}>SAVE</button>
      </>

      }
      {showPlaylists && JSON.parse(localStorage.getItem('Playlists'))!=null && !showSongs &&
         <>
        <h2>YOUR PLAYLISTS</h2>
        {items.map((playlist)=>{ 
          return (
            <div key={playlist.title} className='playlistobject'>
              <h2 onClick={()=>{
                setShowSongs(true)
                setPlay(playlist)
              }}>{playlist.title}</h2>
              <img onClick={()=>{
                setShowSongs(true)
                setPlay(playlist)
              }}src={playlist.img? playlist.img:"data:image/jpeg;base64,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"} alt={playlist.title}/>
              <button id='DeleteButton' onClick={()=>{
                playlist.songs=[];
                let p=JSON.parse(localStorage.getItem('Playlists'));
                p=p.filter(pl=>pl.title!==playlist.title);
                localStorage.setItem('Playlists',JSON.stringify(p));
                setItems(JSON.parse(localStorage.getItem('Playlists')));
              }}>DELETE</button>
            </div> 
          )
        })}
        </>
      }
      {showSongs &&
         <div>
         {play.songs.map((track)=>{
          return(track &&
          <div key={track.id}>
          <h3 onClick={()=>{
            setAudio(track.preview_url)
          }}>{track.name}</h3>
          {track.album && <img onClick={()=>{
            setAudio(track.preview_url)
          }} src={track.album.images[0].url} alt={track.name}/>}
          <button id='DeleteButton' onClick={()=>{
                let new_item=items.map(playlist=>{
                  if (playlist.title === play.title) {
                    return {
                      ...playlist,
                      songs: playlist.songs.filter(song => song.id !== track.id)
                    };
                  }
                  return playlist;     
                })
                const updatedPlay = new_item.find(playlist => playlist.title === play.title);
                setItems(new_item);
                setPlay(updatedPlay);
                localStorage.setItem('Playlists',JSON.stringify(new_item));
                setAudio('');
              }}>DELETE</button>
          </div>   
          )
        })}
        <button id='BackButton' onClick={()=>{
          setShowSongs(false)
        }}>BACK</button>
        </div>
      }
      <audio src={audio} controls autoPlay> </audio>
    </div>
  )
}

export default Playlists
