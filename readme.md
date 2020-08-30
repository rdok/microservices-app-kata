# microservice-app-kata
https://www.udemy.com/course/microservices-with-node-js-and-react

This projects showcases microservices from high perspective. It aims to demonstrate the positive, and negatives of using event based communication services.

It consists of a client, posts service, comments service, query service, and a moderator service. 
- It demonstrates, that if posts, comments, and moderator services were to crash, users would still be able to use a large portion of the app; namely getting the list of posts and comments from the query service; the only missing functionality would be to create the comments and posts. 
- By using the query service, the client is quite faster, due to having to make a single query for all the posts and their comments. Leading to a better user experience. 
- It also demonstrates how to set up a new service; which has missed the previous events. This is done by saving all the events in a database, and when a new services is setup it goes through all of them.


On the other hand, downsides include data duplication; although with how cheap storage is nowdays, that has become minor problem. But maybe the greatest downside, is a harder to understand design infrastructure for developers.

*The intent of this kata is to give an idea behind the scenes on an event based communication services; and the `event-bus` service implemented **should not** be used in production code. Instead, see [dotnetcore/CAP](https://github.com/dotnetcore/CAP)*.

![showcase-terminal](./showcase-terminal.png)

### Development
> Dependencies: NodeJS, tmux

```
make
```
