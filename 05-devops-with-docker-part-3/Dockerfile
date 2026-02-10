FROM ubuntu:22.04

WORKDIR /usr/videos

RUN apt-get update && apt-get install -y curl python3 ffmpeg

RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
RUN chmod a+x /usr/local/bin/yt-dlp

RUN useradd -m appuser

RUN chown appuser:appuser /usr/videos

USER appuser

ENTRYPOINT ["/usr/local/bin/yt-dlp"]
