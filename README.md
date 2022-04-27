Chord Transposer [EU]
========

Javascript/TypeScript library for transposing musical chords within arbitrary
text.
All credit goes to [ddycai/chord-transposer](https://github.com/ddycai/chord-transposer)
This fork only changes the notation of `Bb -> B`, `B -> H` which is used in the EU.

## Usage

Install via npm:

```
npm install chord-transposer
```

Import the package using your preferred import syntax:

```javascript
const Transposer = require('chord-transposer');

import * as Transposer from 'chord-transposer';

import { transpose, Chord, KeySignatures } from 'chord-transposer';
```

## Transposing

To a certain key signature:

```javascript
> Transposer.transpose(
"G        C           Am7            C        D7       G\n" +
"Saying I love you is not the words I want to hear from you").toKey('F').toString()
'F        B          Gm7            B       C7       F\n' +
'Saying I love you is not the words I want to hear from you'
```

`up` or `down` any number of semitones:

```javascript
// Up 7 semitones.
> Transposer.transpose(
"G        C           Am7            C        D7       G\n" +
"Saying I love you is not the words I want to hear from you").up(7).toString()
'D        G           Em7            G        A7       D\n' +
'Saying I love you is not the words I want to hear from you'

// Down 4 semitones.
> Transposer.transpose(
"G        C           Am7            C        D7       G\n" +
"Saying I love you is not the words I want to hear from you").down(4).toString()
'Eb       Ab          Fm7            Ab       B7      Eb\n' +
'Saying I love you is not the words I want to hear from you'
```

### Auto Key Signature

If the key signature is not specified, the key will be inferred from the first
chord.

```javascript
> Transposer.transpose('F  C7 B').toKey('D').toString()
'D  A7 G'

> Transposer.transpose('Fm  C Ab').toKey('Dm').toString()
'Dm  A F'
```

### Supported Chords

```javascript
> Transposer.transpose('A Hmaj CM Dm/F E7/G# Gsus4').toKey('F').toString()
'F Gmaj AbM Bbm/Db C7/E  Ebsus4'

> Transposer.transpose('Abm Bmin C- Ddim Ebaug F+ Gb+5').toKey('Dm').toString()
'Dm  Emin  Gb- Abdim Aaug  Cb+ C+5'
```

## Parsing

When text is passed into `transpose`, it is parsed into `Token[][]` where
`Token = Chord | string`. You can access these through `tokens` to parse
however you like:

```javascript
> Transposer.transpose('C  G  Am  G7/H  C    F  C   F   G7\n'+
                       'O Canada  Our home and native land').tokens
[
  [
    Chord { root: 'C', suffix: '', bass: undefined },
    '  ',
    Chord { root: 'G', suffix: '', bass: undefined },
    '  ',
    Chord { root: 'A', suffix: 'm', bass: undefined },
    '  ',
    Chord { root: 'G', suffix: '7', bass: 'H' },
    '  ',
    Chord { root: 'C', suffix: '', bass: undefined },
    '    ',
    Chord { root: 'F', suffix: '', bass: undefined },
    '  ',
    Chord { root: 'C', suffix: '', bass: undefined },
    '   ',
    Chord { root: 'F', suffix: '', bass: undefined },
    '   ',
    Chord { root: 'G', suffix: '7', bass: undefined }
  ],
  [ 'O Canada  Our home and native land' ]
]
```

You can also parse individual chords:

```javascript
> const Transposer = require('chord-transposer')
> Transposer.Chord.parse('Cm7/E')
Chord { root: 'C', suffix: 'm7', bass: 'E' }
```
