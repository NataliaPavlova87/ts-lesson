const mediaButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.media-list-button');
const volumeRange = document.getElementById('volume') as HTMLInputElement;
const mainElement = document.querySelector('.media') as HTMLElement;

const audio: HTMLAudioElement = new Audio();

let defaultMediaType = '';
let paused = false;
let volumeValue = 0.5;

const removeStopClass = (): void => {
    const elemWithPauseClass = document.querySelector('.media-list-button__icons--pause') as HTMLElement;

    if (elemWithPauseClass) {
        elemWithPauseClass.classList.remove('media-list-button__icons--pause');
    }
}

const getCurrentImage = (type: string): string => mainElement.style.backgroundImage = `url("../../assets/images/${type}-bg.jpg")`;

const mediaPlayerControl = async (mediaType: string, elem: HTMLElement): Promise<void> => {

    getCurrentImage(mediaType);

    removeStopClass();

    if (mediaType === defaultMediaType && paused) {
        await audio.play();
        paused = audio.paused;
    } else if (mediaType === defaultMediaType) {
        audio.pause();
        paused = audio.paused;
        elem.classList.add('media-list-button__icons--pause');
    } else {
        audio.src = `assets/sounds/${mediaType}.mp3`;
        audio.volume = volumeValue;
        await audio.play();
        defaultMediaType = mediaType;
        paused = false;
    }
}

const onClickHandler = async (event: MouseEvent): Promise<void> => {
    const {target} = event;

    if (target) {
        const mediaType: string = (target as HTMLButtonElement).value;
        const childrenElem = (target as HTMLButtonElement).childNodes[0];
        await mediaPlayerControl(mediaType, (childrenElem as HTMLElement));
    }
}

mediaButtons.forEach((item: HTMLButtonElement) => {
    item.addEventListener('click', onClickHandler);
});

const onChangeHandler = (event: Event): void => {
    const { target } = event;
    if (target) {
        volumeValue = +(target as HTMLInputElement).value;
        audio.volume = volumeValue;
    }
}

volumeRange.addEventListener('input', onChangeHandler);

