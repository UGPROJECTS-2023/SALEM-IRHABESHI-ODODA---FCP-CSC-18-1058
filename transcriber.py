import whisper
import os 
import random
import string
from audio import AudioExtractor



class Transcriber():

    def __init__(self, filename: str, modeltype: str = "base") -> None:
        self.filename = filename
        self.modeltype = modeltype

    def check_file(self):
        """
            checks if filename exists in path
        """
        return os.path.exists(self.filename)
    
    @staticmethod
    def _generate_random_file_name(length: int = 6):
        letters_and_digits = string.ascii_letters + string.digits
        n = "".join(random.choices(letters_and_digits, k=length))
        return f"{n}.mp3"
    

    def is_video(self):
        """
            checks if the input file is a video file
        """
        return self.filename.endswith(".mp4")

    def decode_video(self):
        """
            extracts the audio out of the file.
        """

        aext = AudioExtractor(self.filename)

        self.filename = self._generate_random_file_name()
        aext.write_extracted_audio(self.filename)
    
    def transcribe(self) -> str:
        self.model = whisper.load_model(name=self.modeltype)
        result = whisper.transcribe(self.filename)

        return result["text"]
