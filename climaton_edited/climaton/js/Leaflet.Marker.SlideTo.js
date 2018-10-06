
// 🍂class Marker

L.Marker.include({

	_slideToUntil:    undefined,
	_slideToDuration: undefined,
	_slideToLatLng:   undefined,
	_slideFromLatLng: undefined,

	// 🍂method slideTo(latlng: LatLng, options: Slide Options): this
	// Moves this marker until `latlng`, like `setLatLng()`, but with a smooth
	// sliding animation. Fires `movestart` and `moveend` events.
	slideTo: function slideTo(latlng, options) {
		if (!this._map) return;
		this._isZooming = false;
		this._slideToDuration = options.duration;
		this._slideToUntil    = performance.now() + options.duration;
		this._slideFromLatLng = this.getLatLng();
		this._slideToLatLng   = latlng;

		this.fire('movestart');
		this._slideTo();

		return this;
	},

	// 🍂method slideCancel(): this
	// Cancels the sliding animation from `slideTo`, if applicable.
	slideCancel: function slideCancel() {
		L.Util.cancelAnimFrame(this._slideFrame);
	},

	_slideTo: function _slideTo() {
		if (!this._map) return;
		if(this._isZooming) {
			this._slideFrame = L.Util.requestAnimFrame(this._slideTo, this);
			return;
		};

		this._remaining = this._slideToUntil - performance.now();

		if (this._remaining < 0) {
			this.setLatLng(this._slideToLatLng);
			this.fire('moveend');

			return this;
		}

		var startPoint = this._map.latLngToContainerPoint(this._slideFromLatLng);
		var endPoint   = this._map.latLngToContainerPoint(this._slideToLatLng);
		var percentDone = (this._slideToDuration - this._remaining) / this._slideToDuration;

		var currPoint = endPoint.multiplyBy(percentDone).add(
			startPoint.multiplyBy(1 - percentDone)
		);
		var currLatLng = this._map.containerPointToLatLng(currPoint)
		this.setLatLng(currLatLng);

		this.fire('move', {latlng: currLatLng});

		this._slideFrame = L.Util.requestAnimFrame(this._slideTo, this);
	},

	onAdd: function(map){
		this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;

		if (this._zoomAnimated) {
			map.on('zoomanim', this._animateZoom, this);
		}

		// Fix for skipping the marker calculation when zooming
		map.on('zoomstart', this._onZoom, this);
		map.on('zoomend reset moveend', this._offZoom, this);

		this._initIcon();
		this.update();

	},

	onRemove: function(map){
		if (this.dragging && this.dragging.enabled()) {
			this.options.draggable = true;
			this.dragging.removeHooks();
		}

		if (this._zoomAnimated) {
			map.off('zoomanim', this._animateZoom, this);
		}

		map.off('zoomstart', this._onZoom);
		map.off('zoomend reset moveend', this._offZoom);

		this._removeIcon();
		this._removeShadow();

	},

	_onZoom: function(){
		this._isZooming = true;
	},

	_offZoom: function(){
		this._isZooming = false;
	}

});

L.Marker.addInitHook(function(){
	this.on('move', this.slideCancel, this);
});

/*
🍂miniclass Slide options (Marker)
🍂section

🍂option duration: Number = 1000
Duration of the sliding animation, in milliseconds.

🍂option keepAtCenter: Boolean = false
Whether the map center should be the marker's position during the sliding animation.
This disables the map dragging handler and touch zoom centering momentarily.

*/


// 🍂class CircleMarker
L.CircleMarker.include({
	// 🍂method slideTo(latlng: LatLng, options: Slide Options): this
	// Moves this circle until `latlng`, like `setLatLng()`, but with a smooth
	// sliding animation. Fires `movestart` and `moveend` events.
	slideTo: L.Marker.prototype.slideTo,
	// 🍂method slideCancel(): this
	// Cancels the sliding animation from `slideTo`, if applicable.
	slideCancel: L.Marker.prototype.slideCancel,
	_slideTo: L.Marker.prototype._slideTo
});

L.CircleMarker.addInitHook(function(){
	this.on('move', this.slideCancel, this);
});