document.addEventListener("DOMContentLoaded", function () {
    const playlists = document.querySelectorAll(".day-container");
    const audioElement = document.getElementById("audio");
    const currentSongDisplay = document.getElementById("current-song");
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");

    let currentPlaylistIndex = -1;
    let currentSongIndex = -1;
    let currentSongElement = null;  // To track the currently playing song element
    let playlistsData = [];

    // Load JSON file
    fetch("songs.json")
        .then(response => response.json())
        .then(data => {
            playlistsData = data;
            initializePlaylists();
        });

    // Initialize playlists and songs
    function initializePlaylists() {
        playlists.forEach((playlist, playlistIndex) => {
            const titleElement = playlist.querySelector(".playlist-title");
            const songList = playlist.querySelector(".playlist-songs");

            // Initially collapse all folders
            songList.style.display = "none";

            // Populate songs
            playlistsData[playlistIndex].songs.forEach((song, songIndex) => {
                const songItem = document.createElement("li");
                songItem.textContent = song.name;
                songItem.addEventListener("click", () => playSong(playlistIndex, songIndex, songItem));
                songList.appendChild(songItem);
            });

            // Expand/Collapse playlist on title click
            titleElement.addEventListener("click", () => {
                if (songList.style.display === "none") {
                    songList.style.display = "block";
                } else {
                    songList.style.display = "none";
                }
            });
        });
    }

    // Play the song and update the player
    function playSong(playlistIndex, songIndex, songElement) {
        // Update current song index
        currentPlaylistIndex = playlistIndex;
        currentSongIndex = songIndex;

        const song = playlistsData[playlistIndex].songs[songIndex];
        audioElement.src = song.url;
        audioElement.play();

        // Update current song display
        currentSongDisplay.textContent = `Playing: ${song.name}`;

        // Highlight the current song
        if (currentSongElement) {
            currentSongElement.classList.remove("highlight");
        }
        songElement.classList.add("highlight");
        currentSongElement = songElement;
    }

    // Next Song
    nextButton.addEventListener("click", () => {
        if (currentPlaylistIndex === -1 || currentSongIndex === -1) return;

        currentSongIndex++;
        if (currentSongIndex >= playlistsData[currentPlaylistIndex].songs.length) {
            currentSongIndex = 0;
        }
        const songItem = playlists[currentPlaylistIndex].querySelectorAll(".playlist-songs li")[currentSongIndex];
        playSong(currentPlaylistIndex, currentSongIndex, songItem);
    });

    // Previous Song
    prevButton.addEventListener("click", () => {
        if (currentPlaylistIndex === -1 || currentSongIndex === -1) return;

        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = playlistsData[currentPlaylistIndex].songs.length - 1;
        }
        const songItem = playlists[currentPlaylistIndex].querySelectorAll(".playlist-songs li")[currentSongIndex];
        playSong(currentPlaylistIndex, currentSongIndex, songItem);
    });
});
