import asyncio
import websockets

from translator import translate_text
from websockets.exceptions import ConnectionClosedError

# Set to store connected clients
connected_clients = []


new_connected_clients = []


async def handle_websocket(websocket, path):
    # Add the connected client to the set
    k = path[1:]
    cl = {k: websocket}
    connected_clients.append(cl)

    try:
        while True:
            message = await websocket.recv()


            # Broadcast the message to all connected clients
            for client_dict in connected_clients:
                try:
                    for key, val in client_dict.items():
                        if key == "en":
                            new_dict = {tx:  val}
                            new_connected_clients.append(new_dict)
                        else: 
                            tx = translate_text(message, target_language=key)
                            new_dict = {tx:  val}
                            new_connected_clients.append(new_dict)
                except Exception as err:
                    print("here")


            for client in new_connected_clients:
                await asyncio.gather(
                    *[val.send(key) for key, val in client.items()]
                )
    except ConnectionClosedError as e:
        pass
    finally:
        # Remove the disconnected client from the set
        #connected_clients.remove(websocket)
        pass


if __name__ == "__main__":
    # Start the WebSocket server
    start_server = websockets.serve(handle_websocket, "localhost", 8081)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()