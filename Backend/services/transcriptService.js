const { YoutubeTranscript } = require("youtube-transcript");

class TranscriptService {
  /**
   * Extract YouTube Video ID
   * @param {String} url
   * @returns {String}
   */
  extractVideoId(url) {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

    const match = url.match(regExp);

    if (!match || match[2].length !== 11) {
      throw new Error("Invalid YouTube URL.");
    }

    return match[2];
  }

  /**
   * Fetch Transcript from YouTube
   * @param {String} youtubeUrl
   * @returns {Object}
   */
  async getTranscript(youtubeUrl) {
    try {
      const videoId = this.extractVideoId(youtubeUrl);

      const transcript = await YoutubeTranscript.fetchTranscript(videoId);

      if (!transcript || transcript.length === 0) {
        throw new Error("Transcript not found.");
      }

      // Convert transcript array into plain text
      const transcriptText = transcript.map((item) => item.text).join(" ");

      return {
        youtubeVideoId: videoId,
        transcript: transcriptText,
      };
    } catch (error) {
      console.error("Transcript Service Error:", error.message);

      throw new Error(
        "Unable to fetch transcript. This video may not have captions available.",
      );
    }
  }
}

module.exports = new TranscriptService();
