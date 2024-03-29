import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { getImage } from "../helpers";

export const accessToken =
    "pk.eyJ1IjoibG9yZGVkc3dpZnQyMjUiLCJhIjoiY2t3MDJvZ2E5MDB0dDJxbndxbjZxM20wOCJ9.hYxzgffyfc93Aiogipp5bA";
mapboxgl.accessToken = accessToken;

export function getRoomlocation(roomLat, roomLng, userid, userAvatar, userName) {
    showPosition(
        {
            coords: {
                latitude: roomLat,
                longitude: roomLng,
            },
        },
        true
    );

    async function showPosition(position, doReverseSearch = true) {
        let userLat = position.coords.latitude;
        let userLng = position.coords.longitude;

        var map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [userLng * 1, userLat * 1],
            zoom: 13,
        });

        const markerHeight = 50;
        const markerRadius = 10;
        const linearOffset = 25;

        const popupOffsets = {
            top: [0, 0],
            "top-left": [0, 0],
            "top-right": [0, 0],
            bottom: [0, -markerHeight],
            "bottom-left": [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
            "bottom-right": [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
            left: [markerRadius, (markerHeight - markerRadius) * -1],
            right: [-markerRadius, (markerHeight - markerRadius) * -1],
        };

        const image = document.createElement("img");
        image.setAttribute("src", getImage(userAvatar));
        image.setAttribute("style", "width:40px; height:40px; border-radius:50%; object-fit:cover");

        new mapboxgl.Marker(image)
            .setPopup(
                new mapboxgl.Popup({
                    offset: popupOffsets,
                    className: "my-class",
                }) // add popups
                    .setHTML(`<h2>${userName}</h2>`)
                    .setMaxWidth("300px")
            )
            .setLngLat([userLng, userLat])
            .addTo(map);

        new mapboxgl.Popup({
            offset: popupOffsets,
            className: "my-class",
        })
            .setLngLat([userLng, userLat])
            .setHTML(`<h3 style="margin:0;">${userName}</h3>`)
            .setMaxWidth("300px")
            .addTo(map);
    }
}
