document.addEventListener("DOMContentLoaded", function () {
    const playlists = document.querySelectorAll(".day-container");
    const songListElements = document.querySelectorAll(".playlist-songs");
    const audioPlayer = document.getElementById("audio-player");
    const audioElement = document.getElementById("audio");
    const currentSongDisplay = document.getElementById("current-song");
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");

    let currentPlaylistIndex = -1;
    let currentSongIndex = -1;
    let playlistsData = [];

    // Load JSON file
    fetch("songs.json")
        .then(response => response.json())
        .then(data => {
            playlistsData = data;
            initializePlaylists();
        });

    function initializePlaylists() {
        playlists.forEach((playlist, index) => {
            const titleElement = playlist.querySelector(".playlist-title");
            const songList = playlist.querySelector(".playlist-songs");

            // Initially collapse all folders
            songList.style.display = "none";

            // Populate songs
            playlistsData[index].songs.forEach(song => {
                const songItem = document.createElement("li");
                songItem.textContent = song.name;
                songItem.addEventListener("click", () => playSong(index, playlistsData[index].songs.indexOf(song)));
                songList.appendChild(songItem);
            });

            // Expand/Collapse on click
            titleElement.addEventListener("click", () => {
                if (songList.style.display === "none") {
                    // Collapse other open folders
                    songListElements.forEach(sl => (sl.style.display = "none"));
                    songList.style.display = "block";
                } else {
                    songList.style.display = "none";
                }
            });
        });
    }

    function playSong(playlistIndex, songIndex) {
        currentPlaylistIndex = playlistIndex;
        currentSongIndex = songIndex;

        const song = playlistsData[playlistIndex].songs[songIndex];
        audioElement.src = song.url;
        audioElement.play();
        currentSongDisplay.textContent = `Playing: ${song.name}`;
        audioPlayer.classList.remove("hidden");
    }

    // Next Song
    nextButton.addEventListener("click", () => {
        if (currentPlaylistIndex === -1 || currentSongIndex === -1) return;

        currentSongIndex++;
        if (currentSongIndex >= playlistsData[currentPlaylistIndex].songs.length) {
            currentSongIndex = 0;
        }
        playSong(currentPlaylistIndex, currentSongIndex);
    });

    // Previous Song
    prevButton.addEventListener("click", () => {
        if (currentPlaylistIndex === -1 || currentSongIndex === -1) return;

        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = playlistsData[currentPlaylistIndex].songs.length - 1;
        }
        playSong(currentPlaylistIndex, currentSongIndex);
    });
});
