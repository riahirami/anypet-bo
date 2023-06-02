import {
  useGetUsersQuery,
  useRevokeAdminMutation,
  useSetAdminMutation,
} from "../../redux/api/userApi";
import { User } from "../../core/models/user.model";
import {
  Avatar,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { formaDateTime } from "../../core/services/helpers";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import CustomLink from "components/CustomLink/CustomLink"


const Users = () => {
  const { data, isLoading, isSuccess } = useGetUsersQuery(100);

  const [
    setAdmin,
    { data: AdminData, isSuccess: successAdmin, isLoading: loadingAdmin },
  ] = useSetAdminMutation();
  const [
    revokeAdmin,
    { data: RevokeData, isSuccess: successRevoke, isLoading: loadingRevoke },
  ] = useRevokeAdminMutation();

  const handleSetAdmin = async (id: number) => {
    await setAdmin(id);
    if (successAdmin) {
      console.log({ AdminData });
    }
  };

  const handleRevokeAdmin = async (id: number) => {
    await revokeAdmin(id);
    if (successRevoke) {
      console.log({ RevokeData });
    }
  };
  return (
    <>
      <p>users</p>
      {data && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Sign up At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Avatar src={item.avatar}></Avatar>{" "}
                  </TableCell>
                  <TableCell>
                    <CustomLink to={"/user/details/" + item.id} >
                    {item.firstname} {item.lastname}
                  </CustomLink>
                </TableCell>
                
                <TableCell>{item.email}</TableCell><TableCell>{item.phone}</TableCell><TableCell>{item.role_id === 2 ? "Admin" : "user"}</TableCell><TableCell>{formaDateTime(item.created_at)}</TableCell><TableCell>
                    {item.role_id === 1 ? (
                      <IconButton
                        color="success"
                        aria-label="validate"
                        component="label"
                        onClick={() => setAdmin(item.id)}
                      >
                        <AdminPanelSettingsOutlinedIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        color="error"
                        component="label"
                        onClick={() => revokeAdmin(item.id)}
                      >
                        <GppBadOutlinedIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default Users;
