"use client";

export function Video({ videosrc }: { videosrc: string }) {

    // let videosrc = "/videos/720p_2mb.mp4";
    // let videosrc = "https://www.youtube.com/watch?v=aL27fX5kv9U";

    // const videosrc = [
    //     { src: '/videos/720p_2mb.mp4', type: 'video/mp4' }
    // ];

    return (
      <div>
        <video width="320" height="240" controls autoPlay>
          <source src={videosrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
  }