import {gql , useQuery} from '@apollo/client';

const username = "\"068dfbe3-e725-4ab2-aac9-307dd6659b22\"";
const CURRENT_PASSWORD = gql`
{
  user(where: {user_id: {_eq: ${username}}}) {
    password
  } 
}
`;


function ShowCurrentUser () {
    
    const {data, loading, error} = useQuery(CURRENT_PASSWORD);
    const obj = {data};
    const user = obj.user;
    const password = user.password;
    console.log(password);
   return password;
    
}

export default ShowCurrentUser;

