// Load one mp3 file for one note.
// url = the base url for the soundfont
// instrument = the instrument name (e.g. "acoustic_grand_piano")
// name = the pitch name (e.g. "A3")
var soundsCache = require("./sounds-cache");
var getNote = function (url, instrument, name, audioContext) {
    if (!soundsCache[instrument]) soundsCache[instrument] = {};
    var instrumentCache = soundsCache[instrument];
    if (!instrumentCache[name])
        instrumentCache[name] = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            let noteUrl = url + instrument + "-mp3/" + name + ".mp3";
            // xhr.open("GET", noteUrl, true);
            // if (import.meta.env.MODE === 'development')
            // xhr.open("GET", 'http://localhost:1420/src/lib/abc/src/audio/FluidR3_GM_acoustic_grand_piano-mp3_' + name + '.mp3', true)
            // else
			// console.log(window.location);
            xhr.open("GET", window.location.origin + "/audio/FluidR3_GM_acoustic_grand_piano-mp3_" + name + ".mp3", true);
            xhr.responseType = "arraybuffer";
            xhr.onload = function () {
                if (xhr.status !== 200) {
                    reject(Error("Can't load sound at " + noteUrl));
                    return;
                }
                var noteDecoded = function (audioBuffer) {
                    resolve({ instrument: instrument, name: name, status: "loaded", audioBuffer: audioBuffer });
                };
                var maybePromise = audioContext.decodeAudioData(xhr.response, noteDecoded, function () {
                    reject(Error("Can't decode sound at " + noteUrl));
                });
                // In older browsers `BaseAudioContext.decodeAudio()` did not return a promise
                if (maybePromise && typeof maybePromise.catch === "function") maybePromise.catch(reject);
            };
            xhr.onerror = function () {
                reject(Error("Can't load sound at " + noteUrl));
            };
            xhr.send();
        }).catch((err) => {
            console.error("Didn't load note", instrument, name, ":", err.message);
            throw err;
        });
    return instrumentCache[name];
};
// var getNote = function (url, instrument, name, audioContext) {
// 	// console.log(url,instrument,name,audioContext);
// 	if (!soundsCache[instrument]) soundsCache[instrument] = {};
// 	var instrumentCache = soundsCache[instrument];

// 	if (!instrumentCache[name])
// 		instrumentCache[name] = new Promise(function (resolve, reject) {
// 			var xhr = new XMLHttpRequest();
// 			let noteUrl = url + instrument + "-mp3/" + name + ".mp3";
// 			xhr.open("GET", noteUrl, true);
// 			xhr.responseType = "arraybuffer";
// 			xhr.onload = function () {
// 				if (xhr.status !== 200) {
// 					reject(Error("Can't load sound at " + noteUrl));
// 					return
// 				}
// 				var noteDecoded = function(audioBuffer) {
// 					resolve({instrument: instrument, name: name, status: "loaded", audioBuffer: audioBuffer})
// 				}
// 				var maybePromise = audioContext.decodeAudioData(xhr.response, noteDecoded, function () {
// 					reject(Error("Can't decode sound at " + noteUrl));
// 				});
// 				// In older browsers `BaseAudioContext.decodeAudio()` did not return a promise
// 				if (maybePromise && typeof maybePromise.catch === "function") maybePromise.catch(reject);
// 			};
// 			xhr.onerror = function () {
// 				reject(Error("Can't load sound at " + noteUrl));
// 			};
// 			xhr.send();
// 		})
// 			.catch(err => {
// 				console.error("Didn't load note", instrument, name, ":", err.message);
// 				throw err;
// 			});

// 	return instrumentCache[name];
// };
module.exports = getNote;
