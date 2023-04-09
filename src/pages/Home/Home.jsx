import React, { useEffect, useState } from "react";
import HotelCard from "./../../components/HotelCard/HotelCard";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Input } from "@mui/material";
import { Location, HotelFilters } from "./../../hotel_pb";
import { HotelsClient } from "./../../hotel_grpc_web_pb";
import "./home.css";

const client = new HotelsClient("http://localhost:8080", null, null);

const Home = () => {
  const location = new Location();
  const filters = new HotelFilters();
  const [Hotels, setHotels] = useState([]);
  const [hLocation, setHLocation] = useState(" ");
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [amenities, setAmenities] = useState("");

  const filterLocations = () => {
    location.setLocation(hLocation);
    filters.setLocation(location);
    filters.setMaxprice(maxPrice);
    filters.setAmenities(amenities);
    filters.setMinprice(minPrice);
    client.filterHotels(filters, null, (err, res) => {
      if (err) return console.log(err);
      const hotelList = res.getHotelsList() || [];
      setHotels(
        hotelList.map((hotel) => {
          return {
            id: hotel.array[0],
            name: hotel.array[1],
            location: hotel.array[2],
            price: hotel.array[3],
            rating: hotel.array[4],
            image: hotel.array[5],
            amenities: hotel.array[6],
          };
        })
      );
    });
  };

  const findHotel = (loc) => {
    location.setLocation(hLocation);
    client.getHotels(location, null, (err, res) => {
      if (err) {
        console.log(err);
      }
      const hotelList = res.getHotelsList() || [];
      setHotels(
        hotelList.map((hotel) => {
          return {
            id: hotel.array[0],
            name: hotel.array[1],
            location: hotel.array[2],
            price: hotel.array[3],
            rating: hotel.array[4],
            image: hotel.array[5],
            amenities: hotel.array[6],
          };
        })
      );
    });
  };
  useEffect(() => {
    findHotel(location);
  }, []);
  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Hotel Listings
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            find preferred hotels in desired{" "}
            {hLocation == " " || hLocation == "" ? "locations" : hLocation}...
          </Typography>
          <Stack
            sx={{
              pt: 1,
            }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Input
              type="text"
              placeholder="lekki..."
              onChange={(e) => setHLocation(e.target.value)}
            />
            <Button variant="contained" onClick={findHotel}>
              Find hotel
            </Button>
          </Stack>
          <Box>
            <div className="form">
              <div className="label"> Filters: </div>
              <div className="fields">
                <Input
                  type="number"
                  placeholder="min price"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="max price"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="amenity"
                  onChange={(e) => setAmenities(e.target.value)}
                />
              </div>
              {minPrice <= 1 || maxPrice <= 1 ? (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={filterLocations}
                  disabled
                >
                  Filter
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={filterLocations}
                >
                  Filter
                </Button>
              )}
            </div>
          </Box>
        </Container>
      </Box>
      <Container
        sx={{
          py: 1,
        }}
        maxWidth="md"
      >
        <Grid container spacing={1}>
          {Hotels.length > 0 ? (
            Hotels.sort(
              (a, b) =>
                String(a.price).replace(/[^\d]/g, "") -
                String(b.price).replace(/[^\d]/g, "")
            ).map((hotel, index) => (
              <HotelCard
                key={index}
                name={hotel.name}
                location={hotel.location}
                hId={hotel.id}
                price={hotel.price}
              />
            ))
          ) : (
            <Typography variant="h5" align="center" color="text.secondary">
              No Hotels Available in this location
            </Typography>
          )}
        </Grid>
      </Container>
    </main>
  );
};

export default Home;
