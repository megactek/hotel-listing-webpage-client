# Hotel Listing Webpage Client for a gRPC Server

The front end of a gRPC server is a react application \
that lists hotels in a given area and aids users in \
finding desired places by
filtering (min price, max price, amenities) results to preference.\
additionally, the user can add hotels to a favorite list, \
making it simpler to locate favorites.

## How it works

Due to the binary encoding of request payloads in gRPC connections, the react app requires an envoy server as a payload interpreter.
Docker is used to set up the envoy server.

## Set Up

### - Clone repository

- `git clone https://github.com/megactek/hotel-listing-webpage-client.git`
- `cd hotel-listing-webpage-client`
- `yarn install` or `npm install`

### - Set up envoy server

You may need to configure some ports while setting up the envoy server.

    - check `envoy.yaml` for configuration

- `docker build -t hotel-grpc-server .`
- `docker run -d --name hotel-grpc-server -p 8080:8080 -p 9901:9901 hotel-grpc-server`

After running these commands, open your docker dashboard to confirm the service `hotel-grpc-server` is running.

## - Run webpage client

- `yarn start`

The setup process is now complete, and you can access your React app at [http://localhost:3000](ttp://localhost:3000/).
