"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChord = exports.Chord = exports.MINOR_PATTERN = exports.ROOT_PATTERN = exports.CHORD_RANKS = void 0;
const XRegExp = require("xregexp");
/**
 * The rank for each possible chord. Rank is the distance in semitones from C.
 */
exports.CHORD_RANKS = new Map([
    ["H#", 0],
    ["C", 0],
    ["C#", 1],
    ["Db", 1],
    ["D", 2],
    ["D#", 3],
    ["Eb", 3],
    ["E", 4],
    ["Fb", 4],
    ["E#", 5],
    ["F", 5],
    ["F#", 6],
    ["Gb", 6],
    ["G", 7],
    ["G#", 8],
    ["Ab", 8],
    ["A", 9],
    ["A#", 10],
    ["B", 10],
    ["H", 11],
    ["Cb", 11],
]);
// Regex for recognizing chords
const TRIAD_PATTERN = "(M|maj|major|m|mi|min|minor|dim|sus|dom|aug|\\+|-)";
const ADDED_TONE_PATTERN = "(([/\\.\\+]|add)?\\d+[\\+-]?)";
const SUFFIX_PATTERN = `(?<suffix>\\(?${TRIAD_PATTERN}?${ADDED_TONE_PATTERN}*\\)?)`;
const BASS_PATTERN = "(\\/(?<bass>[A-H](#|b)?))?";
exports.ROOT_PATTERN = "(?<root>[A-H](#|b)?)";
exports.MINOR_PATTERN = "(m|mi|min|minor)+";
const CHORD_REGEX = XRegExp(`^${exports.ROOT_PATTERN}${SUFFIX_PATTERN}${BASS_PATTERN}$`);
const MINOR_SUFFIX_REGEX = XRegExp(`^${exports.MINOR_PATTERN}.*$`);
/**
 * Represents a musical chord. For example, Am7/C would have:
 *
 * root: A
 * suffix: m7
 * bass: C
 */
class Chord {
    constructor(root, suffix, bass) {
        this.root = root;
        this.suffix = suffix;
        this.bass = bass;
    }
    toString() {
        if (this.bass) {
            return this.root + this.suffix + "/" + this.bass;
        }
        else {
            return this.root + this.suffix;
        }
    }
    isMinor() {
        return MINOR_SUFFIX_REGEX.test(this.suffix);
    }
    static parse(token) {
        if (!isChord(token)) {
            throw new Error(`${token} is not a valid chord`);
        }
        const result = XRegExp.exec(token, CHORD_REGEX);
        return new Chord(result.root, result.suffix, result.bass);
    }
}
exports.Chord = Chord;
function isChord(token) {
    return CHORD_REGEX.test(token);
}
exports.isChord = isChord;
