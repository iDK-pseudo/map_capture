async function getStaticImage(bbox, height, width) {
    const URI = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/[${bbox}]/${width}x${height}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`

    const res = await fetch(URI);
    const blob_res = await res.blob();
    return URL.createObjectURL(blob_res);
}

export default {
    getStaticImage
}