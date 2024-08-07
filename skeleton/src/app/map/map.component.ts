import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';

// Import Leaflet's default icon images
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';

// Correctly set default icon path

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/images/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/images/marker-icon.png',
  shadowUrl: 'assets/leaflet/images/marker-shadow.png',
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef;
  @Output() addressSelected = new EventEmitter<string>();
  map: L.Map;
  marker: L.Marker;
  address: string;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    // Coordinates for Tunis, Tunisia (Latitude: 36.8065, Longitude: 10.1815)
    this.map = L.map(this.mapContainer.nativeElement).setView([36.8065, 10.1815], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Initialize marker
    this.marker = L.marker([36.8065, 10.1815], { draggable: true }).addTo(this.map);

    // Add click event listener to the map
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const latlng = e.latlng;

      // Move marker to clicked location
      this.marker.setLatLng(latlng);

      // Get address from coordinates
      this.reverseGeocode(latlng.lat, latlng.lng);
    });

    // Add geocoder control to the map
    const geocoder = (L.Control as any).geocoder({
      defaultMarkGeocode: false
    }).addTo(this.map);

    geocoder.on('markgeocode', (e: any) => {
      const latlng = e.geocode.center;
      this.map.setView(latlng, this.map.getZoom());
      this.marker.setLatLng(latlng);
      this.reverseGeocode(latlng.lat, latlng.lng);
    });
  }

  // Method to get address from coordinates using Nominatim API
  reverseGeocode(lat: number, lon: number): void {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.address = data.display_name;
        this.addressSelected.emit(this.address);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
