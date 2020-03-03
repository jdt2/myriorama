// images.js
const images = [
    { id: 1, src: './assets/image01.jpg', title: 'foo', description: 'bar' },
    { id: 2, src: './assets/image02.jpg', title: 'foo', description: 'bar' },
    { id: 3, src: './assets/image03.jpg', title: 'foo', description: 'bar' },
    { id: 4, src: './assets/image04.jpg', title: 'foo', description: 'bar' },
    { id: 5, src: './assets/image05.jpg', title: 'foo', description: 'bar' },
];

function imageLoader() {
    return images;
}

export default imageLoader;