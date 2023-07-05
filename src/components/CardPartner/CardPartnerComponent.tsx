import React from 'react'
import {
    StyledTypography, CardContainer, PartnerLink, StyledAvatar, ActionLink, ActionsContainer, ReadAction, AlertText, Header, Icon, MarkAsReadAction, MessageText
} from "./CardPartnerComponent.style"
import { Box, Typography, Grid, Button, Avatar } from "@mui/material";
import { Partner, PartnerData } from 'core/models/partner.model';
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import CustomLink from 'components/CustomLink/CustomLink';


const CardPartnerComponent = ({
    partners,
    isSuccess,
    handleDeletePartner,
}: {
    partners: PartnerData | undefined;
    isSuccess: boolean;
    handleDeletePartner: (partnerId: string) => void;
}) => (

    <Grid container >
        {isSuccess &&
            partners?.data?.data?.map((partner: Partner) => (
                <Grid item xs={12} sm={6}  md={3} lg={3}>

                    <CardContainer key={partner.id}>
                        <CustomLink to={"/partner/" + partner?.id}>
                            <StyledAvatar src={partner?.logo} />
                        </CustomLink>
                        <StyledTypography>{partner?.name}</StyledTypography>
                        <ActionsContainer style={{ display: "flex", justifyContent: "space-evenly" }}>

                        <CustomLink to={"/partner/update/" + partner?.id}>
                                <Button size="small" variant="contained" color="info">
                                    Update
                                </Button>
                            </CustomLink>

                            <Button size="small"
                                variant="contained"
                                color="error"
                                onClick={() => handleDeletePartner(partner.id || "")}
                            >
                                Delete
                            </Button>

                      
                        </ActionsContainer>
                    </CardContainer>
                </Grid>
            ))}

    </Grid>

);
export default CardPartnerComponent