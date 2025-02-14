import { Grid, Typography, Avatar, Box } from "@mui/material";
import { formaDateTime } from "core/services/helpers";
import React from "react";
import { useGetListConversationsQuery } from "redux/api/userApi";
import { Message } from "core/models/Message.model";
import { Link } from "react-router-dom";
import { getCurrentUser } from "core/utils/functionHelpers";
import Spinner from "components/Spinner/spinner";
import CustomLink from "components/CustomLink/CustomLink"
import {CustomConversationBox,GridVerticalDivider} from "./Conversations.style"

const Conversations = () => {
  const { data, isLoading } = useGetListConversationsQuery();
  const currentUser = getCurrentUser();

  

  return (
    <>
      <div>Conversations</div>
      {isLoading && <Spinner />}
      <Grid container>
        {data &&
          data?.map((conversations: Message) => (
            <CustomConversationBox
              item
              md={12}
              key={conversations?.id}
           
            >
              <Grid item sx={{ m: "20px" }}>
                <CustomLink to={"/users/messages/" + conversations?.receiver_id}>
                  <Avatar
                    src={
                      conversations?.receiver_id === currentUser?.user?.id
                        ? conversations?.sender?.avatar
                        : conversations?.receiver?.avatar
                    }
                  />
                  <Typography>
                    {conversations?.receiver_id === currentUser?.user?.id
                      ? conversations?.sender?.firstname
                      : conversations?.receiver?.firstname}
                  </Typography>
                </CustomLink>
              </Grid>
              <GridVerticalDivider
                item
                sx={{ m: "20px" }}
                
              >
                <CustomLink to={"/users/messages/" + conversations?.receiver_id}>
                  <Typography>Message: {conversations?.message}</Typography>
                  <Typography>
                    {formaDateTime(conversations?.created_at)}
                  </Typography>
                </CustomLink>
              </GridVerticalDivider>
            </CustomConversationBox>
          ))}
      </Grid>
    </>
  );
};

export default Conversations;
