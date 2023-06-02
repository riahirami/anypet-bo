import { styled } from '@mui/material/styles';
import {
    Grid,
    Container
} from '@mui/material'

export const CustomContainerProfile = styled(Container)(({ theme }) => ({
    padding: '20px',
    borderRadius: '20px',
    width: '100%',
}))

export const CustomGlobalGrid = styled(Container)(({ theme }) => ({
    display: 'flex', marginBottom: '20px'
}))

export const CustomGridCover = styled(Grid)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    background: `url(https://marketplace.canva.com/EAFB2eB7C3o/1/0/1600w/canva-yellow-and-turquoise-vintage-rainbow-desktop-wallpaper-Y4mYj0d-9S8.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
}))

export const CustomGridProfileInformations = styled(Grid)(({ theme }) => ({
    padding: '40px', display: 'flex', justifyContent: 'space-evenly'
}))