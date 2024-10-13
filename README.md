# t-take-home
 take home assignment done on oct 13, 2024


Front end:
- nextjs


Backend:
- Python flask server

System architecture:
- Use RPC as the API architecture
- RPC is language agnostic so we can use it in typescript for the frontend and python for the backend but for the long term, if another language needs to be used (eg. java or golang), it will be easily adaptable with the use of grpc.
- grpc is also faster
- we can use bidirectional streaming in the future with grpc
- send compressed content which will be useful for handling tabular data and images
- the client code can be auto generated when using grpc