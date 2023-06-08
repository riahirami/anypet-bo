import React, { useEffect, useState } from "react";

import {
  Box,
  Avatar,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import {
  useSendMessageMutation,
  useGetConversationQuery,
} from "redux/api/userApi";
import Pusher from "pusher-js";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "core/utils/functionHelpers";
import { formaDateTime } from "core/services/helpers";
import SendIcon from "@mui/icons-material/Send";
import { Message } from "core/models/Message.model";
import { Spinner } from "components/Spinner/spinner";
import { PATHS } from "routes/Path";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import CustomLink from "components/CustomLink/CustomLink"

import {
  CustomSendButton, CustomTextFieldMessage, CustomGlobalGrid, CustomGrid,
  CustomBox
} from "./Messages.style"
import { pusherConfig } from "core/constant/Pusher"

const Messages = () => {
  const { id } = useParams();
  const currentUser = getCurrentUser();

  const [message, setMessage] = useState("");
  const [sendMessage, { data: NewMessage, isLoading: loadingSendMsg, isSuccess: msgSuccess }] = useSendMessageMutation();

  const {
    data: ConversationData,
    isSuccess,
    isLoading,
    refetch,
  } = useGetConversationQuery(id);

  const [allMessages, setAllMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (isSuccess && ConversationData) {
      setAllMessages((prevMessages) => [...prevMessages, ...ConversationData]);
    }
  }, [isSuccess]);

  useEffect(() => {
    Pusher.logToConsole = false;

    var pusher = new Pusher(pusherConfig.id, {
      cluster: pusherConfig.cluster,
    });

    var channel = pusher.subscribe("chat");
    channel.bind("message", function (data: Message) {

      setAllMessages((prevMessages) => [...prevMessages, data]);

    });

    return () => {
      pusher.unsubscribe("chat");
      pusher.disconnect();
    };
  }, [msgSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (
    id_receiver: string | number | undefined
  ) => {
    await sendMessage({ receiver_id: id_receiver, message });
    setMessage("");
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Button variant="text">
        <CustomLink to={"/users/conversations/"}>
          <ArrowBackIosOutlinedIcon />
        </CustomLink>
      </Button>
      <CustomGlobalGrid >
        <Box>
          {isSuccess &&
            allMessages?.map((message: Message) => (
              <CustomGrid message={message} currentUser={currentUser}>
                {message?.message?.length > 0 && (
                  <>
                    <Avatar src={message?.sender_avatar || message?.sender?.avatar} sx={{ width: 24, height: 24 }} />
                  </>
                )}
                <CustomBox message={message} currentUser={currentUser}>
                  <Typography variant="body1">{message?.message}</Typography>
                  <Typography variant="caption">{message?.created_at && formaDateTime(message?.created_at)}</Typography>
                </CustomBox>
              </CustomGrid>
            ))}
        </Box>
      </CustomGlobalGrid>
      <Grid>
        <Grid>
          <CustomTextFieldMessage
            id="message"
            name="message"
            value={message}
            onChange={handleChange}
            focused
          ></CustomTextFieldMessage>
          <CustomSendButton
            type="button"
            onClick={() => handleSendMessage(id)}
            color="primary"
            variant="contained"
            disabled={loadingSendMsg}
          >
            <SendIcon />
          </CustomSendButton>
        </Grid>
      </Grid>
    </>
  );
};

export default Messages;
