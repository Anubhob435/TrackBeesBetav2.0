import { Map as Map_2 } from 'maplibre-gl';
import { MapOptions } from 'maplibre-gl';
import { Marker } from 'maplibre-gl';
import { MarkerOptions } from 'maplibre-gl';
import { NavigationControl } from 'maplibre-gl';
import { NavigationControlOptions } from 'maplibre-gl';
import { Popup } from 'maplibre-gl';
import { PopupOptions } from 'maplibre-gl';

declare interface olaMapProps {
    apiKey: string;
}

export declare class OlaMaps {
    private mapInstance;
    private olaMaps;
    private apiKey;
    constructor({ apiKey }: olaMapProps);
    private addOlaLogo;
    init(options?: MapOptions): Map_2;
    addNavigationControls(options: NavigationControlOptions): NavigationControl;
    addMarker(options?: MarkerOptions): Marker;
    addPopup(options?: PopupOptions): Popup;
}

export { }
