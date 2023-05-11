import { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  TextField,
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import {
  useAddCommentsMutation,
  useGetCommentsQuery,
  useReplyCommentsMutation,
  useDeleteCommentMutation,
} from "../../redux/api/commentsApi";
import { useParams } from "react-router-dom";
import { formaDateTime } from "../../core/services/helpers";
import { tokens } from "../theme";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { Comments, ReplyComment } from "./Comments.type";
import { StyledCommentButton,StyledCommentDivider,StyledCommentPaper,StyledCommentTypography } from "./Comment.style";

const Comment = () => {
  const { id } = useParams();
  const { isLoading, isSuccess, data, refetch } = useGetCommentsQuery(id);

  const [comment, setComment] = useState("");

  const [showReply, setShowReply] = useState<{ [key: string]: boolean }>({});
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});

  const [comments, setComments] = useState(data);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [
    addComment,
    {
      data: AddCommentData,
      isSuccess: isSuccessAddComment,
      isLoading: addCommentLoading,
    },
  ] = useAddCommentsMutation();

  const [
    replyComment,
    {
      data: ReplyCommentData,
      isSuccess: isSuccessReplyComment,
      isLoading: ReplyCommentLoading,
    },
  ] = useReplyCommentsMutation();

  const [
    deleteComment,
    { isSuccess: isSuccessDeleteComment, isLoading: DeleteCommentLoading },
  ] = useDeleteCommentMutation();

  const handleChangeCommentField = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setComment(e.target.value);
  };

  const handleChangeReplyField = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    commentId: number
  ) => {
    setReplyTexts({
      ...replyTexts,
      [commentId]: e.target.value,
    });
  };

  const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    addComment({
      id,
      description: comment,
    });
    setComment("");
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {/*  */}
      <StyledCommentPaper >
        <Typography>Comments :</Typography>
        <Grid container justifyContent="center" p={4}>
          <Grid item xs={12} sm={11} md={11} lg={10}>
            <TextField
              multiline
              rows={1}
              fullWidth
              id="description"
              name="description"
              value={comment}
              onChange={handleChangeCommentField}
            />
          </Grid>
          <Grid item>
            <StyledCommentButton
              type="submit"
              disabled={addCommentLoading}
              variant="contained"
              onClick={handleAddComment}
              fullWidth
            >
              Comment
            </StyledCommentButton>
          </Grid>
        </Grid>

        {data?.map((comment: Comments) => (
          <>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar src={comment.user.avatar}></Avatar>
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="body1">
                      {comment.user.login}
                    </Typography>
                    <Typography variant="body1">
                      {comment.description}
                    </Typography>
                  </Box>
                  <IconButton
                    color="error"
                    sx={{
                      "&:hover": {
                        background: "inherit",
                      },
                    }}
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                    disabled={DeleteCommentLoading}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>

                <StyledCommentTypography >
                  Created at: {formaDateTime(comment.created_at)}
                </StyledCommentTypography>
                <StyledCommentDivider variant="fullWidth"/>

                {comment.reply_comments &&
                  comment?.reply_comments?.map((reply: ReplyComment) => (
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar src={reply.user.avatar}></Avatar>
                      </Grid>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <Typography>{reply.user.name}</Typography>
                        <Typography>{reply.description}</Typography>

                        <StyledCommentTypography >
                          Created at: {formaDateTime(reply.created_at)}
                        </StyledCommentTypography>
                      <StyledCommentDivider variant="fullWidth"/>
                      </Grid>

                      <IconButton
                        color="error"
                        sx={{
                          "&:hover": {
                            background: "inherit",
                          },
                        }}
                        onClick={() => {
                          deleteComment(reply.id);
                        }}
                        disabled={DeleteCommentLoading}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Grid>
                  ))}
                <Button
                  disabled={ReplyCommentLoading}
                  onClick={() => {
                    setShowReply({
                      ...showReply,
                      [comment.id]: !showReply[comment.id],
                    });
                  }}
                >
                  Reply
                  {showReply[comment.id] ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>

                {showReply[comment.id] && (
                  <>
                    <Grid container justifyContent="center" p={2}>
                      <Grid item xs={12} sm={11} md={11} lg={10}>
                        <TextField
                          multiline
                          rows={1}
                          fullWidth
                          id={`reply-${comment.id}`}
                          name={`reply-${comment.id}`}
                          value={replyTexts[comment.id] || ""}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => handleChangeReplyField(e, comment.id)}
                        />
                      </Grid>
                      <Grid item>
                        <StyledCommentButton
                          variant="contained"
                          onClick={() => {
                            replyComment({
                              id: id,
                              description: replyTexts[comment.id],
                              parent_id: comment.id,
                              user_id: comment.user_id,
                            });
                            setReplyTexts({});
                          }}
                         
                        >
                          Comment
                        </StyledCommentButton>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
            <StyledCommentDivider variant="fullWidth"/>
          </>
        ))}
      </StyledCommentPaper>
    </>
  );
};

export default Comment;
