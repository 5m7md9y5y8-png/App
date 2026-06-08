import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

interface ConversionOptions {
  targetFrequency: number; // Hz
  sampleRate?: number; // samples per second, default 44100
  duration?: number; // milliseconds, default 1000
  amplitude?: number; // 0..1, default 0.3
}

export class FrequencyConverter {
  async convert(options: ConversionOptions): Promise<{ uri: string }> {
    const { targetFrequency, sampleRate = 44100, duration = 1000, amplitude = 0.3 } = options;

    if (typeof targetFrequency !== 'number' || !isFinite(targetFrequency) || targetFrequency <= 0) {
      throw new Error('Invalid targetFrequency. Must be a positive number in Hz.');
    }
    if (sampleRate <= 0) throw new Error('Invalid sampleRate. Must be a positive integer.');
    if (duration <= 0) throw new Error('Invalid duration. Must be a positive number (ms).');
    if (amplitude <= 0 || amplitude > 1) throw new Error('Invalid amplitude. Must be in (0,1].');

    const numSamples = Math.floor((sampleRate * duration) / 1000);

    // Generate PCM 16-bit samples (sine wave)
    const samples = new Int16Array(numSamples);
    const twoPiF = 2 * Math.PI * targetFrequency;
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const sample = Math.sin(twoPiF * t);
      // scale to 16-bit signed integer
      samples[i] = Math.max(-1, Math.min(1, sample * amplitude)) * 0x7fff;
    }

    const wavBuffer = this._encodeWav(samples, sampleRate);

    // Convert to base64 for expo-file-system write
    let base64: string;
    try {
      // Node/React Native environment usually provides Buffer
      // @ts-ignore
      base64 = Buffer.from(wavBuffer).toString('base64');
    } catch (e) {
      // Fallback: use manual base64 (should rarely be needed)
      base64 = this._uint8ArrayToBase64(wavBuffer);
    }

    const fileName = `frequency-${targetFrequency}Hz-${Date.now()}.wav`;
    const fileUri = (FileSystem.documentDirectory || '') + fileName;

    // Write file as base64
    await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });

    return { uri: fileUri };
  }

  _encodeWav(samples: Int16Array, sampleRate: number): Uint8Array {
    const blockAlign = 2; // 16-bit mono
    const byteRate = sampleRate * blockAlign;
    const dataSize = samples.length * 2;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    /* RIFF identifier */ writeString(view, 0, 'RIFF');
    /* file length */ view.setUint32(4, 36 + dataSize, true);
    /* RIFF type */ writeString(view, 8, 'WAVE');
    /* format chunk identifier */ writeString(view, 12, 'fmt ');
    /* format chunk length */ view.setUint32(16, 16, true);
    /* sample format (raw) */ view.setUint16(20, 1, true);
    /* channel count */ view.setUint16(22, 1, true);
    /* sample rate */ view.setUint32(24, sampleRate, true);
    /* byte rate (sampleRate * blockAlign) */ view.setUint32(28, byteRate, true);
    /* block align (channel count * bytes per sample) */ view.setUint16(32, blockAlign, true);
    /* bits per sample */ view.setUint16(34, 16, true);
    /* data chunk identifier */ writeString(view, 36, 'data');
    /* data chunk length */ view.setUint32(40, dataSize, true);

    // PCM samples
    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      view.setInt16(offset, samples[i], true);
    }

    return new Uint8Array(buffer);

    function writeString(dataview: DataView, offset: number, str: string) {
      for (let i = 0; i < str.length; i++) {
        dataview.setUint8(offset + i, str.charCodeAt(i));
      }
    }
  }

  _uint8ArrayToBase64(u8Arr: Uint8Array): string {
    let CHUNK_SIZE = 0x8000; // arbitrary chunk size
    let index = 0;
    const length = u8Arr.length;
    let result = '';
    let slice;
    while (index < length) {
      slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCharCode.apply(null, Array.from(slice));
      index += CHUNK_SIZE;
    }
    // btoa is not available in Node; try to use Buffer if possible
    try {
      // @ts-ignore
      return btoa(result);
    } catch (e) {
      // @ts-ignore
      return Buffer.from(result, 'binary').toString('base64');
    }
  }
}
