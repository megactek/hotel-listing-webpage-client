import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Container,
  Collapse,
  CardActions,
  Alert as AL,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Hotel as Hot } from "./../../hotel_pb";
import { HotelsClient } from "./../../hotel_grpc_web_pb";

const client = new HotelsClient("http://localhost:8080", null, null);

const useStyles = makeStyles({
  root: {
    margin: "auto",
    maxWidth: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  media: {
    height: 200,
  },
  amenities: {
    display: "flex",
    flexWrap: "wrap",
  },
});

const Hotel = () => {
  const [HotelDetails, setHotelDetails] = useState({});
  const [Alert, setAlert] = useState(false);
  const classes = useStyles();
  const hotelId = useParams();
  const hotel = new Hot();
  const { name, image, price, amenities, rating } = HotelDetails;

  const saveToFavorite = () => {
    hotel.setId(hotelId.id);
    client.saveFavorite(hotel, null, (err, res) => {
      if (err) {
        return console.error(err);
      }
      if (res) setAlert(true);
    });
  };

  useEffect(() => {
    hotel.setId(hotelId.id);
    client.getHotelDetails(hotel, null, (err, res) => {
      if (err) return console.error(err);
      const hotelDetails = res.array || [];
      setHotelDetails({
        id: hotelDetails[0],
        name: hotelDetails[1],
        location: hotelDetails[2],
        price: hotelDetails[3],
        rating: hotelDetails[4],
        image: hotelDetails[5],
        amenities: String(hotelDetails[6]).split(","),
      });
    });
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Collapse in={Alert}>
          <AL icon={false} severity="success">
            {name + " added to favorite"}
          </AL>
        </Collapse>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia className={classes.media} image={image} title={name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {price}
              </Typography>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Rating</Typography>
                <Rating name="rating" value={rating} precision={0.5} readOnly />
              </Box>
              <Typography variant="body2" color="textSecondary" component="p">
                Amenities:
              </Typography>
              <div className={classes.amenities}>
                {amenities &&
                  amenities.map((amenity) => (
                    <Typography
                      key={amenity}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {amenity}
                    </Typography>
                  ))}
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <CardActions>
          <Link to={`/`} style={{ marginRight: "4px" }}>
            <Button size="small" variant="contained">
              Back
            </Button>
          </Link>
          <Button size="small" variant="outlined" onClick={saveToFavorite}>
            Save
          </Button>
        </CardActions>
      </Container>
    </>
  );
};

export default Hotel;
