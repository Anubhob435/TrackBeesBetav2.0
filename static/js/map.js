function setupGoBackButton() {
    const goBackButton = document.getElementById('go-back-btn');
    goBackButton.addEventListener('click', () => {
        if (draggableMarker) {
            const markerLngLat = draggableMarker.getLngLat();
            myMap.flyTo({
                center: [markerLngLat.lng, markerLngLat.lat],
                zoom: 15,
                duration: 1000 // Animation duration in milliseconds
            });
        } else {
            alert('Draggable marker not found.');
        }
    });
}
