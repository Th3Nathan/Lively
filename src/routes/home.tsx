import * as React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

interface User {
    id: number 
    email: string 
    name: string
}

interface Props {
    data: {
        loading: boolean
        allUsers: Array<User>
    }
}

const Home = ({data: { allUsers = []}}: Props) => (
    <div>
        {allUsers.map(u => (
            <h1 key={u.id}>{u.email}</h1>
        ))}
    </div>
);

const allUsersQuery = gql`
    query {
        allUsers {
            id
            email
        }
    }
`;


export default graphql<any, any, any>(allUsersQuery)(Home);