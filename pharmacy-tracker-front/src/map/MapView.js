import React, { Component, useState } from "react";
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "../firebase/firebaseConfig";
import PaginationControlled from "../components/PharmaciesPagination";
import Routing from "../routing/Routing";
import { Link } from "react-router-dom";

var myIcon = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

var myPos = L.icon({
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

class MapView extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      pharmacies: [],
      mapRef: [],
      pagina: 1,
      uid: '',
      searchPharmacy: ''
    };
  }

  handlePageChange(pagina)
  {
    this.setState({ pagina })
  }

  render()
  {
    const styleMap = { "width": "50%", "height": "75vh", "margin-left": "2%", "margin-top": "2%" }
    let marks = [];
    const { pharmacies } = this.state;
    pharmacies.forEach((pharmacy) =>
    {
      console.log('pharmacy.uid', pharmacy.uid);
      marks.push({ "address": pharmacy.Address, "position": [pharmacy.Location.latitude, pharmacy.Location.longitude], "nPharmacy": "Nº " + pharmacy.nPharmacy, "owner": pharmacy.Owner, "uid": pharmacy.uid });
    });

    var userPos;
    var myMap;
    var route;
    var setRoute = false;

    function LocationMarker()
    {
      const [positionx, setPosition] = useState(null)
      const map = useMapEvents({
        click()
        {
          map.locate()
        },
        locationfound(e)
        {
          setPosition(e.latlng)
          setMap(map)
          map.flyTo(e.latlng, 17)
          console.log(e.latlng)
          setUserLocation(e.latlng);
        },
      })

      return positionx === null ? null : (
        <Marker position={positionx} icon={myPos}>
          <Popup>You are here</Popup>
        </Marker>
      )
    }

    function NearbyPharmacy()
    {
      const pharmacy = GetNearbyPharmacy();
      myMap.flyTo(pharmacy.position);
      if (setRoute === true)
      {
        myMap.removeControl(route)
      }
      route = L.Routing.control({
        waypoints: [
          userPos,
          pharmacy.position
        ],
        routeWhileDragging: false,
        router: null,
      }).addTo(myMap);
      setRoute = true;
      myMap.fitBounds(route.getBounds())
    }

    function MoveToLocation()
    {
      if (!userPos)
      {
        window.alert("To set your location, click on the map");
      }
      myMap.flyTo(userPos)
    }

    //Función de onClick Route
    function routeToPharmacy(location)
    {
      if (userPos)
      {
        if (setRoute === true)
        {
          myMap.removeControl(route)
        }
        myMap.flyTo(location.position);
        route = L.Routing.control({
          waypoints: [
            userPos,
            location.position
          ],
          routeWhileDragging: false,
          router: null,
        }).addTo(myMap);
        setRoute = true;
        myMap.fitBounds(route.getBounds())
      } else
      {
        window.alert("Unable to get a route without your location \nTo set your location, click on the map")
      }
    }

    function setUserLocation(position)
    {
      if (position)
      {

        function setUserLocation(position)
        {
          if (position)
          {

            userPos = position;
          }
        }
      }
    }

    function setMap(map)
    {
      myMap = map;
    }

    function clearRoute()
    {
      myMap.removeControl(route)
    }

    function GetNearbyPharmacy()
    {
      var pharmacyLat;
      var pharmacyLng;
      var tempDist;
      var dist;
      var theta;
      var pharmacyTarget;

      marks.forEach((pharmacy) =>
      {
        pharmacyLat = pharmacy.position[0];
        pharmacyLng = pharmacy.position[1];
        theta = userPos.lng - pharmacyLng;
        tempDist = Math.sin(deg2rad(userPos.lat)) * Math.sin(deg2rad(pharmacyLat)) + Math.cos(deg2rad(userPos.lat)) * Math.cos(deg2rad(pharmacyLat)) * Math.cos(deg2rad(theta))
        tempDist = rad2deg(tempDist);
        tempDist = tempDist * 60 * 1.1515;
        if (tempDist > dist || dist == null)
        {
          dist = tempDist
          pharmacyTarget = pharmacy;
        }
      });
      return pharmacyTarget;
    }

    function deg2rad(deg)
    {
      return (deg * Math.PI / 180.0);
    }

    function rad2deg(rad)
    {
      return (rad * 180.0 / Math.PI);
    }

    return (
      <>
        <p class="map-title">Click on the map to get your route</p>
        <MapContainer
          style={styleMap}
          center={[28.112067, -15.439845,]}
          zoom={13}>

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />

          {marks.map((location) => (
            <Marker position={location.position} icon={myIcon}>
              <Popup>
                {location.nPharmacy} {location.owner} <br />
                {location.address}
              </Popup>
            </Marker>))}
          <LocationMarker />
        </MapContainer>

        <div id="buttons" className="mx-0">
          <button class="btn-login" id="location" onClick={MoveToLocation}>
            Go to your location
          </button>
          <button class="btn-accion-nearby" id="nearby" onClick={NearbyPharmacy}>
            Find near pharmacy
          </button>
          <button class="btn-accion-clear" id="nearby" onClick={clearRoute}>
            Clear route
          </button>
        </div>
        <div class="sidebar" id="sidebar">
          {console.log("Pagina >>" + this.state.pagina)}
          {marks.slice(this.state.pagina * 5 - 5, this.state.pagina * 5).map((location) => (
            <div class="fila">
              <p id="rutas"> {location.address} </p>
              <div id="buttonsPharmacy">
                <button class="btn-route" id="route" onClick={(e) => routeToPharmacy(location)}> Route </button>
                <Link to={`${Routing.pharmacyProducts}${location.uid}`} >
                  <button class="btn-products" id="products"> Products </button>
                </Link>
              </div>
              <hr></hr>
            </div>
          ))}
          <PaginationControlled pagina={this.state.pagina} handlePageChange={this.handlePageChange.bind(this)} />
        </div>
      </>
    )

  }

  handleClick(uid)
  {
    this.setState({ uid });
    console.log('here ', this.state.uid);
  }

  async componentDidMount()
  {
    try
    {
      const querySnapshot = await getDocs(collection(db, "pharmacies"));
      const pharmacyList = [];

      querySnapshot.forEach((doc) =>
      {
        pharmacyList.push(doc.data());
      });

      this.setState({
        pharmacies: pharmacyList
      });
    } catch (e)
    {
      console.error("Error adding document: ", e);
    }
  }

}

export default MapView;
