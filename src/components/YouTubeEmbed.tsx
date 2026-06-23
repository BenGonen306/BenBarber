"use client";

export function YouTubeEmbed({ videoId, title }: { videoId: string; title?: string }) {
  const params = new URLSearchParams({
    modestbranding: "1",
    rel: "0",
    controls: "1",
    showinfo: "0",
    iv_load_policy: "3",
    fs: "0",
    disablekb: "1",
    playsinline: "1",
    loop: "1",
    playlist: videoId, // required for loop=1 to work on a single video
  });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
        title={title || "BenBarber video"}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
