import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const RotatingCardOnPalm = ({ }) => {
    gsap.registerPlugin(ScrollTrigger);

    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        // Make sure GSAP animations and ScrollTrigger are set up
        gsap.timeline({
            defaults: { duration: 1 },
            scrollTrigger: {
                trigger: "#container",
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        }).fromTo(
            video,
            {
                currentTime: 0
            },
            {
                currentTime: video.duration || 1
            }
        );

        // Load video metadata and handle touch event for iOS activation
        const onceFn = () => {
            video.play();
            video.pause();
        };

        // Event listener for touchstart to activate video on iOS
        document.documentElement.addEventListener("touchstart", onceFn, { once: true });

        // Fetch video blob and update video source
        setTimeout(() => {
            if (window.fetch) {
                fetch(video.src)
                    .then(response => response.blob())
                    .then(blob => {
                        const blobURL = URL.createObjectURL(blob);
                        const currentTime = video.currentTime + 0.01;
                        video.setAttribute("src", blobURL);
                        video.currentTime = currentTime;
                    });
            }
        }, 1000);

        return () => {
            // Clean up event listener and any other resources if needed
            document.documentElement.removeEventListener("touchstart", onceFn);
        };
    }, []);

    return (
        <video
            ref={videoRef}
            playsInline
            loop
            muted
            preload='auto'
            className="w-[60vh]"
            src="/videos/rotating.mp4"
        />
    );
};

export default RotatingCardOnPalm;
