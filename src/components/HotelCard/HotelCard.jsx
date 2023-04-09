import React, { useState } from "react";
import {
  CardMedia,
  Grid,
  Card,
  Typography,
  CardActions,
  CardContent,
  Button,
  Collapse,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { HotelsClient } from "./../../hotel_grpc_web_pb";
import { Hotel } from "./../../hotel_pb";

const client = new HotelsClient("http://localhost:8080", null, null);

const HotelCard = ({
  card,
  name,
  location,
  image,
  hId,
  favorite = false,
  price,
}) => {
  const [alert, setAlert] = useState(false);
  const hotel = new Hotel();

  const saveToFavorite = () => {
    hotel.setId(hId);
    client.saveFavorite(hotel, null, (err, res) => {
      if (err) {
        return console.error(err);
      }
      if (res) setAlert(true);
    });
  };
  return (
    <>
      <Grid item key={card} xs={12} sm={6} md={4}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Collapse in={alert}>
            <Alert icon={false} severity="success">
              {name + " added to favorite"}
            </Alert>
          </Collapse>
          <CardMedia
            component="img"
            sx={{ maxHeight: "250px" }}
            image={image}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="h5">
              {name}
            </Typography>
            <Typography fontSize={13} fontWeight={"bold"}>
              {price}
            </Typography>
            <br />
            <Typography fontSize={13}>{location}</Typography>
          </CardContent>
          <CardActions>
            <Link to={`/hotel/${hId}`} style={{ marginRight: "4px" }}>
              <Button size="small" variant="outlined">
                View
              </Button>
            </Link>

            {!favorite && (
              <Button size="small" variant="contained" onClick={saveToFavorite}>
                Save
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default HotelCard;
