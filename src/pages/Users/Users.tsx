import { useGetUsersQuery } from "../../redux/api/userApi";
import { User } from "../../core/models/user.model";
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {formaDateTime} from "../../core/services/helpers"
const Users = () => {


const {data,isLoading,isSuccess} = useGetUsersQuery(100);

  return (
   <>
    <p>users</p>
    {data &&
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Avatar</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Login</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell>Updated At</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.data.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell><Avatar src={item.avatar} ></Avatar> </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.login}</TableCell>
            <TableCell>{formaDateTime(item.created_at)}</TableCell>
            <TableCell>{formaDateTime(item.updated_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}

   </>
  );
};

export default Users;
