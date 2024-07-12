/**
 * @param {Uint8Array} imageData
 * @param {number} width
 * @param {number} height
 * @returns {Promise<Uint8Array | undefined>}
 */
export function resize(imageData: Uint8Array, width: number, height: number): Promise<Uint8Array>;
