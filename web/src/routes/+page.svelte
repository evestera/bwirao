<script lang="ts">
  import { resizeImage } from '$lib/resize';
  import { spinnerDataUrl } from '$lib/spinner';

  let imgSrc = '';
  let files: FileList | undefined = undefined;

  let inputByteSize = 0;
  let outputByteSize = 0;
  let error: string | undefined = undefined;

  let width = 100;
  let height = 100;
  let renderedWidth = width;
  let renderedHeight = height;

  function fileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  function byteArrayToBase64String(result: Uint8Array) {
    let byteString = '';
    const len = result.byteLength;
    for (let i = 0; i < len; i++) {
      byteString += String.fromCharCode(result[i]);
    }
    return btoa(byteString);
  }

  async function getBytesOfFirstFile(files: FileList | undefined): Promise<Uint8Array | undefined> {
    if (!files || files.length == 0) {
      return;
    }
    const file = files[0];

    const buffer = await fileAsArrayBuffer(file);
    return new Uint8Array(buffer);
  }

  async function handleClick() {
    const inputBytes = await getBytesOfFirstFile(files);
    if (!inputBytes) {
      return;
    }
    renderedWidth = width;
    renderedHeight = height;
    imgSrc = spinnerDataUrl;

    inputByteSize = inputBytes.byteLength;
    try {
      const result = await resizeImage(inputBytes, {
        width,
        height
      });
      outputByteSize = result.byteLength;
      let base64String = byteArrayToBase64String(result);

      imgSrc = 'data:image/jpeg;base64,' + base64String;
    } catch (e) {
      error = e?.toString();
      imgSrc = '';
    }
  }
</script>

<div class="container">
  <h1>Browser/WebAssembly Image Resizing and Optimization (bwirao)</h1>

  <h2>Demo</h2>

  <label
    >Input file:
    <input class="file-input" type="file" accept="image/*" name="input" id="input" bind:files />
  </label>

  <input type="number" bind:value={width} min="1" max="1000" />
  <input type="number" bind:value={height} min="1" max="1000" />

  <button on:click={handleClick}>Create thumbnail</button>

  {#if imgSrc}
    <img src={imgSrc} alt="" width={renderedWidth} height={renderedHeight} />

    <p>Input file size: {inputByteSize} bytes</p>
    <p>Output file size: {outputByteSize} bytes</p>
  {/if}

  {#if error}
    <p style="color: red">{error}</p>
  {/if}
</div>

<style>
  .container {
    max-width: 800px;
    margin: auto;
  }
</style>
