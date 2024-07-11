<script lang="ts">
    import {resizeImage} from "$lib/resize";
    import {spinnerDataUrl} from "$lib/spinner";

    let imgSrc = '';
    let files: FileList | undefined = undefined;

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
        let byteString = ''
        const len = result.byteLength;
        for (let i = 0; i < len; i++) {
            byteString += String.fromCharCode(result[i]);
        }
        return btoa(byteString);
    }

    async function handleClick() {
        imgSrc = spinnerDataUrl;
        if (!files || files.length == 0) {
            return;
        }
        const file = files[0];

        const buffer = await fileAsArrayBuffer(file);
        const arr = new Uint8Array(buffer);
        const result = await resizeImage(arr, {})
        if (!result) {
            return;
        }
        let base64String = byteArrayToBase64String(result);

        imgSrc = 'data:image/jpeg;base64,' + base64String;
    }
</script>

<input class="file-input"
       type="file"
       accept="image/*"
       name="input"
       id="input"
       bind:files={files}
>

<button on:click={handleClick}>Click me</button>

<img src={imgSrc} alt="" width="100" height="100">