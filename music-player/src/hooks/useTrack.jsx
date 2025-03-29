import { useEffect, useState } from "react";
import { formatTime } from "../helpers";

function useTrackDuration(tracks) {
    const [isLoadingTrackDuration, setIsLOadingTrackDuration] = useState(true);
    const [durations, setDurations] = useState([]);

    useEffect(() => {
        const fetchDurations = async () => {
            try {
                setIsLOadingTrackDuration(true)
                const durationArray = [];

                tracks.forEach(track => {
                    const audio = new Audio(tracks.audioSrc);
                    audio.addEventListener('loadedmetadata', () => {
                        const duration = formatTime(audio.duration);
                        durationArray.push(duration);
                    });
                });
                setDurations(durationArray);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLOadingTrackDuration(false);
            }
        };
        fetchDurations();
    }, [tracks])
    return { durations, isLoadingTrackDuration };
}

export default useTrackDuration;