import os
import json

def get_songs_data(base_directory):
    data = []

    for folder_name in os.listdir(base_directory):
        folder_path = os.path.join(base_directory, folder_name)
        if os.path.isdir(folder_path):
            songs = []
            for file_name in os.listdir(folder_path):
                if file_name.endswith(".mp3"):
                    song_path = os.path.join(folder_name, file_name).replace("\\", "/")
                    songs.append({
                        "name": file_name.rsplit(".", 1)[0],
                        "url": song_path
                    })

            data.append({
                "folder": folder_name,
                "songs": songs
            })

    return data

# Base directory containing the folders with songs
base_directory = r"D:\\Development\\workspace\\Project\\temple-songs\\Songs"

# Get the songs data
songs_data = get_songs_data(base_directory)

# Convert to JSON format
json_output = json.dumps(songs_data, indent=4, ensure_ascii=False)

# Write to a file
output_file = "songs.json"
with open(output_file, "w", encoding="utf-8") as f:
    f.write(json_output)

print(f"JSON data has been written to {output_file}")
