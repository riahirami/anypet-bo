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
import { Link, useParams } from "react-router-dom";
import { getCurrentUser } from "core/utils/functionHelpers";
import { formaDateTime } from "core/services/helpers";
import SendIcon from "@mui/icons-material/Send";
import { Message } from "core/models/Message.model";
import { Spinner } from "components/Spinner/spinner";
import { PATHS } from "routes/Path";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
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

    var pusher = new Pusher("2e0246b200d740c82f52", {
      cluster: "eu",
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
        <Link to={"/users/conversations/"}>
          <ArrowBackIosOutlinedIcon />
        </Link>
      </Button>
      <Grid style={{ height: "500px", overflowY: "scroll" }}>
        <Box>
          {isSuccess &&
            allMessages?.map((message: Message) => (
              <Grid
                key={message?.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    message.receiver_id === currentUser?.user?.id
                      ? "flex-start"
                      : "flex-end",
                }}
              >
                {message?.message?.length > 0 && (
                  <>
                    {/* <Typography>
                      {message.sender_id === currentUser?.user?.id
                        ? "sender"
                        : "receiver"}{" "}
                      {message?.sender?.firstname}
                    </Typography> */}
                    <Avatar
                      src={message?.sender_avatar || message?.sender?.avatar}
                      sx={{ width: 24, height: 24 }}
                    />
                  </>
                )}
                <Box
                  style={{
                    backgroundColor:
                      message.sender_id === currentUser?.user?.id
                        ? "cornflowerblue"
                        : message.receiver_id === currentUser?.user?.id
                          ? "chartreuse"
                          : "inherit",
                    marginLeft:
                      message.sender_id === currentUser?.user?.id
                        ? "20px"
                        : "20px",
                    textAlign: "left",
                    borderRadius: "10px",
                    padding: "15px",
                    marginBottom: "20px",
                    width: "300px",
                  }}
                >
                  <Typography variant="body1">{message?.message}</Typography>
                  <Typography variant="caption">
                    {message?.created_at && formaDateTime(message?.created_at)}
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Box>
      </Grid>
      <Grid>
        <Grid>
          <TextField
            id="message"
            name="message"
            value={message}
            onChange={handleChange}
            focused
            style={{
              paddingLeft: "30px",
              paddingTop: "20px",
              paddingBottom: "50px",
              width: "90%",
              borderColor: "aqua",
              marginTop: "15px",
            }}
          ></TextField>
          <Button
            type="button"
            onClick={() => handleSendMessage(id)}
            color="primary"
            variant="contained"
            disabled={loadingSendMsg}
            style={{ marginTop: "40px", marginLeft: "5px" }}
          >
            <SendIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Messages;
