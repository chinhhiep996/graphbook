const typeDefinitions = `
    directive @auth on QUERY | FIELD_DEFINITION | FIELD
    scalar Upload

    type User {
        id: Int
        avatar: String
        username: String
    }

    type Post {
        id: Int
        text: String
        user: User
    }

    type Message {
        id: Int
        text: String
        chat: Chat
        user: User
    }

    type Chat {
        id: Int
        messages: [Message]
        users: [User]
        lastMessage: Message
    }

    type PostFeed {
        posts: [Post]
    }

    type Response {
        success: Boolean
    }

    type UsersSearch {
        users: [User]
    }

    type Auth {
        token: String
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
        url: String!
    }

    type RootQuery {
        currentUser: User @auth
        posts: [Post]
        chats: [Chat]
        chat(chatId: Int): Chat
        postsFeed(page: Int, limit: Int, username: String): PostFeed @auth
        usersSearch(page: Int, limit: Int, text: String!): UsersSearch,
        user(username: String!): User !auth
    }

    input PostInput {
        text: String!
    }

    input ChatInput {
        users: [Int]
    }

    input MessageInput {
        text: String!
        chatId: Int!
    }

    type RootMutation {
        addPost (post: PostInput!): Post,
        addChat (chat: ChatInput!): Chat,
        addMessage (message: MessageInput!): Message,
        deletePost (postId: Int!): Response,
        login (email: String! password: String!): Auth,
        signup (username: String! email: String! password: String!): Auth
        uploadAvatar (file: Upload!): File @auth
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`;

export default [typeDefinitions];

