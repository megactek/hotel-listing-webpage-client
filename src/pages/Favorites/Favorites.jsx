import React, { useEffect, useState } from "react";
import HotelCard from "./../../components/HotelCard/HotelCard";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Input } from "@mui/material";
import { noParams } from "./../../hotel_pb";
import { HotelsClient } from "./../../hotel_grpc_web_pb";

const client = new HotelsClient("http://localhost:8080", null, null);

const Favorites = () => {
  const param = new noParams();
  const [Hotels, setHotels] = useState([]);
  const getFavoriteHotels = () => {
    client.getFavorite(param, null, (err, res) => {
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
    getFavoriteHotels();
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
            Favorite Hotels
          </Typography>
        </Container>
      </Box>
      <Container sx={{ py: 1 }} maxWidth="md">
        <Grid container spacing={1}>
          {Hotels.length > 0 ? (
            Hotels.map((hotel, index) => (
              <HotelCard
                key={index}
                name={hotel.name}
                location={hotel.location}
                hId={hotel.id}
                favorite={true}
              />
            ))
          ) : (
            <Typography variant="h5" align="center" color="text.secondary">
              No Hotels Saved To Favorite
            </Typography>
          )}
        </Grid>
      </Container>
    </main>
  );
};

export default Favorites;
