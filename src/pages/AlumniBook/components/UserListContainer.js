import React, { useState } from "react";
import UserItem from './UserItem';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default function UserListContainer({ UserList }) {


    const [nbUsersToShow, setNBUsersToShow] = useState(20);


    return (
        <>
            {UserList.reverse().slice(0, nbUsersToShow).map((user) => { //Reverse to change the order and put the last published on top
                return <Grid item xs={12} key={user.id + '-grid'} justify="center" container >
                    <UserItem User={user} />

                </Grid>
            })
            }
            <Grid item xs={12} container justify="center">
                {(nbUsersToShow < UserList.length)
                    ?
                    <Button color='secondary' onClick={() => {
                        const NBusersToLoad = 20;
                        if (nbUsersToShow + NBusersToLoad < UserList.length)
                            setNBUsersToShow(nbUsersToShow + 20);
                        else setNBUsersToShow(UserList.length);

                    }}>Load more</Button>

                    : null
                }
            </Grid>
        </>

    );

}
