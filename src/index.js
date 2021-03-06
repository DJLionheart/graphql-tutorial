const { GraphQLServer } = require('graphql-yoga');



let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        // link: (id) => 
    },


    // Adding new integer variable, serves as a way to generate unique IDs for newly created Link elements.
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        }
    },

    // Link: {
    //     id: (root) => root.id,
    //     description: (root) => root.description,
    //     url: (root) => root.url,
    // }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start( () => console.log(`Ye olde server doth lend an ear on http://localhost:4000`))