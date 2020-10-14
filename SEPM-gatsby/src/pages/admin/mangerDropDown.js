import React from 'react';
import { gql, useMutation, useQuery} from '@apollo/client';


const LIST_MANAGER = gql`{
    user(where: {role_manager: {_eq: true}}) {
      user_id
      first_name
      last_name
    }
}
`;

const ManagerDropDown = (props) => {
    const {loading,error,data} = useQuery(LIST_MANAGER);
    const {label, name, option, ...rest} = props
    if(loading) return 'loading';
    if(error) {return error.message};
    

    return(
        data.user.map((ele) => {
            return(
                <option key={ele.user_id} label={ele.user_id} value={ele.user_id}/>
            )
        })
    )
        
}

export default ManagerDropDown
