# Import moviepy
import moviepy.editor as editor


class AudioExtractor():
    def __init__(self, videopath: str) -> None:
        self.videopath = videopath

    @property
    def video(self) -> editor.VideoFileClip:

        #Load the Video
        return editor.VideoFileClip(self.videopath)
    
    @property
    def audio(self) -> editor.AudioFileClip:

        #Extract the Audio
        return self.video.audio
    
    def write_extracted_audio(self, audiopath):

        #Export the Audio
        self.audio.write_audiofile("audio2.mp3")

