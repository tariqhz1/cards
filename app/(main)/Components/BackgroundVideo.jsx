import React from 'react';

const BackgroundVideo = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <video
                autoPlay
                loop
                muted
                className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
            >
                <source src={"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="relative z-10 text-white text-center p-8">
                {/* Your content here */}
                <h1 className="text-4xl font-bold">Welcome to My Website</h1>
                <p className="text-lg mt-4">This is a sample content over the background video.</p>
            </div>
        </div>
    );
};

export default BackgroundVideo;
