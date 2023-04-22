
export default function getNotesFromKey(receivedKey, allKeys) {
    const [keyName, keyQuality] = receivedKey.split(' ');
    const relativeMinorMap = {
        'Db': 'C#',
        'Gb': 'F#',
        'Cb': 'G#'
    };
    const notes = allKeys.find(key => {
        if(keyQuality === "major") {
            return key.key === keyName;
        } else {
            const relativeMinor = relativeMinorMap[keyName] || keyName;
            return key.relativeMinor === relativeMinor;
        }
    });
    return notes.notes.join(" ");
} 