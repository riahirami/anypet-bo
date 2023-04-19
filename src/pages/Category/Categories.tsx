import React, { useEffect, useState } from "react";
import {
  useDeleteCategoryMutation,
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
import { Category,CategoryData } from "../../core/models/category.model";
import {useDispatch,useSelector} from 'react-redux';
import {selectCategory,getCategories} from '../../redux/slices/categorySlice';
import {Demo} from './category.style';

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [
    deletCategory,
    { data: deletData, isSuccess: isSuccessDelete, isLoading: loadingDelete },
  ] = useDeleteCategoryMutation();

  const { data:dataCategory, isSuccess, isFetching,refetch } = useGetCategoriesQuery();
  const [category, setCategory] = useState<CategoryData>();

  const dispatch = useDispatch();
  const categories = useSelector(selectCategory);

  
  useEffect(() => {
    if (isSuccess) {
      setCategory(dataCategory);
      dispatch(getCategories({ category: dataCategory }));
    }
  });

  
  function handleDeleteCategory(id: string) {
    setShowModal(true);
    deletCategory(id);
  }


  return (
    <div>
      <Grid item xs={12} md={12}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Categories
        </Typography>
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
            {categories?.map((cat: Category) => (
              <ListItem key={cat.id}>
                <ListItemAvatar>
                  <Avatar>
                    <FormatListBulletedIcon />
                  </Avatar>
                </ListItemAvatar>
                <Link to={"/advertise/category/" + cat.id}>
                <ListItemText
                    secondary={cat.id}
                    primary={cat.title}

                  />
                </Link>
                <ListItemText
                    secondary={cat.description}
                  />
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
