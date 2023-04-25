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
} from "@mui/material";
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
import { Playground } from "../../layouts/SideBar";
import { ProSidebarProvider } from "../../components/SidebarSrc/ProSidebarProvider";
import Pagination from "@mui/material/Pagination";
import { useGetAdsByDateQuery } from "../../redux/api/adsApi";

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState<CategoryData>();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: dataCategory,
    isSuccess,
    isFetching,
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
    deletCategory(id);
    setShowModal(true);
  }

  return (
    <div>
      <Grid item xs={12} md={12}>
        <Stack spacing={2}>
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
        </Stack>
        <Typography align="left">Categories</Typography>
        <Link to={PATHS.AddCategories}>
          <Button variant="contained" endIcon={<PlusOneIcon />}>
            Add category
          </Button>{" "}
        </Link>
        {isFetching && <Spinner />}
        {showModal && (
          <CustomModal title="Delete" description="deleted succeffully" />
        )}{" "}
        <Demo>
          <List>
            {dataCategory?.data.map((cat: Category) => (
              <ListItem key={cat.id}>
                <ListItemAvatar>
                  <Avatar>
                    <FormatListBulletedIcon />
                  </Avatar>
                </ListItemAvatar>
                <Link to={"/advertise/category/" + cat.id}>
                  <ListItemText secondary={cat.id} primary={cat.title} />
                </Link>
                <ListItemText secondary={cat.description} />
                <IconButton
                  color="primary"
                  aria-label="delete"
                  component="label"
                  onClick={() => handleDeleteCategory(cat.id || "")}
                  disabled={loadingDelete}
                >
                  <DeleteIcon />
                </IconButton>
                <Link to={"/categoryshow/" + cat.id}>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    component="label"
                    // onClick={() => handleUpdate(cat.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </div>
  );
};

export default Categories;
