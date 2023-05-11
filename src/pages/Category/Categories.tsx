import React, { useEffect, useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApi";
import {
  Avatar,
  Button,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {message} from "../../core/constant/message";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/Path";
import { Category, CategoryData } from "../../core/models/category.model";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  getCategories,
} from "../../redux/slices/categorySlice";
import { Demo } from "./category.style";
import { Playground } from "../../layouts/SideBar/SideBar";
import { ProSidebarProvider } from "../../components/SidebarSrc/ProSidebarProvider";
import Pagination from "@mui/material/Pagination";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState<CategoryData>();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: dataCategory,
    isSuccess,
    isFetching,
    refetch,
  } = useGetCategoriesQuery(currentPage);

  const [
    deletCategory,
    { data: deletData, isSuccess: isSuccessDelete, isLoading: loadingDelete },
  ] = useDeleteCategoryMutation();

  const dispatch = useDispatch();
  const categories = useSelector(selectCategory);

  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  // useEffect(() => {
  //   if (dataCategory) {
  //     setCategory(dataCategory);
  //     dispatch(getCategories({ category: dataCategory }));
  //   }
  // },[dataCategory, dispatch]);

  function handleDeleteCategory(id: string) {
    deletCategory(id)
      .unwrap()
      .then(() => {
        setShowModal(true);
        refetch();
      });
  }
  useEffect(() => {
    refetch();
  }, [dataCategory, refetch]);

  return (
    <div>
      <Grid item xs={12} md={12}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography align="left">Categories</Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="center">
            <Pagination
              color="primary"
              showFirstButton
              showLastButton
              count={dataCategory?.last_page}
              defaultPage={currentPage}
              boundaryCount={1}
              disabled={isFetching}
              onChange={handlePageChange}
            />
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <Link to={PATHS.AddCategories}>
              <Button variant="contained" endIcon={<PlusOneIcon />}>
                Add category
              </Button>
            </Link>
          </Grid>
        </Grid>
        {isFetching && <Spinner />}
        {showModal && (
          <CustomModal title="Delete" description={message.CATEGORYDELETED} />
        )}{" "}
        <Demo>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category ID</TableCell>
                  <TableCell>Category Title</TableCell>
                  <TableCell>Category Description</TableCell>
                  <TableCell>Remove</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataCategory?.data.map((cat: Category) => (
                  <TableRow key={cat.id}>
                    <TableCell>{cat.id}</TableCell>
                    <TableCell>
                      <Link to={"/advertise/category/" + cat.id}>
                        {cat.title}
                      </Link>
                    </TableCell>
                    <TableCell>{cat.description}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        aria-label="delete"
                        component="label"
                        onClick={() => handleDeleteCategory(cat.id || "")}
                        disabled={loadingDelete}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Link to={"/categoryshow/" + cat.id}>
                        <IconButton
                          color="primary"
                          aria-label="edit"
                          component="label"
                        >
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Demo>
      </Grid>
    </div>
  );
};

export default Categories;
